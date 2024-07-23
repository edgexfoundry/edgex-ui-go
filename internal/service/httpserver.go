/*******************************************************************************
 * Copyright 2019 Dell Inc.
 * Copyright 2021-2022 IOTech Ltd
 * Copyright 2023 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *******************************************************************************/

package service

import (
	"context"
	"github.com/edgexfoundry/edgex-ui-go/internal/config"
	bscfg "github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/config"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/zerotrust"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/startup"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/di"

	"github.com/gorilla/mux"

	bc "github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/container"
)

// HttpServer contains references to dependencies required by the http server implementation.
type HttpServer struct {
	router           *mux.Router
	isRunning        bool
	doListenAndServe bool
	cfg              *config.ConfigurationStruct
}

// NewHttpServer is a factory method that returns an initialized HttpServer receiver struct.
func NewHttpServer(router *mux.Router, doListenAndServe bool, cfg *config.ConfigurationStruct) *HttpServer {
	return &HttpServer{
		router:           router,
		isRunning:        false,
		doListenAndServe: doListenAndServe,
		cfg:              cfg,
	}
}

// IsRunning returns whether or not the http server is running.  It is provided to support delayed shutdown of
// any resources required to successfully process http requests until after all outstanding requests have been
// processed (e.g. a database connection).
func (b *HttpServer) IsRunning() bool {
	return b.isRunning
}

// BootstrapHandler fulfills the BootstrapHandler contract.  It creates two go routines -- one that executes ListenAndServe()
// and another that waits on closure of a context's done channel before calling Shutdown() to cleanly shut down the
// http server.
func (b *HttpServer) BootstrapHandler(
	ctx context.Context,
	wg *sync.WaitGroup,
	_ startup.Timer,
	dic *di.Container) bool {

	lc := container.LoggingClientFrom(dic.Get)
	if !b.doListenAndServe {
		lc.Info("Web server intentionally NOT started.")
		wg.Add(1)
		go func() {
			defer wg.Done()

			b.isRunning = true
			<-ctx.Done()
			b.isRunning = false
		}()
		return true
	}

	bootstrapConfig := container.ConfigurationFrom(dic.Get).GetBootstrap()

	// this allows env override to explicitly set the value used
	// for ListenAndServe as needed for different deployments
	port := strconv.Itoa(bootstrapConfig.Service.Port)
	addr := bootstrapConfig.Service.ServerBindAddr + ":" + port
	// for backwards compatibility, the Host value is the default value if
	// the ServerBindAddr value is not specified
	if bootstrapConfig.Service.ServerBindAddr == "" {
		addr = bootstrapConfig.Service.Host + ":" + port
	}

	timeout, err := time.ParseDuration(bootstrapConfig.Service.RequestTimeout)
	if err != nil {
		lc.Errorf("unable to parse RequestTimeout value of %s to a duration: %v", bootstrapConfig.Service.RequestTimeout, err)
		return false
	}

	b.router.Use(func(next http.Handler) http.Handler {
		return http.TimeoutHandler(next, timeout, "HTTP request timeout")
	})

	server := &http.Server{
		Addr:              addr,
		Handler:           b.router,
		ReadHeaderTimeout: 5 * time.Second, // G112: A configured ReadHeaderTimeout in the http.Server averts a potential Slowloris Attack
	}

	wg.Add(1)
	go func() {
		defer wg.Done()

		<-ctx.Done()
		_ = server.Shutdown(context.Background())
		lc.Info("Web server shut down")
	}()

	lc.Info("Web server starting (" + addr + ")")

	wg.Add(1)
	go func() {
		defer func() {
			wg.Done()
			b.isRunning = false
		}()

		var ln net.Listener
		listenMode := strings.ToLower(b.cfg.Service.SecurityOptions[bscfg.SecurityModeKey])
		switch listenMode {
		case zerotrust.ZeroTrustMode:
			ozUrl := b.cfg.Service.SecurityOptions["OpenZitiController"]
			secretProvider := bc.SecretProviderExtFrom(dic.Get)
			ozToken, jwtErr := secretProvider.GetSelfJWT()
			if jwtErr != nil {
				lc.Errorf("zero trust mode enabled, but could not load jwt: %v", jwtErr)
				return
			}

			ctx, authErr := zerotrust.AuthToOpenZiti(ozUrl, ozToken)
			if authErr != nil {
				lc.Errorf("could not authenticate to OpenZiti: %v", authErr)
				return
			}

			ozServiceName := zerotrust.OpenZitiServicePrefix + "ui"
			lc.Infof("Using OpenZiti service name: %s", ozServiceName)
			lc.Infof("listening on overlay network. ListenMode '%s' at %s", listenMode, addr)
			ln, err = ctx.Listen(ozServiceName)
			if err != nil {
				lc.Errorf("could not bind service %s: %v", ozServiceName, err)
				return
			}

		case "http":
			fallthrough
		default:
			lc.Infof("listening on underlay network. ListenMode '%s' at %s", listenMode, addr)
			ln, err = net.Listen("tcp", addr)
		}
		if err != nil {
			lc.Errorf("could not start web listener: %v", err)
			return
		}

		b.isRunning = true
		err := server.Serve(ln)
		// "Server closed" error occurs when Shutdown above is called in the Done processing, so it can be ignored
		if err != nil && err != http.ErrServerClosed {
			// Other errors occur during bootstrapping, like port bind fails, are considered fatal
			lc.Errorf("Web server failed: %v", err)

			// Allow any long-running go functions that may have started to stop before exiting
			cancel := container.CancelFuncFrom(dic.Get)
			cancel()

			// Wait for all long-running go functions to stop before exiting.
			wg.Done() // Must do this to account for this go func's wg.Add above otherwise wait will block indefinitely
			wg.Wait()
			os.Exit(1)
		} else {
			lc.Info("Web server stopped")
		}
	}()

	return true
}
