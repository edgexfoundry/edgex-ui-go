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

import { CoreDataComponent } from './core-data.component';
import { EventComponent } from './event/event.component';
import { ReadingComponent } from './reading/reading.component';
import { AuthGuard } from '../guards/auth/guard/auth.guard';
import { CoredataAliveGuard } from '../guards/health/coredata-alive.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreDataComponent,
    canActivate: [AuthGuard, CoredataAliveGuard],
    canActivateChild: [CoredataAliveGuard],
    children: [
      {
        path: '',
        redirectTo: 'event',
        pathMatch: 'full'
      },
      {
        path: 'event',
        component: EventComponent
      },
      {
        path: 'reading',
        component:  ReadingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreDataRoutingModule { }
