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

export interface Address extends RESTAddress, MQTTPubAddress, EmailAddress {
    type: string, //REST, MQTT, EMAIL
    host: string, //required unless EMAIL
    port: number, //required unless EMAIL
}

interface RESTAddress {
    path: string,
    httpMethod: string //required,'GET' 'HEAD' 'POST' 'PUT' 'DELETE' 'TRACE' 'CONNECT'
}

interface MQTTPubAddress {
    publisher: string, //required
    topic: string, //required
    qos: number,
    keepAlive: number,
    retained: boolean,
    autoReconnect: boolean,
    connectTimeout: number
}

interface EmailAddress {
    recipients: string[]
}
