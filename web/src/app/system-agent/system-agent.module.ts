import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemAgentRoutingModule } from './system-agent-routing.module';
import { SystemAgentComponent } from './system-agent.component';


@NgModule({
  declarations: [SystemAgentComponent],
  imports: [
    CommonModule,
    SystemAgentRoutingModule
  ]
})
export class SystemAgentModule { }
