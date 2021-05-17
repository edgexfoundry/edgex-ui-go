import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreDataRoutingModule } from './core-data-routing.module';
import { CoreDataComponent } from './core-data.component';
import { EventComponent } from './event/event.component';
import { ReadingComponent } from './reading/reading.component';


@NgModule({
  declarations: [CoreDataComponent, EventComponent, ReadingComponent],
  imports: [
    CommonModule,
    CoreDataRoutingModule
  ]
})
export class CoreDataModule { }
