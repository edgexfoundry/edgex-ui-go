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
import { Notification } from '../../../contracts/v2/notification';
import { NotificationsService } from '../../../services/notifications.service';
import { MultiNotificationResponse } from '../../../contracts/v2/responses/notification-response';
import { MessageService } from '../../../message/message.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notificationList: Notification[] = [];
  notificationSelected: Notification[] = [];
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;
  categorySelected: string = 'SECURITY';
  statusSelected: string = 'NEW';
  labelSelected?: string;
  startSelected?: number;
  endSelected?: number;
  ageCleanupAll?: number;
  ageCleanupByStatusIsProcessed?: number;
  calendarStart: any;
  calendarEnd: any;
  searchMode?: string;
  cleanMode?: string;
  advancedOperation: boolean = false;

  constructor(private notiSvc: NotificationsService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
    this.setSearchMode('status');
    this.findNotificationsByStatusPagination(true);
    this.initDatePickr();
  }

  initDatePickr() {
    this.calendarStart = flatpickr("input[name='startSelected']", {
      dateFormat: "U",
      altFormat: 'Y-m-d H:i:S',
      altInput: true,
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      onChange: (selectedDates, dateStr, instance) =>{
        this.startSelected = Number(dateStr) * 1000;
      }
    });
    this.calendarEnd = flatpickr("input[name='endSelected']", {
      dateFormat: "U",
      altFormat: 'Y-m-d H:i:S',
      altInput: true,
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      onChange: (selectedDates, dateStr, instance) =>{
        this.endSelected = Number(dateStr) * 1000;
      }
    });
    this.calendarStart = flatpickr("input[name='ageCleanupAll']", {
      dateFormat: "U",
      altFormat: 'Y-m-d H:i:S',
      altInput: true,
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      onChange: (selectedDates, dateStr, instance) =>{
        this.ageCleanupAll = Number(dateStr) * 1000;
      }
    });
    this.calendarEnd = flatpickr("input[name='ageCleanupByStatusIsProcessed']", {
      dateFormat: "U",
      altFormat: 'Y-m-d H:i:S',
      altInput: true,
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      onChange: (selectedDates, dateStr, instance) =>{
        this.ageCleanupByStatusIsProcessed = Number(dateStr) * 1000;
      }
    });
  }
  
  advancedToggle() {
    if (this.advancedOperation) {
      this.advancedOperation = false;
      return
    }
    this.advancedOperation = true;
  }

  findNotificationsByCategoryPagination(isPageOperation?: boolean) {
    this.notiSvc
    .findNotificationsByCategoryPagination(this.pageOffset, this.pageLimit, this.categorySelected as string)
    .subscribe((data: MultiNotificationResponse) => {
      this.notificationList = data.notifications;
      if (isPageOperation) {
        return
      }
      this.msgSvc.success('search by category')
    });
  }

  findNotificationsByStatusPagination(isPageOperation?: boolean) {
    this.notiSvc
    .findNotificationsByStatusPagination(this.pageOffset, this.pageLimit, this.statusSelected as string)
    .subscribe((data: MultiNotificationResponse) => {
      this.notificationList = data.notifications;
      if (isPageOperation) {
        return
      }
      this.msgSvc.success('search by status')
    });
  }

  findNotificationsByLabelPagination(isPageOperation?: boolean) {
    this.notiSvc
    .findNotificationsByLabelPagination(this.pageOffset, this.pageLimit, this.labelSelected as string)
    .subscribe((data: MultiNotificationResponse) => {
      this.notificationList = data.notifications;
      if (isPageOperation) {
        return
      }
      this.msgSvc.success('search by label')
    });
  }

  findNotificationsByStartEndPagination(isPageOperation?: boolean) {
    console.log(this.startSelected, this.endSelected)
    this.notiSvc
    .findNotificationsByStartEndPagination(this.pageOffset, this.pageLimit, this.startSelected as number, this.endSelected as number)
    .subscribe((data: MultiNotificationResponse) => {
      this.notificationList = data.notifications;
      if (isPageOperation) {
        return
      }
      this.msgSvc.success('search by start and end')
    });
  }

  setSearchMode(mode: string) {
    this.searchMode = mode;
  }

  searchByStatus() {
    this.resetPagination();
    this.setSearchMode('status');
    this.findNotificationsByStatusPagination();
  }

  searchByCategory() {
    this.resetPagination();
    this.setSearchMode('category');
    this.findNotificationsByCategoryPagination();
  }

  searchByStartEnd() {
    this.resetPagination();
    this.setSearchMode('duration');
    this.findNotificationsByStartEndPagination();
  }

  deleteConfirm(mode?: string) {
    this.cleanMode = mode;
    $("#deleteConfirmDialog").modal('show');
  }

  cleanup() {
    switch (this.cleanMode) {
      case 'age':
        this.cleanupByAge();
        break;
      case 'status':
        this.cleanupByAgeAndStatusIsProcessed();
        break;
      default:
        this.deleteSelected();
    }
  }

  cleanupByAge() {
    this.notiSvc.deleteNotificationByAgeAndStatus(this.ageCleanupAll as number).subscribe(() => {
      this.msgSvc.success('cleanup by age');
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  cleanupByAgeAndStatusIsProcessed() {
    this.notiSvc.deleteNotificationByAgeAndStatus(this.ageCleanupByStatusIsProcessed as number).subscribe(() => {
      this.msgSvc.success('cleanup by age when status is processed');
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  deleteSelected() {
    this.notificationSelected.forEach(noti => {
      this.notiSvc.deleteNotificationById(noti.id).subscribe(() => {
        this.msgSvc.success('delete',`ID: ${noti.id}`)
      })
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  isCheckedAll(): boolean {
    let checkedAll = true;
    if (this.notificationList && this.notificationList.length === 0) {
      checkedAll = false
    }
    this.notificationList.forEach(notification => {
      if (this.notificationSelected.findIndex(notificationSelected => notificationSelected.id === notification.id) === -1) {
        checkedAll = false
      }
    });
    return checkedAll
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.notificationList.forEach(notification => {
        if (this.notificationSelected.findIndex(notiSelected => notiSelected.id === notification.id) !== -1) {
          return
        }
        this.notificationSelected.push(notification);
      });
      return
    }
    this.notificationList.forEach(notification => {
      let found = this.notificationSelected.findIndex(notiSelected => notiSelected.id === notification.id)
      if (found !== -1) {
        this.notificationSelected.splice(found,1)
      }
    });
  }

  isChecked(id: string): boolean {
    return this.notificationSelected.findIndex(notification => notification.id === id) >= 0;
  }

  selectOne(event: any, notification: Notification) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.notificationSelected.push(notification)
      return
    }

    let found = this.notificationSelected.findIndex(notiSelected => notiSelected.id === notification.id)
    if (found !== -1) {
      this.notificationSelected.splice(found,1)
    }
  }

  paginationBySearchMode() {
    switch (this.searchMode) {
      case 'status':
        this.findNotificationsByStatusPagination(true);
        break;
      case 'category':
        this.findNotificationsByCategoryPagination(true);
        break;
      case 'duration':
        this.findNotificationsByStartEndPagination(true);
    }
  }

  onPageSelected() {
    this.resetPagination();
    this.paginationBySearchMode();
  }

  prePage() {
    this.setPagination(-1);
    this.paginationBySearchMode();
  }

  nextPage() {
    this.setPagination(1);
    this.paginationBySearchMode();
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
    this.setPagination();
  }

}
