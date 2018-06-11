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

  s := r.PathPrefix("/api/v1").Subrouter()
  s.HandleFunc("/auth/login",Login).Methods("POST")
  s.HandleFunc("/auth/logout",Logout).Methods("GET")

  s.HandleFunc("/gateway",FindAllGateway).Methods("GET")
  s.HandleFunc("/gateway",SaveGateway).Methods("POST")
  s.HandleFunc("/gateway/proxy",ProxyConfigGateway).Methods("POST")

  s.HandleFunc("/exportshow",ExportShow).Methods("POST")

  s1 := r.PathPrefix("").Subrouter()
  s1.HandleFunc("/ws",WebSocketHandler)

  return r
}
