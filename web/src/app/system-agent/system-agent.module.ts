import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SystemAgentRoutingModule } from './system-agent-routing.module';
import { SystemAgentComponent } from './system-agent.component';
import { MetricsComponent } from './metrics/metrics.component';
import { ConfigComponent } from './config/config.component';
import { ServiceListComponent } from './service-list/service-list.component';


@NgModule({
  declarations: [SystemAgentComponent, MetricsComponent, ConfigComponent, ServiceListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SystemAgentRoutingModule
  ]
})
export class SystemAgentModule { }
