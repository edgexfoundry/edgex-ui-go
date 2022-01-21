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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseWithServiceNameResponse, BaseWithConfigResponse, BaseWithMetricsResponse } from '../contracts/v2/common/base-response';
import { OperationRequest } from '../contracts/v2/requests/operation-request';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class SystemAgentService {

  endpoint: string = "/sys-mgmt-agent";
  version2: string = "/api/v2";

  urlPrefixV2: string = `${this.endpoint}${this.version2}`;

  pingUrl: string  = "/ping";
  allRegisteredSvcUrl: string = '/api/v2/registercenter/service/all';
  configUrl: string = `${this.urlPrefixV2}/system/config`;
  metricsUrl: string =  `${this.urlPrefixV2}/system/metrics`;
  healthUrl: string = `${this.urlPrefixV2}/system/health`;
  operationUrl: string = `${this.urlPrefixV2}/system/operation`;

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  ping(): Observable<any> {
    let url = `${this.urlPrefixV2}${this.pingUrl}`;
    return this.http.get(url)
  }

  getRegisteredServiceAll(): Observable<any> {
    let url = this.allRegisteredSvcUrl;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  } 

  getConfigBySvcName(serviceName: string): Observable<BaseWithConfigResponse[]> {
    let url = `${this.configUrl}?services=${serviceName}`;
    return this.http.get<BaseWithConfigResponse[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  getMetricsBySvcName(serviceName: string): Observable<BaseWithMetricsResponse[]> {
    let url = `${this.metricsUrl}?services=${serviceName}`;
    return this.http.get<BaseWithMetricsResponse[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  getAllSvcHealth(services: string): Observable<BaseWithServiceNameResponse[]> {
    let url = `${this.healthUrl}?services=${services}`;
    return this.http.get<BaseWithServiceNameResponse[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  operateV2(action: OperationRequest[]): Observable<BaseWithServiceNameResponse[]> {
    let url = `${this.operationUrl}`;
    return this.http.post<BaseWithServiceNameResponse[]>(url, JSON.stringify(action), this.httpPostOrPutOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  startV2(name: string): Observable<any> {
    let action: OperationRequest[] = [{
      apiVersion: 'v2',
      serviceName: name,
      action: 'start'
    }]
    return this.operateV2(action)
  }

  stopV2(name: string): Observable<any> {
    let action: OperationRequest[] = [{
      apiVersion: 'v2',
      serviceName: name,
      action: 'stop'
    }]
    return this.operateV2(action)
  }

  restartV2(name: string): Observable<any> {
    let action: OperationRequest[] = [{
      apiVersion: 'v2',
      serviceName: name,
      action: 'restart'
    }]
    return this.operateV2(action)
  }
}