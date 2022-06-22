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
import { ErrorService } from './error.service';

import { ServiceEndpoint } from '../contracts/v2/register-center/service-endpoint';

@Injectable({
  providedIn: 'root'
})
export class RegistryCenterService {

  version: string = "/api/v2";

  pingUrl: string = `${this.version}/registrycenter/ping`;
  appSvcDeployConfigUrl: string = `${this.version}/registrycenter/deploy/servicekey`;
  appSvcGetConfigUrl: string = `${this.version}/registrycenter/config/servicekey`;
  appSvcAllUrl: string = `${this.version}/registrycenter/service/all`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  ping(): Observable<any> {
    let url  = `${this.pingUrl}`;
    return this.http.get(url)
  }

  getAppSvcConfigBySvcKey(svcKey: string): Observable<any> {
    let url = `${this.appSvcGetConfigUrl}/${svcKey}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deployToConsul(appServiceWritable: any,svcKey: string): Observable<any> {
    let url = `${this.appSvcDeployConfigUrl}/${svcKey}`;
    return this.http.post(url,JSON.stringify(appServiceWritable), this.httpPostOrPutJSONOptions)
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  getAllAppSvc(): Observable<ServiceEndpoint[]> {
    let url  = `${this.appSvcAllUrl}`;
    return this.http.get<ServiceEndpoint[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
