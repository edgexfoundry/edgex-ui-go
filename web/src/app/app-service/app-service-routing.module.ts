import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD
import { AppServiceComponent } from './app-service.component';

const routes: Routes = [
  {
    path: '',
    component: AppServiceComponent
  }
];
=======

const routes: Routes = [];
>>>>>>> d08a9c7... init scaffold
=======
import { AppServiceComponent } from './app-service.component';

const routes: Routes = [
  {
    path: '',
    component: AppServiceComponent
  }
];
>>>>>>> 65f645d... init router for each module, sidebar init

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServiceRoutingModule { }
