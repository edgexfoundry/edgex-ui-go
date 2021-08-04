import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppServiceRoutingModule } from './app-service-routing.module';
import { AppServiceComponent } from './app-service.component';
import { AppServiceListComponent } from './app-service-list/app-service-list.component';
import { AppServiceConfigurableComponent } from './app-service-configurable/app-service-configurable.component';

import { DraggableDirective } from '../directives/draggable.directive';
import { DragHighlightDirective } from '../directives/drag-highlight.directive';
import { AddAppServiceComponent } from './add-app-service/add-app-service.component';
import { MetadataModule } from '../metadata/metadata.module';
import { PipelineFunctionComponent } from './app-service-configurable/pipeline-function/pipeline-function.component';
import { TriggerComponent } from './app-service-configurable/trigger/trigger.component';
import { InsecureSecretsComponent } from './app-service-configurable/insecure-secrets/insecure-secrets.component';

@NgModule({
  declarations: [AppServiceComponent,AppServiceListComponent,AppServiceConfigurableComponent,DraggableDirective,DragHighlightDirective, AddAppServiceComponent, PipelineFunctionComponent, TriggerComponent, InsecureSecretsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppServiceRoutingModule,
    MetadataModule
  ]
})
export class AppServiceModule { }
