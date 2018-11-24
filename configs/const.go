//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package configs

const (
	ReadBufferSize   = 1024
	WriteBufferSize  = 1024
	SessionTokenKey  = "X-Session-Token"
	HttpProtocol     = "http"
	CoreDataPath     = "/core-data"
	CoreDataPort     = "48080"
	CoreMetadataPath = "/core-metadata"
	CoreMetadataPort = "48081"
	CoreCommandPath  = "/core-command"
	CoreCommandPort  = "48082"
	CoreExportPath   = "/core-export"
	CoreExportPort   = "48071"
	RuleEnginePath   = "/rule-engine"
	RuleEnginePort   = "48075"
	
	SupportLoggingPath   = "/support-logging"
	SupportLoggingPort   = "48061"

	SupportNotificationPath   = "/support-notification"
	SupportNotificationPort   = "48060"

	SupportSchedulerPath   = "/support-scheduler"
	SupportSchedulerPort   = "48085"

	WebDirName       = "web"
	ContentTypeKey   = "Content-Type"
	JsonContentType  = "application/json"
	RedirectHttpCode = 302
)
