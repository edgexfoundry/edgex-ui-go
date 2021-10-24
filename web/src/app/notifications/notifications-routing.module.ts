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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationCenterComponent } from './notification/notification-center/notification-center.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { SubscriptionCenterComponent } from './subscription/subscription-center/subscription-center.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { AddSubscriptionComponent } from './subscription/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscription/edit-subscription/edit-subscription.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'notification-center',
        pathMatch: 'full'
      },
      {
        path: 'notification-center',
        component: NotificationCenterComponent,
        children: [
          {
            path: '',
            component: NotificationListComponent
          }
        ]
      },
      {
        path: 'subscription-center',
        component: SubscriptionCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'subscription-list',
            pathMatch: 'full'
          },
          {
            path: 'subscription-list',
            component: SubscriptionListComponent
          },
          {
            path: 'add-subscription',
            component: AddSubscriptionComponent
          },
          {
            path: 'edit-subscription',
            component: EditSubscriptionComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
