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
	"sync"

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/startup"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/di"
	"github.com/labstack/echo/v4"
)

type Bootstrap struct {
	router      *echo.Echo
	serviceName string
}

func NewBootstrap(router *echo.Echo, serviceName string) *Bootstrap {
	return &Bootstrap{
		router:      router,
		serviceName: serviceName,
	}
}

func (b *Bootstrap) BootstrapHandler(ctx context.Context, wg *sync.WaitGroup, _ startup.Timer, dic *di.Container) bool {
	config := container.ConfigurationFrom(dic.Get)
	LoadRestRoutes(b.router, dic)
	initClientsMapping(config)
	return true
}
