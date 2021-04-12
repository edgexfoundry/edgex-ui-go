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
import { Router, ActivatedRoute } from '@angular/router';

import { Interval } from '../../../contracts/v2/interval';
import { SchedulerService } from '../../../services/scheduler.service';
import { MultiIntervalResponse, IntervalResponse } from '../../../contracts/v2/responses/interval-response';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { BaseResponse } from '../../../contracts/v2/common/base-response';

@Component({
  selector: 'app-interval-list',
  templateUrl: './interval-list.component.html',
  styleUrls: ['./interval-list.component.css']
})
export class IntervalListComponent implements OnInit {

  @Input() enableSelectAll: boolean = true;
  @Output() singleIntervalSelectedEvent = new EventEmitter<Interval>();
  @Input() toolbars: boolean = true;
  intervalList: Interval[] = [];
  intervalSelected: Interval[] = [];
  @Input() singleIntervalSelected?: Interval;
  isCheckedAll: boolean = false;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errSvc: ErrorService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['intervalName']) {
        this.schedulerSvc.findIntervalByName(params['intervalName']).subscribe((resp:IntervalResponse)=>{
          this.intervalList = [];
          this.intervalList.push(resp.interval);
          return
        })
      } else {
        this.findIntervalsPagination();
      }
    })
  }

  refresh() {
    this.schedulerSvc.findAllIntervalsPagination(0, this.pageLimit).subscribe((data: MultiIntervalResponse) => {
      if (this.errSvc.handleErrorForV2API(data)){
        return
      }
      this.intervalList = data.intervals;
      this.msgSvc.success('refresh');
      this.resetPagination();
    });
  }

  findIntervalsPagination() {
    this.schedulerSvc.findAllIntervalsPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiIntervalResponse) => {
      if (this.errSvc.handleErrorForV2API(data)){
        return
      }
      this.intervalList = data.intervals;
    });
  }

  onSingleIntervalSelectedEmitter() {
    this.singleIntervalSelectedEvent.emit(this.singleIntervalSelected);
  }

  isSingleChecked(name: string) {
    return this.singleIntervalSelected?.name === name;
  }

  selectSingleInterval(event: any, name: string) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalList.forEach((interval) => {
        if (interval.name === name) {
          this.singleIntervalSelected = interval;
        }
      });
    } else {
      this.singleIntervalSelected = {} as Interval;
    }
    this.onSingleIntervalSelectedEmitter();
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalSelected = [];
      this.intervalList.forEach(interval => {
        this.intervalSelected.push(interval);
        this.isChecked(interval.name);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.intervalSelected = [];
    this.intervalList.forEach(interval => {
      this.isChecked(interval.name);
    });
  }

  isChecked(name: string): boolean {
    if (!this.enableSelectAll) {
      return this.isSingleChecked(name)
    }
    return this.intervalSelected.findIndex(v => v.name === name) >= 0;
  }

  selectOne(event: any, interval: Interval) {
    if (!this.enableSelectAll) {
      this.selectSingleInterval(event, interval.name);
      return
    }
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalSelected.push(interval);
      if (this.intervalSelected.length === this.intervalList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(interval.name);
    this.intervalSelected.splice(this.intervalSelected.indexOf(interval), 1)
  }

  edit() {
    this.router.navigate(['../edit-interval'], {
      relativeTo: this.route,
      queryParams: { 'intervalName': this.intervalSelected[0].name }
    })
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  deleteIntervals() {
    this.intervalSelected.forEach(interval => {
      this.schedulerSvc.deleteIntervalByName(interval.name).subscribe((data: BaseResponse[]) => {
        if (this.errSvc.handleErrorForV2API(data)){
          return
        }
        this.intervalList.forEach((item, index) => {
          if (item.name === interval.name) {
            this.intervalList.splice(index,1);
            return
          }
        });
        this.msgSvc.success('delete', `name: ${interval.name}`);
        this.resetPagination();
        this.findIntervalsPagination();
      });
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  onPageSelected() {
    this.setPagination();
    this.findIntervalsPagination();
  }

  prePage() {
    this.setPagination(-1);
    this.findIntervalsPagination();
  }

  nextPage() {
    this.setPagination(1);
    this.findIntervalsPagination();
  }

  setPagination(n?: number) {
    if (n === 1) {
      this.pagination += 1;
    } else if (n === -1) {
      this.pagination -= 1;
    }
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }

  resetPagination() {
    this.pagination = 1;
  }
}
