import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreDataComponent } from './core-data.component';

const routes: Routes = [
  {
    path: '',
    component: CoreDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreDataRoutingModule { }
