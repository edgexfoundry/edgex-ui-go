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
import { IntervalActionResponse } from '../../../contracts/v2/responses/interval-action-response';
import { IntervalResponse } from '../../../contracts/v2/responses/interval-response';
import { CoreCommand } from '../../../contracts/v2/core-command';

import flatpickr from 'flatpickr';

@Component({
  selector: 'app-edit-interval-action',
  templateUrl: './edit-interval-action.component.html',
  styleUrls: ['./edit-interval-action.component.css']
})
export class EditIntervalActionComponent implements OnInit {

  addr_type_REST: string = 'REST';
  addr_type_MQTT: string = 'MQTT';
  addr_type_EMAIL: string = 'EMAIL';

  template_type_coredata = 'coredata';
  template_type_command = 'command';
  template_type_custom = 'custom';

  intervalActionOrigin: IntervalAction;
  intervalAction: IntervalAction;
  addressEmailRecipients: string = "";
  selectedIntervalDefault?: Interval;
  templateSelected: string = "custom";
  coredataRequestParameter = '';
  calendarStart: any;

  coredataSvcAvailableAPI: string[] = [
    "/api/v2/event/age/"
  ];

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errSvc: ErrorService) {
      this.intervalAction = {} as IntervalAction;
      this.intervalActionOrigin = {} as IntervalAction;
      this.intervalAction.address = {} as Address;
  }

  ngOnInit(): void {
    this.renderPopoverComponent();
    this.route.queryParams.subscribe(params => {
      if (params['intervalActionName']) {
        this.schedulerSvc.findIntervalActionByName(params['intervalActionName']).subscribe((resp: IntervalActionResponse)=>{
          this.intervalAction = JSON.parse(JSON.stringify(resp.action));
          this.intervalActionOrigin = JSON.parse(JSON.stringify(resp.action));

          this.intervalActionOrigin.adminState = this.intervalActionOrigin.adminState === '' ? "UNLOCKED" : this.intervalActionOrigin.adminState;
          this.intervalAction.adminState = this.intervalAction.adminState === '' ? "UNLOCKED" : this.intervalAction.adminState;

          this.addressEmailRecipients  = this.intervalAction.address.recipients?this.intervalAction.address.recipients.toString():'';
          this.findDefaultSelectedIntervalByName(this.intervalAction.intervalName);
          setTimeout(() => {
            this.renderPopoverComponent();
            this.initDatePickr();
          }, 300);
        });
      }
    })
  }

  initDatePickr() {
    let that = this;
    this.calendarStart = flatpickr("input[name='coredataRequestParameter']", {
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      onChange: function(selectedDates, dateStr, instance) {
          that.intervalAction.address.path = that.coredataSvcAvailableAPI[0] + dateStr;
      },
    });
  }

  setActionDefaultProperties() {
   switch (this.intervalAction.address.type) {
      case this.addr_type_REST:
        this.intervalAction.address.httpMethod = 'GET';
        break
      case this.addr_type_MQTT:
        this.intervalAction.address.retained = false;
        this.intervalAction.address.autoReconnect = true;
        break
      default:
   }
  }

  findDefaultSelectedIntervalByName(name: string) {
    this.schedulerSvc.findIntervalByName(name).subscribe((resp: IntervalResponse)=>{
      this.selectedIntervalDefault = resp.interval;
    });
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  renderCoredataDefaultTemplate() {
    this.intervalAction.address.httpMethod = 'DELETE';
    this.intervalAction.address.host = 'edgex-core-data';
    this.intervalAction.address.port = 59880;
    this.intervalAction.address.path = this.coredataSvcAvailableAPI[0];
    setTimeout(() => {
      this.renderPopoverComponent();
      this.initDatePickr();
    }, 300);
  }

  templateToggle(template: string) {
    this.intervalAction = JSON.parse(JSON.stringify(this.intervalActionOrigin));
    this.intervalAction.address.type = this.addr_type_REST;
    this.templateSelected = template;
    switch (this.templateSelected) {
      case this.template_type_coredata:
        this.renderCoredataDefaultTemplate();
        break;
      case this.template_type_command:
        this.intervalAction.address.path = '';
        this.intervalAction.address.httpMethod = '';
        setTimeout(() => {
          this.renderPopoverComponent();
        }, 300); 
        break;
      case this.template_type_custom:
        setTimeout(() => {
          this.renderPopoverComponent();
        }, 300); 
    }
  }

  typeToggle(type: string) {
    this.intervalAction = JSON.parse(JSON.stringify(this.intervalActionOrigin));
    this.intervalAction.address.type = type;
    this.templateSelected = 'custom';
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 300); 
    // this.setActionDefaultProperties();
  }

  onCmdMethodSelected(method: string) {
    this.intervalAction.address.httpMethod = method;
  }

  onCommandSelected(cmd: CoreCommand) {
    this.intervalAction.address.path = cmd.path;
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
      case this.addr_type_REST:
        if (basic && this.intervalAction.address.host && this.isPureIntegerType(this.intervalAction.address.port) &&
          this.intervalAction.address.path && this.intervalAction.address.httpMethod) {
            result = false
        }
        break
      case this.addr_type_MQTT: 
        if (basic && this.intervalAction.address.host && this.isPureIntegerType(this.intervalAction.address.port) &&
          this.intervalAction.address.port &&
          this.intervalAction.address.publisher &&
          this.intervalAction.address.topic) {
            result = false
        }
        break
      case this.addr_type_EMAIL:
        if (basic) {
          result = false
        }
    }
    return result
  }

  save() {
    this.intervalAction.address.recipients = this.addressEmailRecipients.split(',');
    this.intervalAction.address.port = Number(this.intervalAction.address.port);
    this.schedulerSvc.updateIntervalAction(this.intervalAction).subscribe(()=>{
      this.msgSvc.success('Update interval action',`name: ${this.intervalAction.name}`);
      this.router.navigate(['../interval-action-list'],{ relativeTo: this.route });
    });
  }
}
