import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleEngineRoutingModule } from './rule-engine-routing.module';
import { RuleEngineComponent } from './rule-engine.component';


@NgModule({
  declarations: [RuleEngineComponent],
  imports: [
    CommonModule,
    RuleEngineRoutingModule
  ]
})
export class RuleEngineModule { }
