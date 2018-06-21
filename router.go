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
 * @version: 0.1.0
 *******************************************************************************/

package main

import (
  mux "github.com/gorilla/mux"
  "net/http"
)

func initRestRoutes() http.Handler {
  r := mux.NewRouter()

  s := r.PathPrefix(ApiVersionPath).Subrouter()
  s.HandleFunc(AuthLoginPath,Login).Methods(http.MethodPost)
  s.HandleFunc(AuthLogoutPath,Logout).Methods(http.MethodGet)

  s.HandleFunc(GatewayPath,FindAllGateway).Methods(http.MethodGet)
  s.HandleFunc(GatewayPath,SaveGateway).Methods(http.MethodPost)
  s.HandleFunc(GatewayPathProxyPath,ProxyConfigGateway).Methods(http.MethodPost)

  s.HandleFunc(ExportShowPath,ExportShow).Methods(http.MethodPost)

  s1 := r.PathPrefix("").Subrouter()
  s1.HandleFunc(WsPath,WebSocketHandler)

  return r
}
