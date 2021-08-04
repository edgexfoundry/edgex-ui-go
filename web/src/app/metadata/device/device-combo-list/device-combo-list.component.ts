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

import { Device } from '../../../contracts/v2/device';

@Component({
  selector: 'app-device-combo-list',
  templateUrl: './device-combo-list.component.html',
  styleUrls: ['./device-combo-list.component.css']
})
export class DeviceComboListComponent implements OnInit {

  selectedDevices: Device[] = [];
  visible: boolean = false;

  @Input() validate: boolean = false;

  //singleMode if true indicates multiple selected, else single selected
  @Input() singleMode: boolean = false;

  @Output() deviceSelectedEvent = new EventEmitter<Device[]>();

  constructor() { }

  ngOnInit(): void {
  }

}
