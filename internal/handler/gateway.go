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
	"encoding/json"
	"net/http"
	"time"

	"regexp"

	"github.com/edgexfoundry/edgex-ui-go/internal/core"
	"github.com/edgexfoundry/edgex-ui-go/internal/domain"
	"github.com/edgexfoundry/edgex-ui-go/internal/errors"
	"github.com/edgexfoundry/edgex-ui-go/internal/repository"
	mux "github.com/gorilla/mux"
)

const (
	HostIPKey          = "hostIP"
	GatewayIPV4Pattern = `^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`
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
	core.DynamicProxyCache[r.Header.Get(core.SessionTokenKey)] = targetIP
}

func AddGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var g domain.Gateway
	err := json.NewDecoder(r.Body).Decode(&g)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	err = checkAddGatewayParams(g)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	gatewayId, err := repository.GetGatewayRepos().Insert(&g)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}

	w.Write([]byte(gatewayId))
}

func HeartBeatGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	vars := mux.Vars(r)
	id := vars["id"]
	g, err := repository.GetGatewayRepos().Select(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	client := http.Client{
		Timeout: time.Duration(2 * time.Second),
	}
	url := "http://" + g.Address + ":48081/api/v1/ping"
	_, err = client.Get(url)
	if err != nil {
		w.Write([]byte("0"))
	} else {
		w.Write([]byte("1"))
	}
}

func checkAddGatewayParams(gateway domain.Gateway) error {
	if len(gateway.Name) == 0 {
		return errors.NewErrGatewayNameEmpty()
	}
	addressMatch, err := regexp.MatchString(GatewayIPV4Pattern, gateway.Address)
	if err != nil || !addressMatch {
		return errors.NewErrGatewayAddressInvalid(gateway.Address)
	}
	return nil
}

func QueryAllGateway(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	w.Header().Set(core.ContentTypeKey, core.JsonContentType)
	gatewayList, err := repository.GetGatewayRepos().SelectAll()
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	result, _ := json.Marshal(&gatewayList)
	w.Header().Set(core.ContentTypeKey, core.JsonContentType)
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
