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
 *******************************************************************************/

package handler

import (
	"encoding/json"
	"fmt"
	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
	"github.com/edgexfoundry/go-mod-configuration/v2/configuration"
	"github.com/edgexfoundry/go-mod-configuration/v2/pkg/types"
	"github.com/gorilla/mux"
	"github.com/pelletier/go-toml"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

var data = make(map[string]string)

const AppServiceConfigurableFileName = "configuration.toml"
const defaultServiceKey = "app-rules-engine"

func HeartBeatAppService(w http.ResponseWriter, r *http.Request) {
	_, err := initRegistryClientByServiceKey(defaultServiceKey)
	if err != nil {
		w.Write([]byte(""))
	} else {
		w.Write([]byte("pong"))
	}
}

func ListAppServicesProfile(w http.ResponseWriter, r *http.Request) {
	configuration := make(map[string]interface{})
	client, err := initRegistryClientByServiceKey(defaultServiceKey)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	rawConfiguration, err := client.GetConfiguration(&configuration)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	actual, ok := rawConfiguration.(*map[string]interface{})
	if !ok {
		log.Printf("Configuration from Registry failed type check")
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	jsonData, err := json.Marshal(*actual)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=UTF-8")
	w.Write([]byte(jsonData))
}

func DeployConfigurableProfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serviceKey := vars["servicekey"]
	configuration := make(map[string]interface{})
	err := json.NewDecoder(r.Body).Decode(&configuration)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	client, err := initRegistryClientByServiceKey(serviceKey)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	configurationTomlTree, err := toml.TreeFromMap(configuration)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	err = client.PutConfigurationToml(configurationTomlTree, true)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	w.Write([]byte("ok"))
}

func DownloadConfigurableProfile(w http.ResponseWriter, r *http.Request) {
	configuration := make(map[string]interface{})
	vars := mux.Vars(r)
	serviceKey := vars["servicekey"]
	client, err := initRegistryClientByServiceKey(serviceKey)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	rawConfiguration, err := client.GetConfiguration(&configuration)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	actual, ok := rawConfiguration.(*map[string]interface{})
	if !ok {
		log.Printf("Configuration from Registry failed type check")
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	configurationTomlTree, err := toml.TreeFromMap(*actual)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	configurationTomlString, err := configurationTomlTree.ToTomlString()
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/x-toml;charset=UTF-8")
	w.Header().Set("Content-disposition", "attachment;filename=\""+AppServiceConfigurableFileName+"\"")
	w.Write([]byte(configurationTomlString))
}

func ReceiveDataPostJSON(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	err := r.ParseForm()
	if err != nil {
		log.Fatal("parse form error ",err)
	}
	formData := make(map[string]interface{})
	json.NewDecoder(r.Body).Decode(&formData)
	jsonData, err := json.Marshal(formData)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, "InternalServerError", http.StatusInternalServerError)
		return
	}
	formatTimeStr:=time.Unix(time.Now().Unix(),0).Format("03:04:05")
	data["time"] = formatTimeStr
	data["currentData"] = string(jsonData)
}

func ReceiveDataPostXML(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	con, _ := ioutil.ReadAll(r.Body)
	formatTimeStr:=time.Unix(time.Now().Unix(),0).Format("03:04:05")
	data["time"] = formatTimeStr
	data["currentData"] = string(con)
}

func CurrentData(w http.ResponseWriter, r *http.Request) {
	macon, _ := json.Marshal(data)
	mString := string(macon)
	io.WriteString(w, mString)
}

func initRegistryClientByServiceKey(serviceKey string) (configuration.Client, error) {
	configurationConfig := types.ServiceConfig{
		Host:       configs.RegistryConf.Host,
		Port:       configs.RegistryConf.Port,
		Type:       configs.RegistryConf.Type,
		BasePath: 	configs.RegistryConf.ConfigRegistryStem + configs.RegistryConf.ServiceVersion +"/"+ serviceKey,
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
