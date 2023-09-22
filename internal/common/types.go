/*******************************************************************************
 * Copyright © 2020-2021 VMware, Inc. All Rights Reserved.
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
	"os"

	"github.com/edgexfoundry/edgex-ui-go/internal/config"
)

const (
	ContentTypeKey   = "Content-Type"
	JsonContentType  = "application/json"
	RedirectHttpCode = 302
	SessionTokenKey  = "X-Session-Token"

	AjaxRequestIdentifier = "XMLHttpRequest"
	AjaxRequestHeader     = "X-Requested-With"

	HtmlSuffix          = ".html"
	CssSuffix           = ".css"
	JsSuffix            = ".js"
	JsMapSuffix         = ".js.map"
	JsonSuffix          = ".json"
	VendorsPath         = "/vendors"
	DataPathPrefix      = "/data"
	LoginUriPath        = "/api/v1/auth/login"
	UserCreaterUriPath  = "/api/v1/user"
	LoginHtmlPage       = "/login.html"
	UserCreaterHtmlPage = "/usercreater.html"

	NoAuthorizationMsg = "no authorization."

	EnvSecretStore = "EDGEX_SECURITY_SECRET_STORE"

	ProxyModeAutomatic  = "automatic"
	ProxyModeDirect     = "direct"
	ProxyModeAPIGateway = "api-gateway"
)

func IsSecurityEnabled() bool {
	env := os.Getenv(EnvSecretStore)
	return env != "false"
}

func ShouldProxyViaAPIGateway(config config.ConfigurationStruct) bool {
	var proxyMode = config.ServiceOptions.ProxyMode

	switch proxyMode {
	case ProxyModeDirect:
		return false
	case ProxyModeAPIGateway:
		return true
	default:
		return IsSecurityEnabled() // direct when security is off
	}
}
