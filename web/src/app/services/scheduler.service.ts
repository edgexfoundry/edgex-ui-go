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

  endpoint: string = "/scheduler";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  intervalListUrl: string = `${this.urlPrefix}/interval/all` ;
  addOneIntervalUrl: string = `${this.urlPrefix}/interval`;
  updateOneIntervalUrl: string = `${this.urlPrefix}/interval`;
  findOneIntervalByNameUrl: string = `${this.urlPrefix}/interval/name/`;
  deleteOneIntervalByNameUrl: string = `${this.urlPrefix}/interval/name/`;

  intervalActionListUrl: string = `${this.urlPrefix}/intervalaction/all`;
  addOneIntervalActionUrl: string = `${this.urlPrefix}/intervalaction`;
  updateOneIntervaActionlUrl: string = `${this.urlPrefix}/intervalactionn`;
  findOneIntervalActionByNameUrl: string = `${this.urlPrefix}/intervalaction/name/`;
  deleteOneIntervalActionByNameUrl: string = `${this.urlPrefix}/intervalaction/name/`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

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
