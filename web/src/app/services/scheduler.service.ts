import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseWithIdResponse, BaseResponse } from '../contracts/v2/common/base-response';
import { IntervalRequest } from '../contracts/v2/requests/interval-request';
import { Interval } from '../contracts/v2/interval';
import { MultiIntervalResponse } from '../contracts/v2/responses/interval-response';
import { IntervalAction } from '../contracts/v2/interval-action';
import { IntervalActionRequest } from '../contracts/v2/requests/interval-action-request';
import { IntervalActionResponse, MultiIntervalActionResponse } from '../contracts/v2/responses/interval-action-response';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  endpoint: string = "/scheduler";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  intervalListUrl: string = `${this.urlPrefix}/interval/all` ;
  addOneIntervalUrl: string = `${this.urlPrefix}/interval`;
  updateOneIntervalUrl: string = `${this.urlPrefix}/interval`;
  deleteOneIntervalByNameUrl: string = `${this.urlPrefix}/interval/name/`;

  intervalActionListUrl: string = `${this.urlPrefix}/intervalaction/all`;
  addOneIntervalActionUrl: string = `${this.urlPrefix}/intervalaction`;
  updateOneIntervaActionlUrl: string = `${this.urlPrefix}/intervalactionn`;
  deleteOneIntervalActionByNameUrl: string = `${this.urlPrefix}/intervalaction/name/`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) { }

  //interval resource
  findAllIntervalsPagination(offset: number, limit: number): Observable<MultiIntervalResponse> {
    let url = `${this.intervalListUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiIntervalResponse>(url)
  }

  addInterval(interval: Interval): Observable<BaseWithIdResponse> {
    let url = `${this.addOneIntervalUrl}`;
    let data: IntervalRequest = {
      apiVersion: 'v2',
      interval: interval
    };
    return this.http.post<BaseWithIdResponse>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions)
  }

  updateInterval(interval: Interval): Observable<BaseResponse> {
    let url = `${this.updateOneIntervalUrl}`;
    let data: IntervalRequest = {
      apiVersion: 'v2',
      interval: interval
    };
    return this.http.patch<BaseResponse>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions)
  }

  deleteIntervalByName(name: string): Observable<BaseResponse> {
    let url = `${this.deleteOneIntervalByNameUrl}${name}`;
    return this.http.delete<BaseResponse>(url)
  }

  //interval action resource

  findAllIntervalActionsPagination(offset: number, limit: number): Observable<MultiIntervalActionResponse> {
    let url = `${this.intervalActionListUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiIntervalActionResponse>(url)
  }

  addIntervalAction(intervalAction: IntervalAction): Observable<BaseWithIdResponse> {
    let url = `${this.addOneIntervalActionUrl}`;
    let data: IntervalActionRequest = {
      apiVersion: 'v2',
      action: intervalAction
    };
    return this.http.post<BaseWithIdResponse>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions)
  }

  updateIntervalAction(intervalAction: IntervalAction): Observable<BaseResponse> {
    let url = `${this.updateOneIntervaActionlUrl}`;
    let data: IntervalActionRequest = {
      apiVersion: 'v2',
      action: intervalAction
    };
    return this.http.patch<BaseResponse>(url,JSON.stringify(data),this.httpPostOrPutJSONOptions)
  }

  deleteIntervalActionByName(name: string): Observable<BaseResponse> {
    let url = `${this.deleteOneIntervalActionByNameUrl}${name}`;
    return this.http.delete<BaseResponse>(url)
  }

}
