<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf944b9... finished system agent http service
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmaOperation } from '../contracts/sma-operation';
<<<<<<< HEAD

import { MessageService } from '../message/message.service';
=======
import { Injectable } from '@angular/core';
>>>>>>> d08a9c7... init scaffold
=======
>>>>>>> cf944b9... finished system agent http service

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class SystemAgentService {

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf944b9... finished system agent http service
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

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private http: HttpClient, private msgSvc: MessageService) { }

  getConfig(services: string): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}${services}`;
=======
  constructor(private http: HttpClient) { }

  getConfig(services: string): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}/${services}`;
>>>>>>> cf944b9... finished system agent http service
=======
  constructor(private http: HttpClient, private msgSvc: MessageService) { }

  getConfig(services: string): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}${services}`;
>>>>>>> 727932f... Finished system agent module basic feature
    return this.http.get(url)
  }

  getMetrics(services: string): Observable<any> {
<<<<<<< HEAD
<<<<<<< HEAD
    let url = `${this.urlPrefix}${this.metricsUrl}${services}`;
=======
    let url = `${this.urlPrefix}${this.metricsUrl}/${services}`;
>>>>>>> cf944b9... finished system agent http service
=======
    let url = `${this.urlPrefix}${this.metricsUrl}${services}`;
>>>>>>> 727932f... Finished system agent module basic feature
    return this.http.get(url)
  }

  getHealth(services: string): Observable<any> {
<<<<<<< HEAD
<<<<<<< HEAD
    let url = `${this.urlPrefix}${this.healthUrl}${services}`;
=======
    let url = `${this.urlPrefix}${this.healthUrl}/${services}`;
>>>>>>> cf944b9... finished system agent http service
=======
    let url = `${this.urlPrefix}${this.healthUrl}${services}`;
>>>>>>> 727932f... Finished system agent module basic feature
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 727932f... Finished system agent module basic feature
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
<<<<<<< HEAD
  }

=======
  constructor() { }
>>>>>>> d08a9c7... init scaffold
=======
    return this.http.put(url, action, this.httpPostOrPutOptions)
=======
>>>>>>> 727932f... Finished system agent module basic feature
  }

>>>>>>> cf944b9... finished system agent http service
}
