import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DeviceResponse,MultiDeviceResponse } from '../contracts/v2/responses/device-response';
import { BaseWithIdResponse,BaseResponse } from '../contracts/v2/common/base-response';
import { Device } from '../contracts/v2/device';
import { DeviceRequest } from '../contracts/v2/requests/device-request';
import { MultiDeviceProfileResponse,DeviceProfileResponse } from '../contracts/v2/responses/device-profile-response';
import { DeviceProfile } from '../contracts/v2/device-profile';
import { DeviceService } from '../contracts/v2/device-service';
import { DeviceServiceResponse,MultiDeviceServiceResponse } from '../contracts/v2/responses/device-service-response';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  endpoint: string = "/metadata";
  version: string = "/api/v2";
  urlPrefix: string = `${this.endpoint}${this.version}`;

  devicesListUrl: string = `${this.urlPrefix}/device/all`;
  addOneDeviceUrl: string = `${this.urlPrefix}/device`;
  updateOneDeviceUrl: string = `${this.urlPrefix}/device`;
  deleteOneDeviceByIdUrl: string = `${this.urlPrefix}/device/Id/`;
  deleteOneDeviceByNameUrl: string = `${this.urlPrefix}/device/name/`;
  findDeviceByNameUrl: string = `${this.urlPrefix}/device/name/`;
  findDeviceByIdUrl: string = `${this.urlPrefix}/device/id/`;
  findDevicesByServiceIdUrl: string = `${this.urlPrefix}/device/service/id/`;
  findDevicesByServiceNameUrl: string = `${this.urlPrefix}/device/service/name/`;
  findDevicesByProfileIdUrl: string = `${this.urlPrefix}/device/profile/id/`;
  findDevicesByProfileNameUrl: string = `${this.urlPrefix}/device/profile/name/`;

  deviceServicesListUrl: string = `${this.urlPrefix}/deviceservice/all`;
  updateDeviceServiceUrl: string = `${this.urlPrefix}/deviceservice`;
  findDeviceServiceByIdUrl: string = `${this.urlPrefix}/deviceservice/id/`;
  findDeviceServiceByNameUrl: string = `${this.urlPrefix}/deviceservice/name/`;



  deviceProfilesListUrl: string = `${this.urlPrefix}/deviceprofile/all`;
  findProfilesByIdUrl: string = `${this.urlPrefix}/deviceprofile`;
  findProfilesByNameUrl: string = `${this.urlPrefix}/deviceprofile/name/`;
  updateDeviceProfileUrl: string = `${this.urlPrefix}/deviceprofile`;
  uploadProfileYamlFileUrl: string = `${this.urlPrefix}/deviceprofile/uploadfile`;
  uploadProfileYamlContentUrl: string = `${this.urlPrefix}/deviceprofile/upload`;
  deviceProfileYamlUrl: string = `${this.urlPrefix}/deviceprofile/yaml/`;
  deleteProfileByIdUrl: string = `${this.urlPrefix}/deviceprofile/id/`;
  deleteProfileByNamedUrl: string = `${this.urlPrefix}/deviceprofile/name/`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  //Device resources
  allDevices(): Observable<MultiDeviceResponse> {
    let url = `${this.devicesListUrl}`;
    return this.http.get<MultiDeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allDevicesPagination(offset: number, limit: number): Observable<MultiDeviceResponse> {
    let url = `${this.devicesListUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<MultiDeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  addDevice(device: Device): Observable<BaseWithIdResponse> {
    let url = `${this.addOneDeviceUrl}`;
    device.apiVersion = 'v2';
    let data: DeviceRequest[]  = [{
      apiVersion: "v2",
      device: device
    }]
    return this.http.post<BaseWithIdResponse>(url,JSON.stringify(data), this.httpPostOrPutJSONOptions)
    .pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteOneDeviceByName(name: string): Observable<BaseResponse> {
    let url = `${this.deleteOneDeviceByNameUrl}${name}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  deleteOneDeviceById(id: string): Observable<BaseResponse> {
    let url = `${this.deleteOneDeviceByIdUrl}${id}`;
    return this.http.delete<BaseResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateDevice(device: Device): Observable<BaseResponse> {
    let url = `${this.updateOneDeviceUrl}`;
    let data: DeviceRequest[]  = [{
      apiVersion: "v2",
      device: device
    }]
    return this.http.patch<BaseResponse>(url, JSON.stringify(data),{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
    // return this.http.patch<BaseResponse>(url, {
    //   body: JSON.stringify(data),
    //   responseType: 'json',
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json'
    //   })
    // }).pipe(
    //   catchError(error => this.errorSvc.handleError(error))
    // )
  }

  findDeviceByName(name: string): Observable<DeviceResponse> {
    let url = `${this.findDeviceByNameUrl}/${name}`;
    return this.http.get<DeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findDeviceById(id: string): Observable<DeviceResponse> {
    let url = `${this.findDeviceByIdUrl}/${id}`;
    return this.http.get<DeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findDevicesByServiceId(serviceId: string): Observable<MultiDeviceResponse> {
    let url = `${this.findDevicesByServiceIdUrl}${serviceId}`;
    return this.http.get<MultiDeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevicesByServiceName(serviceName: string): Observable<MultiDeviceResponse> {
    let url = `${this.findDevicesByServiceNameUrl}${serviceName}`;
    return this.http.get<MultiDeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findDevicesByProfileId(profileId: string): Observable<MultiDeviceResponse> {
    let url = `${this.findDevicesByProfileIdUrl}/${profileId}`;
    return this.http.get<MultiDeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevicesByProfileName(profileName: string): Observable<MultiDeviceResponse> {
    let url = `${this.findDevicesByProfileNameUrl}${profileName}`;
    return this.http.get<MultiDeviceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //Device Service resources

  allDeviceServices(): Observable<MultiDeviceServiceResponse> {
    let url = `${this.deviceServicesListUrl}`;
    return this.http.get<MultiDeviceServiceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateDeviceService(deviceService: DeviceService): Observable<BaseResponse> {
    let url = `${this.updateDeviceServiceUrl}`;
    return this.http.patch<BaseResponse>(url, deviceService, this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findDevcieServiceById(id: string): Observable<DeviceServiceResponse> {
    let url = `${this.findDeviceServiceByIdUrl}${id}`;
    return this.http.get<DeviceServiceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevcieServiceByName(name: string): Observable<DeviceServiceResponse> {
    let url = `${this.findDeviceServiceByNameUrl}${name}`;
    return this.http.get<DeviceServiceResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //Device Profile resources

  allDeviceProfoles(): Observable<MultiDeviceProfileResponse> {
    let url = `${this.deviceProfilesListUrl}?offset=${0}&limit=${-1}`;
    return this.http.get<MultiDeviceProfileResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  allDeviceProfolesPagination(offset: number, limit: number): Observable<MultiDeviceProfileResponse> {
    let url = `${this.deviceProfilesListUrl}?offset=${offset}&limit=${limit}`;
    console.log(url)
    return this.http.get<MultiDeviceProfileResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  addProfileYamlByNameViaUIBackend(data: any): Observable<any> {
    let url = "/api/v1/profile/yaml";
    return this.http.request('POST', url, {
      body: data,
      responseType: 'text'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findProfileById(id: string): Observable<DeviceProfileResponse> {
    let url = `${this.findProfilesByIdUrl}/${id}`;
    return this.http.get<DeviceProfileResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findProfileByName(name: string): Observable<DeviceProfileResponse> {
    let url = `${this.findProfilesByNameUrl}/${name}`;
    return this.http.get<DeviceProfileResponse>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findProfileYamlByNameViaUIBackend(name: string): Observable<any> {
    let url = "/api/v1/profile/yaml/name/" + name;
    return this.http.request('GET', url, {
      responseType: 'text'
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  uploadProfileYamlFile(data: any): Observable<any> {
    let url = `${this.uploadProfileYamlFileUrl}`;
    return this.http.request('POST', url, {
      body: data,
      responseType: 'text',
      // headers: new HttpHeaders({
      //   'Content-Type': 'multipart/form-data; charset=utf-8'
      // })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateDeviceProfile(profile: DeviceProfile): Observable<any> {
    let url = `${this.updateDeviceProfileUrl}`;
    return this.http.put(url, profile, this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateProfileYamlContentViaUIBackend(data: any):Observable<any> {
    let url = "/api/v1/profile/yaml";
    return this.http.put(url,data,{
      headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8'
      })
    })
    // return this.http.request('PUT', url, {
    //   body: data,
    //   responseType: 'json',
    //   headers: new HttpHeaders({
    //     'Content-Type': 'text/plain; charset=utf-8'
    //   })
    // }).pipe(
    //   catchError(error => this.errorSvc.handleError(error))
    // )
  }

  //deprecated
  uploadProfileYamlContent(data: any): Observable<string> {
    let url = `${this.uploadProfileYamlContentUrl}`;
    return this.http.request('POST', url, {
      body: data,
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //deprecated
  findProfileYamlById(id: string): Observable<any> {
    let url = `${this.deviceProfileYamlUrl}${id}`;
    return this.http.request('GET', url, { responseType: 'text' })
  }

  //deprecated
  deleteProfileById(id: string): Observable<any> {
    let url = `${this.deleteProfileByIdUrl}${id}`;
    return this.http.delete(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteProfileByName(name: string): Observable<any> {
    let url = `${this.deleteProfileByNamedUrl}${name}`;
    return this.http.delete(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
}
