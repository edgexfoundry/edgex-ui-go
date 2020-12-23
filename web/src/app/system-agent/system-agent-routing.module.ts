import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemAgentComponent } from './system-agent.component';

const routes: Routes = [
  {
    path: '',
    component: SystemAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAgentRoutingModule { }
