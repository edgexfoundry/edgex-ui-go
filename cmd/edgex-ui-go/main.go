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
	"log"
	"net/http"
	_ "net/http/pprof"
	"time"
	"github.com/edgexfoundry-holding/edgex-ui-go/initial"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app"
)

func main() {

	initial.Initialize()

	r := app.InitRestRoutes()

	//use for performance monitor(memory analyze,trace)
	//in browser, type: http://localhost:8080/debug/pprof
	//in shell console, type: go tool pprof -inuse_space http://127.0.0.1:8080/debug/pprof/heap
	go func() {
		http.ListenAndServe("0.0.0.0:8080", nil)
	}()

	server := &http.Server{
		Handler:      app.GeneralFilter(r),
		Addr:         ":4000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(server.ListenAndServe())
}