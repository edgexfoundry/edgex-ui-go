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
import { ActivatedRoute } from '@angular/router';

import { RegistryCenterService } from '../..//services/registry-center.service';
import { Trigger } from '../../contracts/v2/appsvc/trigger';
import { Writable } from '../../contracts/v2/appsvc/writable';

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
    appServiceKey: string = '';

    constructor(private registrySvc: RegistryCenterService, private route: ActivatedRoute) {
        this.configTrigger = {} as Trigger;
        this.configWritable = {} as Writable;
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

    loadAppSvcConfig() {
        this.registrySvc.getAppSvcConfigBySvcKey(this.appServiceKey).subscribe((resp) => {
            Object.assign(this.configTrigger, resp[this.TirggerIdentifier]);
            Object.assign(this.configWritable, resp[this.writableIdentifier]);
        })
    }

    configurableSectionChange(configSection: string) {
        this.configurableSection = configSection;
        this.renderPopoverComponent();
    }
}
