import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint: string = "/coredata";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  configUrl: string = "/config";
  endpointHealthUrl: string = `${this.urlPrefix}/ping`;

  eventCountUrl: string = `${this.urlPrefix}/event/count`;
  readingCountUrl: string = `${this.urlPrefix}/reading/count`;

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  getConfig(): Observable<any> {
    let url = `${this.urlPrefix}${this.configUrl}`;
    return this.http.get(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  endpointHealth(): Observable<string> {
    let url = `${this.endpointHealthUrl}`;
    return this.http.get<string>(url)
  }

  eventCount(): Observable<any> {
    let url = `${this.eventCountUrl}`;
    return this.http.get<any>(url)
  }

  readingCount(): Observable<any> {
    let url = `${this.readingCountUrl}`;
    return this.http.get<any>(url)
  }

  //deprecated
  eventCount1(): Observable<number> {
    let url = `${this.eventCountUrl}`;
    return this.http.get<number>(url)
  }
  //deprecated
  readingCount1(): Observable<number> {
    let url = `${this.readingCountUrl}`;
    return this.http.get<number>(url)
  }

}
