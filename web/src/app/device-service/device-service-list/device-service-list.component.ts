import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MetadataService } from '../../services/metadata.service';
import { DeviceService } from '../../contracts/device-service';
import { Device } from '../../contracts/device';

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
    this.metaSvc.allDeviceServices().subscribe((data: DeviceService[]) => {
      this.deviceServiceList = data;
      let self = this;
      this.deviceServiceList.forEach(function (svc) {
        self.metaSvc.findDevicesByServiceId(svc.id).subscribe((data: Device[]) => { self.associatedDevices.set(svc.id, data.length) });
      });
    })
  }

  associatedDevicesSkip(svcId: string) {
    let navParam: NavigationExtras = {
      queryParams: { 'svcId': svcId },
      relativeTo: this.route
    }
    this.router.navigate(['../device-center'], navParam)
  }
}
