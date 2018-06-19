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

  //use for performance monitor(memory analyze,trace)
  //in browser, type: http://localhost:8080/debug/pprof
  //in shell console, type: go tool pprof -inuse_space http://127.0.0.1:8080/debug/pprof/heap
  go func() {
    http.ListenAndServe("0.0.0.0:8080", nil)
  }()

  server := &http.Server{
    Handler      : GeneralFilter(r),
    Addr         : ":4000",
    WriteTimeout : 15 * time.Second,
    ReadTimeout  : 15 * time.Second,
  }
  log.Fatal(server.ListenAndServe())
}
