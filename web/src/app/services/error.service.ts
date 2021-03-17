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
      } else {
        this.msgSvc.errors(`code: ${error.status} , message: ${error.message}`);
      }
    }
    return throwError(
      `Backend returned code ${(error.error as any).statusCode}, ` +
      `body was: ${(error.error as any).message}`);
  }
}
