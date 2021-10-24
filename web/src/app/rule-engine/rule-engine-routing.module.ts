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
import { RuleEngineComponent } from './rule-engine.component';
import { AddRulesComponent } from './rules/add-rules/add-rules.component';
import { EditRulesComponent } from './rules/edit-rules/edit-rules.component';
import { RulesCenterComponent } from './rules/rules-center/rules-center.component';
import { RulesListComponent } from './rules/rules-list/rules-list.component';
import { AddStreamComponent } from './stream/add-stream/add-stream.component';
import { EditStreamComponent } from './stream/edit-stream/edit-stream.component';
import { StreamCenterComponent } from './stream/stream-center/stream-center.component';
import { StreamListComponent } from './stream/stream-list/stream-list.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RuleEngineComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'stream-center',
        pathMatch: 'full',
      },
      {
        path: 'stream-center',
        component: StreamCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'stream-list',
            pathMatch: 'full',
          },
          {
            path: 'stream-list',
            component: StreamListComponent,
          },
          {
            path: 'add-stream',
            component: AddStreamComponent,
          },
          {
            path: 'edit-stream',
            component: EditStreamComponent,
          }
        ]
      },
      {
        path: 'rules-center',
        component: RulesCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'rules-list',
            pathMatch: 'full',
          },
          {
            path: 'rules-list',
            component: RulesListComponent,
          },
          {
            path: 'add-rules',
            component: AddRulesComponent,
          },
          {
            path: 'edit-rules',
            component: EditRulesComponent,
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
export class RuleEngineRoutingModule { }
