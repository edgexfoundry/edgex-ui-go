/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
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

package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/go-mod-configuration/v3/configuration"
	"github.com/edgexfoundry/go-mod-configuration/v3/pkg/types"
	"github.com/labstack/echo/v4"
)

func (rh *ResourceHandler) DeployConfigurable(c echo.Context) error {
	r := c.Request()
	w := c.Response()

	defer r.Body.Close()

	serviceKey := c.Param("servicekey")
	config := make(map[string]interface{})
	var err error
	var token string
	var code int

	if err := json.NewDecoder(r.Body).Decode(&config); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	if common.IsSecurityEnabled() {
		token, err, code = rh.getAclTokenOfConsul(w, r)
		if err != nil || code != http.StatusOK {
			return c.String(code, "unable to get consul acl token")
		}
	}

	client, err := rh.configurationCenterClient(serviceKey, token)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	if err := client.PutConfigurationMap(config, true); err != nil {
		return c.String(http.StatusBadGateway, err.Error())

	}

	return nil
}

func (rh *ResourceHandler) GetServiceConfig(c echo.Context) error {
	r := c.Request()
	w := c.Response()

	defer r.Body.Close()

	serviceKey := c.Param("servicekey")
	var err error
	var token string
	var code int
	if common.IsSecurityEnabled() {
		token, err, code = rh.getAclTokenOfConsul(w, r)
		if err != nil || code != http.StatusOK {
			return c.String(code, "unable to get consul acl token")
		}
	}
	client, err := rh.configurationCenterClient(serviceKey, token)
	if err != nil {
		return c.String(http.StatusNotFound, err.Error())
	}

	hasConfig, err := client.HasConfiguration()
	if !hasConfig {
		return c.String(http.StatusNotFound, fmt.Sprintf("service [%s] not found on register center", serviceKey))

	}

	config := make(map[string]interface{})

	rawConfiguration, err := client.GetConfiguration(&config)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("could not get configuration from Configuration: %v", err.Error()))
	}

	actual, ok := rawConfiguration.(*map[string]interface{})
	if !ok {
		return c.String(http.StatusInternalServerError, "Configuration from Registry failed type check")
	}

	result, err := json.Marshal(*actual)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	return c.Blob(http.StatusOK, "application/json;charset=UTF-8", result)
}

func (rh *ResourceHandler) configurationCenterClient(serviceKey string, token string) (configuration.Client, error) {
	config := container.ConfigurationFrom(rh.dic.Get)
	configurationConfig := types.ServiceConfig{
		Host:        config.Registry.Host,
		Port:        config.Registry.Port,
		Type:        config.Registry.Type,
		BasePath:    config.Registry.ConfigRegistryStem + config.Registry.ServiceVersion + "/" + serviceKey,
		AccessToken: token,
	}
	client, err := configuration.NewConfigurationClient(configurationConfig)
	if err != nil {
		return nil, fmt.Errorf("connection to Registry could not be made: %v", err)
	}
	if !client.IsAlive() {
		return nil, fmt.Errorf("registry (%s) is not running", configurationConfig.Type)
	}
	return client, nil
}
