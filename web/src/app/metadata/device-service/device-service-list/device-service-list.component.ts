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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DeviceService } from '../../../contracts/v2/device-service';
import { MetadataService } from '../../../services/metadata.service';
import { MultiDeviceServiceResponse } from '../../../contracts/v2/responses/device-service-response';

@Component({
  selector: 'app-device-service-list',
  templateUrl: './device-service-list.component.html',
  styleUrls: ['./device-service-list.component.css']
})
export class DeviceServiceListComponent implements OnInit {

  @Output() singleDeviceSvcSelectedEvent = new EventEmitter<DeviceService>();
  deviceServiceList: DeviceService[] = [];
  @Input() deviceSvcSelected?: DeviceService;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(private metaSvc: MetadataService) { }

  ngOnInit(): void {
    this.findAllDeviceSvcPagination();
  }

  findAllDeviceSvcPagination() {
    this.metaSvc
    .findAllDeviceServicesPagination(this.pageOffset, this.pageLimit)
    .subscribe((resp: MultiDeviceServiceResponse) => {
      this.deviceServiceList = resp.services;
    })
  }

  onSingleDeviceSvcSelectedEmitter() {
    this.singleDeviceSvcSelectedEvent.emit(this.deviceSvcSelected);
  }

  isSvcChecked(name: string): boolean {
    return this.deviceSvcSelected?.name === name
  }

  selectOneSvc(event: any, name: string) {
    const checkbox = event.target;
    let self = this;
    if (checkbox.checked) {
      this.deviceServiceList.forEach(function (svc) {
        if (svc.name === name) {
          self.deviceSvcSelected = svc;
        }
      });
    } else {
      this.deviceSvcSelected = undefined;
    }
    this.onSingleDeviceSvcSelectedEmitter();
  }

  onPageSelected() {
    this.resetPagination();
    this.setPagination();
    this.findAllDeviceSvcPagination();
  }

  prePage() {
    this.setPagination(-1);
    this.findAllDeviceSvcPagination();
  }

  nextPage() {
    this.setPagination(1);
    this.findAllDeviceSvcPagination();
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
