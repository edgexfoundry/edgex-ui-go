<<<<<<< HEAD
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
=======
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
>>>>>>> 600c640... Replace version1 field with version name

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
<<<<<<< HEAD
  version1: string = "/api/v1";
  urlPrefix: string = `${this.endpoint}${this.version1}`;
>>>>>>> 55f18fb... Update url splicing formate with version variable
=======
  version: string = "/api/v1";
  urlPrefix: string = `${this.endpoint}${this.version}`;
>>>>>>> 600c640... Replace version1 field with version name

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
<<<<<<< HEAD
  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
=======
  constructor(private http: HttpClient, private msgSvc: MessageService) { }
=======
  constructor(private http: HttpClient, private errorSvc: ErrorService) { }
>>>>>>> 600c640... Replace version1 field with version name

  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}`;
<<<<<<< HEAD
    return this.http.get(url);
>>>>>>> 55f18fb... Update url splicing formate with version variable
=======
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
  }

  issueGetBinaryCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('GET', url, {
      responseType: 'arraybuffer'
<<<<<<< HEAD
<<<<<<< HEAD
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
=======
    })
>>>>>>> 55f18fb... Update url splicing formate with version variable
=======
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> 600c640... Replace version1 field with version name
  }

  issueGetCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
<<<<<<< HEAD
<<<<<<< HEAD
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
=======
    return this.http.get(url)
>>>>>>> 55f18fb... Update url splicing formate with version variable
=======
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> 600c640... Replace version1 field with version name
  }

  issueSetCmd(deviceId: string, commandId: string, params?: any): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(params),
      responseType: 'text'
<<<<<<< HEAD
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
=======
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> 600c640... Replace version1 field with version name
  }
>>>>>>> 55f18fb... Update url splicing formate with version variable
}
