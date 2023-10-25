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

package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	bootstrapContainer "github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/container"
	"github.com/edgexfoundry/go-mod-bootstrap/v3/bootstrap/secret"
	client "github.com/edgexfoundry/go-mod-core-contracts/v3/clients/http"
	common2 "github.com/edgexfoundry/go-mod-core-contracts/v3/common"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos/common"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos/requests"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos/responses"
	"github.com/labstack/echo/v4"
	"gopkg.in/yaml.v3"
)

func (rh *ResourceHandler) AddProfileYamlContent(c echo.Context) error {
	r := c.Request()

	defer r.Body.Close()

	var profile dtos.DeviceProfile
	jwtSecretProvider := secret.NewJWTSecretProvider(bootstrapContainer.SecretProviderExtFrom(rh.dic.Get))

	data, err := io.ReadAll(r.Body)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	if err = yaml.Unmarshal(data, &profile); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	config := container.ConfigurationFrom(rh.dic.Get)
	url := fmt.Sprintf("%s://%s:%d", config.Clients[metadataSvcName].Protocol, config.Clients[metadataSvcName].Host, config.Clients[metadataSvcName].Port)
	client := client.NewDeviceProfileClient(url, jwtSecretProvider, false)

	profiles := []requests.DeviceProfileRequest{
		{
			BaseRequest: common.NewBaseRequest(),
			Profile:     profile,
		},
	}

	var resp []common.BaseWithIdResponse
	if resp, err = client.Add(context.Background(), profiles); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	result, err := json.Marshal(resp)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.Blob(http.StatusOK, common2.ContentTypeJSON, result)
}

func (rh *ResourceHandler) FindProfileAndConvertToYamlByName(c echo.Context) error {
	profileName := c.Param("name")
	jwtSecretProvider := secret.NewJWTSecretProvider(bootstrapContainer.SecretProviderExtFrom(rh.dic.Get))

	config := container.ConfigurationFrom(rh.dic.Get)
	url := fmt.Sprintf("%s://%s:%d", config.Clients[metadataSvcName].Protocol, config.Clients[metadataSvcName].Host, config.Clients[metadataSvcName].Port)
	client := client.NewDeviceProfileClient(url, jwtSecretProvider, false)
	var resp responses.DeviceProfileResponse
	var err error
	if resp, err = client.DeviceProfileByName(context.Background(), profileName); err != nil {
		return c.String(http.StatusNotFound, err.Error())
	}

	result, err := yaml.Marshal(&resp.Profile)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.Blob(http.StatusOK, common2.ContentTypeYAML, result)
}

func (rh *ResourceHandler) UpdateProfileYamlContent(c echo.Context) error {
	r := c.Request()

	defer r.Body.Close()
	var profile dtos.DeviceProfile
	jwtSecretProvider := secret.NewJWTSecretProvider(bootstrapContainer.SecretProviderExtFrom(rh.dic.Get))

	data, err := io.ReadAll(r.Body)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	if err = yaml.Unmarshal(data, &profile); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	config := container.ConfigurationFrom(rh.dic.Get)
	url := fmt.Sprintf("%s://%s:%d", config.Clients[metadataSvcName].Protocol, config.Clients[metadataSvcName].Host, config.Clients[metadataSvcName].Port)
	client := client.NewDeviceProfileClient(url, jwtSecretProvider, false)
	profiles := []requests.DeviceProfileRequest{
		{
			BaseRequest: common.NewBaseRequest(),
			Profile:     profile,
		},
	}

	var resp []common.BaseResponse
	if resp, err = client.Update(context.Background(), profiles); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	result, err := json.Marshal(resp)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}

	return c.Blob(http.StatusOK, common2.ContentTypeJSON, result)
}
