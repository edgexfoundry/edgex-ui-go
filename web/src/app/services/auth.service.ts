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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  gatewayToken: string | null = null;
  aclToken: string | null = null;
  isGatewayLoggedIn: boolean = false;
  isAclLoggedIn: boolean = false;
  redirectUrl: string | null = null;
  isSecureMode: boolean = false;

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  tokenValidate(url:string): Observable<any> {
    return this.http.get(url);
  }

  setGatewayToken(token: string | null) {
    this.gatewayToken = token || "";
    window.sessionStorage.setItem("EdgeX_Gateway_Token",this.gatewayToken as string);
  }

  setAclToken(token: string | null) {
    this.aclToken = token || "";
    window.sessionStorage.setItem("EdgeX_ACL_Token",this.aclToken as string);
  }

  getGatewayToken(): string | null {
    if (this.gatewayToken) {
      return this.gatewayToken
    }
    let token = window.sessionStorage.getItem("EdgeX_Gateway_Token");
    if (token) {
      this.gatewayToken = token
    }
    return this.gatewayToken
  }
  getAclToken(): string | null {
    if (this.aclToken) {
      return this.aclToken
    }
    let token = window.sessionStorage.getItem("EdgeX_ACL_Token");
    if (token) {
      this.aclToken = token
    }
    return this.aclToken
  }
}
