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

import { DeviceCoreCommand } from '../../../contracts/v2/core-command';
import { CommandService } from '../../../services/command.service';
import { MultiDeviceCoreCommandsResponse } from '../../../contracts/v2/responses/device-core-command-response';

@Component({
  selector: 'app-device-core-command-list',
  templateUrl: './device-core-command-list.component.html',
  styleUrls: ['./device-core-command-list.component.css']
})
export class DeviceCoreCommandListComponent implements OnInit {

  deviceCoreCmdList: DeviceCoreCommand[] = [];
  @Input() deviceCoreCmdSelected?: DeviceCoreCommand;
  @Output() deviceCoreCmdSelectedEvent = new EventEmitter<DeviceCoreCommand>();
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(private cmdSvc: CommandService) { }

  ngOnInit(): void {
    this.findAllDeviceCoreCmdsPagination();
  }

  findAllDeviceCoreCmdsPagination() {
    this.cmdSvc
    .allDeviceCoreCommandsPagination(this.pageOffset, this.pageLimit)
    .subscribe((resp: MultiDeviceCoreCommandsResponse)=>{
      this.deviceCoreCmdList = resp.deviceCoreCommands;
    })
  }

  isChecked(cmd: DeviceCoreCommand): boolean {
    return this.deviceCoreCmdSelected?.deviceName === cmd.deviceName;
  }

  selectOne(event: any, cmd: DeviceCoreCommand) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.deviceCoreCmdSelected = cmd;
    } else {
      this.deviceCoreCmdSelected = undefined;
    }
    this.deviceCoreCmdSelectedEvent.emit(this.deviceCoreCmdSelected);
  }

  checkOne(cmd: DeviceCoreCommand) {
    this.deviceCoreCmdSelected = cmd;
    this.deviceCoreCmdSelectedEvent.emit(this.deviceCoreCmdSelected);
  }

  onPageSelected() {
    this.findAllDeviceCoreCmdsPagination();
  }

  prePage() {
    this.setPagination(-1);
    this.findAllDeviceCoreCmdsPagination();
  }

  nextPage() {
    this.setPagination(1);
    this.findAllDeviceCoreCmdsPagination();
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
