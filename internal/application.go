/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 * Copyright (C) 2023 Intel Corporation
 * Copyright © 2025 IOTech Ltd
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
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

package internal

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/config"
	bootstrapConfig "github.com/edgexfoundry/go-mod-bootstrap/v4/bootstrap/config"
	bootstrapContainer "github.com/edgexfoundry/go-mod-bootstrap/v4/bootstrap/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v4/bootstrap/zerotrust"
	"github.com/edgexfoundry/go-mod-bootstrap/v4/di"
	"github.com/edgexfoundry/go-mod-core-contracts/v4/errors"
)

const (
	HttpProtocol           = "http"
	OriginHostReqHeader    = "X-Origin-Host"
	ForwardedHostReqHeader = "X-Forwarded-Host"

	RootURIPath        = "/"
	localAPIPathPrefix = "/api"
	staticResourcePath = "static/web"
)

type Client struct {
	addr      string
	transport http.RoundTripper
}

var clientsMapping map[string]Client

type Application struct {
	config *config.ConfigurationStruct
}

func initClientsMapping(config *config.ConfigurationStruct, dic *di.Container) errors.EdgeX {
	lc := bootstrapContainer.LoggingClientFrom(dic.Get)

	clientsMapping = make(map[string]Client, 10)
	var zitiRoundTripper http.RoundTripper

	for clientName, clientInfo := range config.Clients {
		addr := fmt.Sprintf("%s://%s:%d", clientInfo.Protocol, clientInfo.Host, clientInfo.Port)
		client := Client{
			addr:      addr,
			transport: nil,
		}

		securityMode := strings.ToLower(clientInfo.SecurityOptions[bootstrapConfig.SecurityModeKey])
		switch securityMode {
		case zerotrust.ZeroTrustMode:
			scheme := "http"
			if origin, err := url.Parse(client.addr); err != nil {
				panic(fmt.Errorf("could not parse url for %s: %s", clientName, addr))
			} else {
				scheme = origin.Scheme
			}

			client.addr = scheme + "://" + clientName + ".edgex.ziti"
			lc.Infof("overriding url and port for zero trust client %s from %s to %s", clientName, addr, client.addr)

			if zitiRoundTripper != nil {
				//reuse the existing context
				client.transport = zitiRoundTripper
			} else {
				secretProvider := bootstrapContainer.SecretProviderExtFrom(dic.Get)
				var err error
				zitiRoundTripper, err = zerotrust.HttpTransportFromClient(secretProvider, &clientInfo, lc)
				if err != nil {
					return errors.NewCommonEdgeXWrapper(err)
				}
				client.transport = zitiRoundTripper
			}

		case "http":
			fallthrough
		default:
			lc.Infof("client using underlay: %s", clientName)
		}
		clientsMapping[fmt.Sprintf("/%s", clientName)] = client
	}

	return nil
}

func hasEdgeXSvcPrefixValidate(path string) bool {
	if strings.HasSuffix(path, common.JsSuffix) {
		return false
	}

	for pathPrefix := range clientsMapping {
		if strings.HasPrefix(path, pathPrefix) {
			return true
		}
	}
	return false
}

func (app *Application) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	fmt.Println(path)
	if !strings.HasPrefix(path, localAPIPathPrefix) && !hasEdgeXSvcPrefixValidate(path) {
		w.Header().Add("X-Frame-Options", "SAMEORIGIN")
		w.Header().Add("X-Content-Type-Options", "nosniff")
		w.Header().Add("X-Download-Options", "noopen")
		w.Header().Add("X-XSS-Protection", "1")
		w.Header().Add("Cache-Control", "no-cache,no-store")
		w.Header().Add("Content-Security-Policy", "base-uri 'self';default-src 'self' 'unsafe-inline';img-src 'self' http://www.w3.org/ data:;")
		defaultStaticResourcePath := fmt.Sprintf("%s/en-US", staticResourcePath)
		if path == RootURIPath {
			http.FileServer(http.Dir(defaultStaticResourcePath)).ServeHTTP(w, r)
		} else {
			http.FileServer(http.Dir(staticResourcePath)).ServeHTTP(w, r)
		}
		return
	}

	for prefix := range clientsMapping {
		if strings.HasPrefix(path, prefix) {
			originalPath := strings.TrimPrefix(path, prefix)
			targetAddr := clientsMapping[prefix]
			if common.IsSecurityEnabled() {
				app.secure(w, r, originalPath, targetAddr)
			} else {
				insecure(w, r, originalPath, targetAddr)
			}
			return
		}
	}
}

func (app *Application) secure(w http.ResponseWriter, r *http.Request, originalPath string, client Client) {
	defer r.Body.Close()
	origin, err := url.Parse(client.addr)
	if err != nil {
		panic(fmt.Errorf("could not parse url? %s", err))
	}
	director := func(req *http.Request) {
		req.Header.Add(ForwardedHostReqHeader, req.Host)
		req.Header.Add(OriginHostReqHeader, origin.Host)
		req.URL.Scheme = HttpProtocol
		req.URL.Host = origin.Host
		req.URL.Path = originalPath
	}
	rp := &httputil.ReverseProxy{Director: director, Transport: client.transport}
	rp.ServeHTTP(w, r)
}

func insecure(w http.ResponseWriter, r *http.Request, originalPath string, client Client) {
	defer r.Body.Close()
	origin, err := url.Parse(client.addr)
	if err != nil {
		panic(fmt.Errorf("could not parse url? %s", err))
	}
	director := func(req *http.Request) {
		req.Header.Add(ForwardedHostReqHeader, req.Host)
		req.Header.Add(OriginHostReqHeader, origin.Host)
		req.URL.Scheme = HttpProtocol
		req.URL.Host = origin.Host
		req.URL.Path = originalPath
	}
	rp := &httputil.ReverseProxy{Director: director, Transport: client.transport}
	rp.ServeHTTP(w, r)
}
