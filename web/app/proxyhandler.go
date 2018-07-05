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

package app

import (
	"github.com/edgexfoundry-holding/edgex-ui-go/configs"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func ProxyHandler(w http.ResponseWriter, r *http.Request, path string, prefix string,token string) {
	defer r.Body.Close()
	//token := r.Header.Get(configs.SessionTokenKey)
	targetIP := DynamicalProxyCache[token]
	targetAddr := configs.HttpProtocol + "://" + targetIP
	if prefix == configs.CoreDataPath {
		targetAddr += ":" + configs.CoreDataPort
	}

	if prefix == configs.CoreMetadataPath {
		targetAddr += ":" + configs.CoreMetadataPort
	}
	if prefix == configs.CoreCommandPath {
		targetAddr += ":" + configs.CoreCommandPort
	}
	if prefix == configs.CoreExportPath {
		targetAddr += ":" + configs.CoreExportPort
	}
	if prefix == configs.RuleEnginePath {
		targetAddr += ":" + configs.RuleEnginePort
	}

	origin, _ := url.Parse(targetAddr)

	director := func(req *http.Request) {
		req.Header.Add(configs.ForwardedHostReqHeader, req.Host)
		req.Header.Add(configs.OriginHostReqHeader, origin.Host)
		req.URL.Scheme = configs.HttpProtocol
		req.URL.Host = origin.Host
		req.URL.Path = path
	}

	proxy := &httputil.ReverseProxy{Director: director}
	proxy.ServeHTTP(w, r)
}
