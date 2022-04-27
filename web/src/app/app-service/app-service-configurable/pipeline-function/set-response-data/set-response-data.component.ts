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
import { SetResponseData } from "../../../../contracts/v2/appsvc/functions";

@Component({
  selector: 'app-appsvc-function-set-response-data',
  templateUrl: './set-response-data.component.html',
  styleUrls: ['./set-response-data.component.css']
})
export class SetResponseDataComponent implements OnInit, OnChanges {

  @Input() setResponseData: SetResponseData
  @Output() setResponseDataChange = new EventEmitter<SetResponseData>()

  constructor() {
    this.setResponseData = {}  as SetResponseData
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setResponseDataChange.emit(this.setResponseData)
  }
}
