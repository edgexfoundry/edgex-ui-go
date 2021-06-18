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

import { Versionable } from "./common/versionable";

export interface BaseReading extends Versionable, SimpleReading, BinaryReading {
    id: string,
    origin: number,
    deviceName: string,
    resourceName: string,
    profileName: string,
    valueType: string
}

export interface SimpleReading {
    value: string
} 

export interface  BinaryReading {
    binaryValue: any,
    mediaType: string
}