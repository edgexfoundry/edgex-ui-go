//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package initial

import (
	"github.com/edgexfoundry/edgex-ui-go/configs"
	"github.com/edgexfoundry/edgex-ui-go/web/app/repository/mongo"
	"github.com/edgexfoundry/edgex-ui-go/web/app/repository/mm"
)

// const (
// 	CoreDataPath     = "/core-data"
// 	CoreDataPort     = "48080"
//
// 	CoreMetadataPath = "/core-metadata"
// 	CoreMetadataPort = "48081"
//
// 	CoreCommandPath  = "/core-command"
// 	CoreCommandPort  = "48082"
//
// 	CoreExportPath   = "/core-export"
// 	CoreExportPort   = "48071"
//
// 	RuleEnginePath   = "/rule-engine"
// 	RuleEnginePort   = "48075"
//
// 	SupportLoggingPath   = "/support-logging"
// 	SupportLoggingPort   = "48061"
//
// 	SupportNotificationPath   = "/support-notification"
// 	SupportNotificationPort   = "48060"
//
// 	SupportSchedulerPath   = "/support-scheduler"
// 	SupportSchedulerPort   = "48085"
// )

var ProxyMapping map[string]string

func Initialize() {
	ProxyMapping = make(map[string]string, 10)
	ProxyMapping[configs.CoreDataPath] = configs.CoreDataPort
	ProxyMapping[configs.CoreMetadataPath] = configs.CoreMetadataPort
	ProxyMapping[configs.CoreCommandPath] = configs.CoreCommandPort
	ProxyMapping[configs.CoreExportPath] = configs.CoreExportPort

	ProxyMapping[configs.RuleEnginePath] = configs.RuleEnginePort

	ProxyMapping[configs.SupportLoggingPath] = configs.SupportLoggingPort
	ProxyMapping[configs.SupportNotificationPath] = configs.SupportNotificationPort
	ProxyMapping[configs.SupportSchedulerPath] = configs.SupportSchedulerPort

	ok := mongo.DBConnect()
	if !ok {
		mm.DBConnect()
	}
}
