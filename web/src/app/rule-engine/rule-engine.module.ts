import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RuleEngineRoutingModule } from './rule-engine-routing.module';
import { StreamListComponent } from './stream/stream-list/stream-list.component';
import { StreamCenterComponent } from './stream/stream-center/stream-center.component';
import { AddStreamComponent } from './stream/add-stream/add-stream.component';
import { EditStreamComponent } from './stream/edit-stream/edit-stream.component';
import { RuleEngineComponent } from './rule-engine.component';
import { RulesListComponent } from './rules/rules-list/rules-list.component';
import { RulesCenterComponent } from './rules/rules-center/rules-center.component';
import { AddRulesComponent } from './rules/add-rules/add-rules.component';
import { EditRulesComponent } from './rules/edit-rules/edit-rules.component';
import { CommandModule } from '../command/command.module';

@NgModule({
  declarations: [RuleEngineComponent, StreamListComponent, StreamCenterComponent, AddStreamComponent, EditStreamComponent, RulesListComponent, RulesCenterComponent, AddRulesComponent, EditRulesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RuleEngineRoutingModule,
    CommandModule
  ]
})
export class RuleEngineModule { }
