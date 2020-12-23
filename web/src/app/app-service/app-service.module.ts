import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppServiceRoutingModule } from './app-service-routing.module';
import { AppServiceComponent } from './app-service.component';


@NgModule({
  declarations: [AppServiceComponent],
  imports: [
    CommonModule,
    AppServiceRoutingModule
  ]
})
export class AppServiceModule { }
