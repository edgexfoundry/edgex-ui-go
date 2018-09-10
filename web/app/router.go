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

package app

import (
	"net/http"
	mux "github.com/gorilla/mux"
	"github.com/edgexfoundry/edgex-ui-go/web/app/component"
	"github.com/edgexfoundry/edgex-ui-go/web/app/controller"
)

func InitRestRoutes() http.Handler {
	r := mux.NewRouter()

	s := r.PathPrefix("/api/v1").Subrouter()
	s.HandleFunc("/auth/login", controller.Login).Methods(http.MethodPost)
	s.HandleFunc("/auth/logout", controller.Logout).Methods(http.MethodGet)

	s.HandleFunc("/gateway", controller.QueryAllGateway).Methods(http.MethodGet)
	s.HandleFunc("/gateway", controller.AddGateway).Methods(http.MethodPost)
	s.HandleFunc("/gateway/{id}", controller.RemoveGateway).Methods(http.MethodDelete)
	s.HandleFunc("/gateway/proxy", controller.ProxyConfigGateway).Methods(http.MethodPost)

	s.HandleFunc("/exportshow", controller.ExportShow).Methods(http.MethodPost)

	s.HandleFunc("/profile/download", controller.DowloadProfile).Methods(http.MethodGet)

	s1 := r.PathPrefix("").Subrouter()
	s1.HandleFunc("/ws", component.WebSocketHandler)

	return r
}
