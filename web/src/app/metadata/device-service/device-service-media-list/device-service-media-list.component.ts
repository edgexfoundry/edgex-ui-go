/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MetadataService } from '../../../services/metadata.service';
import { DeviceService } from '../../../contracts/v2/device-service';
import { MultiDeviceServiceResponse } from '../../../contracts/v2/responses/device-service-response';
import { MultiDeviceResponse } from '../../../contracts/v2/responses/device-response';
import {  MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-device-service-media-list',
  templateUrl: './device-service-media-list.component.html',
  styleUrls: ['./device-service-media-list.component.css']
})
export class DeviceServiceMediaListComponent implements OnInit {

  deviceServiceList: DeviceService[] = [];
  deviceSvcSelected?: DeviceService;
  associatedDevices = new Map<string, number>();

  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
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

  getSvcPort(baseURL: string): string {
    return (new URL(baseURL)).port
  }

  edit(svc: DeviceService) {
    this.deviceSvcSelected = svc;
  }

  updateSvc() {
    this.metaSvc
    .updateDeviceService(this.deviceSvcSelected as DeviceService)
    .subscribe(() => {
      this.msgSvc.success("update device service",`name: ${this.deviceSvcSelected?.name}`);
      this.deviceSvcSelected = undefined;
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
