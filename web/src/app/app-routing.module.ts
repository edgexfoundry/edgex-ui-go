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
import { AuthGuard } from './auth/guards/auth.guard';
import { InitializerComponent } from './initializer/initializer.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canLoad: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'system-agent',
    canLoad: [AuthGuard],
    loadChildren: () => import('./system-agent/system-agent.module').then(m => m.SystemAgentModule)
  },
  {
    path: 'metadata',
    canLoad: [AuthGuard],
    loadChildren: () => import('./metadata/metadata.module').then(m => m.MetadataModule)
  },
  {
    path: 'core-data',
    canLoad: [AuthGuard],
    loadChildren: () => import('./core-data/core-data.module').then(m => m.CoreDataModule),
  },
  {
    path: 'notifications',
    canLoad: [AuthGuard],
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'scheduler',
    canLoad: [AuthGuard],
    loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule)
  },
  {
    path: 'rule-engine',
    canLoad: [AuthGuard],
    loadChildren: () => import('./rule-engine/rule-engine.module').then(m => m.RuleEngineModule)
  },
  {
    path: 'app-service',
    canLoad: [AuthGuard],
    loadChildren: () => import('./app-service/app-service.module').then(m => m.AppServiceModule)
  },
  {
    path: 'initializer',
    component: InitializerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
