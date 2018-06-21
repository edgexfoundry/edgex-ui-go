//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package main

const (
	ReadBufferSize         = 1024
	WriteBufferSize        = 1024
	SessionTokenKey        = "X-Session-Token"
	ApiVersionPath         = "/api/v1"
	AuthLoginPath          = "/auth/login"
	AuthLogoutPath         = "/auth/logout"
	GatewayPath            = "/gateway"
	GatewayPathProxyPath   = "/gateway/proxy"
	ExportShowPath         = "/exportshow"
	WsPath                 = "/ws"
	HttpProtocol           = "http"
	CoreDataPath           = "/core-data"
	CoreDataPort           = "48080"
	CoreMetadataPath       = "/core-metadata"
	CoreMetadataPort       = "48081"
	CoreCommandPath        = "/core-command"
	CoreCommandPort        = "48082"
	CoreExportPath         = "/core-export"
	CoreExportPort         = "48071"
	RuleEnginePath         = "/rule-engine"
	RuleEnginePort         = "48075"
	forwardedHostReqHeader = "X-Forwarded-Host"
	OriginHostReqHeader    = "X-Origin-Host"
	ClientIDPrefix         = "edgex-go-"
	StaticDirName          = "static"
	HtmlSuffix             = ".html"
	CssSuffix              = ".css"
	JsSuffix               = ".js"
	JsonSuffix             = ".json"
	VendorsPath            = "/vendors"
	LoginUriPath           = "/api/v1/auth/login"
	LoginHtmlPage          = "/login.html"
	NoAuthorizationMsg     = "no authorization."
	AjaxRequestIdentifier  = "XMLHttpRequest"
	AjaxRequestHeader      = "X-Requested-With"
	UserNameKey            = "name"
	PasswordKey            = "password"
	AdminUserAndPassword   = "admin"
	HostIPKey              = "hostIP"
	ContentTypeKey         = "Content-Type"
	JsonContentType        = "application/json"
	RedirectHttpCode       = 302
)
