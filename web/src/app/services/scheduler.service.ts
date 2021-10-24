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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseWithIdResponse, BaseResponse } from '../contracts/v2/common/base-response';
import { IntervalRequest } from '../contracts/v2/requests/interval-request';
import { Interval } from '../contracts/v2/interval';
import { IntervalResponse, MultiIntervalResponse } from '../contracts/v2/responses/interval-response';
import { IntervalAction } from '../contracts/v2/interval-action';
import { IntervalActionRequest } from '../contracts/v2/requests/interval-action-request';
import { IntervalActionResponse, MultiIntervalActionResponse } from '../contracts/v2/responses/interval-action-response';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  endpoint: string = "/support-scheduler";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  configUrl: string = "/config";

  intervalListUrl: string = `${this.urlPrefix}/interval/all` ;
  addOneIntervalUrl: string = `${this.urlPrefix}/interval`;
  updateOneIntervalUrl: string = `${this.urlPrefix}/interval`;
  findOneIntervalByNameUrl: string = `${this.urlPrefix}/interval/name/`;
  deleteOneIntervalByNameUrl: string = `${this.urlPrefix}/interval/name/`;

  intervalActionListUrl: string = `${this.urlPrefix}/intervalaction/all`;
  addOneIntervalActionUrl: string = `${this.urlPrefix}/intervalaction`;
  updateOneIntervaActionlUrl: string = `${this.urlPrefix}/intervalaction`;
  findOneIntervalActionByNameUrl: string = `${this.urlPrefix}/intervalaction/name/`;
  deleteOneIntervalActionByNameUrl: string = `${this.urlPrefix}/intervalaction/name/`;

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

  //interval resource
  findAllIntervalsPagination(offset: number, limit: number): Observable<MultiIntervalResponse> {
    let url = `${this.intervalListUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiIntervalResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  addInterval(interval: Interval): Observable<BaseWithIdResponse[]> {
    let url = `${this.addOneIntervalUrl}`;
    let data: IntervalRequest[] = [{
      apiVersion: 'v2',
      interval: interval
    }];
    return this.http.post<BaseWithIdResponse[]>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateInterval(interval: Interval): Observable<BaseResponse[]> {
    let url = `${this.updateOneIntervalUrl}`;
    let data: IntervalRequest[] = [{
      apiVersion: 'v2',
      interval: interval
    }];
    return this.http.patch<BaseResponse[]>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findIntervalByName(name: string): Observable<IntervalResponse> {
    let url = `${this.findOneIntervalByNameUrl}${name}`;
    return this.http.get<IntervalResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteIntervalByName(name: string): Observable<BaseResponse[]> {
    let url = `${this.deleteOneIntervalByNameUrl}${name}`;
    return this.http.delete<BaseResponse[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //interval action resource

  findAllIntervalActionsPagination(offset: number, limit: number): Observable<MultiIntervalActionResponse> {
    let url = `${this.intervalActionListUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiIntervalActionResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  addIntervalAction(intervalAction: IntervalAction): Observable<BaseWithIdResponse[]> {
    let url = `${this.addOneIntervalActionUrl}`;
    let data: IntervalActionRequest[] = [{
      apiVersion: 'v2',
      action: intervalAction
    }];
    return this.http.post<BaseWithIdResponse[]>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateIntervalAction(intervalAction: IntervalAction): Observable<BaseResponse[]> {
    let url = `${this.updateOneIntervaActionlUrl}`;
    let data: IntervalActionRequest[] = [{
      apiVersion: 'v2',
      action: intervalAction
    }];
    return this.http.patch<BaseResponse[]>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findIntervalActionByName(name: string): Observable<IntervalActionResponse> {
    let url = `${this.findOneIntervalActionByNameUrl}${name}`;
    return this.http.get<IntervalActionResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteIntervalActionByName(name: string): Observable<BaseResponse[]> {
    let url = `${this.deleteOneIntervalActionByNameUrl}${name}`;
    return this.http.delete<BaseResponse[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

}
