import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuleEngineComponent } from './rule-engine.component';

const routes: Routes = [
  {
    path: '',
    component: RuleEngineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleEngineRoutingModule { }
