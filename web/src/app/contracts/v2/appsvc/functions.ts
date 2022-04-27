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

export interface Functions {
    AddTags?: AddTags,
    Batch?: Batch,
    FilterByDeviceName?: FilterByDeviceName,
    FilterByProfileName?: FilterByProfileName,
    FilterByResourceName?: FilterByResourceName,
    FilterBySourceName?: FilterBySourceName,
    Transform?: Transform
    Compress?: Compress,
    Encrypt?: Encrypt,
    HTTPExport?: HTTPExport,
    MQTTExport?: MQTTExport
    JSONLogic?: JSONLogic,
    PushToCore?: PushToCore,
    SetResponseData?: SetResponseData,
}

export interface AddTags {
    Parameters: AddTagsParameters
}

export interface AddTagsParameters {
    Tags: string
}

export interface Batch {
    Parameters: BatchParameters
}

export interface BatchParameters {
    Mode: string, //only can be 'bycount', 'bytime' or 'bytimecount'
    BatchThreshold: string,
    TimeInterval: string,
    IsEventData: string // 'true' or 'false'
}

export interface FilterByDeviceName {
    Parameters: FilterByDeviceNameParameters
}

export interface FilterByDeviceNameParameters {
    DeviceNames: string, // Comma separated list 
    FilterOut: string //true or false
}

export interface FilterByProfileName {
    Parameters: FilterByProfileNameParameters
}

export interface FilterByProfileNameParameters {
    ProfileNames: string, // Comma separated list 
    FilterOut: string //true or false
}

export interface FilterByResourceName {
    Parameters: FilterByResourceNameParameters
}

export interface FilterByResourceNameParameters {
    ResourceNames: string, // Comma separated list 
    FilterOut: string //true or false
}

export interface FilterBySourceName {
    Parameters: FilterBySourceNameParameters
}

export interface FilterBySourceNameParameters {
    SourceNames: string, // Comma separated list 
    FilterOut: string //true or false
}

export interface Transform {
    Parameters: TransformParameters
}

export interface TransformParameters {
    Type: string //Can be 'xml' or 'json'
}

export interface Compress {
    Parameters: CompressParameters
}

export interface CompressParameters {
    Algorithm: string // 'gzip' or 'zlib'
}

export interface Encrypt {
    Parameters: EncryptParameters
}

export interface EncryptParameters {
    Algorithm: string, //AES (deprecated) or AES256
    Key?: string, //optional, deprecated
    InitVector: string,  //  deprecated
    SecretPath?: string,
    SecretName?:string
}

export interface HTTPExport {
    Parameters: HTTPExportParameters
}

export interface HTTPExportParameters {
    Method: string, //HTTP Method to use. Can be post or put
    Url: string,
    MimeType: string, //Defaults to application/json if not set
    PersistOnError: string, //true or false, Indicates to persist the data if the POST fails. Store and Forward must also be enabled if this is set to "true".
    ContinueOnSendError: string, //true or false, For chained multi destination exports, if true continues after send error so next export function executes.
    ReturnInputData: string, //true or false, For chained multi destination exports if true, passes the input data to next export function.
    HeaderName?: string,
    SecretPath?: string,
    SecretName?: string
}

export interface MQTTExport {
    Parameters: MQTTExportParameters
}

export interface MQTTExportParameters {
    BrokerAddress: string, 
    Topic: string,
    ClientId: string,
    Qos: string, // 0,1,2
    AutoReconnect: string, //true or false, 
    Retain: string, //true or false, 
    SkipVerify: string, //true or false, 
    PersistOnError: string, //true or false, 
    AuthMode: string // none, usernamepassword, clientcert, cacert,
    SecretPath?: string // when AuthMode is not 'none'
}

export interface JSONLogic {
    Parameters: JSONLogicParameters
}

export interface JSONLogicParameters {
    Rule: string, // "{ \"and\" : [{\"<\" : [{ \"var\" : \"temp\" }, 110 ]}, {\"==\" : [{ \"var\" : \"sensor.type\" }, \"temperature\" ]} ] }"
}

export interface PushToCore {
    Parameters: PushToCoreParameters
}

export interface PushToCoreParameters  {
    ProfileName: string, 
    DeviceName: string,
    ResourceName: string, // Event's SourceName and Reading's ResourceName
    ValueType: string, 
    MediaType?: string // Required when the ValueType is Binary
}

export interface SetResponseData {
    Parameters: SetResponseDataParameters
}

export interface SetResponseDataParameters {
    ResponseContentType?: string //such as "application/json"
}