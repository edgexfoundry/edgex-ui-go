/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MQTTExport } from "../../../../contracts/v2/appsvc/functions";

@Component({
  selector: 'app-appsvc-function-mqttexport',
  templateUrl: './mqttexport.component.html',
  styleUrls: ['./mqttexport.component.css']
})
export class MQTTExportComponent implements OnInit, OnChanges {

  @Input() mqttExport: MQTTExport
  @Output() mqttExportChange = new EventEmitter<MQTTExport>()

  constructor() {
    this.mqttExport = {
      Parameters: {
        Qos: '0',
        AutoReconnect: 'true',
        Retain: 'true',
        SkipVerify: 'true',
        PersistOnError: 'false',
        AuthMode: 'none'
      }
    } as MQTTExport
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.mqttExportChange.emit(this.mqttExport)
  }

  renderPopoverComponent() {
    window.setTimeout(()=>{
        $('[data-toggle="popover"]').popover({
            trigger: 'hover'
        });
    },200)
  }

  authModeIsNotNone(): boolean {
    this.renderPopoverComponent()
    return this.mqttExport.Parameters.AuthMode !== 'none'
  }
}
