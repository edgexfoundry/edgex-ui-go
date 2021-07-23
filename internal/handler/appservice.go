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

	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
	"github.com/edgexfoundry/go-mod-configuration/v2/configuration"
	"github.com/edgexfoundry/go-mod-configuration/v2/pkg/types"
	"github.com/gorilla/mux"
	"github.com/pelletier/go-toml"
)

func DeployConfigurable(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	serviceKey := vars["servicekey"]
	configuration := make(map[string]interface{})

	if err := json.NewDecoder(r.Body).Decode(&configuration); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	client, err := getConfigurationClient(serviceKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	configurationTomlTree, err := toml.TreeFromMap(configuration)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := client.PutConfigurationToml(configurationTomlTree, true); err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

}

func GetServiceConfig(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	serviceKey := vars["servicekey"]
	client, err := getConfigurationClient(serviceKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	hasConfig, err := client.HasConfiguration()
	if !hasConfig {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	configuration := make(map[string]interface{})

	rawConfiguration, err := client.GetConfiguration(&configuration)
	if err != nil {
		http.Error(w, fmt.Errorf("could not get configuration from Configuration: %v", err.Error()).Error(), http.StatusInternalServerError)
		return
	}

	actual, ok := rawConfiguration.(*map[string]interface{})
	if !ok {
		http.Error(w, "Configuration from Registry failed type check", http.StatusInternalServerError)
		return
	}

	result, err := json.Marshal(*actual)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=UTF-8")
	w.Write(result)
}

func getConfigurationClient(serviceKey string) (configuration.Client, error) {
	configurationConfig := types.ServiceConfig{
		Host:     configs.RegistryConf.Host,
		Port:     configs.RegistryConf.Port,
		Type:     configs.RegistryConf.Type,
		BasePath: configs.RegistryConf.ConfigRegistryStem + configs.RegistryConf.ServiceVersion + "/" + serviceKey,
	}
	client, err := configuration.NewConfigurationClient(configurationConfig)
	if err != nil {
		return nil, fmt.Errorf("Connection to Registry could not be made: %v", err)
	}
	if !client.IsAlive() {
		return nil, fmt.Errorf("Registry (%s) is not running", configurationConfig.Type)
	}
	return client, nil
}
