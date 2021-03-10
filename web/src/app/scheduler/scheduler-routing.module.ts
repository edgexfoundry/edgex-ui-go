import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulerComponent } from './scheduler.component';
import { IntervalCenterComponent } from './interval/interval-center/interval-center.component';
import { IntervalListComponent } from './interval/interval-list/interval-list.component';
import { AddIntervalComponent } from './interval/add-interval/add-interval.component';
import { EditIntervalComponent } from './interval/edit-interval/edit-interval.component';
import { IntervalActionCenterComponent } from './intervalaction/interval-action-center/interval-action-center.component';
import { IntervalActionListComponent } from './intervalaction/interval-action-list/interval-action-list.component';
import { AddIntervalActionComponent } from './intervalaction/add-interval-action/add-interval-action.component';
import { EditIntervalActionComponent } from './intervalaction/edit-interval-action/edit-interval-action.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    children: [
      {
        path: '',
        redirectTo: 'interval-center',
        pathMatch: 'full'
      },
      {
        path: 'interval-center',
        component: IntervalCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'interval-list',
            pathMatch: 'full'
          },
          {
            path: 'interval-list',
            component: IntervalListComponent
          },
          {
            path: 'add-interval',
            component: AddIntervalComponent
          },
          {
            path: 'edit-interval',
            component: EditIntervalComponent
          }
        ]
      },
      {
        path: 'interval-action-center',
        component: IntervalActionCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'interval-action-list',
            pathMatch: 'full'
          },
          {
            path: 'interval-action-list',
            component: IntervalActionListComponent
          },
          {
            path: 'add-interval-action',
            component: AddIntervalActionComponent
          },
          {
            path: 'edit-interval-action',
            component: EditIntervalActionComponent
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
export class SchedulerRoutingModule { }
