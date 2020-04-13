/*******************************************************************************
 * Copyright © 2020-2021 VMware, Inc. All Rights Reserved.
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

package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/domain"
	"github.com/edgexfoundry/edgex-ui-go/internal/errors"
	"github.com/edgexfoundry/edgex-ui-go/internal/repository"
)

func AddUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var cred domain.Credential
	err := json.NewDecoder(r.Body).Decode(&cred)
	if err != nil {
		http.Error(w, errors.NewErrParserJsonBody().Error(), http.StatusBadRequest)
		return
	}
	err = validateUser(cred)
	if err != nil {
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}
	u := domain.User{Name: cred.Username, Password: cred.Password}
	id, err := repository.GetUserRepos().Insert(u)
	if err != nil {
		http.Error(w, errors.NewErrWriteDatabase().Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(id))
}

func validateUser(cred domain.Credential) error {
	_, err := repository.GetUserRepos().SelectByName(cred.Username)
	if err == nil {
		return errors.NewErrDuplicateName(fmt.Sprintf("Duplicate user: %s", cred.Username))
	}
	return nil
}
