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
	"encoding/json"
	"github.com/edgexfoundry-holding/edgex-ui-go/configs"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/common"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
	"log"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	name := m[configs.UserNameKey]
	pwd := m[configs.PasswordKey]
	log.Println(name + ":" + pwd)
	if name == configs.AdminUserAndPassword && pwd == configs.AdminUserAndPassword {
		token := common.GetMd5String(name)
		common.TokenCache[token] = domain.User{Name: name, Password: pwd}
		log.Println("token: " + token)
		w.Write([]byte(token))
	}

}

func Logout(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get(configs.SessionTokenKey)
	delete(common.TokenCache, token)
}
