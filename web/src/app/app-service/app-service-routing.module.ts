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
import { AppServiceComponent } from './app-service.component';
import { AppServiceListComponent } from './app-service-list/app-service-list.component';
import { AppServiceConfigurableComponent } from './app-service-configurable/app-service-configurable.component';
import { AuthGuard } from '../guards/auth/guard/auth.guard';
import { RegistryCenterAliveGuard } from '../guards/health/registry-center-alive.guard';

const routes: Routes = [
  {
    path: '',
    component: AppServiceComponent,
    canActivate: [AuthGuard, RegistryCenterAliveGuard],
    canActivateChild: [RegistryCenterAliveGuard],
    children: [
      {
        path: '',
        redirectTo: 'app-service-list',
        pathMatch: 'full',
      },
      {
        path: 'app-service-list',
        component: AppServiceListComponent,
      },
      {
        path: 'app-service-configurable',
        component: AppServiceConfigurableComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServiceRoutingModule { }
