import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD
import { RuleEngineComponent } from './rule-engine.component';

const routes: Routes = [
  {
    path: '',
    component: RuleEngineComponent
  }
];
=======

const routes: Routes = [];
>>>>>>> d08a9c7... init scaffold
=======
import { RuleEngineComponent } from './rule-engine.component';

const routes: Routes = [
  {
    path: '',
    component: RuleEngineComponent
  }
];
>>>>>>> 65f645d... init router for each module, sidebar init

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleEngineRoutingModule { }
