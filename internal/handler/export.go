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
	"log"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/component"
	"github.com/edgexfoundry/edgex-ui-go/internal/domain"
)

func ExportShow(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	token := r.Header.Get(common.SessionTokenKey)

	var addressable domain.Addressable
	err := json.NewDecoder(r.Body).Decode(&addressable)
	if _, ok := component.ExportSubscriberCache[token+addressable.Topic]; ok {
		log.Println("It exist a client, return")
		return
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}

	component.CreateMqttClient(addressable, token)
}
