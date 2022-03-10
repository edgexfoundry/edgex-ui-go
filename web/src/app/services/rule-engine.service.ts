/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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
import { ErrorService } from './error.service';
import { Stream } from '../contracts/kuiper/stream';
import { Rule } from '../contracts/kuiper/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleEngineService {

  endpoint: string = "/rules-engine";
  version: string = "";

  pingUrl: string  = `${this.endpoint}${this.version}/ping`;

  streamUrl: string = `${this.endpoint}${this.version}/streams`;
  ruleUrl: string = `${this.endpoint}${this.version}/rules`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  ping(): Observable<any> {
    let url = `${this.pingUrl}`;
    return this.http.get(url)
  }

  addStream(streamSql: string): Observable<any> {
    let url = `${this.streamUrl}`;
    return this.http.request('POST', url, {
      body: streamSql,
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteOneStreamById(id: string): Observable<any> {
    let url = `${this.streamUrl}/${id}`;
    return this.http.delete(url,{
      responseType: 'text'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //request body example: {"sql":"create stream my_stream (id bigint, name string, score float) WITH ( datasource = \"topic/temperature\", FORMAT = \"json\", KEY = \"id\")"}
  updateStream(sqlformatOfStreamData: string, streamNameOrID: string): Observable<any> {
    let url = `${this.streamUrl}/${streamNameOrID}`;
    return this.http.request('PUT', url, {
      body: sqlformatOfStreamData,
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findStreamByName(name: string): Observable<Stream> {
    let url = `${this.streamUrl}/${name}`;
    return this.http.get<Stream>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allStreams(): Observable<string[]> {
    let url = `${this.streamUrl}`;
    return this.http.get<string[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  addRule(rule: any): Observable<string> {
    let url = `${this.ruleUrl}`;
    return this.http.request('POST', url, {
      body: JSON.stringify(rule),
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteOneRuleById(id: string): Observable<any> {
    let url = `${this.ruleUrl}/${id}`;
    return this.http.delete(url,{responseType: 'text'}).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateRule(rule: any): Observable<string> {
    let url = `${this.ruleUrl}/${rule.id}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(rule),
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findRuleById(id: string): Observable<Rule> {
    let url = `${this.ruleUrl}/${id}`;
    return this.http.get<Rule>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allRules(): Observable<Rule[]> {
    let url = `${this.ruleUrl}`;
    return this.http.get<Rule[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  getRuleStatusMetricsById(id: string): Observable<any> {
    let url = `${this.ruleUrl}/${id}/status`;
    return this.http.get(url,{responseType: 'text'}).pipe(
      catchError(error => this.errorSvc.handleError(error))
    );
  }

  getRuleTopoById(id: string): Observable<Rule> {
    let url = `${this.ruleUrl}/${id}/topo`;
    return this.http.get<Rule>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  startRule(id: string): Observable<string> {
    let url = `${this.ruleUrl}/${id}/start`;
    return this.http.post(url,null,{responseType: 'text'})
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  stopRule(id: string): Observable<string> {
    let url = `${this.ruleUrl}/${id}/stop`;
    return this.http.post(url,null,{responseType: 'text'})
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  restartRule(id: string): Observable<string> {
    let url = `${this.ruleUrl}/${id}/restart`;
    return this.http.post(url,null,{responseType: 'text'})
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
