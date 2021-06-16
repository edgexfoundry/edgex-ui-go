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
	"fmt"
	"log"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/domain"
	"github.com/edgexfoundry/edgex-ui-go/internal/errors"
	"github.com/edgexfoundry/edgex-ui-go/internal/repository"
)

func Login(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var cred domain.Credential
	err := json.NewDecoder(r.Body).Decode(&cred)
	if err != nil {
		http.Error(w, errors.NewErrParserJsonBody().Error(), http.StatusBadRequest)
		return
	}
	u := domain.User{Name: cred.Username, Password: cred.Password}
	u, err = repository.GetUserRepos().ExistsUser(u)

	if err != nil {
		log.Printf("User: %s login failed ", cred.Username)
		http.Error(w, fmt.Sprintf("user %s %s, login failed", cred.Username, err.Error()), http.StatusUnauthorized)
		return
	}

	token := common.GetMd5String(u.Name)
	//TODO:
	// core.TokenCache[token] = u
	log.Printf("User: %s login ", u.Name)
	w.Write([]byte(token))
}

func Logout(w http.ResponseWriter, r *http.Request) {
	//TODO:
	// token := r.Header.Get(core.SessionTokenKey)
	// delete(core.TokenCache, token)
}
