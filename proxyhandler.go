package main

import (
  "net/http"
  "net/url"
  "net/http/httputil"
)

//[prefix,targetAddr]
var ProxyMapping map[string]string

//ProxyHandler
func ProxyHandler(w http.ResponseWriter, r *http.Request,path string, prefix string){
  defer r.Body.Close()
  token := r.Header.Get("X-Session-Token")
  targetIP := DynamicalProxyCache[token]
  targetAddr := "http://" + targetIP
  if prefix == "/core-data" {
    targetAddr += ":48080"
  }
  if prefix == "/core-metadata" {
    targetAddr += ":48081"
  }
  if prefix == "/core-command" {
    targetAddr += ":48082"
  }
  if prefix == "/core-export" {
    targetAddr += ":48071"
  }
  if prefix == "/rule-engine" {
    targetAddr += ":48075"
  }

  origin, _ := url.Parse(targetAddr)

  director := func(req *http.Request) {
    req.Header.Add("X-Forwarded-Host", req.Host)
    req.Header.Add("X-Origin-Host", origin.Host)
    req.URL.Scheme = "http"
    req.URL.Host = origin.Host
    req.URL.Path = path
  }

  proxy := &httputil.ReverseProxy{Director: director}
  proxy.ServeHTTP(w, r)
}
