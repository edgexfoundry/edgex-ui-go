//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package initial

import "github.com/edgexfoundry-holding/edgex-ui-go/configs"

var ProxyMapping map[string]string

func Initialize() {
	ProxyMapping = make(map[string]string, 10)
	ProxyMapping[configs.CoreDataPath] = configs.CoreDataPort
	ProxyMapping[configs.CoreMetadataPath] = configs.CoreMetadataPort
	ProxyMapping[configs.CoreCommandPath] = configs.CoreCommandPort
	ProxyMapping[configs.CoreExportPath] = configs.CoreExportPort
	ProxyMapping[configs.RuleEnginePath] = configs.RuleEnginePort
}