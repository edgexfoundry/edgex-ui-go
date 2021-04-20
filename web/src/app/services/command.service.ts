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

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  endpoint: string = "/command";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  deviceCoreCommandListUrl: string = `${this.urlPrefix}/device/all`;
  commandsByDeviceIdUrl: string = `${this.urlPrefix}/device/`; //deprecated
  commandsByDeviceNameUrl: string = `${this.urlPrefix}/device/name/`;
  issueCmdByDeviceNameAndCmdNameUrl: string = `${this.urlPrefix}/device/name/`;

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

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
    let url = `${this.issueCmdByDeviceNameAndCmdNameUrl}${deviceName}/${commandName}`;
    return this.http.get<EventResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  // issueGetCmd(deviceId: string, commandId: string): Observable<any> {
  //   let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
  //   return this.http.get(url).pipe(
  //     catchError(error => this.errorSvc.handleError(error))
  //   )
  // }

  issueSetCmd(deviceId: string, commandId: string, params?: any): Observable<any> {
    let url = `${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(params),
      responseType: 'text'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
