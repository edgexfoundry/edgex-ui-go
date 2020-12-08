import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
  }
];
=======

const routes: Routes = [];
>>>>>>> d08a9c7... init scaffold

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
