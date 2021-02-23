import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { Device } from '../../../contracts/device';
import { DeviceService } from '../../../contracts/device-service';
import { DeviceProfile } from '../../../contracts/device-profile';
import { AutoEvent } from '../../../contracts/auto-event';

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
  deviceServiceList!: DeviceService[];
  deviceProfileList!: DeviceProfile[];
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
      let deviceId = params['deviceId'];
      this.metaSvc.findDeviceById(deviceId).subscribe((data: Device) => {
        this.device = data;

        this.setAutoEventInternal(this.device.autoEvents)

        this.protocolName = Object.keys(this.device.protocols)[0];
        for (const [key, value] of Object.entries(this.device.protocols[this.protocolName])) {
          this.protocolPropertyList.push({ 'key': key, 'value': value })
        }


        this.metaSvc.allDeviceServices().subscribe((data: DeviceService[]) => {
          this.deviceServiceList = data;
          this.deviceServiceList.forEach((svc) => {
            if (svc.name === this.device?.service.name) {
              this.selectedSvc = svc;
              return
            }
          });
        });

        this.metaSvc.allDeviceProfoles().subscribe((data: DeviceProfile[]) => {
          this.deviceProfileList = data;
          this.deviceProfileList.forEach((profile) => {
            if (profile.name === this.device?.profile.name) {
              this.selectedProfile = profile;
              return
            }
          });
        });
      });
    });
  }

  setAutoEventInternal(events?: AutoEvent[]) {
    let unit: string;
    events?.forEach(e => {
      let index: number = 0;

      if ((e.frequency as string).indexOf('ms') !== -1) {
        index = (e.frequency as string).indexOf('ms');
      } else if ((e.frequency as string).indexOf('s') !== -1) {
        index = (e.frequency as string).indexOf('s');
      } else if ((e.frequency as string).indexOf('m') !== -1) {
        index = (e.frequency as string).indexOf('m');
      } else if ((e.frequency as string).indexOf('h') !== -1) {
        index = (e.frequency as string).indexOf('h');
      }

      unit = (e.frequency as string).substring(index)
      this.autoEventsInternal.push({
        frequency: (e.frequency as string).slice(0, index),
        onChange: e.onChange as boolean ? true : false,
        resource: e.resource as string,
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

  isProfileChecked(name: string): boolean {
    return this.selectedProfile?.name === name
  }

  selectOneProfile(event: any, name: string) {
    const checkbox = event.target;
    this.device?.autoEvents.splice(0, this.device?.autoEvents.length);
    if (checkbox.checked) {
      this.deviceProfileList.forEach((profile) => {
        if (profile.name === name) {
          this.selectedProfile = profile;
          return
        }
      });
    } else {
      this.selectedProfile = undefined;
    }
  }

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

    d.service = this.selectedSvc as DeviceService;
    d.profile = this.selectedProfile as DeviceProfile;

    this.protocolPropertyList.forEach(p => {
      properties[p.key] = p.value;
    })
    protocol[this.protocolName as string] = properties;
    d.protocols = protocol;

    d.autoEvents = [];

    this.autoEventsInternal.forEach(e => {
      d.autoEvents.push({
        frequency: `${parseInt(e.frequency)}${e.unit}`,
        onChange: e.onChange as boolean,
        resource: e.resource
      })
    });

    this.metaSvc.updateDevice(d).subscribe(() => {
      this.msgSvc.success('update device', `Id: ${this.device?.id}`);
      this.router.navigate(['../device-list'], { relativeTo: this.route });
    });
  }

  showTips() {
    $('.a-question-circle-o').tooltip('toggle')
  }
}
