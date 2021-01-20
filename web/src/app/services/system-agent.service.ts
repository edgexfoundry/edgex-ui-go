import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmaOperation } from '../contracts/sma-operation';

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class SystemAgentService {

  endpoint: string = "/system";
  version1: string = "/api/v1"

  urlPrefix: string = `${this.endpoint}${this.version1}`;

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

  constructor(private http: HttpClient, private msgSvc: MessageService) { }

  getConfig(services: string): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}${services}`;
    return this.http.get(url)
  }

  getMetrics(services: string): Observable<any> {
    let url = `${this.urlPrefix}${this.metricsUrl}${services}`;
    return this.http.get(url)
  }

  getHealth(services: string): Observable<any> {
    let url = `${this.urlPrefix}${this.healthUrl}${services}`;
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
    let url = `${this.urlPrefix}${this.operationUrl}`;
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
