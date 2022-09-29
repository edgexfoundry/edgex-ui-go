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

	"github.com/edgexfoundry/edgex-ui-go/internal/container"
	"github.com/edgexfoundry/edgex-ui-go/internal/handler"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/di"
	mux "github.com/gorilla/mux"
)

func ping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("pong"))
}

func LoadRestRoutes(r *mux.Router, dic *di.Container) {
	rh := handler.NewResourceHandler(dic)
	r.HandleFunc("/api/v2/ping", ping).Methods(http.MethodGet)
	r.HandleFunc("/api/v2/auth/securemode", rh.SecureMode).Methods(http.MethodGet)

	r.HandleFunc("/api/v2/profile/yaml", rh.AddProfileYamlContent).Methods(http.MethodPost)
	r.HandleFunc("/api/v2/profile/yaml/name/{name}", rh.FindProfileAndConvertToYamlByName).Methods(http.MethodGet)
	r.HandleFunc("/api/v2/profile/yaml", rh.UpdateProfileYamlContent).Methods(http.MethodPut)

	r.HandleFunc("/api/v2/registrycenter/deploy/{servicekey}", rh.DeployConfigurable).Methods(http.MethodPost)
	r.HandleFunc("/api/v2/registrycenter/config/{servicekey}", rh.GetServiceConfig).Methods(http.MethodGet)
	r.HandleFunc("/api/v2/registrycenter/service/all", rh.GetRegisteredServiceAll).Methods(http.MethodGet)
	r.HandleFunc("/api/v2/registrycenter/ping", rh.RegistryIsAlive).Methods(http.MethodGet)

	config := container.ConfigurationFrom(dic.Get)
	app := &Application{config: config}
	r.PathPrefix("/").Handler(app)
}
