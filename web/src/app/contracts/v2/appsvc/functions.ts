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


// export interface AddTags {
//     Parameters: {
//         Tags: string
//     }
// }

export interface AddTags {
    Parameters: AddTagsParameters
}

export interface AddTagsParameters {
    Tags: string
}

export interface Batch {
    Parameters: {
        Mode: string, //only can be 'bycount', 'bytime' or 'bytimecount'
        BatchThreshold: string,
        TimeInterval: string
    }
}

export interface FilterByDeviceName {
    Parameters: {
        DeviceNames: string, // Comma separated list 
        FilterOut: string //true or false
    }
}

export interface FilterByProfileName {
    // Parameters: FilterByProfileNameParameters
    Parameters: {
        ProfileNames: string, // Comma separated list 
        FilterOut: string //true or false
    }
}

export interface FilterByProfileNameParameters {
    ProfileNames: string, // Comma separated list 
    FilterOut: string //true or false
}

export interface FilterByResourceName { // replaced ValueDescriptor
    Parameters: {
        ResourceNames: string, // Comma separated list 
        FilterOut: string //true or false
    }
}

export interface FilterBySourceName {
    Parameters: {
        SourceNames: string, // Comma separated list 
        FilterOut: string //true or false
    }
}

export interface Transform {
    Parameters: {
        Type: string //Can be 'xml' or 'json'
    }
}

export interface Compress {
    Parameters: {
        Algorithm: string // 'gzip' or 'zlib'
    }
}

export interface Encrypt {
    Parameters: {
        Algorithm: string, //only aes right now
        Key?: string,
        InitVector: string,
        SecretPath?: string,
        SecretName?:string
    }
}

export interface HTTPExport {
    Parameters: {
        Method: string, 
        Url: string,
        MimeType: string, //Defaults to application/json if not set
        PersistOnError: string, //true or false, 
        ContinueOnSendError: string, //true or false, 
        ReturnInputData: string, //true or false, 
        HeaderName?: string,
        SecretPath?: string,
        SecretName?: string
    }
}

export interface MQTTExport {
    Parameters: {
        BrokerAddress: string, 
        Topic: string,
        ClientId: string,
        Qos: number, 
        AutoReconnect: string, //true or false, 
        Retain: string, //true or false, 
        SkipVerify: string, //true or false, 
        PersistOnError: string, //true or false, 
        AuthMode: string // none, usernamepassword, clientcert, cacert,
        SecretPath?: string // when AuthMode is not 'none'
    }
}

export interface JSONLogic {
    Parameters: {
        Rule: string, // "{ \"and\" : [{\"<\" : [{ \"var\" : \"temp\" }, 110 ]}, {\"==\" : [{ \"var\" : \"sensor.type\" }, \"temperature\" ]} ] }"
    }
}

export interface PushToCore {
    Parameters: {
        ProfileName: string, 
        DeviceName: string,
        ResourceName: string, // Event'sSourceName and Reading's ResourceName
        ValueType: string, 
        MediaType?: string // Required when the ValueType is Binary
    }
}

export interface SetResponseData {
    Parameters: {
        ResponseContentType?: string //such as "application/json"
    }
}