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

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { MultiDeviceResponse } from '../../../contracts/v2/responses/device-response';
import { Device } from '../../../contracts/v2/device';
import { AutoEvent } from '../../../contracts/v2/auto-event';
import { DeviceProfile } from '../../../contracts/v2/device-profile';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  @Input() toolbars: boolean = true;
  @Input() enableSelectAll: boolean = true;

  deviceList: Device[] = [];
  associatedSvcName: string = '';
  associatedProfileName: string = '';

  selectedDevice: Device[] = [];
  associateDeviceProfile?: DeviceProfile;
  autoEvents?: AutoEvent[];
  FEATURE_AUTOEVENT =  "autoevent"
  FEATURE_COMMAND = "command"
  specialFeatureAssociatedDeviceName?: string;
  specialFeatureName?: string
  
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(
    private metaSvc: MetadataService,
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
        this.associatedSvcName = '';
        this.associatedProfileName = '';
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
    //close Command or AutoEvent feature viewer window
    this.specialFeatureName = undefined;
    $("#deleteConfirmDialog").modal('hide');
  }

  setSpecialFeatureViewer(device: Device, featureName: string) {
    this.specialFeatureAssociatedDeviceName = device.name
    this.specialFeatureName = featureName
    switch (this.specialFeatureName) {
      case this.FEATURE_AUTOEVENT:
        this.autoEvents = device.autoEvents;
        break;
      default:
        break;
    }
  }

  isCheckedAll(): boolean {
    let checkedAll = true;
    if (this.deviceList &&  this.deviceList.length === 0) {
      checkedAll = false
    }
    this.deviceList.forEach(device => {
      if (this.selectedDevice.findIndex(d => d.name === device.name) === -1) {
        checkedAll = false
      }
    });
    return checkedAll
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.deviceList.forEach(device => {
        if (this.selectedDevice.findIndex(d => d.name === device.name) !== -1) {
          return
        }
        this.selectedDevice.push(device);
      });
    } else {
      this.deviceList.forEach(device => {
        this.selectedDevice.forEach((deviceSelected, index) => {
          if (deviceSelected.name === device.name) {
            this.selectedDevice.splice(index,1);
          }
        })
      });
    }
  }

  isChecked(id: string): boolean {
    return this.selectedDevice.findIndex(device => device.id === id) >= 0;
  }

  selectOne(event: any, device: Device) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedDevice.push(device);
      return
    }
    this.selectedDevice.forEach((d,i) => {
      if (d.name === device.name) {
        this.selectedDevice.splice(i, 1);
      }
    })
  }

  onPageSelected() {
    this.resetPagination();
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
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }
}
