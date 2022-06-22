/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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
import { DataService } from '../services/data.service'
import { MetadataService } from '../services/metadata.service';
import { SchedulerService } from '../services/scheduler.service';
import { NotificationsService } from '../services/notifications.service';
import { SystemAgentService } from '../services/system-agent.service';
import { RegistryCenterService } from '../services/registry-center.service';

import { MultiDeviceServiceResponse } from '../contracts/v2/responses/device-service-response';
import { MultiDeviceResponse } from '../contracts/v2/responses/device-response';
import { MultiDeviceProfileResponse } from '../contracts/v2/responses/device-profile-response';
import { MultiNotificationResponse } from '../contracts/v2/responses/notification-response';
import { MultiIntervalResponse } from '../contracts/v2/responses/interval-response';
import { ServiceEndpoint } from '../contracts/v2/register-center/service-endpoint';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventCount: number = 0;
  readingCount: number = 0;

  deviceSvcCount: number = 0;
  deviceSvcStatusLockedCount: number = 0;

  deviceCount: number = 0;
  deviceStatusLockedCount: number = 0;

  deviceProfileCount: number = 0;

  schedulerCount: number = 0;
  notificationCount: number = 0;
  registeredServiceCount: number = 0;

  constructor(private dataService: DataService,
    private metadataSvc:MetadataService,
    private schedulerSvc: SchedulerService,
    private notiSvc :NotificationsService,
    private systemAgentSvc: SystemAgentService,
    private registrySvc: RegistryCenterService) { }

  ngOnInit(): void {
    this.dataService.ping().subscribe(() => {
      this.getEventAndReadingCount()
    })
    
    this.metadataSvc.ping().subscribe(() => {
      this.getDeviceServiceCount()
      this.getDeviceCount()
      this.getDeviceProfileCount()
    })

    this.schedulerSvc.ping().subscribe(() => {
      this.getIntervalCount()
    })

    this.notiSvc.ping().subscribe(() => {
      this.getNotificationCount()
    })

    this.systemAgentSvc.ping().subscribe(() => {
      //system agent gets all services via registry center, checking registry service status is required.
      this.registrySvc.ping().subscribe(() => {
        this.getRegisteredServiceCount()
      })
    })
  }

  getEventAndReadingCount() {
    this.dataService.eventCount().subscribe((resp: any) => this.eventCount = resp.Count);
    this.dataService.readingCount().subscribe((resp: any) => this.readingCount = resp.Count);
  }

  getDeviceServiceCount() {
    this.metadataSvc.allDeviceServices().subscribe((resp: MultiDeviceServiceResponse) => {
      this.deviceSvcCount = resp.services.length;
      resp.services.forEach((svc,i) => {
        if (svc.adminState === 'LOCKED') {
          this.deviceSvcStatusLockedCount++;
        }
      });
    });
  }

  getDeviceCount() {
    this.metadataSvc.allDevices().subscribe((resp: MultiDeviceResponse) => {
      this.deviceCount = resp.devices.length;
      resp.devices.forEach((device,i) => {
        if (device.adminState === 'LOCKED') {
          this.deviceStatusLockedCount++;
        }
      })
    });
  }

  getDeviceProfileCount() {
    this.metadataSvc.allDeviceProfolesPagination(0,-1).subscribe((resp: MultiDeviceProfileResponse)=>{
      this.deviceProfileCount = resp.profiles.length;
    });
  }

  getIntervalCount() {
    this.schedulerSvc.findAllIntervalsPagination(0,-1).subscribe((resp: MultiIntervalResponse) => {
      this.schedulerCount = resp.intervals.length;
    });
  }

  getNotificationCount() {
    this.notiSvc.findNotificationsByStatusPagination(0,-1,'NEW').subscribe((resp: MultiNotificationResponse) => {
      this.notificationCount = resp.notifications.length;
    });
  }

  getRegisteredServiceCount() {
    this.systemAgentSvc.getRegisteredServiceAll().subscribe((resp: ServiceEndpoint[]) => {
      this.registeredServiceCount = resp.length? resp.length: 0
    })
  }
}
