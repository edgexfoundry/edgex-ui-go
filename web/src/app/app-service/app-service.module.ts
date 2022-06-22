/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppServiceRoutingModule } from './app-service-routing.module';
import { AppServiceComponent } from './app-service.component';
import { AppServiceListComponent } from './app-service-list/app-service-list.component';
import { AppServiceConfigurableComponent } from './app-service-configurable/app-service-configurable.component';

import { DragHighlightDirective } from '../directives/drag-highlight.directive';
import { MetadataModule } from '../metadata/metadata.module';
import { PipelineFunctionComponent } from './app-service-configurable/pipeline-function/pipeline-function.component';
import { TriggerComponent } from './app-service-configurable/trigger/trigger.component';
import { InsecureSecretsComponent } from './app-service-configurable/insecure-secrets/insecure-secrets.component';
import { StoreAndForwardComponent } from './app-service-configurable/store-and-forward/store-and-forward.component';
import { PipelineComponent } from "./app-service-configurable/pipeline/pipeline.component";
import { HTTPExportComponent } from './app-service-configurable/pipeline-function/httpexport/httpexport.component';
import { AddTagsComponent } from './app-service-configurable/pipeline-function/add-tags/add-tags.component';
import { BatchComponent } from './app-service-configurable/pipeline-function/batch/batch.component';
import { FilterByDeviceNameComponent } from './app-service-configurable/pipeline-function/filter-by-device-name/filter-by-device-name.component';
import { FilterByProfileNameComponent } from './app-service-configurable/pipeline-function/filter-by-profile-name/filter-by-profile-name.component';
import { FilterBySourceNameComponent } from './app-service-configurable/pipeline-function/filter-by-source-name/filter-by-source-name.component';
import { FilterByResourceNameComponent } from './app-service-configurable/pipeline-function/filter-by-resource-name/filter-by-resource-name.component';
import { TransformComponent } from './app-service-configurable/pipeline-function/transform/transform.component';
import { CompressComponent } from './app-service-configurable/pipeline-function/compress/compress.component';
import { EncryptComponent } from './app-service-configurable/pipeline-function/encrypt/encrypt.component';
import { MQTTExportComponent } from './app-service-configurable/pipeline-function/mqttexport/mqttexport.component';
import { PushToCoreComponent } from './app-service-configurable/pipeline-function/push-to-core/push-to-core.component';
import { SetResponseDataComponent } from './app-service-configurable/pipeline-function/set-response-data/set-response-data.component';
import { JSONLogicComponent } from './app-service-configurable/pipeline-function/jsonlogic/jsonlogic.component';

@NgModule({
  declarations: [AppServiceComponent,AppServiceListComponent,
    AppServiceConfigurableComponent,DragHighlightDirective, 
    PipelineFunctionComponent, TriggerComponent, 
    InsecureSecretsComponent, StoreAndForwardComponent, PipelineComponent, 
    HTTPExportComponent, AddTagsComponent, BatchComponent, FilterByDeviceNameComponent, 
    FilterByProfileNameComponent, FilterBySourceNameComponent, FilterByResourceNameComponent, 
    TransformComponent, CompressComponent, EncryptComponent, MQTTExportComponent, 
    PushToCoreComponent, SetResponseDataComponent, JSONLogicComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppServiceRoutingModule,
    MetadataModule
  ]
})
export class AppServiceModule { }
