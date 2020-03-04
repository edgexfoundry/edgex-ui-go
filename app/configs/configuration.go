/*******************************************************************************
 * Copyright © 2018-2019 VMware, Inc. All Rights Reserved.
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

package configs

import (
	"log"
	"path/filepath"

	"github.com/BurntSushi/toml"
)

const (
	defaultConfigFilePath = "res/configuration.toml"
)

var (
	ServerConf   Service
	DBConf       Database
	ProxyConf    DynamicProxy
	ProxyMapping map[string]string
	RegistryConf RegistryConfig
)

type config struct {
	Server Service      `toml:"Service"`
	DB     Database     `toml:"Database"`
	Proxy  DynamicProxy `toml:"DynamicProxy"`
	RegistryConf RegistryConfig `toml:"Registry"`
}

type Service struct {
	Host                string
	Port                int64
	Labels              []string
	OpenMsg             string
	StaticResourcesPath string
}

type Scheme struct {
	User    string
	Gateway string
}

type Database struct {
	Host     string
	Name     string
	Port     int64
	Username string
	Password string
	Timeout  int64
	Type     string
	Scheme   Scheme
}

type DynamicProxy struct {
	CoreDataPath string
	CoreDataPort string

	CoreMetadataPath string
	CoreMetadataPort string

	CoreCommandPath string
	CoreCommandPort string

	CoreExportPath string
	CoreExportPort string

	RuleEnginePath string
	RuleEnginePort string

	SupportLoggingPath string
	SupportLoggingPort string

	SupportNotificationPath string
	SupportNotificationPort string

	SupportSchedulerPath string
	SupportSchedulerPort string
}

type RegistryConfig struct{
	Host string
	Port int
	Type string
	ConfigRegistryStem string
	ServiceKey string
}

func LoadConfig(confFilePath string) error {
	if len(confFilePath) == 0 {
		confFilePath = defaultConfigFilePath
	}

	absPath, err := filepath.Abs(confFilePath)
	if err != nil {
		log.Printf("Could not create absolute path to load configuration: %s; %v", absPath, err.Error())
		return err
	}
	log.Printf("Loading configuration from: %s\n", absPath)
	var conf config
	if _, err := toml.DecodeFile(absPath, &conf); err != nil {
		log.Printf("Decode Config File Error:%v", err)
		return err
	}
	ServerConf = conf.Server
	DBConf = conf.DB
	ProxyConf = conf.Proxy
	RegistryConf = conf.RegistryConf
	initProxyMapping()
	return nil
}

func initProxyMapping() {

	ProxyMapping = make(map[string]string, 10)

	ProxyMapping[ProxyConf.CoreDataPath] = ProxyConf.CoreDataPort
	ProxyMapping[ProxyConf.CoreMetadataPath] = ProxyConf.CoreMetadataPort
	ProxyMapping[ProxyConf.CoreCommandPath] = ProxyConf.CoreCommandPort
	ProxyMapping[ProxyConf.CoreExportPath] = ProxyConf.CoreExportPort

	ProxyMapping[ProxyConf.RuleEnginePath] = ProxyConf.RuleEnginePort

	ProxyMapping[ProxyConf.SupportLoggingPath] = ProxyConf.SupportLoggingPort
	ProxyMapping[ProxyConf.SupportNotificationPath] = ProxyConf.SupportNotificationPort
	ProxyMapping[ProxyConf.SupportSchedulerPath] = ProxyConf.SupportSchedulerPort
}
