import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
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
=======
import { CoreDataComponent } from './core-data.component';

const routes: Routes = [
  {
    path: '',
    component: CoreDataComponent
  }
];
>>>>>>> 65f645d... init router for each module, sidebar init

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreDataRoutingModule { }
