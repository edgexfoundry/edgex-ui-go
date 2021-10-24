/*******************************************************************************
 * Copyright © 2018-2019 VMware, Inc. All Rights Reserved.
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
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
	"fmt"
	"log"
	"path/filepath"

	"github.com/pelletier/go-toml"
)

const (
	defaultConfigFilePath = "res/configuration.toml"
)

var (
	ServerConf   Service
	DBConf       Database
	ProxyMapping map[string]string
	RegistryConf RegistryConfig
)

var configs *ConfigurationStruct

type ConfigurationStruct struct {
	Server       Service               `toml:"Service"`
	DB           Database              `toml:"Database"`
	Clients      map[string]ClientInfo `toml:"Clients"`
	RegistryConf RegistryConfig        `toml:"Registry"`
	Kong         KongInfo              `toml:"Kong"`
}

type Service struct {
	Host                string
	Port                int64
	Labels              []string
	OpenMsg             string
	StaticResourcesPath string
}

type Scheme struct {
	User string
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

type ClientInfo struct {
	// Host is the hostname or IP address of a service.
	Host string
	// Port defines the port on which to access a given service
	Port int
	// Protocol indicates the protocol to use when accessing a given service
	Protocol string
	// Proxy path prefix
	PathPrefix string
}

type RegistryConfig struct {
	Host               string
	Port               int
	Type               string
	ConfigRegistryStem string
	ServiceVersion     string
}

type KongInfo struct {
	Server             string
	AdminPort          int
	AdminPortSSL       int
	ApplicationPort    int
	ApplicationPortSSL int
	StatusPort         int
}

func GetConfigs() *ConfigurationStruct {
	return configs
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
	configTree, err := toml.LoadFile(absPath)
	if err != nil {
		log.Printf("Load Config File Error:%v", err)
		return err
	}
	//Override configuration from Env
	env := NewEnvironment()
	configTree, err = env.OverrideFromEnvironment(configTree)
	if err != nil {
		log.Printf("Override from environment error%v", err)
		return err
	}
	var conf ConfigurationStruct
	if err := configTree.Unmarshal(&conf); err != nil {
		log.Printf("Decode Config File Error:%v", err)
		return err
	}
	configs = &conf
	ServerConf = configs.Server
	DBConf = configs.DB
	RegistryConf = configs.RegistryConf
	initProxyMapping(configs)
	return nil
}

func initProxyMapping(conf *ConfigurationStruct) {
	ProxyMapping = make(map[string]string, 10)
	for _, client := range conf.Clients {
		ProxyMapping[client.PathPrefix] = fmt.Sprintf("%s://%s:%d", client.Protocol, client.Host, client.Port)
	}
}
