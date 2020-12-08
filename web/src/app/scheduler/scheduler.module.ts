import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { SchedulerComponent } from './scheduler.component';


@NgModule({
  declarations: [SchedulerComponent],
=======


@NgModule({
  declarations: [],
>>>>>>> d08a9c7... init scaffold
=======
import { SchedulerComponent } from './scheduler.component';


@NgModule({
  declarations: [SchedulerComponent],
>>>>>>> f61e69e... add init component for each module
  imports: [
    CommonModule,
    SchedulerRoutingModule
  ]
})
export class SchedulerModule { }
