import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreDataRoutingModule } from './core-data-routing.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { CoreDataComponent } from './core-data.component';


@NgModule({
  declarations: [CoreDataComponent],
=======


@NgModule({
  declarations: [],
>>>>>>> d08a9c7... init scaffold
=======
import { CoreDataComponent } from './core-data.component';


@NgModule({
  declarations: [CoreDataComponent],
>>>>>>> f61e69e... add init component for each module
  imports: [
    CommonModule,
    CoreDataRoutingModule
  ]
})
export class CoreDataModule { }
