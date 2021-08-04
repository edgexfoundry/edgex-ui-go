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

import { Component, OnInit, OnChanges , Input, Output, EventEmitter} from '@angular/core';

import { Trigger, Trigger_EdgexMessageBus, Trigger_ExternalMqtt, Trigger_HTTP, EdgexMessageBusOptional } from '../../../contracts/v2/appsvc/trigger';

@Component({
  selector: 'app-appsvc-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent implements OnInit, OnChanges {

  private _configTrigger: Trigger = {} as Trigger;
  // using get and set method to avoid overwriting on init value of InsecureSecrets when parent component was binding on.
  @Input() 
  get configTrigger(): Trigger {return this._configTrigger};
  set configTrigger(triger: Trigger) {Object.assign(this._configTrigger, triger)}
  @Output() configTriggerChange = new EventEmitter<Trigger>();

  constructor() { 
    this.configTrigger = {} as Trigger;
    this.configTrigger.EdgexMessageBus = {Optional: {} , SubscribeHost: {},PublishHost: {}} as Trigger_EdgexMessageBus;
    this.configTrigger.EdgexMessageBus!.Optional = {} as EdgexMessageBusOptional;
    this.configTrigger.ExternalMqtt = {} as Trigger_ExternalMqtt;
    this.configTrigger.HTTP = {} as Trigger_HTTP;
  }

  ngOnInit(): void {
    this.renderPopoverComponent()
  }

  ngOnChanges(): void {
    this.configTriggerChange.emit(this.configTrigger);
  }

  renderPopoverComponent() {
    window.setTimeout(()=>{
        $('[data-toggle="popover"]').popover({
            trigger: 'hover'
        });
    },200)
  }

  onTriggerSelected() {
    this.renderPopoverComponent();
  }

}
