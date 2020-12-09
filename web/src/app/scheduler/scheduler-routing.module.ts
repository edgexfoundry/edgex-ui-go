import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
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
=======
import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
  }
];
>>>>>>> 65f645d... init router for each module, sidebar init

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
