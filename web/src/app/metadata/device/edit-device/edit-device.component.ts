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
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { Device } from '../../../contracts/v2/device';
import { DeviceResponse } from '../../../contracts/v2/responses/device-response';
import { DeviceService } from '../../../contracts/v2/device-service';
import { DeviceServiceResponse } from '../../../contracts/v2/responses/device-service-response';
import { DeviceProfile } from '../../../contracts/v2/device-profile';
import { DeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';
import { AutoEvent } from '../../../contracts/v2/auto-event';

declare type protocol = {
  [key: string]: any;
};

declare type properties = {
  [key: string]: any;
};

class AutoEventInternal {
  interval: string = '';
  onChange: boolean = false;
  resource: string = '';
  unit: string = ''
}

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

  autoEventsInternal: AutoEventInternal[] = [];
  autoEventResourceNameSet: string[] = [];

  protocolName?: string;
  protocolProperty: properties = {
    'key': '',
    'value': ''
  };
  protocolPropertyList: properties[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private metaSvc: MetadataService,
    private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let deviceName = params['deviceName'];
      this.metaSvc.findDeviceByName(deviceName).subscribe((data: DeviceResponse) => {
        this.device = data.device;

        this.deviceLabels = this.device.labels?.join(',');
        this.setAutoEventInternal(this.device.autoEvents)

        this.protocolName = Object.keys(this.device.protocols)[0];
        for (const [key, value] of Object.entries(this.device.protocols[this.protocolName])) {
          this.protocolPropertyList.push({ 'key': key, 'value': value })
        }

        this.setDefaultDeviceSvcSelected(this.device.serviceName);
        this.setDefaultDeviceProfileSelected(this.device.profileName);
      });
    });
  }

  onSingleProfileSelected(profile: DeviceProfile) {
    this.selectedProfile = profile;
    this.resetAutoEventsInternal();
    this.setupAutoEventResourceNameSet(this.selectedProfile);
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
      this.setupAutoEventResourceNameSet(this.selectedProfile);
    });
  }

  resetAutoEventsInternal () {
    this.autoEventsInternal = [];
  }

  setupAutoEventResourceNameSet(profile: DeviceProfile) {
    profile.deviceResources.forEach((r,i) => {
      this.autoEventResourceNameSet.push(r.name);
    })
    profile.deviceCommands.forEach((cmd,i) => {
      this.autoEventResourceNameSet.push(cmd.name);
    })
  }

  setAutoEventInternal(events?: AutoEvent[]) {
    let unit: string;
    events?.forEach(e => {
      let index: number = 0;

      if (e.interval.indexOf('ms') !== -1) {
        index = e.interval.indexOf('ms');
      } else if (e.interval.indexOf('s') !== -1) {
        index = e.interval.indexOf('s');
      } else if (e.interval.indexOf('m') !== -1) {
        index = e.interval.indexOf('m');
      } else if (e.interval.indexOf('h') !== -1) {
        index = e.interval.indexOf('h');
      }

      unit = e.interval.substring(index)
      this.autoEventsInternal.push({
        interval: e.interval.slice(0, index),
        onChange: e.onChange as boolean ? true : false,
        resource: e.sourceName,
        unit: unit
      });
    });
  }

  eventIntervalNumType(interval: any): boolean {
    if (!isNaN(interval) && (parseFloat(interval) === parseInt(interval))) {
      return true
    }
    return false
  }

  addProtocolProperty() {
    this.protocolPropertyList.push({ 'key': '', 'value': '' })
  }

  removeProtocolProperty(property: any) {
    this.protocolPropertyList.splice(this.protocolPropertyList.indexOf(property), 1)
  }

  addAutoEvent() {
    this.autoEventsInternal.push({
      interval: '',
      onChange: false,
      resource: '',
      unit: 'ms'
    });
  }

  removeAutoEvent(event: AutoEventInternal) {
    this.autoEventsInternal.splice(this.autoEventsInternal.indexOf(event), 1);
  }

  validateBeforeSave(): boolean {
    if (this.device?.name && this.protocolName) {
      let f: boolean = false;
      this.autoEventsInternal.forEach(e => {
        if (!this.eventIntervalNumType(e.interval) || e.resource === '') {
          f = true;
          return
        }
      });
      return f
    }
    return true
  }

  save() {
    let d: Device = this.device as Device
    let protocol: protocol = {};
    let properties: properties = {};

    d.labels  = this.deviceLabels?.split(",") as string[];

    d.serviceName = this.selectedSvc?.name as string;
    d.profileName = this.selectedProfile?.name as string;

    this.protocolPropertyList.forEach(p => {
      properties[p.key] = p.value;
    })
    protocol[this.protocolName as string] = properties;
    d.protocols = protocol;

    d.autoEvents = [];

    this.autoEventsInternal.forEach(e => {
      d.autoEvents.push({
        interval: `${parseInt(e.interval)}${e.unit}`,
        onChange: e.onChange?true:false,
        sourceName: e.resource
      })
    });

    this.metaSvc.updateDevice(d).subscribe(() => {
      this.msgSvc.success('update device', `name: ${this.device?.name}`);
      this.router.navigate(['../device-list'], { relativeTo: this.route });
    });
  }

  showTips() {
    $('.a-question-circle-o').tooltip('toggle')
  }
}
