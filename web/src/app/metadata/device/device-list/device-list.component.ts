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
import { CommandService } from '../../../services/command.service';
import { MessageService } from '../../../message/message.service';
import { DeviceResponse,MultiDeviceResponse } from '../../../contracts/v2/responses/device-response';
import { Device } from '../../../contracts/v2/device';
import { CoreCommand } from '../../../contracts/v2/core-command';
import { AutoEvent } from '../../../contracts/v2/auto-event';
import { DeviceProfile } from '../../../contracts/v2/device-profile';
import { DeviceProfileResponse,MultiDeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';
import { DeviceCoreCommandResponse } from '../../../contracts/v2/responses/device-core-command-response';
import { EventResponse } from '../../../contracts/v2/responses/event-response';
import { BaseReading } from '../../../contracts/v2/reading';
import { CoreCommandParameter } from '../../../contracts/v2/core-command';
import { BaseResponse } from '../../../contracts/v2/common/base-response';
// import * as cbor from 'cbor';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  deviceList: Device[] = [];
  associatedSvcName: string = '';
  associatedProfileName: string = '';

  selectedDevice: Device[] = [];
  associateDeviceProfile?: DeviceProfile;
  isCheckedAll: boolean = false;
  autoEvents?: AutoEvent[];
  associatedAutoEventsDeviceName?: string;
  deviceCoreCommand?: CoreCommand[];
  associatedCmdDeviceName?: string;
  associatedCmdDeviceId?: string;
  selectedCmd: CoreCommand = {} as CoreCommand;
  selectedCmdSetParams: CoreCommandParameter[] = [];
  // selectedCmdSetParamsMap = new Map<string, any>();

  cmdBinaryResponse: any;
  cmdBinaryResponseURL?: string;
  cmdGetResponse: any;
  cmdGetResponseRaw: any;
  cmdSetResponse: any;
  cmdSetResponseRaw: any;

  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(
    private metaSvc: MetadataService,
    private cmdSvc: CommandService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['svcName']) {
        this.associatedSvcName = params['svcName'];
        this.getDeviceListByAssociatedSvc(this.associatedSvcName);
        return
      } else if (params['profileName']) {
        this.associatedProfileName = params['profileName'];
        this.getDeviceListByAssociatedProfile(this.associatedProfileName);
        return
      } else {
        this.getDeviceListPagination();
      }
    });
  }

  renderPopoverComponent() {
    setTimeout(() => {
      $('[data-toggle="popover"]').popover({
        trigger: 'hover'
      });
    }, 250);
  }

  
  getDeviceList() {
    if (this.associatedSvcName !== '') {
      this.getDeviceListByAssociatedSvc(this.associatedSvcName);
      return
    }
    if (this.associatedProfileName !== '') {
      this.getDeviceListByAssociatedProfile(this.associatedSvcName);
      return
    }
    this.getDeviceListPagination();
  }

  getDeviceListByAssociatedSvc(svcName: string) {
    this.metaSvc.findDevicesByServiceName(this.pageOffset, this.pageLimit, svcName).subscribe((data: MultiDeviceResponse) => this.deviceList = data.devices);
  }

  getDeviceListByAssociatedProfile(profileName: string) {
    this.metaSvc.findDevicesByProfileName(this.pageOffset, this.pageLimit, profileName).subscribe((data: MultiDeviceResponse) => this.deviceList = data.devices);
  }

  getDeviceListPagination() {
    this.metaSvc.allDevicesPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiDeviceResponse) => {
      this.deviceList = data.devices;
    });
  }

  refresh() {
    this.associatedProfileName = '';
    this.associatedSvcName = '';
    this.metaSvc.allDevicesPagination(0, this.pageLimit).subscribe((data: MultiDeviceResponse) => {
      this.deviceList = data.devices;
      this.msgSvc.success('refresh');
      this.resetPagination();
    });
  }

  edit() {
    this.router.navigate(['../edit-device'], {
      relativeTo: this.route,
      queryParams: { 'deviceName': this.selectedDevice[0].name }
    })
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
    this.selectedDevice.forEach((d,i) => {
      this.metaSvc.deleteOneDeviceByName(d.name).subscribe(() => {
        this.selectedDevice.splice(i,1);
        this.deviceList.forEach((device: Device, index) => {
          if (device.id === d.id) {
            this.deviceList.splice(index, 1);
            this.msgSvc.success('remove device ', ` Name: ${device.name}`);
            return
          }
        });
      });
      
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  checkAutoEvent(device: Device) {
    this.associatedAutoEventsDeviceName = device.name;
    this.autoEvents = device.autoEvents;

    //hide commands list when check auto evnets
    this.associatedCmdDeviceName = "";
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedDevice = [];
      this.deviceList.forEach(d => {
        this.selectedDevice.push(d);
        this.isChecked(d.id);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.selectedDevice = [];
    this.deviceList.forEach(d => {
      this.isChecked(d.id);
    });

  }

  isChecked(id: string): boolean {
    return this.selectedDevice.findIndex(v => v.id === id) >= 0;
  }

  selectOne(event: any, d: Device) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedDevice.push(d);
      if (this.selectedDevice.length === this.deviceList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(d.id);
    this.selectedDevice.splice(this.selectedDevice.indexOf(d), 1)
  }

  checkDeviceCommand(device: Device) {
    this.resetResponse();

    this.metaSvc
    .findProfileByName(device.profileName)
    .subscribe((data:DeviceProfileResponse) => this.associateDeviceProfile = data.profile);

    this.cmdSvc.findDeviceAssociatedCommnadsByDeviceName(device.name).subscribe((data: DeviceCoreCommandResponse) => {
      //hide auto events list when check a new one device command
      this.associatedAutoEventsDeviceName = "";

      this.associatedCmdDeviceName = data.deviceCoreCommand.deviceName;
      this.associatedCmdDeviceId = device.id;
      this.deviceCoreCommand = data.deviceCoreCommand.coreCommands;
      //init selectedCmd for first one
      this.selectedCmd = this.deviceCoreCommand[0];
      this.selectedCmdSetParams = this.selectedCmd.parameters;
    })
  }

  selectCmd(cmd: CoreCommand) {
    // this.renderPopoverComponent();
    this.selectedCmd = cmd;
    this.selectedCmdSetParams = this.selectedCmd.parameters;
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

    // this.associateDeviceProfile?.deviceResources.forEach(resource => {
    //   if (resource.name === this.selectedCmd?.name) {
    //     this.associateDeviceProfile?.deviceCommands.forEach(dc => {
    //       if (command.name === dc.name) {
    //         this.associateDeviceProfile?.deviceResources.forEach(dr => {
    //           if (dc.get[0].deviceResource == dr.name) {
    //             if (dr.properties.value.type === 'Binary') {
    //               isBinary = true;
    //               return
    //             }
    //           }
    //           return
    //         });
    //       }
    //       return
    //     });
    //   }
    // });

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

    // this.cmdSvc
    //   .issueGetCmd(this.associatedCmdDeviceId as string, this.selectedCmd?.id as string)
    //   .subscribe((data: any) => {
    //     this.cmdGetResponseRaw = JSON.stringify(data, null, 3);
    //     let result: any[] = [];
    //     data.readings.forEach(function (reading: any) {
    //       result.push(reading.value);
    //     });
    //     this.cmdGetResponse = result.join(',');
    //   });

    this.cmdSvc
    .issueGetCmd(this.associatedCmdDeviceName as string, this.selectedCmd?.name as string)
    .subscribe((resp: EventResponse) => {
      this.cmdGetResponseRaw = JSON.stringify(resp.event.readings, null, 3);
      let result: any[] = [];
      resp.event.readings.forEach((reading: BaseReading) => {
        result.push(reading.value);
      });
      this.cmdGetResponse = result.join(',');
    })
  }

  issueSetCmd() {
    let self = this;
    let params: any = {};
    this.selectedCmdSetParams?.forEach(function (p) {
      params[p.resourceName] = $(`#${p.resourceName}`).val().trim();
    });
    this.cmdSvc
    .issueSetCmd(this.associatedCmdDeviceName as string, this.selectedCmd?.name as string, params)
    .subscribe((resp: BaseResponse) => {
      this.cmdSetResponseRaw = JSON.stringify(resp, null, 3);
      this.cmdSetResponse = resp.message
    })
  }

  onPageSelected() {
    this.resetPagination();
    this.setPagination();
    this.getDeviceList();
  }

  prePage() {
    this.setPagination(-1);
    this.getDeviceList();
  }

  nextPage() {
    this.setPagination(1);
    this.getDeviceList();
  }

  setPagination(n?: number) {
    if (n === 1) {
      this.pagination += 1;
    } else if (n === -1) {
      this.pagination -= 1;
    }
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }

  resetPagination() {
    this.pagination = 1;
  }
}
