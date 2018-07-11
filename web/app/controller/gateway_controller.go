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

package controller

import (
	"net/http"
	"encoding/json"
	mux "github.com/gorilla/mux"
	"github.com/edgexfoundry-holding/edgex-ui-go/configs"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/common"
	_ "github.com/edgexfoundry-holding/edgex-ui-go/web/app/dao"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/repository"
)

func ProxyConfigGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	targetIP := m[configs.HostIPKey]
	common.DynamicalProxyCache[r.Header.Get(configs.SessionTokenKey)] = targetIP
}

func SaveGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var g domain.Gateway
	err := json.NewDecoder(r.Body).Decode(&g)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}

	//dao.GetGatewayDao().Add(g, dao.GetDBClient())
	repository.GatewayRepos.SaveOne(&g)
}

func FindAllGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	gatewayList := repository.GatewayRepos.FindAll()
	// gatewayList, err := dao.GetGatewayDao().GetAll(dao.GetDBClient())
	// if err != nil {
	// 	json.NewEncoder(w).Encode(err.Error())
	// 	return
	// }

  //json.NewEncoder(w).Encode(&gatewayList)
	result,_ := json.Marshal(&gatewayList)
	w.Header().Set(configs.ContentTypeKey, configs.JsonContentType)
	w.Write(result)
}

func DeleteGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
  vars := mux.Vars(r)
	id := vars["id"]
	ok := repository.GatewayRepos.DeleteOne(id)
	if !ok {
		http.Error(w, "", http.StatusServiceUnavailable)
		return
	}
}
