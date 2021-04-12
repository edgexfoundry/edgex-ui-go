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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SchedulerService } from '../../../services/scheduler.service';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { Address } from '../../../contracts/v2/address';

import { IntervalAction } from '../../../contracts/v2/interval-action';
import { Interval } from '../../../contracts/v2/interval';

@Component({
  selector: 'app-add-interval-action',
  templateUrl: './add-interval-action.component.html',
  styleUrls: ['./add-interval-action.component.css']
})
export class AddIntervalActionComponent implements OnInit {

  intervalAction: IntervalAction;
  addressEmailRecipients: string = "";

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errSvc: ErrorService) { 
      this.intervalAction = {} as IntervalAction;
      this.intervalAction.address = {} as Address;
      this.intervalAction.address.type = 'REST';
      this.intervalAction.address.httpMethod = 'GET';
      this.intervalAction.address.retained = false;
      this.intervalAction.address.autoReconnect = true;
    }

  ngOnInit(): void {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  typeToggle(type: string) {
    this.intervalAction.address.type = type;
  }

  onSingleIntervalSelected(interval: Interval) {
    this.intervalAction.intervalName = interval.name;
  }

  isPureIntegerType(value: any): boolean {
    if (!isNaN(value) && (parseFloat(value) === parseInt(value))) {
      return true
    }
    return false
  }

  validate(): boolean {
    let result = true;
    let basic =  this.intervalAction.name && this.intervalAction.intervalName; 
    switch (this.intervalAction.address.type) {
      case 'REST':
        if (basic && this.intervalAction.address.host && this.isPureIntegerType(this.intervalAction.address.port) &&
          this.intervalAction.address.port) {
            result = false
        }
        break
      case 'MQTT': 
        if (basic && this.intervalAction.address.host && this.isPureIntegerType(this.intervalAction.address.port) &&
          this.intervalAction.address.port &&
          this.intervalAction.address.publisher &&
          this.intervalAction.address.topic) {
            result = false
        }
        break
      case 'EMAIL':
        if (basic) {
          result = false
        }
    }
    return result
  }

  submit() {
    this.intervalAction.address.recipients = this.addressEmailRecipients.split(',');
    console.log(this.intervalAction.address.recipients)
    this.schedulerSvc.addIntervalAction(this.intervalAction).subscribe(() => {
      this.msgSvc.success('Add interval action',`name: ${this.intervalAction.name}`)
    })
  }
}
