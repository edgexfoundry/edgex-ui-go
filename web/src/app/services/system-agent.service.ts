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

import { SmaOperation } from '../contracts/sma-operation';
import { BaseWithServiceNameResponse, BaseWithConfigResponse, BaseWithMetricsResponse } from '../contracts/v2/common/base-response';
import { OperationRequest } from '../contracts/v2/requests/operation-request';
import { MessageService } from '../message/message.service';
import { CommandService } from '../services/command.service';
import { DataService } from '../services/data.service';
import { MetadataService } from '../services/metadata.service';
import { NotificationsService } from '../services/notifications.service';
import { SchedulerService } from '../services/scheduler.service'

@Injectable({
  providedIn: 'root'
})
export class SystemAgentService {

  endpoint: string = "/system";
  version2: string = "/api/v2";

  urlPrefixV2: string = `${this.endpoint}${this.version2}`;

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  configUrl: string = "/system/config";
  metricsUrl: string = "/system/metrics";
  healthUrl: string = "/system/health";
  operationUrl: string = "/system/operation";

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, 
    private msgSvc: MessageService,
    private cmdSvc: CommandService,
    private dataService: DataService,
    private metadataSvc:MetadataService,
    private schedulerSvc: SchedulerService,
    private notiSvc :NotificationsService) { }

  getConfigBySvcName(serviceName: string): Observable<BaseWithConfigResponse[]> {
    let url = `${this.urlPrefixV2}${this.configUrl}?services=${serviceName}`;
    return this.http.get<BaseWithConfigResponse[]>(url)
  }

  getMetricsBySvcName(serviceName: string): Observable<BaseWithMetricsResponse[]> {
    // let svcName = `edgex-${serviceName}`;
    let url = `${this.urlPrefixV2}${this.metricsUrl}?services=${serviceName}`;
    return this.http.get<BaseWithMetricsResponse[]>(url)
  }

  getAllSvcHealth(services: string): Observable<BaseWithServiceNameResponse[]> {
    let svcs: string[] = services.split(',');
    let t: string[] = [];
    svcs.forEach((s,i) => {
      t.push(s.replace('edgex-',''))
    });
    services = t.toString();
    let url = `${this.urlPrefixV2}${this.healthUrl}?services=${services}`;
    return this.http.get<BaseWithServiceNameResponse[]>(url)
  }

  operateV2(action: OperationRequest[]): Observable<BaseWithServiceNameResponse[]> {
    let url = `${this.urlPrefixV2}${this.operationUrl}`;
    return this.http.post<BaseWithServiceNameResponse[]>(url, JSON.stringify(action), this.httpPostOrPutOptions)
  }

  startV2(name: string): Observable<any> {
    // name = `edgex-${name}`;
    let action: OperationRequest[] = [{
      apiVersion: 'v2',
      serviceName: name,
      action: 'start'
    }]
    return this.operateV2(action)
  }

  stopV2(name: string): Observable<any> {
    // name = `edgex-${name}`;
    let action: OperationRequest[] = [{
      apiVersion: 'v2',
      serviceName: name,
      action: 'stop'
    }]
    return this.operateV2(action)
  }

  restartV2(name: string): Observable<any> {
    // name = `edgex-${name}`;
    let action: OperationRequest[] = [{
      apiVersion: 'v2',
      serviceName: name,
      action: 'restart'
    }]
    return this.operateV2(action)
  }
}