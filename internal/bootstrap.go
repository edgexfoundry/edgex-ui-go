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

package internal

import (
	"context"
	bootstrapContainer "github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/utils"
	"sync"

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/startup"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/di"
	mux "github.com/gorilla/mux"
)

type Bootstrap struct {
	router      *mux.Router
	serviceName string
}

func NewBootstrap(router *mux.Router, serviceName string) *Bootstrap {
	return &Bootstrap{
		router:      router,
		serviceName: serviceName,
	}
}

func (b *Bootstrap) BootstrapHandler(ctx context.Context, wg *sync.WaitGroup, _ startup.Timer, dic *di.Container) bool {
	lc := bootstrapContainer.LoggingClientFrom(dic.Get)
	utils.AdaptLogrusBasedLogging(lc)

	config := container.ConfigurationFrom(dic.Get)
	LoadRestRoutes(b.router, dic)
	initClientsMapping(config, dic)
	return true
}
