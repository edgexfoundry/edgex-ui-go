/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 * Copyright (C) 2023 Intel Corporation
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
	"errors"
	"fmt"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/go-mod-registry/v3/pkg/types"
	"github.com/edgexfoundry/go-mod-registry/v3/registry"
	"github.com/labstack/echo/v4"
)

func (rh *ResourceHandler) GetRegisteredServiceAll(c echo.Context) error {
	r := c.Request()
	w := c.Response()

	defer r.Body.Close()

	var err error
	var token string
	var code int
	if common.IsSecurityEnabled() {
		token, err, code = rh.getAclTokenOfConsul(w, r)
		if err != nil || code != http.StatusOK {
			return c.String(code, "unable to get consul acl token")
		}
	}
	client, err := rh.registryCenterClient(token)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	endpoints, err := client.GetAllServiceEndpoints()

	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	result, err := json.Marshal(endpoints)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.Blob(http.StatusOK, "application/json;charset=UTF-8", result)
}

func (rh *ResourceHandler) registryCenterClient(token string) (registry.Client, error) {
	config := container.ConfigurationFrom(rh.dic.Get)
	registryConfig := types.Config{
		Host:          config.Registry.Host,
		Port:          config.Registry.Port,
		CheckInterval: "2s",
		CheckRoute:    "/api/v1/ping",
		Type:          "consul",
		AccessToken:   token,
	}
	return registry.NewRegistryClient(registryConfig)
}

func (rh *ResourceHandler) getAclTokenOfConsul(w http.ResponseWriter, r *http.Request) (string, error, int) {
	defer r.Body.Close()
	config := container.ConfigurationFrom(rh.dic.Get)
	var acl struct{ SecretID string }
	client := &http.Client{}
	url := fmt.Sprintf("http://%s:%d%s", config.APIGateway.Server, config.APIGateway.ApplicationPort, AclOfConsulPath)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return "", err, http.StatusInternalServerError
	}
	req.Header.Set(Authorization, r.Header.Get(Authorization))
	resp, err := client.Do(req)
	if err != nil {
		return "", err, resp.StatusCode
	}
	if err := json.NewDecoder(resp.Body).Decode(&acl); err != nil {
		return "", err, http.StatusInternalServerError
	}
	if resp.StatusCode != http.StatusOK {
		return "", errors.New(""), resp.StatusCode
	}
	return acl.SecretID, nil, resp.StatusCode
}

func (rh *ResourceHandler) RegistryIsAlive(c echo.Context) error {
	r := c.Request()
	w := c.Response()

	defer r.Body.Close()
	var err error
	var token string
	var code int
	if common.IsSecurityEnabled() {
		token, err, code = rh.getAclTokenOfConsul(w, r)
		if err != nil || code != http.StatusOK {
			return c.String(code, "unable to get consul acl token")
		}
	}
	client, err := rh.registryCenterClient(token)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	alive := client.IsAlive()

	if !alive {
		return c.NoContent(http.StatusServiceUnavailable)
	}

	return c.NoContent(http.StatusOK)
}
