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

import { IntervalAction } from '../../../contracts/v2/interval-action';
import { SchedulerService } from '../../../services/scheduler.service';
import { MultiIntervalActionResponse } from '../../../contracts/v2/responses/interval-action-response';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-interval-action-list',
  templateUrl: './interval-action-list.component.html',
  styleUrls: ['./interval-action-list.component.css']
})
export class IntervalActionListComponent implements OnInit {

  intervalActionList: IntervalAction[] = [];
  intervalActionSelected: IntervalAction[] = [];
  isCheckedAll: boolean = false;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.findIntervalActionsPagination();
  }

  refresh() {
    this.schedulerSvc.findAllIntervalActionsPagination(0, this.pageLimit).subscribe((data: MultiIntervalActionResponse) => {
      this.intervalActionList = data.actions;
      this.msgSvc.success('refresh');
      this.resetPagination();
    });
  }

  findIntervalActionsPagination() {
    this.schedulerSvc.findAllIntervalActionsPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiIntervalActionResponse) => {
      this.intervalActionList = data.actions;
    });
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalActionSelected = [];
      this.intervalActionList.forEach(intervalAction => {
        this.intervalActionSelected.push(intervalAction);
        this.isChecked(intervalAction.name);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.intervalActionSelected = [];
    this.intervalActionList.forEach(intervalAction => {
      this.isChecked(intervalAction.name);
    });
  }

  isChecked(name: string): boolean {
    return this.intervalActionSelected.findIndex(v => v.name === name) >= 0;
  }

  selectOne(event: any, intervalAction: IntervalAction) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalActionSelected.push(intervalAction);
      if (this.intervalActionSelected.length === this.intervalActionList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(intervalAction.name);
    this.intervalActionSelected.splice(this.intervalActionSelected.indexOf(intervalAction), 1)
  }

  edit() {
    this.router.navigate(['../edit-interval'], {
      relativeTo: this.route,
      queryParams: { 'intervalName': this.intervalActionSelected[0].name }
    })
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  deleteIntervalActions() {
    this.intervalActionSelected.forEach(intervalAction => {
      this.schedulerSvc.deleteIntervalActionByName(intervalAction.name).subscribe(() => {
        this.intervalActionList.forEach((item, index) => {
          if (item.name === intervalAction.name) {
            this.intervalActionList.splice(index,1);
            return
          }
        });
        this.msgSvc.success('delete', `name: ${intervalAction.name}`);
        this.resetPagination();
        this.findIntervalActionsPagination();
      });
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  prePage() {
    this.setPagination(-1);
    this.findIntervalActionsPagination();
  }

  nextPage() {
    this.setPagination(1);
    this.findIntervalActionsPagination();
  }

  setPagination(n?: number) {
    if (n === 1) {
      this.pagination += 1;
    } else {
      this.pagination -= 1;
    }
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }

  resetPagination() {
    this.pagination = 1;
  }

}
