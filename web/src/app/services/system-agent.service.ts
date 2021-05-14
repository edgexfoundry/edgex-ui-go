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
  version1: string = "/api/v1";
  version2: string = "/api/v2";

  urlPrefixV1: string = `${this.endpoint}${this.version1}`;
  urlPrefixV2: string = `${this.endpoint}${this.version2}`;

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  configUrl: string = "/config/";
  metricsUrl: string = "/metrics/";
  healthUrl: string = "/health/";
  operationUrl: string = "/operation";

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

    // defaultServcies = [
    //   "edgex-core-metadata", "edgex-core-data", "edgex-core-command",
    //   "edgex-support-notifications", "edgex-support-scheduler",
    //   "edgex-redis",
    //   "rule-engine",
    //   "edgex-ui-go",
    //   //"edgex-sys-mgmt-agent",
    //   "edgex-app-service-configurable-rules"];

  getConfigV2(service: string): any {
    switch (service) {
      case "edgex-core-data":
        return this.dataService.getConfig().subscribe((resp) => {return resp})
      case "edgex-core-metadata":
        return this.metadataSvc.getConfig().subscribe((resp) => {return resp})
      case "edgex-core-command":
        return this.cmdSvc.getConfig().subscribe((resp) => {return resp})
      case "edgex-support-notifications":
        return this.schedulerSvc.getConfig().subscribe((resp) => {return resp})
      case "edgex-support-scheduler":
        return this.notiSvc.getConfig().subscribe((resp) => {return resp})
    }
  }


  //deprecated
  getConfig(services: string): Observable<any> {
    let url = `${this.urlPrefixV1}${this.configUrl}${services}`;
    return this.http.get(url)
  }

  getMetrics(services: string): Observable<any> {
    let url = `${this.urlPrefixV1}${this.metricsUrl}${services}`;
    return this.http.get(url)
  }

  getHealth(services: string): Observable<any> {
    let url = `${this.urlPrefixV1}${this.healthUrl}${services}`;
    return this.http.get(url)
  }

  //action format:
  // {
  //   "action":"stop",
  //   "services":[
  //       "edgex-support-notifications"
  //   ],
  //   "params":[
  //       "graceful"
  //       ]
  //   }
  operate(action: SmaOperation): Observable<any> {
    let url = `${this.urlPrefixV1}${this.operationUrl}`;
    return this.http.post(url, JSON.stringify(action), this.httpPostOrPutOptions)
  }

  start(name: string): Observable<any> {
    let action = {
      "action": "start",
      "services": [name],
      "params": ["graceful"]
    }
    return this.operate(action)
  }

  restart(name: string): Observable<any> {
    let action = {
      "action": "restart",
      "services": [name],
      "params": ["graceful"]
    }
    return this.operate(action)
  }

  stop(name: string): Observable<any> {
    let action = {
      "action": "stop",
      "services": [name],
      "params": ["graceful"]
    }
    return this.operate(action)
  }

}
