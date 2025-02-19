/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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
	"context"
	"sync"

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	bootstrapContainer "github.com/edgexfoundry/go-mod-bootstrap/v4/bootstrap/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v4/bootstrap/startup"
	"github.com/edgexfoundry/go-mod-bootstrap/v4/bootstrap/utils"
	"github.com/edgexfoundry/go-mod-bootstrap/v4/di"
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
	if err := initClientsMapping(config, dic); err != nil {
		lc.Errorf("Init clientsMapping failed: %v", err)
		return false
	}
	return true
}
