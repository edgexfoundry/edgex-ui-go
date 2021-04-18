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

import { CommandService } from '../../../services/command.service';
import { DeviceCoreCommandResponse } from '../../../contracts/v2/responses/device-core-command-response';
import { DeviceCoreCommand, CoreCommand } from '../../../contracts/v2/core-command';

@Component({
  selector: 'app-device-associated-core-command-list',
  templateUrl: './device-associated-core-command-list.component.html',
  styleUrls: ['./device-associated-core-command-list.component.css']
})
export class DeviceAssociatedCoreCommandListComponent implements OnInit {

  @Input() deviceName?: string;
  @Input() coreCmdSelected?: CoreCommand;
  @Output() singleCoreCmdSelectedEvent = new EventEmitter<CoreCommand>();
  deviceAssociatedCoreCommandsList: CoreCommand[] = [];
  @Input() httpMethod?: string;
  @Output() coreCmdMethodEvent = new EventEmitter<string>();
  @Output() delegationEvent = new EventEmitter<boolean>();

  constructor(private cmdSvc: CommandService) { }

  ngOnInit(): void {
    this.cmdSvc
    .findDeviceAssociatedCommnadsByDeviceName(this.deviceName as string)
    .subscribe((resp: DeviceCoreCommandResponse)=>{
      this.deviceAssociatedCoreCommandsList = resp.deviceCoreCommand.coreCommands;
    })
  }

  methodChecked(event: any, httpMethod: string) {
    const radio = event.target;
    if (radio.checked) {
      this.httpMethod = httpMethod;
    } else {
      this.httpMethod = '';
    }
    this.coreCmdMethodEvent.emit(this.httpMethod);
    this.delegationEvent.emit(true);
  }

  isChecked(name: string): boolean {
    return this.coreCmdSelected?.name === name;
  }

  radioUnchecked(checked?: boolean): boolean {
    if (checked) {
      return checked;
    }
    return false
  }

  selectOne(event: any, coreCmd: CoreCommand) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.coreCmdSelected = coreCmd;
    } else {
      this.coreCmdSelected = {} as CoreCommand;
    }
    this.delegationEvent.emit(true);
    this.singleCoreCmdSelectedEvent.emit(this.coreCmdSelected);
    this.coreCmdMethodEvent.emit(undefined);
  }
}
