/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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

package service

import (
	"context"
	"os"

	"github.com/edgexfoundry/edgex-ui-go"
	"github.com/edgexfoundry/edgex-ui-go/internal"
	"github.com/edgexfoundry/edgex-ui-go/internal/config"
	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/bootstrap"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/bootstrap/flags"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/bootstrap/handlers"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/bootstrap/interfaces"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/bootstrap/startup"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/di"
	"github.com/gorilla/mux"
)

var (
	GUIServiceKey  = "edgex-ui-service"
	ConfigStemCore = ""
)

func Main(ctx context.Context, cancel context.CancelFunc, router *mux.Router) {
	startupTimer := startup.NewStartUpTimer(GUIServiceKey)

	f := flags.New()
	f.Parse(os.Args[1:])

	configuration := &config.ConfigurationStruct{}
	dic := di.NewContainer(di.ServiceConstructorMap{
		container.ConfigurationName: func(get di.Get) interface{} {
			return configuration
		},
	})

	httpServer := handlers.NewHttpServer(router, true)

	bootstrap.Run(
		ctx,
		cancel,
		f,
		GUIServiceKey,
		ConfigStemCore,
		configuration,
		startupTimer,
		dic,
		false,
		[]interfaces.BootstrapHandler{
			internal.NewBootstrap(router, GUIServiceKey).BootstrapHandler,
			httpServer.BootstrapHandler,
			handlers.NewStartMessage(GUIServiceKey, edgex.Version).BootstrapHandler,
		})
}
