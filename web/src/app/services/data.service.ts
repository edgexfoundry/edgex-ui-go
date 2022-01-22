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
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

import { CountResponse } from '../contracts/v2/common/count-response';
import { MultiReadingResponse } from '../contracts/v2/responses/reading-response';
import { MultiEventsResponse } from '../contracts/v2/responses/event-response';
import { BaseWithConfigResponse } from '../contracts/v2/common/base-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint: string = "/core-data";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  pingUrl: string  = "/ping";
  configUrl: string = "/config";
  endpointHealthUrl: string = `${this.urlPrefix}/ping`;

  eventCountUrl: string = `${this.urlPrefix}/event/count`;
  readingCountUrl: string = `${this.urlPrefix}/reading/count`;

  allEventsUrl: string = `${this.urlPrefix}/event/all`;
  allReadingsUrl: string = `${this.urlPrefix}/reading/all`;

  associatedEventsByDeviceNameUrl: string = `${this.urlPrefix}/event/device/name/`;
  associatedReadinsByDeviceNameUrl: string = `${this.urlPrefix}/reading/device/name/`;

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  ping(): Observable<any> {
    let url = `${this.urlPrefix}${this.pingUrl}`;
    return this.http.get(url)
  }

  getConfig(): Observable<BaseWithConfigResponse> {
    let url = `${this.urlPrefix}${this.configUrl}`;
    return this.http.get<BaseWithConfigResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  endpointHealth(): Observable<string> {
    let url = `${this.endpointHealthUrl}`;
    return this.http.get<string>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  eventCount(): Observable<CountResponse> {
    let url = `${this.eventCountUrl}`;
    return this.http.get<CountResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  readingCount(): Observable<CountResponse> {
    let url = `${this.readingCountUrl}`;
    return this.http.get<CountResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allEventsPagination(offset: number, limit: number): Observable<MultiEventsResponse> {
    let url = `${this.allEventsUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiEventsResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allReadingsPagination(offset: number, limit: number): Observable<MultiReadingResponse> {
    let url = `${this.allReadingsUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiReadingResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allAssocaitedReadingsByDeviceNamePagination(offset: number, limit: number): Observable<MultiEventsResponse> {
    let url = `${this.associatedEventsByDeviceNameUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiEventsResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allAssocaitedEventsByDeviceNamePagination(offset: number, limit: number): Observable<MultiReadingResponse> {
    let url = `${this.associatedReadinsByDeviceNameUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiReadingResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

}
