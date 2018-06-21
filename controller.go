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
  "net/http"
  "log"
  "crypto/md5"
  "encoding/hex"
  _ "net/url"
  "encoding/json"
)

func GetMd5String(s string) string {
    h := md5.New()
    h.Write([]byte(s))
    return hex.EncodeToString(h.Sum(nil))
}

/**
 * User authorization
 */

func Login(w http.ResponseWriter, r *http.Request)  {
  defer r.Body.Close()

  m := make(map[string]string)
  err := json.NewDecoder(r.Body).Decode(&m)
  if err != nil {
    http.Error(w, err.Error(), http.StatusServiceUnavailable)
    return
  }
  name := m[UserNameKey]
  pwd := m[PasswordKey]
  log.Println(name + ":" + pwd)
  if name == AdminUserAndPassword && pwd == AdminUserAndPassword {
    token := GetMd5String(name)
    TokenCache[token] = User{Name:name,Password:pwd}
    log.Println("token: " + token)
    w.Write([]byte(token))
  }

}

func Logout(w http.ResponseWriter, r *http.Request){
  token := r.Header.Get(SessionTokenKey)
  delete(TokenCache,token)
}

/**
 * Gateway management
 */

func ProxyConfigGateway(w http.ResponseWriter, r *http.Request){
  defer r.Body.Close()
  m := make(map[string]string)
  err := json.NewDecoder(r.Body).Decode(&m)
  if err != nil {
    http.Error(w, err.Error(), http.StatusServiceUnavailable)
    return
  }
  targetIP := m[HostIPKey]
  DynamicalProxyCache[r.Header.Get(SessionTokenKey)] = targetIP
}

func SaveGateway(w http.ResponseWriter, r *http.Request) {
  defer r.Body.Close()
  var g Gateway
  err := json.NewDecoder(r.Body).Decode(&g)
  if err != nil {
    http.Error(w, err.Error(), http.StatusServiceUnavailable)
    return
  }
  GatewayInfoCache = append(GatewayInfoCache,g)
}
func FindAllGateway(w http.ResponseWriter, r *http.Request) {
  defer r.Body.Close()
  w.Header().Set(ContentTypeKey, JsonContentType)
  json.NewEncoder(w).Encode(&GatewayInfoCache)
}
func DeleteGateway(w http.ResponseWriter, r *http.Request) {

}

/**
 * Export show
 */
func ExportShow(w http.ResponseWriter, r *http.Request){
  defer r.Body.Close()
  token := r.Header.Get(SessionTokenKey)

  var addressable Addressable
  err := json.NewDecoder(r.Body).Decode(&addressable)
  if _,ok := ExportSubscriberCache[token + addressable.Topic]; ok {
    log.Println("It exist a client, return")
    return
  }

  if err != nil {
    http.Error(w, err.Error(), http.StatusServiceUnavailable)
    return
  }

  CreateMqttClient(addressable,token)
}
