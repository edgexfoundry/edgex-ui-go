/*******************************************************************************
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

export interface Trigger {
    Type: string, //edgex-messagebus, external-mqtt, http, custom
    EdgexMessageBus?: Trigger_EdgexMessageBus,
    ExternalMqtt?: Trigger_ExternalMqtt,
    HTTP?: Trigger_HTTP
}

export interface Trigger_EdgexMessageBus {
    Type: string, //message bus type (i.e 'redis`, `mqtt` or `zero` for ZeroMQ)
    SubscribeHost: EdgexMessageBusSubscribeHost,
    PublishHost: EdgexMessageBusPublishHost,
    Optional: EdgexMessageBusOptional
} 

export interface EdgexMessageBusSubscribeHost {
    Host: string,
    Port: string,
    Protocol: string,
    SubscribeTopics: string
}

export interface EdgexMessageBusPublishHost {
    Host: string,
    Port: string,
    Protocol: string,
    PublishTopic: string
}

export interface EdgexMessageBusOptional { 
    ClientId: string,
    Qos: string,
    KeepAlive: string, 
    Retained: string, //'false', 'true'
    AutoReconnect: string, //'false', 'true'
    ConnectTimeout: string,
    SkipCertVerify: string, //'false', 'true'
    authmode: string, //'usernamepassword', 'clientcert', or 'cacert'
    secretname: string,
}

export interface Trigger_ExternalMqtt {
    Url: string, // tcp://localhost:1883
    SubscribeTopics: string,
    PublishTopic: string, //optional if publishing response back to the the External MQTT Broker
    ClientId: string,
    ConnectTimeout: string,
    AutoReconnect: string, //'false', 'true'
    KeepAlive: string,
    QoS: string,
    Retain: string, //'false', 'true'
    SkipCertVerify: string, //'false', 'true'
    SecretPath: string,
    AuthMode: string  // "none", "cacert" , "usernamepassword", "clientcert"
} 

export interface Trigger_HTTP {
    
} 
