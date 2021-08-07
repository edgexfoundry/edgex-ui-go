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

import { Subscription } from '../../../contracts/v2/subscription';
import { Address } from '../../../contracts/v2/address';
import { NotificationsService } from '../../../services/notifications.service';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { BaseResponse, BaseWithIdResponse} from '../../../contracts/v2/common/base-response';
import { SubscriptionResponse, MultiSubscriptionResponse } from '../../../contracts/v2/responses/subscription-response';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  subscriptionList: Subscription[] = [];
  subscriptionSelected: Subscription[] = [];
  // checkedSubscription?: Subscription;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(private notiSvc: NotificationsService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errSvc: ErrorService) { }

  ngOnInit(): void {
    this.findAllSubscriptionsPagination();
  }

  refresh() {
    this.notiSvc
    .findAllSubscriptionPagination(this.pageOffset, this.pageLimit)
    .subscribe((data: MultiSubscriptionResponse) => {
      this.subscriptionList = data.subscriptions;
      this.msgSvc.success('refresh');
    })
  }

  findAllSubscriptionsPagination() {
    this.notiSvc
    .findAllSubscriptionPagination(this.pageOffset, this.pageLimit)
    .subscribe((data: MultiSubscriptionResponse) => {
      this.subscriptionList = data.subscriptions;
    })
  }

  checkChannels(sub: Subscription) {
    // this.checkedSubscription = sub;
    this.router.navigate(['../edit-subscription'], {
      relativeTo: this.route,
      queryParams: { 'subName': sub.name }
    })
  }

  isCheckedAll(): boolean {
    let checkedAll = true;
    if (this.subscriptionList && this.subscriptionList.length === 0) {
      checkedAll = false
    }
    this.subscriptionList.forEach(subscription => {
      if (this.subscriptionSelected.findIndex(subscriptionSelected => subscriptionSelected.id === subscription.id) === -1) {
        checkedAll = false
      }
    });
    return checkedAll
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.subscriptionList.forEach(subscription => {
        if (this.subscriptionSelected.findIndex(sub => sub.name === subscription.name) !== -1) {
          return
        }
        this.subscriptionSelected.push(subscription);
      });
      return
    }
    this.subscriptionList.forEach(subscription => {
      let found = this.subscriptionSelected.findIndex(sub => sub.name === subscription.name);
      if (found !== -1) {
        this.subscriptionSelected.splice(found,1)
      }
    });
  }

  isChecked(name: string): boolean {
    return this.subscriptionSelected.findIndex(subscription => subscription.name === name) >= 0;
  }

  selectOne(event: any, subscription: Subscription) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.subscriptionSelected.push(subscription);
      return
    }
    let found = this.subscriptionSelected.findIndex(sub => sub.name === subscription.name);
    if (found !== -1) {
      this.subscriptionSelected.splice(found,1)
    }
  }

  edit() {
    this.router.navigate(['../edit-subscription'], {
      relativeTo: this.route,
      queryParams: { 'subName': this.subscriptionSelected[0].name }
    })
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  deleteSubs() {
    this.subscriptionSelected.forEach(sub => {
      this.notiSvc.deleteOneSubscriptionByName(sub.name).subscribe((data: BaseResponse) => {
        if (this.errSvc.handleErrorForV2API(data)){
          return
        }
        this.subscriptionList.forEach((item, index) => {
          if (item.name === sub.name) {
            this.subscriptionList.splice(index,1);
            return
          }
        });
        this.msgSvc.success('delete', `name: ${sub.name}`);
        this.resetPagination();
        this.findAllSubscriptionsPagination();
      });
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  onPageSelected() {
    this.resetPagination();
    this.setPagination();
    this.findAllSubscriptionsPagination();
  }

  prePage() {
    this.setPagination(-1);
    this.findAllSubscriptionsPagination();
  }

  nextPage() {
    this.setPagination(1);
    this.findAllSubscriptionsPagination();
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
