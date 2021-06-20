import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppServiceRoutingModule } from './app-service-routing.module';
import { AppServiceComponent } from './app-service.component';
import { FormsModule } from '@angular/forms';
import { AppServiceListComponent } from './app-service-list/app-service-list.component';
import { AppServiceConfigurableComponent } from './app-service-configurable/app-service-configurable.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [AppServiceComponent,AppServiceListComponent,AppServiceConfigurableComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppServiceRoutingModule,
    AngularDraggableModule,
    AngularMultiSelectModule
  ]
})
export class AppServiceModule { }
