import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { EdgexSinkComponent } from './rules/sinks/edgex-sink/edgex-sink.component';
import { RestSinkComponent } from './rules/sinks/rest-sink/rest-sink.component';
import { MqttSinkComponent } from './rules/sinks/mqtt-sink/mqtt-sink.component';
import { NopSinkComponent } from './rules/sinks/nop-sink/nop-sink.component';
import { SinkListComponent } from './rules/sinks/sink-list/sink-list.component';
import { RuleAdvancedOptionsComponent } from './rules/rule-advanced-options/rule-advanced-options.component';
import { MetadataModule } from '../metadata/metadata.module';
import { SinkBasePropertiesComponent } from './rules/sinks/sink-base-properties/sink-base-properties.component';
import { EdgexSinkOptionalComponent } from './rules/sinks/edgex-sink/edgex-sink-optional/edgex-sink-optional.component';
import { LogSinkComponent } from './rules/sinks/log-sink/log-sink.component';

@NgModule({
  declarations: [RuleEngineComponent, StreamListComponent, StreamCenterComponent, 
    AddStreamComponent, EditStreamComponent, RulesListComponent, RulesCenterComponent, 
    AddRulesComponent, EditRulesComponent, EdgexSinkComponent, RestSinkComponent, 
    MqttSinkComponent, NopSinkComponent, SinkListComponent, 
   RuleAdvancedOptionsComponent, SinkBasePropertiesComponent, EdgexSinkOptionalComponent, LogSinkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RuleEngineRoutingModule,
    CommandModule,
    MetadataModule
  ]
})
export class RuleEngineModule { }
