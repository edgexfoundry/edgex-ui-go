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
import { PushToCore } from "../../../../contracts/v2/appsvc/functions";

@Component({
  selector: 'app-appsvc-function-push-to-core',
  templateUrl: './push-to-core.component.html',
  styleUrls: ['./push-to-core.component.css']
})
export class PushToCoreComponent implements OnInit, OnChanges {

  @Input() pushToCore: PushToCore
  @Output() pushToCoreChange = new EventEmitter<PushToCore>()

  constructor() {
    this.pushToCore = {
      Parameters: {
        ValueType: 'String'
      }
    } as PushToCore
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.pushToCoreChange.emit(this.pushToCore)
  }

  renderPopoverComponent() {
    window.setTimeout(()=>{
        $('[data-toggle="popover"]').popover({
            trigger: 'hover'
        });
    },200)
  }

  valueTypeIsBinary(): boolean{
    this.renderPopoverComponent()
    return this.pushToCore.Parameters.ValueType === 'Binary'
  }
}
