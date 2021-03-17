import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationCenterComponent } from './notification/notification-center/notification-center.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { SubscriptionCenterComponent } from './subscription/subscription-center/subscription-center.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { AddSubscriptionComponent } from './subscription/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscription/edit-subscription/edit-subscription.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
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
