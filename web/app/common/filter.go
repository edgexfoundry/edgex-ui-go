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

package common

import (
	"github.com/edgexfoundry-holding/edgex-ui-go/configs"
	"github.com/edgexfoundry-holding/edgex-ui-go/initial"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
	"log"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"
)

//{Token:User}
var TokenCache = make(map[string]domain.User, 20)

const (
	RelativePathToProjectRoot = "../../"
	HtmlSuffix                = ".html"
	CssSuffix                 = ".css"
	JsSuffix                  = ".js"
	JsonSuffix                = ".json"
	VendorsPath               = "/vendors"
	DataPathPrefix            = "/data"
	StaticDirName             = "static"
	LoginUriPath              = "/api/v1/auth/login"
	LoginHtmlPage             = "/login.html"
	NoAuthorizationMsg        = "no authorization."
	AjaxRequestIdentifier     = "XMLHttpRequest"
	AjaxRequestHeader         = "X-Requested-With"
)

func GeneralFilter(h http.Handler) http.Handler {
	authFilter := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(w, r)
	})
	return AuthFilter(authFilter)
}

func AuthFilter(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		relativeStaticDirPath := filepath.Join(RelativePathToProjectRoot, configs.WebDirName, StaticDirName)

		if path == "/" {
			http.FileServer(http.Dir(relativeStaticDirPath)).ServeHTTP(w, r)
			return
		}

		if strings.HasSuffix(path, HtmlSuffix) ||
			strings.HasSuffix(path, CssSuffix) ||
			strings.HasSuffix(path, JsSuffix) ||
			strings.HasSuffix(path, JsonSuffix) ||
			strings.HasPrefix(path, VendorsPath) ||
			strings.HasPrefix(path, DataPathPrefix) {
			http.FileServer(http.Dir(relativeStaticDirPath)).ServeHTTP(w, r)
			return
		}

		if path == LoginUriPath {
			h.ServeHTTP(w, r)
			return
		}

		var token string
		u := r.URL.RawQuery
		params, _ := url.ParseQuery(u)
		value, ok := params[configs.SessionTokenKey]
		if ok {
			token = value[0]
		} else {
			token = r.Header.Get(configs.SessionTokenKey)
		}

		_, isValid := TokenCache[token]

		if (token == "") || !(isValid) {
			if r.Header.Get(AjaxRequestHeader) != "" &&
				r.Header.Get(AjaxRequestHeader) == AjaxRequestIdentifier {
				w.WriteHeader(configs.RedirectHttpCode)
				w.Write([]byte(NoAuthorizationMsg))
				return
			}
			http.Redirect(w, r, LoginHtmlPage, configs.RedirectHttpCode)
			return
		}

		for prefix, _ := range initial.ProxyMapping {
			if strings.HasPrefix(path, prefix) {
				path = strings.TrimPrefix(path, prefix)
				ProxyHandler(w, r, path, prefix, token)
				return
			}
		}

		h.ServeHTTP(w, r)
	})
}
