import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { AddSubscriptionComponent } from './subscription/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscription/edit-subscription/edit-subscription.component';

@NgModule({
  declarations: [NotificationsComponent, SubscriptionListComponent, AddSubscriptionComponent, EditSubscriptionComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
