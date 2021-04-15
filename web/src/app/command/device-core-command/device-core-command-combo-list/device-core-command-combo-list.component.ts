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

import { CoreCommand } from '../../../contracts/v2/core-command';

@Component({
  selector: 'app-device-core-command-combo-list',
  templateUrl: './device-core-command-combo-list.component.html',
  styleUrls: ['./device-core-command-combo-list.component.css']
})
export class DeviceCoreCommandComboListComponent implements OnInit {

  visible: boolean = false;
  @Input() validate: boolean = false;
  @Input() deviceName?: string;
  @Input() commandSelected?: CoreCommand;
  @Output() commandSelectedEvent = new EventEmitter<CoreCommand>();
  method: string = "";
  @Output() cmdMethodEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onCommandSelected(cmd: CoreCommand) {
    this.commandSelected = cmd;
    this.commandSelectedEvent.emit(this.commandSelected);
  }

  toggle() {
    if (this.visible) {
      this.visible = false;
      return
    }
    this.visible = true;
  }
}
