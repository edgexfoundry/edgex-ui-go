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
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  endpoint: string = "";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  secureModeUrl: string = `${this.urlPrefix}/auth/securemode`;

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  getSecureMode(): Observable<any> {
    let url = `${this.secureModeUrl}`;
    return this.http.get(url, {responseType: 'text'}).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
