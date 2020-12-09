import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceServiceComponent } from './device-service.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceServiceRoutingModule { }
