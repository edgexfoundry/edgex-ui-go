import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { AddSubscriptionComponent } from './subscription/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscription/edit-subscription/edit-subscription.component';
import { SubscriptionCenterComponent } from './subscription/subscription-center/subscription-center.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { NotificationCenterComponent } from './notification/notification-center/notification-center.component';

@NgModule({
  declarations: [NotificationsComponent, SubscriptionListComponent, AddSubscriptionComponent, EditSubscriptionComponent, SubscriptionCenterComponent, NotificationListComponent, NotificationCenterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
