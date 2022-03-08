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

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EdgeXSinkOptions } from '../../../../../contracts/kuiper/sink';

@Component({
  selector: 'app-edgex-sink-optional',
  templateUrl: './edgex-sink-optional.component.html',
  styleUrls: ['./edgex-sink-optional.component.css']
})
export class EdgexSinkOptionalComponent implements OnInit, OnChanges {

  collapseToggleStatus: boolean = false; //down-open-true, up-close-false

  private _optional: EdgeXSinkOptions;
  @Input() 
  get optional(): EdgeXSinkOptions {return this._optional};
  set optional(opts: EdgeXSinkOptions ) {Object.assign(this._optional, opts)}
  @Output() optionalChange = new EventEmitter<EdgeXSinkOptions>();

  constructor() {
    this._optional = {
      Qos: '0',
      Retained: 'false',
      SkipCertVerify: 'true',
      AutoReconnect: 'true',
      CleanSession: 'true'
    } as EdgeXSinkOptions;
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
     this.optionalChange.emit(this.optional) 
  }

  collapseToggle() {
    if (this.collapseToggleStatus) {
      this.collapseToggleStatus = false //close
      return
    }
    this.collapseToggleStatus = true //open
  }
}
