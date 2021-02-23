<<<<<<< HEAD
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../contracts/device';
import { DeviceProfile } from '../contracts/device-profile';
import { DeviceService } from '../contracts/device-service';
import { ErrorService } from './error.service';
<<<<<<< HEAD
=======
import { Injectable } from '@angular/core';
>>>>>>> d08a9c7... init scaffold
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../contracts/device';
import { DeviceProfile } from '../contracts/device-profile';
import { DeviceService } from '../contracts/device-service';
>>>>>>> 4749e81... update and add more http service
=======
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

<<<<<<< HEAD
<<<<<<< HEAD
  endpoint: string = "/metadata";
  version: string = "/api/v1";

  devicesListUrl: string = `${this.endpoint}${this.version}/device`;
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


  deviceProfilesListUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  findProfilesByIdUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  updateDeviceProfileUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  uploadProfileYamlFileUrl: string = `${this.endpoint}${this.version}/deviceprofile/uploadfile`;
  uploadProfileYamlContentUrl: string = `${this.endpoint}${this.version}/deviceprofile/upload`;
  deviceProfileYamlUrl: string = `${this.endpoint}${this.version}/deviceprofile/yaml/`;
  deleteProfileByIdUrl: string = `${this.endpoint}${this.version}/deviceprofile/id/`;

  httpPostOrPutJSONOptions = {
=======
  endpoint: string = "/metadata";
  version: string = "/api/v1";

  devicesListUrl: string = `${this.endpoint}${this.version}/device`;
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


<<<<<<< HEAD
  httpPostOrPutOptions = {
>>>>>>> 4749e81... update and add more http service
=======
  deviceProfilesListUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  findProfilesByIdUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  updateDeviceProfileUrl: string = `${this.endpoint}${this.version}/deviceprofile`;
  uploadProfileYamlFileUrl: string = `${this.endpoint}${this.version}/deviceprofile/uploadfile`;
  uploadProfileYamlContentUrl: string = `${this.endpoint}${this.version}/deviceprofile/upload`;
  deviceProfileYamlUrl: string = `${this.endpoint}${this.version}/deviceprofile/yaml/`;
  deleteProfileByIdUrl: string = `${this.endpoint}${this.version}/deviceprofile/id/`;

  httpPostOrPutJSONOptions = {
>>>>>>> d0455d7... Update url splicing formate with version variable
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  constructor(private http: HttpClient) { }
=======
  constructor(private http: HttpClient, private errorSvc: ErrorService) { }
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations

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
<<<<<<< HEAD
    return this.http.get<Device[]>(url)
>>>>>>> 4749e81... update and add more http service
=======
    return this.http.get<Device[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
  }

  //Device Service resources

  allDeviceServices(): Observable<DeviceService[]> {
<<<<<<< HEAD
<<<<<<< HEAD
    let url = `${this.deviceServicesListUrl}`;
    return this.http.get<DeviceService[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
<<<<<<< HEAD
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
=======
    let url = `${this.endpoint}${this.deviceServicesListUrl}`;
=======
    let url = `${this.deviceServicesListUrl}`;
>>>>>>> d0455d7... Update url splicing formate with version variable
    return this.http.get<DeviceService[]>(url)
=======
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
  }

  updateDeviceService(deviceService: DeviceService): Observable<any> {
    let url = `${this.updateDeviceServiceUrl}`;
    return this.http.put(url, deviceService, this.httpPostOrPutJSONOptions).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findDevcieServiceById(id: string): Observable<DeviceService> {
    let url = `${this.findDeviceServiceByIdUrl}/${id}`;
<<<<<<< HEAD
    return this.http.get<DeviceService>(url)
>>>>>>> 4749e81... update and add more http service
=======
    return this.http.get<DeviceService>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
  }

  //Device Profile resources

  allDeviceProfoles(): Observable<DeviceProfile[]> {
<<<<<<< HEAD
<<<<<<< HEAD
    let url = `${this.deviceProfilesListUrl}`;
    return this.http.get<DeviceProfile[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }

  findProfileById(id: string): Observable<DeviceProfile> {
    let url = `${this.findProfilesByIdUrl}/${id}`;
    return this.http.get<DeviceProfile>(url).pipe(
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

  // updateProfileYamlContent():Observable<any> {
  //   let url = `${this.endpoint}${this.uploadProfileYamlContentUrl}`;
  // }

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

  deleteProfileById(id: string): Observable<any> {
    let url = `${this.deleteProfileByIdUrl}${id}`;
    return this.http.delete(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
=======
  constructor() { }
>>>>>>> d08a9c7... init scaffold
=======
    let url = `${this.endpoint}${this.deviceProfilesListUrl}`;
=======
    let url = `${this.deviceProfilesListUrl}`;
<<<<<<< HEAD
>>>>>>> d0455d7... Update url splicing formate with version variable
    return this.http.get<DeviceProfile[]>(url)
=======
    return this.http.get<DeviceProfile[]>(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
  }

  findProfileById(id: string): Observable<DeviceProfile> {
    let url = `${this.findProfilesByIdUrl}/${id}`;
    return this.http.get<DeviceProfile>(url).pipe(
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

  // updateProfileYamlContent():Observable<any> {
  //   let url = `${this.endpoint}${this.uploadProfileYamlContentUrl}`;
  // }

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

  deleteProfileById(id: string): Observable<any> {
    let url = `${this.deleteProfileByIdUrl}${id}`;
    return this.http.delete(url).pipe(
      catchError(error => this.errorSvc.handleError(error))
    )
  }
>>>>>>> 4749e81... update and add more http service
}
