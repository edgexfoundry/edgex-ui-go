import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceServiceRoutingModule } from './device-service-routing.module';
import { DeviceServiceComponent } from './device-service.component';


@NgModule({
  declarations: [DeviceServiceComponent],
  imports: [
    CommonModule,
    DeviceServiceRoutingModule
  ]
})
export class DeviceServiceModule { }
