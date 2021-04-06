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

const routes: Routes = [
  {
    path: '',
    component: RuleEngineComponent,
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
