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

import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Interval } from '../../../contracts/v2/interval';
import { SchedulerService } from '../../../services/scheduler.service';
import { IntervalResponse } from '../../../contracts/v2/responses/interval-response';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { BaseResponse } from '../../../contracts/v2/common/base-response';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-edit-interval',
  templateUrl: './edit-interval.component.html',
  styleUrls: ['./edit-interval.component.css']
})
export class EditIntervalComponent implements OnInit, OnDestroy {

  interval?: Interval;
  calendarStart: any;
  calendarEnd: any;

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errSvc: ErrorService) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(param => {
      if (param['intervalName']) {
        this.schedulerSvc.findIntervalByName(param['intervalName']).subscribe((data: IntervalResponse) => {
          if (this.errSvc.handleErrorForV2API(data)){
            return
          }
          this.interval = data.interval;
          this.interval.runOnce = this.interval.runOnce?true:false;
          setTimeout(() => {
            this.initDatePickr();
          }, 300);
        });
      }
    });
  }

  initDatePickr() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
    this.calendarStart = flatpickr("input[name='intervalStart']", {
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false
    });
    this.calendarEnd = flatpickr("input[name='intervalEnd']", {
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false
    });
  }

  update() {
    this.schedulerSvc.updateInterval(this.interval as Interval).subscribe((data: BaseResponse[]) => {
      if (this.errSvc.handleErrorForV2API(data)){
        return
      }
      this.msgSvc.success('update interval', `name: ${this.interval?.name}`);
      this.router.navigate(['../interval-list'],{relativeTo: this.route})
    });
  }

  ngOnDestroy(): void {
    $('[data-toggle="popover"]').popover('dispose');
  }
}

