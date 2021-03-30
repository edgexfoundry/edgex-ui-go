import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { AddIntervalComponent } from './interval/add-interval/add-interval.component';
import { EditIntervalComponent } from './interval/edit-interval/edit-interval.component';
import { IntervalListComponent } from './interval/interval-list/interval-list.component';
import { IntervalActionListComponent } from './intervalaction/interval-action-list/interval-action-list.component';
import { AddIntervalActionComponent } from './intervalaction/add-interval-action/add-interval-action.component';
import { EditIntervalActionComponent } from './intervalaction/edit-interval-action/edit-interval-action.component';
import { IntervalCenterComponent } from './interval/interval-center/interval-center.component';
import { IntervalActionCenterComponent } from './intervalaction/interval-action-center/interval-action-center.component';


@NgModule({
  declarations: [SchedulerComponent, AddIntervalComponent, EditIntervalComponent, IntervalListComponent, IntervalActionListComponent, AddIntervalActionComponent, EditIntervalActionComponent, IntervalCenterComponent, IntervalActionCenterComponent],
  imports: [
    CommonModule,
    FormsModule,
    SchedulerRoutingModule
  ]
})
export class SchedulerModule { }
