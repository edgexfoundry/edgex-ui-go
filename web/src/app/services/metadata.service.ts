import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../contracts/device';
import { DeviceProfile } from '../contracts/device-profile';
import { DeviceService } from '../contracts/device-service';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

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
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) { }

  //Device resources

  addDevice(device: Device): Observable<string> {
    let url = `${this.addOneDeviceUrl}`;
    return this.http.request('POST', url, {
      body: JSON.stringify(device),
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  deleteOneDeviceById(id: string): Observable<any> {
    let url = `${this.deleteOneDeviceUrl}/id/${id}`;
    return this.http.delete(url)
  }

  updateDevice(device: Device): Observable<any> {
    let url = `${this.updateOneDeviceUrl}`;
    return this.http.request('PUT', url, {
      body: JSON.stringify(device),
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
    // return this.http.put(url, device, this.httpPostOrPutJSONOptions)
  }

  findDeviceByName(name: string): Observable<Device> {
    let url = `${this.findDeviceByNameUrl}/${name}`;
    return this.http.get<Device>(url)
  }

  findDeviceById(id: string): Observable<Device> {
    let url = `${this.findDeviceByIdUrl}/${id}`;
    return this.http.get<Device>(url)
  }


  allDevices(): Observable<Device[]> {
    let url = `${this.devicesListUrl}`;
    return this.http.get<Device[]>(url)
  }

  findDevicesByServiceId(serviceId: string): Observable<Device[]> {
    let url = `${this.findDevicesByServiceIdUrl}/${serviceId}`;
    return this.http.get<Device[]>(url)
  }

  findDevicesByProfileId(profileId: string): Observable<Device[]> {
    let url = `${this.findDevicesByProfileIdUrl}/${profileId}`;
    return this.http.get<Device[]>(url)
  }

  //Device Service resources

  allDeviceServices(): Observable<DeviceService[]> {
    let url = `${this.deviceServicesListUrl}`;
    return this.http.get<DeviceService[]>(url)
  }

  updateDeviceService(deviceService: DeviceService): Observable<any> {
    let url = `${this.updateDeviceServiceUrl}`;
    return this.http.put(url, deviceService, this.httpPostOrPutJSONOptions)
  }

  findDevcieServiceById(id: string): Observable<DeviceService> {
    let url = `${this.findDeviceServiceByIdUrl}/${id}`;
    return this.http.get<DeviceService>(url)
  }

  //Device Profile resources

  allDeviceProfoles(): Observable<DeviceProfile[]> {
    let url = `${this.deviceProfilesListUrl}`;
    return this.http.get<DeviceProfile[]>(url)
  }

  findProfileById(id: string): Observable<DeviceProfile> {
    let url = `${this.findProfilesByIdUrl}/${id}`;
    return this.http.get<DeviceProfile>(url)
  }

  uploadProfileYamlFile(data: any): Observable<any> {
    let url = `${this.uploadProfileYamlFileUrl}`;
    return this.http.request('POST', url, {
      body: data,
      responseType: 'text',
      // headers: new HttpHeaders({
      //   'Content-Type': 'multipart/form-data; charset=utf-8'
      // })
    })
  }

  updateDeviceProfile(profile: DeviceProfile): Observable<any> {
    let url = `${this.updateDeviceProfileUrl}`;
    return this.http.put(url, profile, this.httpPostOrPutJSONOptions)
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
    })
  }

  //deprecated
  findProfileYamlById(id: string): Observable<any> {
    let url = `${this.deviceProfileYamlUrl}${id}`;
    return this.http.request('GET', url, { responseType: 'text' })
  }

  deleteProfileById(id: string): Observable<any> {
    let url = `${this.deleteProfileByIdUrl}${id}`;
    return this.http.delete(url)
  }
}
