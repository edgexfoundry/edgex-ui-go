import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../contracts/v2/notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notificationList: Notification[] = [];
  notificationSelected: Notification[] = [];
  isCheckedAll: boolean = false;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor() { }

  ngOnInit(): void {
  }

  refresh() {

  }
  
  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.notificationSelected = [];
      this.notificationList.forEach(notification => {
        this.notificationSelected.push(notification);
        this.isChecked(notification.id);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.notificationSelected = [];
    this.notificationList.forEach(notification => {
      this.isChecked(notification.id);
    });
  }

  isChecked(id: string): boolean {
    return this.notificationSelected.findIndex(v => v.id === id) >= 0;
  }

  selectOne(event: any, notification: Notification) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.notificationSelected.push(notification);
      if (this.notificationSelected.length === this.notificationList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(notification.id);
    this.notificationSelected.splice(this.notificationSelected.indexOf(notification), 1)
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  prePage() {
    this.setPagination(-1);
    // this.findIntervalsPagination();
  }

  nextPage() {
    this.setPagination(1);
    // this.findIntervalsPagination();
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
