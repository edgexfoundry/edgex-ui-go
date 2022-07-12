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

import { DeviceService } from '../../../contracts/v2/device-service';
import { Device } from '../../../contracts/v2/device';
import { DeviceProfile } from '../../../contracts/v2/device-profile';
import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { DeviceProtocolComponent } from  '../device-protocol/device-protocol.component';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  
  newDevice: Device;
  deviceLabels: string = '';

  @ViewChild(DeviceProtocolComponent)
  private deviceProtocols!: DeviceProtocolComponent

  currentStep = 0;
  selectedClass = "text-white rounded px-2 bg-success  font-weight-bold";
  noSelectedClass = "text-white rounded px-2 bg-secondary  font-weight-bold";
  selectedSvc?: DeviceService;
  selectedProfile?: DeviceProfile;

  isProtocolValid: boolean = false;
  isAutoEventsValid: boolean = false;

  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private errorSvc: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.newDevice = {
      adminState: 'UNLOCKED',
      operatingState: 'UP'
    } as Device;
  }

  ngOnInit(): void {
  }

  onSingleProfileSelected(profile: DeviceProfile) {
    this.selectedProfile = profile;
  }

  onSingleDeviceSvcSelected(svc: DeviceService) {
    this.selectedSvc = svc;
  }

  stepStateLock(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.selectedSvc === undefined
      case 1:
        return this.selectedProfile === undefined
      case 2:
        return !this.newDevice.name
      case 3:
        return !this.isAutoEventsValid
      case 4:
        return !this.isProtocolValid
      default:
        return false
    }
  }

  next() {
    this.currentStep += 1;
  }

  previous() {
    this.currentStep = this.currentStep - 1;
  }

  submit() {
    this.newDevice.labels = this.deviceLabels?.split(','),
    this.newDevice.serviceName = this.selectedSvc?.name as string;
    this.newDevice.profileName = this.selectedProfile?.name as string;
    this.newDevice.protocols = this.deviceProtocols.getDeviceProtocols()
   
    this.metaSvc.addDevice(this.newDevice).subscribe((resp:any) => {
      if(this.errorSvc.handleErrorForV2API(resp)) {
        return
      }
      this.msgSvc.success('Add device',`name: ${this.newDevice.name}`);
      this.router.navigate(['../device-list'], { relativeTo: this.route })
    })
  }
}
