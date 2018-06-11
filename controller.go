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

/************************************************************
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
  name := m["name"]
  pwd := m["password"]
  log.Println(name + ":" + pwd)
  if name == "admin" && pwd == "admin" {
    token := GetMd5String(name)
    TokenCache[token] = User{Name:name,Password:pwd}
    log.Println("token: " + token)
    w.Write([]byte(token))
  }

}

func Logout(w http.ResponseWriter, r *http.Request){
  token := r.Header.Get("X-Session-Token")
  delete(TokenCache,token)
}

/**************************************************************
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
  targetIP := m["hostIP"]
  DynamicalProxyCache[r.Header.Get("X-Session-Token")] = targetIP
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
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(&GatewayInfoCache)
}
func DeleteGateway(w http.ResponseWriter, r *http.Request) {

}

/***************************************************************
* Export show
*/
func ExportShow(w http.ResponseWriter, r *http.Request){
  defer r.Body.Close()
  token := r.Header.Get("X-Session-Token")

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
