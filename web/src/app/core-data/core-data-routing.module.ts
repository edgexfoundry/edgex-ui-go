import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { CoreDataComponent } from './core-data.component';

const routes: Routes = [
  {
    path: '',
    component: CoreDataComponent
  }
];
=======

const routes: Routes = [];
>>>>>>> d08a9c7... init scaffold

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreDataRoutingModule { }
