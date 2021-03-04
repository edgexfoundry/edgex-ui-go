import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../contracts/device';
import { MultiDeviceProfileResponse,DeviceProfileResponse } from '../contracts/v2/responses/device-profile-response';
import { DeviceProfile } from '../contracts/v2/device-profile';
import { DeviceService } from '../contracts/device-service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  endpoint: string = "/metadata";
  version: string = "/api/v2";

  devicesListUrl: string = `${this.endpoint}${this.version}/device/all`;
  deleteOneDeviceUrl: string = `${this.endpoint}${this.version}/device`;
  updateOneDeviceUrl: string = `${this.endpoint}${this.version}/device`;
  addOneDeviceUrl: string = `${this.endpoint}${this.version}/device`;
  findDeviceByNameUrl: string = `${this.endpoint}${this.version}/device/name`;
  findDeviceByIdUrl: string = `${this.endpoint}${this.version}/device`;
  findDevicesByServiceIdUrl: string = `${this.endpoint}${this.version}/device/service`;
  findDevicesByProfileIdUrl: string = `${this.endpoint}${this.version}/device/profile`;


  deviceServicesListUrl: string = `${this.endpoint}${this.version}/deviceservice`;
  updateDeviceServiceUrl: string = `${this.endpoint}${this.version}/deviceservice`;
  findDeviceServiceByIdUrl: string = `${this.endpoint}${this.version}/deviceservice`;


  deviceProfilesListUrl: string = `${this.endpoint}${this.version}/deviceprofile/all`;
  findProfilesByIdUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  findProfilesByNameUrl: string = `${this.endpoint}${this.version}/deviceprofile/name/`;
  updateDeviceProfileUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  uploadProfileYamlFileUrl: string = `${this.endpoint}${this.version}/deviceprofile/uploadfile`;
  uploadProfileYamlContentUrl: string = `${this.endpoint}${this.version}/deviceprofile/upload`;
  deviceProfileYamlUrl: string = `${this.endpoint}${this.version}/deviceprofile/yaml/`;
  deleteProfileByIdUrl: string = `${this.endpoint}${this.version}/deviceprofile/id/`;
  deleteProfileByNamedUrl: string = `${this.endpoint}${this.version}/deviceprofile/name/`;

  httpPostOrPutJSONOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient, private errorSvc: ErrorService) { }

  //Device resources
  addDevice(device: Device): Observable<string> {
    let url = `${this.addOneDeviceUrl}`;
    return this.http.request('POST', url, {
      body: JSON.stringify(device),
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  deleteOneDeviceById(id: string): Observable<any> {
    let url = `${this.deleteOneDeviceUrl}/id/${id}`;
    return this.http.delete(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateDevice(device: Device): Observable<any> {
    let url = `${this.updateOneDeviceUrl}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(device),
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDeviceByName(name: string): Observable<Device> {
    let url = `${this.findDeviceByNameUrl}/${name}`;
    return this.http.get<Device>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDeviceById(id: string): Observable<Device> {
    let url = `${this.findDeviceByIdUrl}/${id}`;
    return this.http.get<Device>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }


  allDevices(): Observable<Device[]> {
    let url = `${this.devicesListUrl}`;
    return this.http.get<Device[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevicesByServiceId(serviceId: string): Observable<Device[]> {
    let url = `${this.findDevicesByServiceIdUrl}/${serviceId}`;
    return this.http.get<Device[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevicesByProfileId(profileId: string): Observable<Device[]> {
    let url = `${this.findDevicesByProfileIdUrl}/${profileId}`;
    return this.http.get<Device[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //Device Service resources

  allDeviceServices(): Observable<DeviceService[]> {
    let url = `${this.deviceServicesListUrl}`;
    return this.http.get<DeviceService[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  updateDeviceService(deviceService: DeviceService): Observable<any> {
    let url = `${this.updateDeviceServiceUrl}`;
    return this.http.put(url, deviceService, this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevcieServiceById(id: string): Observable<DeviceService> {
    let url = `${this.findDeviceServiceByIdUrl}/${id}`;
    return this.http.get<DeviceService>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  //Device Profile resources

  allDeviceProfoles(): Observable<MultiDeviceProfileResponse> {
    let url = `${this.deviceProfilesListUrl}`;
    return this.http.get<MultiDeviceProfileResponse>(url).pipe(
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
    return this.http.request('PUT', url, {
      body: data,
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8'
      })
    }).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
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
