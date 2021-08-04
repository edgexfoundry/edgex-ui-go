/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
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

import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppServiceService } from '../..//services/app-service.service';
import { MessageService } from '../../message/message.service';
import { MetadataService } from '../../services/metadata.service';
import { Trigger } from '../../contracts/v2/appsvc/trigger';
import { Writable } from '../../contracts/v2/appsvc/writable';
import { Pipeline } from '../../contracts/v2/appsvc/pipeline';
import { InsecureSecrets } from '../../contracts/v2/appsvc/insecure-secrets';
import { Functions, AddTags, Batch,Compress, Encrypt, 
    FilterByDeviceName, FilterByProfileName, FilterBySourceName, 
    FilterByResourceName, HTTPExport, MQTTExport, PushToCore,
    Transform,SetResponseData, JSONLogic } from '../../contracts/v2/appsvc/functions';

@Component({
    selector: 'app-app-service-configurable',
    templateUrl: './app-service-configurable.component.html',
    styleUrls: ['./app-service-configurable.component.css']
})
export class AppServiceConfigurableComponent implements OnInit {
    TirggerIdentifier = 'Trigger';
    writableIdentifier = 'Writable';
    configWritable: Writable;
    configTrigger: Trigger;

    configurableSection: string = "PipelineFunc"; // Trigger ,PipelineFunc, InsecureSecrets, StoreAndForward

    appServiceKey: string = 'app-rules-engine';
    availableFunctions: Functions;
    selectedFunctionsName: string[] = [];

    insecureSecrets: InsecureSecrets;

    constructor(private appSvc: AppServiceService, 
        private msgSvc: MessageService, 
        private metaSvc: MetadataService,
        private route: ActivatedRoute,
        private router: Router) {
            this.configTrigger = {} as Trigger;
            this.configWritable = {} as Writable;
            this.availableFunctions = {} as Functions;
            this.insecureSecrets = {} as InsecureSecrets;
    }
    
    ngOnInit(): void {
        this.route.queryParams.subscribe(param => {
            if (param['appSvcKey']) {
                this.appServiceKey = param['appSvcKey'];
                this.loadAppSvcConfig();
            }
        });
        this.renderPopoverComponent();
    }

    renderPopoverComponent() {
        window.setTimeout(()=>{
            $('[data-toggle="popover"]').popover({
                trigger: 'hover'
              });
        },200)
    }

    getFuncExecutionOrder(): string {
        return this.selectedFunctionsName.join(',');
    }

    loadAppSvcConfig() {
        this.appSvc.getAppSvcConfigBySvcKey(this.appServiceKey).subscribe((resp) => {

            Object.assign(this.configTrigger, resp[this.TirggerIdentifier])

            let writable: Writable = resp[this.writableIdentifier]
            Object.assign(this.configWritable, writable);
            Object.assign(this.insecureSecrets, writable.InsecureSecrets)

            this.selectedFunctionsName = writable.Pipeline.ExecutionOrder.split(',');
            Object.assign(this.availableFunctions, writable.Pipeline.Functions);
        })
    }

    configurableSectionChange(configSection: string) {
        this.configurableSection = configSection;
        this.renderPopoverComponent();
    }

    submit() {
        // console.log(this.getFuncExecutionOrder())
        let writable = {} as Writable;
        let pipeline: any = {
            ExecutionOrder: this.getFuncExecutionOrder(),
            Functions: {} 
        } as Pipeline;

        for (const [funcName, func] of Object.entries(this.availableFunctions)) {
            if(this.selectedFunctionsName.indexOf(funcName) !== -1) {
                pipeline.Functions[funcName] = func;
            }
        }

        writable.Pipeline = pipeline;
        writable.InsecureSecrets = this.insecureSecrets;
        writable.StoreAndForward = this.configWritable.StoreAndForward;
        // this.appSvc.deployToConsul({'Writable': writable}, this.appServiceKey).subscribe(()=>{
        //     this.msgSvc.success('deploy configuration',`service: ${this.appServiceKey}`);
        //     this.router.navigate(['../app-service-list'],{relativeTo: this.route})
        // })
    }

    removeSelectedFuncsAll() {
        this.selectedFunctionsName = [];
    }
}
