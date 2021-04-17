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
import { IntervalComboListComponent } from './interval/interval-combo-list/interval-combo-list.component';
import { CommandModule } from '../command/command.module';

@NgModule({
  declarations: [SchedulerComponent, AddIntervalComponent, EditIntervalComponent, IntervalListComponent, IntervalActionListComponent, AddIntervalActionComponent, EditIntervalActionComponent, IntervalCenterComponent, IntervalActionCenterComponent, IntervalComboListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommandModule,
    SchedulerRoutingModule,
    
  ]
})
export class SchedulerModule { }
