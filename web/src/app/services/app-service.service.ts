import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AppService } from '../contracts/v2/app-service/app-service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  endpoint: string = "/app-service";
  version: string = "/api/v2";

  appServiceUrl: string = `${this.endpoint}${this.version}`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  getAppServiceConfig(): Observable<AppService> {
    let url = `${this.appServiceUrl}/config`;
    return this.http.get<AppService>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  downloadAppServiceConfig(serviceKey: string): Observable<any> {
    let url = `${this.version}/appservice/download/servicekey/`+ serviceKey;
    return this.http.get(url, {
      responseType: "blob",
      observe: 'response',
      headers: new HttpHeaders().append("Content-Type", "application/json")
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deployToConsul(appServiceWritable: any,serviceKey: string): Observable<string> {
    let url = `${this.version}/appservice/deploy/servicekey/`+ serviceKey;
    return this.http.post<string>(url,JSON.stringify(appServiceWritable), this.httpPostOrPutJSONOptions)
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
