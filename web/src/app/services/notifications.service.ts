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

import { NotificationRequest } from '../contracts/v2/requests/notification-request';
import { MultiNotificationResponse, NotificationResponse } from '../contracts/v2/responses/notification-response';
import { Subscription } from '../contracts/v2/subscription';
import { SubscriptionRequest } from '../contracts/v2/requests/subscription-request';
import { MultiSubscriptionResponse,SubscriptionResponse } from '../contracts/v2/responses/subscription-response';
import { BaseWithIdResponse,BaseResponse } from '../contracts/v2/common/base-response';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  endpoint: string = "/notification";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  configUrl: string = "/config";
  
  //Notification resources
  findNotificationByCategoryUrl: string = `${this.urlPrefix}/notification/category/`;
  findNotificationByLabelUrl: string = `${this.urlPrefix}/notification/label/`;
  findNotificationByStatusUrl: string = `${this.urlPrefix}/notification/status/`;
  findNotificationByStartEndUrl: string = `${this.urlPrefix}/notification/start/`;
  deleteNotificationByIdUrl: string = `${this.urlPrefix}/notification/id/`;
  deleteNotificationByAgeAndStatusUrl: string = `${this.urlPrefix}/notification/age/`; // clean all notification which status must be PROCESSED
  cleanupNotificationByAgeUrl: string = `${this.urlPrefix}/cleanup/age/`; // clean all 
  cleanupNotificationAllUrl: string = `${this.urlPrefix}/cleanup`;

  //Subscription resources 
  findAllSubscriptionsPaginationUrl: string = `${this.urlPrefix}/subscription/all`;
  findAllSubscriptionsByCategoryPaginationUrl: string = `${this.urlPrefix}/subscription/category/`;
  findAllSubscriptionsByLabelPaginationUrl: string = `${this.urlPrefix}/subscription/label/`;
  findAllSubscriptionsByReceiverPaginationUrl: string = `${this.urlPrefix}/subscription/receiver/`;
  findOneSubscriptionsByNameUrl: string = `${this.urlPrefix}/subscription/name/`;
  addOneSubscriptionUrl: string = `${this.urlPrefix}/subscription`;
  updateOneSubscriptionUrl: string = `${this.urlPrefix}/subscription`;
  deleteOneSubscriptionByNameUrl: string = `${this.urlPrefix}/subscription/name/`;

  httpPostOrPutOrPatchJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  getConfig(): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //Notification resources
  findNotificationsByCategoryPagination(offset: number, limit: number, category: string): Observable<MultiNotificationResponse> {
    let url = `${this.findNotificationByCategoryUrl}${category}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiNotificationResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findNotificationsByLabelPagination(offset: number, limit: number, label: string): Observable<MultiNotificationResponse> {
    let url = `${this.findNotificationByLabelUrl}${label}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiNotificationResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findNotificationsByStatusPagination(offset: number, limit: number, status: string): Observable<MultiNotificationResponse> {
    let url = `${this.findNotificationByStatusUrl}${status}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiNotificationResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findNotificationsByStartEndPagination(offset: number, limit: number, start: number, end: number): Observable<MultiNotificationResponse> {
    let url = `${this.findNotificationByStartEndUrl}${start}/end/${end}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiNotificationResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteNotificationByAgeAndStatus(age: number): Observable<BaseResponse> {
    let url = `${this.deleteNotificationByAgeAndStatusUrl}${age}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
  deleteNotificationById(id: string): Observable<BaseResponse> {
    let url = `${this.deleteNotificationByIdUrl}${id}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  cleanupNotificationByAge(age: number): Observable<BaseResponse> {
    let url = `${this.cleanupNotificationByAgeUrl}${age}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  cleanupNotificationAll(): Observable<BaseResponse> {
    let url = `${this.cleanupNotificationAllUrl}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
  
  //subscription resources
  findAllSubscriptionPagination(offset: number, limit: number): Observable<MultiSubscriptionResponse> {
    let url = `${this.findAllSubscriptionsPaginationUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiSubscriptionResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findOneSubscriptionByName(name: string): Observable<SubscriptionResponse> {
    let url = `${this.findOneSubscriptionsByNameUrl}${name}`;
    return this.http.get<SubscriptionResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  addOneSubscription(subscription: Subscription): Observable<BaseWithIdResponse> {
    let url = `${this.addOneSubscriptionUrl}`;
    let data: SubscriptionRequest[]  = [{
      apiVersion: "v2",
      subscription: subscription
    }]
    return this.http.post<BaseWithIdResponse>(url,JSON.stringify(data), this.httpPostOrPutOrPatchJSONOptions)
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateOneSubscription(subscription: Subscription): Observable<BaseResponse> {
    let url = `${this.updateOneSubscriptionUrl}`;
    let data: SubscriptionRequest[]  = [{
      apiVersion: "v2",
      subscription: subscription
    }]
    return this.http.patch<BaseResponse>(url,JSON.stringify(data), this.httpPostOrPutOrPatchJSONOptions)
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteOneSubscriptionByName(name: string): Observable<BaseResponse> {
    let url = `${this.deleteOneSubscriptionByNameUrl}${name}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

}
