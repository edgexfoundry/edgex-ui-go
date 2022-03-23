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
import { RuleOptions } from '../../../contracts/kuiper/rule-options';

@Component({
  selector: 'app-rule-advanced-options',
  templateUrl: './rule-advanced-options.component.html',
  styleUrls: ['./rule-advanced-options.component.css']
})
export class RuleAdvancedOptionsComponent implements OnInit, OnChanges {

  collapseToggleStatus: boolean = false; //down-open-true, up-close-false

  private _ruleOptions: RuleOptions;
  @Input() 
  get ruleOptions(): RuleOptions {return this._ruleOptions}
  set ruleOptions(opts: RuleOptions){Object.assign(this._ruleOptions, opts)}
  @Output() ruleOptionsChange = new EventEmitter<RuleOptions>();

  constructor() { 
    this._ruleOptions = {
        isEventTime: false,
        sendMetaToSink: false,
        sendError: true,
        qos: 0
    } as RuleOptions
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
     this.ruleOptionsChange.emit(this.ruleOptions) 
  }

  collapseToggle(event: any) {
    if (this.collapseToggleStatus) {
      this.collapseToggleStatus = false //close
      return
    }
    this.collapseToggleStatus = true //open
  }

}
