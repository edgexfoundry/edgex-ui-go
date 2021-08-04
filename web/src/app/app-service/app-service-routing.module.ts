import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppServiceComponent } from './app-service.component';
import { AppServiceListComponent } from './app-service-list/app-service-list.component';
import { AppServiceConfigurableComponent } from './app-service-configurable/app-service-configurable.component';
import { AddAppServiceComponent } from './add-app-service/add-app-service.component';

const routes: Routes = [
  {
    path: '',
    component: AppServiceComponent,
    children: [
      {
        path: '',
        redirectTo: 'app-service-list',
        pathMatch: 'full',
      },
      {
        path: 'app-service-list',
        component: AppServiceListComponent,
      },
      {
        path: 'app-service-configurable',
        component: AppServiceConfigurableComponent,
      },
      {
        path: 'add-app-service',
        component: AddAppServiceComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServiceRoutingModule { }
