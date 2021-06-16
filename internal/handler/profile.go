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
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
	"github.com/gorilla/mux"

	client "github.com/edgexfoundry/go-mod-core-contracts/v2/clients/http"
	"github.com/edgexfoundry/go-mod-core-contracts/v2/dtos"
	"github.com/edgexfoundry/go-mod-core-contracts/v2/dtos/common"
	"github.com/edgexfoundry/go-mod-core-contracts/v2/dtos/requests"
	"github.com/edgexfoundry/go-mod-core-contracts/v2/dtos/responses"

	"gopkg.in/yaml.v2"
)

const (
	TemplateDirName     = "templates"
	ProfileTemplateName = "profileTemplate.yml"
)

func DowloadProfile(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	relativeTemplateFilePath := filepath.Join(configs.ServerConf.StaticResourcesPath, TemplateDirName, ProfileTemplateName)
	data, err := ioutil.ReadFile(relativeTemplateFilePath)

	if err == nil {
		contentType := "application/x-yaml;charset=UTF-8"
		w.Header().Set("Content-Type", contentType)
		w.Header().Set("Content-disposition", "attachment;filename=\""+ProfileTemplateName+"\"")
		w.Write(data)
	} else {
		w.WriteHeader(404)
		w.Write([]byte("404 download failure!"))
	}
}

func AddProfileYamlContent(w http.ResponseWriter, r *http.Request) {
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
	conf := configs.GetConfigs()
	url := fmt.Sprintf("%s://%s:%d", conf.Clients["Metadata"].Protocol, conf.Clients["Metadata"].Host, conf.Clients["Metadata"].Port)
	c := client.NewDeviceProfileClient(url)

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

func FindProfileAndConvertToYamlByName(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	profileName := vars["name"]
	conf := configs.GetConfigs()
	url := fmt.Sprintf("%s://%s:%d", conf.Clients["Metadata"].Protocol, conf.Clients["Metadata"].Host, conf.Clients["Metadata"].Port)
	c := client.NewDeviceProfileClient(url)
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

func UpdateProfileYamlContent(w http.ResponseWriter, r *http.Request) {
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
	conf := configs.GetConfigs()
	url := fmt.Sprintf("%s://%s:%d", conf.Clients["Metadata"].Protocol, conf.Clients["Metadata"].Host, conf.Clients["Metadata"].Port)
	c := client.NewDeviceProfileClient(url)

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
	// if resp[0].StatusCode != 200 {
	// 	http.Error(w, string(result), resp[0].StatusCode)
	// 	return
	// }

	w.Write(result)
}
