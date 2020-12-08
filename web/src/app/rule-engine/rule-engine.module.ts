import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleEngineRoutingModule } from './rule-engine-routing.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { RuleEngineComponent } from './rule-engine.component';


@NgModule({
  declarations: [RuleEngineComponent],
=======


@NgModule({
  declarations: [],
>>>>>>> d08a9c7... init scaffold
=======
import { RuleEngineComponent } from './rule-engine.component';


@NgModule({
  declarations: [RuleEngineComponent],
>>>>>>> f61e69e... add init component for each module
  imports: [
    CommonModule,
    RuleEngineRoutingModule
  ]
})
export class RuleEngineModule { }
