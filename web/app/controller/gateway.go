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

package controller

import (
	"net/http"
	"encoding/json"
	mux "github.com/gorilla/mux"
	"github.com/edgexfoundry-holding/edgex-ui-go/configs"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/common"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/repository"
)

const (
	HostIPKey = "hostIP"
)

func ProxyConfigGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	targetIP := m[HostIPKey]
	common.DynamicalProxyCache[r.Header.Get(configs.SessionTokenKey)] = targetIP
}

func AddGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var g domain.Gateway
	err := json.NewDecoder(r.Body).Decode(&g)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	repository.GetGatewayRepos().Insert(&g)
}

func QueryAllGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	w.Header().Set(configs.ContentTypeKey, configs.JsonContentType)
	gatewayList, err := repository.GetGatewayRepos().SelectAll()
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	result, _ := json.Marshal(&gatewayList)
	w.Header().Set(configs.ContentTypeKey, configs.JsonContentType)
	w.Write(result)
}

func RemoveGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	id := vars["id"]
	err := repository.GetGatewayRepos().Delete(id)
	if err != nil {
		http.Error(w, "", http.StatusServiceUnavailable)
		return
	}
}
