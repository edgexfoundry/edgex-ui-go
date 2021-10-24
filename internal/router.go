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

package internal

import (
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/handler"
	mux "github.com/gorilla/mux"
)

func InitRestRoutes() http.Handler {
	r := mux.NewRouter()

	s := r.PathPrefix("/api/v2").Subrouter()
	s.HandleFunc("/ping", ping).Methods(http.MethodGet)
	s.HandleFunc("/user", handler.AddUser).Methods(http.MethodPost)
	s.HandleFunc("/auth/login", handler.Login).Methods(http.MethodPost)
	s.HandleFunc("/auth/logout", handler.Logout).Methods(http.MethodGet)
	s.HandleFunc("/auth/securemode", handler.SecureMode).Methods(http.MethodGet)

	s.HandleFunc("/profile/download", handler.DowloadProfile).Methods(http.MethodGet)
	s.HandleFunc("/profile/yaml", handler.AddProfileYamlContent).Methods(http.MethodPost)
	s.HandleFunc("/profile/yaml/name/{name}", handler.FindProfileAndConvertToYamlByName).Methods(http.MethodGet)
	s.HandleFunc("/profile/yaml", handler.UpdateProfileYamlContent).Methods(http.MethodPut)

	s.HandleFunc("/appsvc/deploy/servicekey/{servicekey}", handler.DeployConfigurable).Methods(http.MethodPost)
	s.HandleFunc("/appsvc/config/servicekey/{servicekey}", handler.GetServiceConfig).Methods(http.MethodGet)

	s.HandleFunc("/registercenter/service/all", handler.GetRegisteredServiceAll).Methods(http.MethodGet)

	return r
}

func ping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("pong"))
}
