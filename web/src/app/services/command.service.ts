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

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

import { DeviceCoreCommandResponse, MultiDeviceCoreCommandsResponse } from '../contracts/v2/responses/device-core-command-response';
import { EventResponse } from '../contracts/v2/responses/event-response';
import { BaseResponse } from '../contracts/v2/common/base-response';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  endpoint: string = "/core-command";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  configUrl: string = "/config";

  deviceCoreCommandListUrl: string = `${this.urlPrefix}/device/all`;
  commandsByDeviceIdUrl: string = `${this.urlPrefix}/device/`; //deprecated
  commandsByDeviceNameUrl: string = `${this.urlPrefix}/device/name/`; //deprecated
  issueCmdByDeviceNameAndCmdNameUrl: string = `${this.urlPrefix}/device/name/`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  getConfig(): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.commandsByDeviceIdUrl}${deviceId}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allDeviceCoreCommandsPagination(offset: number, limit: number): Observable<MultiDeviceCoreCommandsResponse> {
    let url = `${this.deviceCoreCommandListUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiDeviceCoreCommandsResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDeviceAssociatedCommnadsByDeviceName(name: string): Observable<DeviceCoreCommandResponse> {
    let url = `${this.commandsByDeviceNameUrl}${name}`;
    return this.http.get<DeviceCoreCommandResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findAllDeviceCommnads(): Observable<any> {
    let url = `${this.urlPrefix}/device`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  issueGetBinaryCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('GET', url, {
      responseType: 'arraybuffer'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  issueGetCmd(deviceName: string, commandName: string): Observable<EventResponse> {
    let url = `${this.issueCmdByDeviceNameAndCmdNameUrl}${deviceName}/${commandName}?ds-pushevent=yes&ds-returnevent=yes`;
    return this.http.get<EventResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  issueSetCmd(deviceName: string, commandName: string, params?: any): Observable<BaseResponse> {
    let url = `${this.issueCmdByDeviceNameAndCmdNameUrl}${deviceName}/${commandName}`;
    return this.http.put<BaseResponse>(url, JSON.stringify(params),this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
