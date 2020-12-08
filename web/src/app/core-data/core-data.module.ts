import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreDataRoutingModule } from './core-data-routing.module';
import { CoreDataComponent } from './core-data.component';


@NgModule({
  declarations: [CoreDataComponent],
  imports: [
    CommonModule,
    CoreDataRoutingModule
  ]
})
export class CoreDataModule { }
