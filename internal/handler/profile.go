/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 * Copyright © 2023 Intel Corporation
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
	"io/ioutil"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	client "github.com/edgexfoundry/go-mod-core-contracts/v3/clients/http"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos/common"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos/requests"
	"github.com/edgexfoundry/go-mod-core-contracts/v3/dtos/responses"
	"github.com/gorilla/mux"
	"gopkg.in/yaml.v3"
)

func (rh *ResourceHandler) AddProfileYamlContent(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var profile dtos.DeviceProfile

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err = yaml.Unmarshal(data, &profile); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	config := container.ConfigurationFrom(rh.dic.Get)
	url := fmt.Sprintf("%s://%s:%d", config.Clients[metadataSvcName].Protocol, config.Clients[metadataSvcName].Host, config.Clients[metadataSvcName].Port)
	c := client.NewDeviceProfileClient(url, newProfileAuthInjector(r), false)

	profiles := []requests.DeviceProfileRequest{
		{
			BaseRequest: common.NewBaseRequest(),
			Profile:     profile,
		},
	}

	var resp []common.BaseWithIdResponse
	if resp, err = c.Add(context.Background(), profiles); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	result, _ := json.Marshal(resp)
	w.Write(result)
}

func (rh *ResourceHandler) FindProfileAndConvertToYamlByName(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	profileName := vars["name"]

	config := container.ConfigurationFrom(rh.dic.Get)
	url := fmt.Sprintf("%s://%s:%d", config.Clients[metadataSvcName].Protocol, config.Clients[metadataSvcName].Host, config.Clients[metadataSvcName].Port)
	c := client.NewDeviceProfileClient(url, newProfileAuthInjector(r), false)
	var resp responses.DeviceProfileResponse
	var err error
	if resp, err = c.DeviceProfileByName(context.Background(), profileName); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	var out []byte
	if out, err = yaml.Marshal(&resp.Profile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(out)
}

func (rh *ResourceHandler) UpdateProfileYamlContent(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var profile dtos.DeviceProfile

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err = yaml.Unmarshal(data, &profile); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	config := container.ConfigurationFrom(rh.dic.Get)
	url := fmt.Sprintf("%s://%s:%d", config.Clients[metadataSvcName].Protocol, config.Clients[metadataSvcName].Host, config.Clients[metadataSvcName].Port)
	c := client.NewDeviceProfileClient(url, newProfileAuthInjector(r), false)
	profiles := []requests.DeviceProfileRequest{
		{
			BaseRequest: common.NewBaseRequest(),
			Profile:     profile,
		},
	}

	var resp []common.BaseResponse
	if resp, err = c.Update(context.Background(), profiles); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	result, _ := json.Marshal(resp)

	w.Write(result)
}

// This AuthenticationInjector simply injects the Auth Data from the incoming request to the out going request
type profileAuthInjector struct {
	authData string
}

func newProfileAuthInjector(request *http.Request) *profileAuthInjector {
	p := profileAuthInjector{
		authData: request.Header.Get("Authorization"),
	}

	return &p
}

func (p *profileAuthInjector) AddAuthenticationData(request *http.Request) error {
	if len(p.authData) == 0 {
		return nil
	}

	request.Header.Add("Authorization", p.authData)
	return nil
}

func (p *profileAuthInjector) RoundTripper() http.RoundTripper {
	return nil
}
