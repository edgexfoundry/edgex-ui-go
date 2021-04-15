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
  cmdSelected?: CoreCommand;
  @Output() singleCmdSelectedEvent = new EventEmitter<CoreCommand>();
  deviceAssociatedCommandsList: CoreCommand[] = [];
  method: string = "";
  @Output() cmdMethodEvent = new EventEmitter<string>();

  constructor(private cmdSvc: CommandService) { }

  ngOnInit(): void {
    this.cmdSvc
    .findDeviceAssociatedCommnadsByDeviceName(this.deviceName as string)
    .subscribe((resp: DeviceCoreCommandResponse)=>{
      this.deviceAssociatedCommandsList = resp.deviceCoreCommand.coreCommands;
    })
  }

  methodChecked(event: any) {
    const radio = event.target;
    if (radio.checked) {
      this.cmdMethodEvent.emit(this.method);
    }
  }

  isChecked(name: string): boolean {
    return this.cmdSelected?.name === name;
  }

  selectOne(event: any, cmd: CoreCommand) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.deviceAssociatedCommandsList.forEach((c)=>{
        if (c.name === cmd.name && c.path === cmd.path) {
          this.cmdSelected = cmd;
        } else {
          this.cmdSelected = {} as CoreCommand;
        }
      })
    }
    this.singleCmdSelectedEvent.emit(this.cmdSelected);
  }
}
