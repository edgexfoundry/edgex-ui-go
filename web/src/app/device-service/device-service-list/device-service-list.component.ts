import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MetadataService } from '../../services/metadata.service';
import { DeviceService } from '../../contracts/v2/device-service';
import { MultiDeviceServiceResponse } from '../../contracts/v2/responses/device-service-response';
import { MultiDeviceResponse } from '../../contracts/v2/responses/device-response';

@Component({
  selector: 'app-device-service-list',
  templateUrl: './device-service-list.component.html',
  styleUrls: ['./device-service-list.component.css']
})
export class DeviceServiceListComponent implements OnInit {

  deviceServiceList: DeviceService[] = [];
  associatedDevices = new Map<string, number>();
  // deviceServiceState = new Map<string, string>();

  constructor(private metaSvc: MetadataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.metaSvc.allDeviceServices().subscribe((data: MultiDeviceServiceResponse) => {
      this.deviceServiceList = data.services;
      this.deviceServiceList.forEach((svc) => {
        this.metaSvc.findDevicesByServiceName(svc.name).subscribe((data: MultiDeviceResponse) => { this.associatedDevices.set(svc.name, data.devices.length) });
      });
    })
  }

  associatedDevicesSkip(svcName: string) {
    let navParam: NavigationExtras = {
      queryParams: { 'svcName': svcName },
      relativeTo: this.route
    }
    this.router.navigate(['../device-center'], navParam)
  }
}
