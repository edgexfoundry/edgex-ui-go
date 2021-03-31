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
import { MultiDeviceServiceResponse } from '../../../contracts/v2/responses/device-service-response';
import { DeviceProfile } from '../../../contracts/v2/device-profile';
import { MultiDeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';
import { AutoEvent } from '../../../contracts/v2/auto-event';

declare type protocol = {
  [key: string]: any;
};

declare type properties = {
  [key: string]: any;
};

class AutoEventInternal {
  frequency: string = '';
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
  deviceServiceList!: DeviceService[];
  // deviceProfileList?: DeviceProfile[];
  selectedSvc?: DeviceService;
  selectedProfile?: DeviceProfile;

  autoEventsInternal: AutoEventInternal[] = [];

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


        this.metaSvc.allDeviceServices().subscribe((data: MultiDeviceServiceResponse) => {
          this.deviceServiceList = data.services;
          this.deviceServiceList.forEach((svc) => {
            if (svc.name === this.device?.serviceName) {
              this.selectedSvc = svc;
              return
            }
          });
        });

        // this.metaSvc.allDeviceProfoles().subscribe((data: MultiDeviceProfileResponse) => {
        //   this.deviceProfileList = data.profiles;
        //   this.deviceProfileList.forEach((profile) => {
        //     if (profile.name === this.device?.profileName) {
        //       this.selectedProfile = profile;
        //       return
        //     }
        //   });
        // });
      });
    });
  }

  onSingleProfileSelected(profile: DeviceProfile) {
    this.selectedProfile = profile;
  }

  setAutoEventInternal(events?: AutoEvent[]) {
    let unit: string;
    events?.forEach(e => {
      let index: number = 0;

      if (e.frequency.indexOf('ms') !== -1) {
        index = e.frequency.indexOf('ms');
      } else if (e.frequency.indexOf('s') !== -1) {
        index = e.frequency.indexOf('s');
      } else if (e.frequency.indexOf('m') !== -1) {
        index = e.frequency.indexOf('m');
      } else if (e.frequency.indexOf('h') !== -1) {
        index = e.frequency.indexOf('h');
      }

      unit = e.frequency.substring(index)
      this.autoEventsInternal.push({
        frequency: e.frequency.slice(0, index),
        onChange: e.onChange as boolean ? true : false,
        resource: e.sourceName,
        unit: unit
      });
    });
  }

  eventFrequencyNumType(frequency: any): boolean {
    if (!isNaN(frequency) && (parseFloat(frequency) === parseInt(frequency))) {
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
      frequency: '',
      onChange: false,
      resource: '',
      unit: 'ms'
    });
  }

  removeAutoEvent(event: AutoEventInternal) {
    this.autoEventsInternal.splice(this.autoEventsInternal.indexOf(event), 1);
  }

  // isProfileChecked(name: string): boolean {
  //   return this.selectedProfile?.name === name
  // }

  // selectOneProfile(event: any, name: string) {
  //   const checkbox = event.target;
    
  //   if (checkbox.checked) {
  //     this.deviceProfileList.forEach((profile) => {
  //       if (profile.name === name) {
  //         this.selectedProfile = profile;
  //         return
  //       }
  //     });
  //   } else {
  //     this.selectedProfile = undefined;
  //   }
  // }

  isSvcChecked(name: string): boolean {
    return this.selectedSvc?.name === name
  }

  selectOneSvc(event: any, name: string) {
    const checkbox = event.target;
    let self = this;
    if (checkbox.checked) {
      this.deviceServiceList.forEach(function (svc) {
        if (svc.name === name) {
          self.selectedSvc = svc;
        }
      });
    } else {
      this.selectedSvc = undefined;
    }
  }

  validateBeforeSave(): boolean {
    if (this.device?.name && this.protocolName) {
      let f: boolean = false;
      this.autoEventsInternal.forEach(e => {
        if (!this.eventFrequencyNumType(e.frequency) || e.resource === '') {
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
        frequency: `${parseInt(e.frequency)}${e.unit}`,
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
