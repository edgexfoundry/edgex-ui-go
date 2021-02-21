<<<<<<< HEAD
<<<<<<< HEAD
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
=======
import { Injectable } from '@angular/core';
>>>>>>> d08a9c7... init scaffold
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../contracts/command';

import { MessageService } from '../message/message.service';
>>>>>>> 55f18fb... Update url splicing formate with version variable

@Injectable({
  providedIn: 'root'
})
export class CommandService {

<<<<<<< HEAD
<<<<<<< HEAD
  endpoint: string = "/command";
  version: string = "/api/v1";
  urlPrefix: string = `${this.endpoint}${this.version}`;
=======
  endpoint: string = "/command";
  version1: string = "/api/v1";
  urlPrefix: string = `${this.endpoint}${this.version1}`;
>>>>>>> 55f18fb... Update url splicing formate with version variable

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  commandsByDeviceIdUrl: string = "/device/";

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

<<<<<<< HEAD
  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
=======
  constructor(private http: HttpClient, private msgSvc: MessageService) { }

  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}`;
    return this.http.get(url);
>>>>>>> 55f18fb... Update url splicing formate with version variable
  }

  issueGetBinaryCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('GET', url, {
      responseType: 'arraybuffer'
<<<<<<< HEAD
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
=======
    })
>>>>>>> 55f18fb... Update url splicing formate with version variable
  }

  issueGetCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
<<<<<<< HEAD
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
=======
    return this.http.get(url)
>>>>>>> 55f18fb... Update url splicing formate with version variable
  }

  issueSetCmd(deviceId: string, commandId: string, params?: any): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(params),
      responseType: 'text'
<<<<<<< HEAD
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
=======
  constructor() { }
>>>>>>> d08a9c7... init scaffold
=======
    });
  }
>>>>>>> 55f18fb... Update url splicing formate with version variable
}
