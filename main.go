package main

import (
  "net/http"
  "time"
  "log"
   _ "net/http/pprof"
)

func main() {

  ProxyMapping = make(map[string]string, 10)
  // ProxyMapping["/core-metadata"] = "http://10.112.122.28:48081"
  ProxyMapping["/core-data"] = "48080"
  ProxyMapping["/core-metadata"] = "48081"
  ProxyMapping["/core-command"] = "48082"
  ProxyMapping["/core-export"] = "48071"
  ProxyMapping["/rule-engine"] = "48075"

  r := initRestRoutes()

  go func() {
    http.ListenAndServe("0.0.0.0:8081", nil)
  }()

  server := &http.Server{
    Handler      : GeneralFilter(r),
    Addr         : ":4000",
    WriteTimeout : 15 * time.Second,
    ReadTimeout  : 15 * time.Second,
  }
  log.Fatal(server.ListenAndServe())
}
