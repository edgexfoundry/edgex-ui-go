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

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {

  subscription: Subscription;
  channelTemplates: Address[] = [];
  subCategories: string = '';
  subLabels: string = '';

  constructor(private notiSvc: NotificationsService, 
    private msgSvc: MessageService,
    private errSvc: ErrorService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.subscription = { adminState: 'UNLOCKED' } as Subscription;
  }

  ngOnInit(): void {
    this.renderPopoverComponent();
  }

  renderPopoverComponent() {
    setTimeout(() => {
      $('[data-toggle="popover"]').popover({
        trigger: 'hover'
      });
    },150)
  }

  submit() {
    this.subscription.categories = this.subCategories.split(',');
    this.subscription.labels = this.subLabels.split(',');
    this.channelTemplates.forEach((chan,index) => {
      if (chan.type === 'EMAIL') {
        let temp = chan.recipients.toString();
        chan.recipients = temp.split(',')
      }
    })
    this.subscription.channels = this.channelTemplates;
    this.notiSvc.addOneSubscription(this.subscription).subscribe((resp) => {
      if (this.errSvc.handleErrorForV2API(resp)){
        return
      }
      this.msgSvc.success('Add new subscription', `Name: ${this.subscription.name}`);
      this.router.navigate(['../subscription-list'],{ relativeTo: this.route });
    })
  }

  addChannelTemplate(template: string) {
    switch (template) {
      case 'REST' :
        this.addRESTAddr(); 
        break
      case 'EMAIL':
        this.addEMAILAddr(); 
    }
  }

  removeChannelTemplate(addr: Address) {
    let index = this.channelTemplates.indexOf(addr);
    if (index === -1) {
      return
    }
    this.channelTemplates.splice(index,1);
    this.renderPopoverComponent();
  }

  addRESTAddr() {
    let addr: Address = {
      type: 'REST',
      httpMethod: 'GET',
    } as Address;
    this.channelTemplates.push(addr);
    this.renderPopoverComponent();
  }

  addEMAILAddr() {
    let addr: Address = {
      type: 'EMAIL',
    } as Address;
    this.channelTemplates.push(addr);
    this.renderPopoverComponent();
  }

  isPureIntegerType(value: any): boolean {
    if (!isNaN(value) && (parseFloat(value) === parseInt(value))) {
      return true
    }
    return false
  }

  validate(): boolean {
    let validateEachTemplate: boolean = false;
    if (this.channelTemplates.length !== 0) {
      this.channelTemplates.forEach((chan,index) => {
        if (chan.type === 'REST') {
          if (chan.path === '' || !chan.port ) {
            validateEachTemplate = true;
            return
          }
        }
        if (chan.type === 'EMAIL') {
          if (!chan.recipients) {
            validateEachTemplate = true;
            return
          }
        }
      })
    }

    if (validateEachTemplate || !this.subscription.name || 
    !this.subCategories || !this.subLabels || !this.subscription.receiver ||
    this.channelTemplates.length === 0
    ) { 
      return true
    }
    return false
  }
}
