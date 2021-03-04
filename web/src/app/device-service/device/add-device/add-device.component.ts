import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DeviceService } from '../../../contracts/device-service';
import { Device } from '../../../contracts/device';
import { DeviceProfile } from '../../../contracts/v2/device-profile';
import { MultiDeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';
import { AutoEvent } from '../../../contracts/auto-event';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';

class MqttProtocolTemplate {
  Schema: string = "";
  Host: string = "";
  Port: string = "";
  User: string = "";
  Password: string = "";
  ClientId: string = "";
  Topic: string = "";
}

class ModusTCPProtocolTemplate {
  Address: string = "";
  Port: string = "";
  UnitID: string = "";
}

class ModusRTUProtocolTemplate {
  Address: string = "";
  UnitID: string = "";
  BaudRate: string = "";
  DataBits: string = "";
  StopBits: string = "";
  Parity: string = ""; // Parity: N - None, O - Odd, E - Even
}

class AutoEventInternal {
  frequency: string = '';
  onChange: boolean = false;
  resource: string = '';
  unit: string = ''
}

declare type protocol = {
  [key: string]: any;
};

declare type properties = {
  [key: string]: any;
};

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  currentStep = 0;
  selectedClass = "text-white rounded px-2 bg-success  font-weight-bold";
  // selectedClass = "text-success font-weight-bold";
  noSelectedClass = "text-white rounded px-2 bg-secondary  font-weight-bold";

  deviceServiceList: DeviceService[] = [];
  deviceProfileList: DeviceProfile[] = [];

  selectedSvc?: DeviceService;
  selectedProfile?: DeviceProfile;
  newDevice?: Device;

  autoEventsInternal: AutoEventInternal[] = [{
    frequency: '',
    onChange: false,
    resource: '',
    unit: 'ms'
  }];

  deviceName: string = '';
  deviceDescription: string = '';
  deviceLabels: string[] = [];
  deviceAdminState: string = 'UNLOCKED';
  deviceOperatingState: string = 'ENABLED';

  protocolTemplateModel: string = "avaliable";
  protocolName: string = '';
  protocolProperty: properties = {
    "key": null,
    "value": null
  };
  protocolPropertyList: properties[] = [{
    "key": null,
    "value": null
  }];

  selectedAvailTemplate: any;
  selectedAvailTemplateProperties: string[] = [];

  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.metaSvc.allDeviceServices().subscribe((data: DeviceService[]) => {
      this.deviceServiceList = data;
    });
    this.metaSvc.allDeviceProfoles().subscribe((data: MultiDeviceProfileResponse) => {
      this.deviceProfileList = data.profiles;
    });
  }

  onAvailProtocolSelect() {
    switch (this.protocolName) {
      case 'mqtt':
        this.selectedAvailTemplate = new MqttProtocolTemplate();
        this.selectedAvailTemplateProperties = Object.keys(this.selectedAvailTemplate)
        return
      case 'modbus-tcp':
        this.selectedAvailTemplate = new ModusTCPProtocolTemplate();
        this.selectedAvailTemplateProperties = Object.keys(this.selectedAvailTemplate)
        return
      case 'modbus-rtu':
        this.selectedAvailTemplate = new ModusRTUProtocolTemplate();
        this.selectedAvailTemplateProperties = Object.keys(this.selectedAvailTemplate)
        return
      default:
        this.selectedAvailTemplate = {};
        this.selectedAvailTemplateProperties = [];
        return
    }

  }

  cleanSelectedAvailTemplateProperties() {
    this.selectedAvailTemplateProperties = [];
  }

  setAutoEventInternal(events: AutoEvent[]) {
    let unit: string;

    events.forEach(e => {
      let index: number = 0;
      if ((e.frequency as string).indexOf('ms')) {
        index = (e.frequency as string).indexOf('ms');
      } else if ((e.frequency as string).indexOf('s')) {
        index = (e.frequency as string).indexOf('s');
      } else if ((e.frequency as string).indexOf('m')) {
        index = (e.frequency as string).indexOf('m');
      } else if ((e.frequency as string).indexOf('h')) {
        index = (e.frequency as string).indexOf('h');
      }
      unit = (e.frequency as string).substring(index)
      this.autoEventsInternal.push({
        frequency: (e.frequency as string).slice(0, index),
        onChange: e.onChange as boolean,
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

  setProtocolTemplate(model: string) {
    this.protocolName = "";
    this.cleanSelectedAvailTemplateProperties();
    this.cleanCustomProtocolProperty();
    this.protocolTemplateModel = model;
  }

  addProtocolProperty() {
    this.protocolPropertyList.push({
      "key": '',
      "value": ''
    });
  }

  removeProtocolProperty(property: any) {
    this.protocolPropertyList.splice(this.protocolPropertyList.indexOf(property), 1)
  }

  cleanCustomProtocolProperty() {
    this.protocolPropertyList = [];
    this.protocolPropertyList.push({
      "key": '',
      "value": ''
    });
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
    if (checkbox.checked) {
      this.deviceProfileList.forEach((profile) => {
        if (profile.name === name) {
          this.selectedProfile = profile;
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

  stepStateLock(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.selectedSvc === undefined
      case 1:
        return this.selectedProfile === undefined
      case 2:
        return this.deviceName === undefined || this.deviceName === ''
      case 3:
        let flag = false;
        this.autoEventsInternal.forEach((event: AutoEvent) => {
          if (event.resource === '' || !this.eventFrequencyNumType(event.frequency)) {
            flag = true;
            return
          }
        });
        return flag
      case 4:
        return false
      default:
        return false
    }
  }

  skip() {
    this.autoEventsInternal = [];
    this.next();
  }

  next() {
    this.currentStep += 1;
  }

  previous() {
    this.currentStep = this.currentStep - 1;
  }

  changeStep() {
    this.currentStep += 1;
  }

  done() {
    let protocol: protocol = {};
    let properties: properties = {};

    if (this.protocolTemplateModel === 'custom') {
      this.protocolPropertyList.forEach((p) => {
        properties[p.key] = p.value
      });
      protocol[this.protocolName] = properties;
    } else {
      protocol[this.protocolName] = Object.assign({}, this.selectedAvailTemplate);
    }

    let autoEvents: AutoEvent[] = [];

    this.autoEventsInternal.forEach((event) => {
      autoEvents.push({
        frequency: `${parseInt(event.frequency)}${event.unit}`,
        onChange: event.onChange as boolean,
        resource: event.resource
      })
    });

    let device: Device = {
      name: this.deviceName,
      description: this.deviceDescription,
      labels: this.deviceLabels,
      adminState: this.deviceAdminState,
      operatingState: this.deviceOperatingState,
      service: this.selectedSvc as DeviceService,
      profile: this.selectedProfile as DeviceProfile,
      protocols: protocol,
      autoEvents: autoEvents
    } as Device

    this.metaSvc.addDevice(device).subscribe(() => {
      this.msgSvc.success('Add device');
      this.router.navigate(['../device-list'], { relativeTo: this.route })
    })
  }
}
