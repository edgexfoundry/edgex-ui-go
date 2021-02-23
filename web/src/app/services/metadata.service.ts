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
  devicesListUrl: string = "/api/v1/device";
  deleteOneDeviceUrl: string = "/api/v1/device";
  updateOneDeviceUrl: string = "/api/v1/device";
  addOneDeviceUrl: string = "/api/v1/device";
  findDeviceByNameUrl: string = "/api/v1/device/name";
  findDevicesByServiceIdUrl: string = "/api/v1/device/service";
  findDevicesByProfileIdUrl: string = "/api/v1/device/profile";


  deviceServicesListUrl: string = "/api/v1/deviceservice";
  updateDeviceServiceUrl: string = "/api/v1/deviceservice";
  findDeviceServiceByIdUrl: string = "/api/v1/deviceservice";


  deviceProfilesListUrl: string = "/api/v1/deviceprofile";
  updateDeviceProfileUrl: string = "/api/v1/deviceprofile";

  httpPostOrPutOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) { }

  //Device resources

  addDevice(device: Device): Observable<string> {
    let url = `${this.endpoint}${this.addOneDeviceUrl}`;
    return this.http.post<string>(url, device, this.httpPostOrPutOptions)
  }

  deleteOneDeviceById(id: string): Observable<any> {
    let url = `${this.endpoint}${this.deleteOneDeviceUrl}/${id}`;
    return this.http.delete(url)
  }

  updateDevice(device: Device): Observable<any> {
    let url = `${this.endpoint}${this.updateOneDeviceUrl}`;
    return this.http.put(url, device, this.httpPostOrPutOptions)
  }

  findDeviceByName(name: string): Observable<Device> {
    let url = `${this.endpoint}${this.findDeviceByNameUrl}/${name}`;
    return this.http.get<Device>(url)
  }

  allDevices(): Observable<Device[]> {
    let url = `${this.endpoint}${this.devicesListUrl}`;
    return this.http.get<Device[]>(url)
  }

  findDevicesByServiceId(serviceId: string): Observable<Device[]> {
    let url = `${this.endpoint}${this.findDevicesByServiceIdUrl}/${serviceId}`;
    return this.http.get<Device[]>(url)
  }

  findDevicesByProfileId(profileId: string): Observable<Device[]> {
    let url = `${this.endpoint}${this.findDevicesByProfileIdUrl}/${profileId}`;
    return this.http.get<Device[]>(url)
  }

  //Device Service resources

  allDeviceServices(): Observable<DeviceService[]> {
    let url = `${this.endpoint}${this.deviceServicesListUrl}`;
    return this.http.get<DeviceService[]>(url)
  }

  updateDeviceService(deviceService: DeviceService): Observable<any> {
    let url = `${this.endpoint}${this.updateDeviceServiceUrl}`;
    return this.http.put(url, deviceService, this.httpPostOrPutOptions)
  }

  findDevcieServiceById(id: string): Observable<DeviceService> {
    let url = `${this.endpoint}${this.findDeviceServiceByIdUrl}/${id}`;
    return this.http.get<DeviceService>(url)
  }

  //Device Profile resources

  allDeviceProfoles(): Observable<DeviceProfile[]> {
    let url = `${this.endpoint}${this.deviceProfilesListUrl}`;
    return this.http.get<DeviceProfile[]>(url)
  }

  updateDeviceProfile(profile: DeviceProfile): Observable<any> {
    let url = `${this.endpoint}${this.updateDeviceProfileUrl}`;
    return this.http.put(url, profile, this.httpPostOrPutOptions)
  }
}
