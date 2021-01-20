import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
import { FormsModule } from '@angular/forms';

>>>>>>> 727932f... Finished system agent module basic feature

import { SystemAgentRoutingModule } from './system-agent-routing.module';
import { SystemAgentComponent } from './system-agent.component';
import { MetricsComponent } from './metrics/metrics.component';
import { ConfigComponent } from './config/config.component';
import { ServiceListComponent } from './service-list/service-list.component';


@NgModule({
  declarations: [SystemAgentComponent, MetricsComponent, ConfigComponent, ServiceListComponent],
  imports: [
    CommonModule,
<<<<<<< HEAD
>>>>>>> d08a9c7... init scaffold
=======
    FormsModule,
>>>>>>> 727932f... Finished system agent module basic feature
    SystemAgentRoutingModule
  ]
})
export class SystemAgentModule { }
