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
	"net/url"
	"strings"
)

func GeneralFilter(h http.Handler) http.Handler {
	authFilter := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("before Filter...")
		h.ServeHTTP(w, r)
		//log.Println("after Filter...")
	})
	return AuthFilter(authFilter)
}

func AuthFilter(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("before auth...")
		path := r.URL.Path

		if path == "/" {
			//ViewHandler(w,r)
			http.FileServer(http.Dir(StaticDirName)).ServeHTTP(w, r)
			return
		}

		if strings.HasSuffix(path, HtmlSuffix) ||
			strings.HasSuffix(path, CssSuffix) ||
			strings.HasSuffix(path, JsSuffix) ||
			strings.HasSuffix(path, JsonSuffix) ||
			strings.HasPrefix(path, VendorsPath) {
			//ViewHandler(w,r)
			http.FileServer(http.Dir(StaticDirName)).ServeHTTP(w, r)
			return
		}

		if path == LoginUriPath {
			h.ServeHTTP(w, r)
			return
		}

		var token string
		u := r.URL.RawQuery
		params, _ := url.ParseQuery(u)
		value, ok := params[SessionTokenKey]
		if ok {
			token = value[0]
		} else {
			token = r.Header.Get(SessionTokenKey)
		}

		_, isValid := TokenCache[token]

		if (token == "") || !(isValid) {
			if r.Header.Get(AjaxRequestHeader) != "" &&
				r.Header.Get(AjaxRequestHeader) == AjaxRequestIdentifier {
				w.WriteHeader(RedirectHttpCode)
				w.Write([]byte(NoAuthorizationMsg))
				return
			}
			http.Redirect(w, r, LoginHtmlPage, RedirectHttpCode)
			return
		}

		for prefix, _ := range ProxyMapping {
			if strings.HasPrefix(path, prefix) {
				path = strings.TrimPrefix(path, prefix)
				ProxyHandler(w, r, path, prefix)
				return
			}
		}

		h.ServeHTTP(w, r)
		//log.Println("after auth...")
	})
}
