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
 *******************************************************************************/

package configs

import (
	"log"
	"path/filepath"
	"github.com/pelletier/go-toml"
	"fmt"
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

type ConfigurationStruct struct {
	Server       Service        `toml:"Service"`
	DB           Database       `toml:"Database"`
	Clients      map[string]ClientInfo   `toml:"Clients"`
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
	if err != nil{
		log.Printf("Load Config File Error:%v", err)
		return err
	}
	//Override configuration from Env
	env := NewEnvironment()
	configTree,err = env.OverrideFromEnvironment(configTree)
	if err != nil {
		log.Printf("Override from environment error%v", err)
		return err
	}
	var conf ConfigurationStruct
	if err := configTree.Unmarshal(&conf); err != nil {
		log.Printf("Decode Config File Error:%v", err)
		return err
	}
	ServerConf = conf.Server
	DBConf = conf.DB
	RegistryConf = conf.RegistryConf
	initProxyMapping(conf)
	return nil
}

func initProxyMapping(conf ConfigurationStruct) {
	ProxyMapping = make(map[string]string, 10)
	for _, client := range conf.Clients {
		ProxyMapping[client.PathPrefix] = fmt.Sprintf("%s://%s:%d", client.Protocol, client.Host, client.Port)
	}
}
