/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 * Copyright (C) 2023 Intel Corporation
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

package config

import (
	bootstrapConfig "github.com/edgexfoundry/go-mod-bootstrap/v3/config"
)

type ServiceOptions struct {
	// ProxyMode configures how requests are sent to backend
	// "automatic" sets this based on EDGE_SECURITY_SECRET_STORE (false = direct, else api-gateway)
	// "api-gateway" routes backend requests through the API gateway
	// "direct" routes backend requests directly to the microservice
	ProxyMode string
}

type APIGatewayInfo struct {
	Server             string
	ApplicationPort    int
	ApplicationPortSSL int
}

type RegistryInfo struct {
	bootstrapConfig.RegistryInfo
	ConfigRegistryStem string
	ServiceVersion     string
}

type ConfigurationStruct struct {
	Writable       WritableInfo
	Service        bootstrapConfig.ServiceInfo
	ServiceOptions ServiceOptions
	Clients        map[string]bootstrapConfig.ClientInfo
	Registry       RegistryInfo
	APIGateway     APIGatewayInfo
}

type WritableInfo struct {
	LogLevel        string
	InsecureSecrets bootstrapConfig.InsecureSecrets
}

func (c *ConfigurationStruct) UpdateFromRaw(_ interface{}) bool {
	return false
}

func (c *ConfigurationStruct) UpdateWritableFromRaw(_ interface{}) bool {
	return false
}

func (c *ConfigurationStruct) EmptyWritablePtr() interface{} {
	return &WritableInfo{}
}

func (c *ConfigurationStruct) GetWritablePtr() any {
	return &c.Writable
}

// GetBootstrap returns the configuration elements required by the bootstrap.
func (c *ConfigurationStruct) GetBootstrap() bootstrapConfig.BootstrapConfiguration {
	return bootstrapConfig.BootstrapConfiguration{
		Service: &c.Service,
	}
}

// GetLogLevel returns the current ConfigurationStruct's log level.
func (c *ConfigurationStruct) GetLogLevel() string {
	return c.Writable.LogLevel
}

// GetRegistryInfo gets the config.RegistryInfo field from the ConfigurationStruct.
func (c *ConfigurationStruct) GetRegistryInfo() bootstrapConfig.RegistryInfo {
	return bootstrapConfig.RegistryInfo{}
}

// GetInsecureSecrets gets the config.InsecureSecrets field from the ConfigurationStruct.
func (c *ConfigurationStruct) GetInsecureSecrets() bootstrapConfig.InsecureSecrets {
	return bootstrapConfig.InsecureSecrets{}
}

// GetTelemetryInfo gets the config.Telemetry section from the ConfigurationStruct
func (c *ConfigurationStruct) GetTelemetryInfo() *bootstrapConfig.TelemetryInfo {
	return &bootstrapConfig.TelemetryInfo{}
}
