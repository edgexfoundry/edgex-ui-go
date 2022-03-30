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

package core

import (
	"net/http"
	"strings"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
)

const (
	RootURIPath        = "/"
	localAPIPathPrefix = "/api"
	staticV2Path       = "static/web"
)

var edgexSvcPathPrefixCached = []string{}

func GeneralFilter(h http.Handler) http.Handler {
	authFilter := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(w, r)
	})
	return AuthFilter(authFilter)
}

func hasSvcPrefixValidate(path string) bool {

	if strings.HasSuffix(path, common.JsSuffix) {
		return false
	}

	if len(edgexSvcPathPrefixCached) == 0 {
		for _, client := range configs.GetConfigs().Clients {
			edgexSvcPathPrefixCached = append(edgexSvcPathPrefixCached, client.PathPrefix)
		}
	}

	for _, pathPrefix := range edgexSvcPathPrefixCached {
		if strings.HasPrefix(path, pathPrefix) {
			return true
		}
	}
	return false
}

func AuthFilter(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if path == common.LoginUriPath || path == common.UserCreaterUriPath {
			h.ServeHTTP(w, r)
			return
		}

		if !strings.HasPrefix(path, localAPIPathPrefix) && !hasSvcPrefixValidate(path) {
			w.Header().Add("X-Frame-Options", "SAMEORIGIN")
			w.Header().Add("X-Content-Type-Options", "nosniff")
			w.Header().Add("X-Download-Options", "noopen")
			w.Header().Add("X-XSS-Protection", "1")
			w.Header().Add("Cache-Control", "no-cache,no-store")
			if path == RootURIPath {
				http.FileServer(http.Dir(staticV2Path+"/en-US")).ServeHTTP(w, r)
				return
			} else {
				http.FileServer(http.Dir(staticV2Path)).ServeHTTP(w, r)
				return
			}
		}

		for prefix := range configs.ProxyMapping {
			if strings.HasPrefix(path, prefix) {
				if common.IsSecurityEnabled() {
					kong(w, r)
					return
				}
				originalPath := strings.TrimPrefix(path, prefix)
				ProxyHandler(w, r, originalPath, prefix)
				return
			}
		}

		h.ServeHTTP(w, r)
	})
}
