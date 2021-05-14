import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { MetadataService } from '../services/metadata.service';
import { SchedulerService } from '../services/scheduler.service';
import { NotificationsService } from '../services/notifications.service';
import { SystemAgentService } from '../services/system-agent.service';

import { MultiDeviceServiceResponse } from '../contracts/v2/responses/device-service-response';
import { MultiDeviceResponse } from '../contracts/v2/responses/device-response';
import { MultiDeviceProfileResponse } from '../contracts/v2/responses/device-profile-response';
import { MultiNotificationResponse } from '../contracts/v2/responses/notification-response';
import { MultiIntervalResponse } from '../contracts/v2/responses/interval-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventCount: number = 0;
  readingCount: number = 0;
  deviceSvcCount: number = 0;
  deviceCount: number = 0;
  deviceProfileCount: number = 0;
  schedulerCount: number = 0;
  notiCount: number = 0;

  sysSvcStatusDown: number = 0;
  deviceStatusLocked: number = 0;
  deviceSvcStatusLocked: number = 0;

  constructor(private dataService: DataService,
    private metadataSvc:MetadataService,
    private schedulerSvc: SchedulerService,
    private notiSvc :NotificationsService,
    private sysSvc: SystemAgentService) { }

  ngOnInit(): void {
    this.dataService.eventCount().subscribe((resp: any) => this.eventCount = resp.Count);
    this.dataService.readingCount().subscribe((resp: any) => this.readingCount = resp.Count);
    this.metadataSvc.allDeviceServices().subscribe((resp: MultiDeviceServiceResponse) => {
      this.deviceSvcCount = resp.services.length;
      resp.services.forEach((svc,i) => {
        if (svc.adminState === 'LOCKED') {
          this.deviceSvcStatusLocked++;
        }
      });
    });
    this.metadataSvc.allDevices().subscribe((resp: MultiDeviceResponse) => {
      this.deviceCount = resp.devices.length;
      resp.devices.forEach((device,i) => {
        if (device.adminState === 'LOCKED') {
          this.deviceStatusLocked++;
        }
      })
    });
    this.metadataSvc.allDeviceProfolesPagination(0,-1).subscribe((resp: MultiDeviceProfileResponse)=>{
      this.deviceProfileCount = resp.profiles.length;
    });

    this.schedulerSvc.findAllIntervalsPagination(0,-1).subscribe((resp: MultiIntervalResponse) => {
      this.schedulerCount = resp.intervals.length;
    });

    this.notiSvc.findNotificationsByStatusPagination(0,-1,'NEW').subscribe((resp: MultiNotificationResponse) => {
      this.notiCount = resp.notifications.length;
    });


    // this.sysSvc.getHealth()

  }

}
