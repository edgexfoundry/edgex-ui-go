import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MessageService } from '../message/message.service';
import { BaseWithIdResponse } from '../contracts/v2/common/base-response';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private msgSvc: MessageService) { }

  handleErrorForV2API(v2Resp: BaseWithIdResponse) {
    this.msgSvc.errors(`message: ${v2Resp.message}, code: ${v2Resp.statusCode}`);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.msgSvc.errors(`'An error occurred:', ${error.error.message})`);
    } else {
      this.msgSvc.errors(`${error.error}`);
    }
    return throwError(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
}
