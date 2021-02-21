import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../contracts/command';

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  endpoint: string = "/command";
  version1: string = "/api/v1";
  urlPrefix: string = `${this.endpoint}${this.version1}`;

  endpointHealthUrl: string = "/ping";
  versionUrl: string = "/version";

  commandsByDeviceIdUrl: string = "/device/";

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private msgSvc: MessageService) { }

  findCommnadsByDeviceId(deviceId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}`;
    return this.http.get(url);
  }

  issueGetBinaryCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('GET', url, {
      responseType: 'arraybuffer'
    })
  }

  issueGetCmd(deviceId: string, commandId: string): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.get(url)
  }

  issueSetCmd(deviceId: string, commandId: string, params?: any): Observable<any> {
    let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(params),
      responseType: 'text'
    });
  }
}
