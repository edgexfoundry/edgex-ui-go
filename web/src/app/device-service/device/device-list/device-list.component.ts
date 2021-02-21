import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { CommandService } from '../../../services/command.service';
import { MessageService } from '../../../message/message.service';
import { Device } from '../../../contracts/device';
import { Command } from '../../../contracts/command';
import { AutoEvent } from 'src/app/contracts/auto-event';
import { DeviceProfile } from '../../../contracts/device-profile';

// import * as cbor from 'cbor';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  deviceList: Device[] = [];
  selectedDevice: string[] = [];
  associateDeviceProfile?: DeviceProfile;
  isCheckedAll: boolean = false;
  autoEvents?: AutoEvent[];
  associatedAutoEventsDeviceName?: string;
  deviceCommand?: Command[];
  associatedCmdDeviceName?: string;
  associatedCmdDeviceId?: string;
  selectedCmd?: Command;
  selectedCmdPutParams?: string[];
  selectedCmdPutParamsMap = new Map<string, any>();

  cmdBinaryResponse: any;
  cmdBinaryResponseURL?: string;
  cmdGetResponse: any;
  cmdGetResponseRaw: any;
  cmdSetResponse: any;
  cmdSetResponseRaw: any;

  constructor(
    private metaSvc: MetadataService,
    private cmdSvc: CommandService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['svcId']) {
        this.metaSvc.findDevicesByServiceId(params['svcId']).subscribe((data: Device[]) => this.deviceList = data);
        return
      } else if (params['profileId']) {
        this.metaSvc.findDevicesByProfileId(params['profileId']).subscribe((data: Device[]) => this.deviceList = data);
        return
      } else {
        this.getDeviceList()
      }
    });
  }

  getDeviceList() {
    this.metaSvc.allDevices().subscribe((data: Device[]) => { this.deviceList = data });
  }

  refresh() {
    this.metaSvc.allDevices().subscribe((data: Device[]) => {
      this.deviceList = data;
      this.msgSvc.success('refresh');
    });
  }

  edit() {
    this.router.navigate(['../edit-device'], {
      relativeTo: this.route,
      queryParams: { 'deviceId': this.selectedDevice[0] }
    })
  }

  delete() {
    this.selectedDevice.forEach((deviceId) => {
      this.metaSvc.deleteOneDeviceById(deviceId).subscribe(() => {
        this.msgSvc.success('remove device ', ` ID: ${deviceId}`);
        this.selectedDevice = [];
        this.deviceList.forEach((device: Device, index) => {
          if (device.id === deviceId) {
            this.deviceList.splice(index, 1)
            return
          }
        });
      });
    });
  }

  checkAutoEvent(device: Device) {
    this.associatedAutoEventsDeviceName = device.name;
    this.autoEvents = device.autoEvents;

    //hide commands list when check auto evnets
    this.associatedCmdDeviceName = "";
  }

  selectAll(event: any) {
    const checkbox = event.target;
    let self = this;
    if (checkbox.checked) {
      this.selectedDevice = [];
      this.deviceList.forEach(function (item) {
        self.selectedDevice.push(item.id);
        self.isChecked(item.id);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.selectedDevice = [];
    this.deviceList.forEach(function (item) {
      self.isChecked(item.id);
    });

  }

  isChecked(id: string): boolean {
    return this.selectedDevice.findIndex(v => v === id) >= 0;
  }

  selectOne(event: any, id: string) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedDevice.push(id);
      // console.log(this.selectedDevice)
      if (this.selectedDevice.length === this.deviceList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(id);
    this.selectedDevice.splice(this.selectedDevice.indexOf(id), 1)
    // console.log(this.selectedDevice)
  }

  checkDeviceCommand(deviceId: string) {

    this.resetResponse();

    this.deviceList.forEach((d) => {
      if (d.id === deviceId) {
        this.associateDeviceProfile = d.profile;
        return
      }
    });

    this.cmdSvc.findCommnadsByDeviceId(deviceId).subscribe((data) => {

      //hide auto events list when check command
      this.associatedAutoEventsDeviceName = "";

      this.associatedCmdDeviceName = data.name;
      this.associatedCmdDeviceId = data.id;
      this.deviceCommand = data.commands;
      //init selectedCmd for first one
      this.selectedCmd = data.commands ? data.commands[0] : undefined;
      this.selectedCmdPutParams = this.selectedCmd?.put?.parameterNames;
    })
  }

  selectCmd(cmd: Command) {
    this.selectedCmd = cmd;
    this.selectedCmdPutParams = cmd.put?.parameterNames;

    this.resetResponse();
  }

  resetResponse() {
    this.cmdGetResponse = "";
    this.cmdGetResponseRaw = "";

    this.cmdSetResponse = "";
    this.cmdSetResponseRaw = "";

    this.cmdBinaryResponse = true;
    this.cmdBinaryResponseURL = "";
  }

  issueGetCmd() {
    let isBinary = false;
    this.associateDeviceProfile?.coreCommands.forEach(command => {
      if (command.name === this.selectedCmd?.name) {
        this.associateDeviceProfile?.deviceCommands.forEach(dc => {
          if (command.name === dc.name) {
            this.associateDeviceProfile?.deviceResources.forEach(dr => {
              if (dc.get[0].deviceResource == dr.name) {
                if (dr.properties.value.type === 'Binary') {
                  isBinary = true;
                  return
                }
              }
              return
            });
          }
          return
        });
      }
    });

    if (isBinary) {
      this.cmdGetResponse = "no supported preview";
      this.cmdGetResponseRaw = "no supported preview";
      // this.cmdSvc.issueGetBinaryCmd(this.associatedCmdDeviceId as string, this.selectedCmd?.id as string)
      //   .subscribe((data: any) => {
      //     let result = CBOR.decode(data)
      //     if (result.mediaType === "image/jpeg" ||
      //       result.mediaType === "image/jpg" ||
      //       result.mediaType === "image/png"
      //     ) {
      //       this.cmdBinaryResponse = result.binaryValue;
      //       this.cmdBinaryResponseURL = URL.createObjectURL(this.cmdBinaryResponse);
      //     } else {
      //       this.cmdBinaryResponse = false;
      //     }
      //   })
      return
    }



    this.cmdSvc
      .issueGetCmd(this.associatedCmdDeviceId as string, this.selectedCmd?.id as string)
      .subscribe((data: any) => {
        this.cmdGetResponseRaw = JSON.stringify(data, null, 3);
        let result: any[] = [];
        data.readings.forEach(function (reading: any) {
          result.push(reading.value);
        });
        this.cmdGetResponse = result.join(',');
      });
  }

  issueSetCmd() {
    let self = this;
    let params: any = {};
    this.selectedCmdPutParams?.forEach(function (p) {
      params[p] = $(`#${p}`).val();
    });
    console.log(params)
    this.cmdSvc.issueSetCmd(this.associatedCmdDeviceId as string, this.selectedCmd?.id as string, params)
      .subscribe(
        (data: any) => {
          try {
            JSON.parse(data);
            self.cmdSetResponse = "success";
            self.cmdSetResponseRaw = data;
          } catch (e) {
            self.cmdSetResponse = "error";
            self.cmdSetResponseRaw = data;
            return
          }
        },
        (error: any) => {
          console.log(error)
        }
      );
  }
}
