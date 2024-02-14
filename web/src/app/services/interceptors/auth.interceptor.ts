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
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let headers = request.headers.set('X-Requested-With', 'XMLHttpRequest');
    if (this.authSvc.isSecureMode) {
      let authToken =  `Bearer ${this.authSvc.getGatewayToken()}`;
      let consulToken =  `${this.authSvc.getAclToken()}`;
      headers = request.headers.set('X-Requested-With', 'XMLHttpRequest').set('Authorization', authToken).set('X-Consul-Token', consulToken);
    }
    const req = request.clone({
      headers: headers
    });
    return next.handle(req);
  }
}
