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
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MessageService } from '../message/message.service';
import { BaseWithIdResponse, BaseResponse } from '../contracts/v2/common/base-response';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private msgSvc: MessageService) { }

  handleErrorForV2API(data: any): boolean {
    let t = Object.prototype.toString.call(data);
    if (t === '[object Array]') {
      if (!(data as any)[0].statusCode.toString().startsWith('20')){
        this.msgSvc.errors(`code: ${(data as any)[0].statusCode}, message: ${(data as any)[0].message}`);
        return true
      }
    } else if (t === '[object Object]') {
      if (!(data as any).statusCode.toString().startsWith('20')){
        this.msgSvc.errors(`code: ${(data as any).statusCode}, message: ${(data as any).message}`);
        return true
      }
    }
    return false
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.msgSvc.errors(`'An error occurred:', ${error.error.message}`);
    } else {
      if (Object.prototype.toString.call(error.error) === '[object Object]') {
        this.msgSvc.errors(`code: ${(error.error as any).statusCode} , message: ${(error.error as any).message}`);
      } else if (Object.prototype.toString.call(error.error) === '[object String]') {
        this.msgSvc.errors(`code: ${error.status} , message: ${error.error}`);
      } else {
        this.msgSvc.errors(`code: ${error.status} , message: ${error.message}`);
      }
    }
    return throwError(
      `Backend returned code ${error.status}, ` +
      `body was: ${(error.error as any).message}`);
  }
}
