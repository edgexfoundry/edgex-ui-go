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
import { FilterByDeviceName } from "../../../../contracts/v2/appsvc/functions";

@Component({
  selector: 'app-appsvc-function-filter-by-device-name',
  templateUrl: './filter-by-device-name.component.html',
  styleUrls: ['./filter-by-device-name.component.css']
})
export class FilterByDeviceNameComponent implements OnInit, OnChanges {

  @Input() filterByDeviceName: FilterByDeviceName
  @Output() filterByDeviceNameChange = new EventEmitter<FilterByDeviceName>()

  deviceNames: string[] = [];

  constructor() {
    this.filterByDeviceName = {
      Parameters: {
        FilterOut: "false"
      }
    } as FilterByDeviceName
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.deviceNames = this.filterByDeviceName.Parameters.DeviceNames.split(',')
    this.filterByDeviceNameChange.emit(this.filterByDeviceName)
  }

  onDeviceNamesChange() {
    this.filterByDeviceName.Parameters.DeviceNames = this.deviceNames.join(',')
  }
}
