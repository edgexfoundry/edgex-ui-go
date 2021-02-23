import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  endpoint: string = "/command";
  version: string = "/api/v1";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  commandsByDeviceIdUrl: string = "/device/";

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  issueGetBinaryCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('GET', url, {
      responseType: 'arraybuffer'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  issueGetCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  issueSetCmd(deviceId: string, commandId: string, params?: any): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(params),
      responseType: 'text'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
