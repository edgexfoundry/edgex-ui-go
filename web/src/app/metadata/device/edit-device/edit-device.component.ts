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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { Device } from '../../../contracts/v2/device';
import { DeviceResponse } from '../../../contracts/v2/responses/device-response';
import { DeviceService } from '../../../contracts/v2/device-service';
import { DeviceServiceResponse } from '../../../contracts/v2/responses/device-service-response';
import { DeviceProfile } from '../../../contracts/v2/device-profile';
import { DeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';
import { DeviceProtocolComponent } from '../device-protocol/device-protocol.component';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {

  device?: Device;
  deviceLabels?: string;
  selectedSvc?: DeviceService;
  selectedProfile?: DeviceProfile;

  @ViewChild(DeviceProtocolComponent)
  private deviceProtocols!: DeviceProtocolComponent

  isProtocolValid: boolean = true;
  isAutoEventsValid: boolean = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private errorSvc: ErrorService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let deviceName = params['deviceName'];
      if (!params['deviceName']) {
        return
      }
      this.metaSvc.findDeviceByName(deviceName).subscribe((data: DeviceResponse) => {
        this.device = data.device;

        this.deviceLabels = this.device.labels?.join(',');
        this.setDefaultDeviceSvcSelected(this.device.serviceName);
        this.setDefaultDeviceProfileSelected(this.device.profileName);
      });
    });
  }

  onSingleProfileSelected(profile: DeviceProfile) {
    this.selectedProfile = profile;
  }

  onSingleDeviceSvcSelected(svc: DeviceService) {
    this.selectedSvc = svc;
  }

  setDefaultDeviceSvcSelected(svcName: string) {
    this.metaSvc
    .findDevcieServiceByName(svcName)
    .subscribe((resp: DeviceServiceResponse) => {
      this.selectedSvc = resp.service;
    });
  }

  setDefaultDeviceProfileSelected(profileName: string) {
    this.metaSvc
    .findProfileByName(profileName)
    .subscribe((resp: DeviceProfileResponse) => {
      this.selectedProfile = resp.profile;
    });
  }

  validateBeforeSave(): boolean {
    if (this.device!.name === '') {
      return true
    }
    return !this.isAutoEventsValid || !this.isProtocolValid
  }

  save() {
    this.device!.labels  = this.deviceLabels?.split(",") as string[];
    this.device!.serviceName = this.selectedSvc?.name as string;
    this.device!.profileName = this.selectedProfile?.name as string;
    this.device!.protocols = this.deviceProtocols.getDeviceProtocols()
    
    this.metaSvc.updateDevice(this.device as Device).subscribe((resp: any) => {
      if(this.errorSvc.handleErrorForV2API(resp)) {
        return
      }
      this.msgSvc.success('update device', `name: ${this.device?.name}`);
      this.router.navigate(['../device-list'], { relativeTo: this.route });
    });
  }
}
