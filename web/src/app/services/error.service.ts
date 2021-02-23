import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private msgSvc: MessageService) { }

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
