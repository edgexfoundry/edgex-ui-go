/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
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
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/edgex-ui-go/internal/handler"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/utils"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/di"
	"github.com/labstack/echo/v4"
)

func ping(c echo.Context) error {
	return c.Blob(http.StatusOK, "text/plain", []byte("pong"))
}

func LoadRestRoutes(r *echo.Echo, dic *di.Container) {
	rh := handler.NewResourceHandler(dic)

	r.GET("/api/v3/ping", ping)
	r.GET("/api/v3/auth/securemode", rh.SecureMode)
	r.POST("/api/v3/profile/yaml", rh.AddProfileYamlContent)
	r.GET("/api/v3/profile/yaml/name/:name", rh.FindProfileAndConvertToYamlByName)
	r.PUT("/api/v3/profile/yaml", rh.UpdateProfileYamlContent)

	r.POST("/api/v3/registrycenter/deploy/:servicekey", rh.DeployConfigurable)
	r.GET("/api/v3/registrycenter/config/:servicekey", rh.GetServiceConfig)
	r.GET("/api/v3/registrycenter/service/all", rh.GetRegisteredServiceAll)
	r.GET("/api/v3/registrycenter/ping", rh.RegistryIsAlive)

	config := container.ConfigurationFrom(dic.Get)
	app := &Application{config: config}
	r.GET("/", utils.WrapHandler(app.ServeHTTP))
}
