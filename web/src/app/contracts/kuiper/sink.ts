/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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

import { SinkBaseProperties } from './sink-base-properties';

export interface Sink {
    uuid?: string, // kuiper's sink model doesn't have a uuid,here designed by EdgeXGUI, used as an assistant for array operation.
    edgex: EdgeXSink,
    rest: RESTSink,
    mqtt: MQTTSink,
    log: LogSink,
    nop: NopSink,
}

export interface EdgeXSink extends SinkBaseProperties {
    type: string, // one of 'zero', 'mqtt', 'redis', default 'redis';
    protocol: string, //The protocol. If it's not specified, then use default value redis.
    host: string, //The host of message bus. If not specified, then use default value localhost.
    port: number, //The port of message bus. If not specified, then use default value 6379.
    
    topic: string,
    topicPrefix: string, //The prefix of a dynamic topic to be published. The topic will become a concatenation of $topicPrefix/$profileName/$deviceName/$sourceName.
    contentType: string, // default: application/json
    messageType: string,  // one of 'event','request', default 'event'
    metadata: string, //the property is a field name that allows user to specify a field name of SQL select clause, the field name should use meta(*) AS xxx to select all of EdgeX metadata from message.
    profileName: string, //Allows user to specify the profile name in the event structure that are sent from eKuiper. The profileName in the meta take precedence if specified.
    deviceName: string, //Allows user to specify the device name in the event structure that are sent from eKuiper. The deviceName in the meta take precedence if specified.
    sourceName: string, //Allows user to specify the device name in the event structure that are sent from eKuiper. The deviceName in the meta take precedence if specified.
    
    optional: EdgeXSinkOptions, // If mqtt message bus type is specified, then some optional values can be specified. Please refer to below for supported optional supported configurations.

    connectionSelector: string
}

export interface EdgeXSinkOptions {
    ClientId?: string,
    Username?: string,
    Password?: string,
    Qos?: string,  // Seconds
    KeepAlive?: string,
    Retained?: string,
    ConnectTimeout: string,   // Seconds
    AutoReconnect: string,
    CleanSession:   string // MQTT Default is true if never set

    SkipCertVerify?: string
    CertFile?: string,
    KeyFile?: string,
    CertPEMBlock?: string,
    KeyPEMBlock?: string,
}

export interface RESTSink extends SinkBaseProperties {
    method: string,
    url: string,
    bodyType: string, //The type of the body. Currently, these types are supported: "none", "json", "text", "html", "xml", "javascript" and "form". For "get" and "head", no body is required so the default value is "none". For other http methods, the default value is "json" For "html", "xml" and "javascript", the dataTemplate must be carefully set up to make sure the format is correct.
    timeout: number, //the timeout (milliseconds) for a HTTP request, defaults to 5000 ms
    headers: {}, //{k:v}
    debugResp: boolean, //Control if print the response information into the console. If set it to true, then print response; If set to false, then skip print log. The default is false.

    certificationPath: string,
    privateKeyPath: string,
    rootCaPath: string,
    insecureSkipVerify: boolean //f it is set to true, then skip certification verification; Otherwise, verify the certification. The default value is true.
}

export interface MQTTSink extends SinkBaseProperties {
    server: string,
    topic: string,
    clientId: string,
    protocolVersion: string,
    username: string,
    password: string,
    qos: number,
    retained: boolean,
    
    certificationPath: string,
    privateKeyPath: string,
    rootCaPath: string,
    insecureSkipVerify: boolean,

    connectionSelector: string,
}

export interface LogSink extends SinkBaseProperties {
    //No properties can be specified for the action.
}

export interface NopSink extends SinkBaseProperties {
    log: boolean //true/false - print the sink result to log or not. By default is false, that will not print the result to log file.
}
