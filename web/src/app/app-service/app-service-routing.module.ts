import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppServiceComponent } from './app-service.component';

const routes: Routes = [
  {
    path: '',
    component: AppServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServiceRoutingModule { }
