import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { NotificationsComponent } from './notifications.component';


@NgModule({
  declarations: [NotificationsComponent],
=======


@NgModule({
  declarations: [],
>>>>>>> d08a9c7... init scaffold
=======
import { NotificationsComponent } from './notifications.component';


@NgModule({
  declarations: [NotificationsComponent],
>>>>>>> f61e69e... add init component for each module
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
