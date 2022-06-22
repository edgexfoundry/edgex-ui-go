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

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pipeline, PerTopicPipeline } from '../../../contracts/v2/appsvc/pipeline';
import { Functions } from "../../../contracts/v2/appsvc/functions";
import { Writable } from "../../../contracts/v2/appsvc/writable";
import { RegistryCenterService } from "../../../services/registry-center.service";
import { MessageService } from "../../../message/message.service";

@Component({
  selector: 'app-appsvc-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
})
export class PipelineComponent implements OnInit, OnChanges {

  defaultPipelineIdentifier = 'default-pipeline' //unique and immutable
  isEditStatus: boolean = false;

  selectedFunctionsName: string[] = []
  availableFunctions: Functions | any
  pipelineTopic: string = '#'
  selectedPipelineID: string = ''

  @Input() appServiceKey: string = ''
  @Input() pipeline: Pipeline

  perTopicPipelines: PerTopicPipeline[]  = []

  constructor(private route: ActivatedRoute,
    private router: Router,
    private registrySvc: RegistryCenterService,
    private msgSvc: MessageService) {
    this.pipeline = {} as Pipeline
    this.availableFunctions = {}
  }

  ngOnInit(): void {
    this.renderPopoverComponent()
  }

  renderPopoverComponent() {
    window.setTimeout(()=>{
        $('[data-toggle="popover"]').popover({
            trigger: 'hover'
          });
    },200)
  }

  ngOnChanges(): void {
    if (this.pipeline) {
      if (this.pipeline.PerTopicPipelines) {
        this.perTopicPipelines =  Object.values(this.pipeline.PerTopicPipelines)
      }
      this.availableFunctions = this.pipeline.Functions
      this.selectedFunctionsName = this.pipeline.ExecutionOrder.split(',')
    }
  }

  pipelineIDIsUnique(id: string): boolean {
    if (id === this.selectedPipelineID) {
      return true
    }

    if (id === this.defaultPipelineIdentifier) {
      return false
    }

    let isUnique: boolean = true
    this.perTopicPipelines.forEach((ptp) => {
      if (id === ptp.Id) {
        isUnique = false
        return
      }
    })
    return isUnique
  }

  isDefaultPipelineIndetifier(id: string): boolean {
    if (id === this.defaultPipelineIdentifier) {
      return  true
    }
    return false
  }

  edit(pipelineID: string) {
    this.selectedPipelineID = pipelineID
    if (this.isDefaultPipelineIndetifier(pipelineID)) {
      this.selectedFunctionsName = this.pipeline.ExecutionOrder.split(',')
    } else {
      this.perTopicPipelines.forEach(ptp => {
        if (pipelineID === ptp.Id) {
          this.selectedFunctionsName = ptp.ExecutionOrder.split(',') 
          this.pipelineTopic = ptp.Topics
        }
      })
    }
    this.isEditStatus = true
    this.renderPopoverComponent()
  }

  getFuncExecutionOrder(): string {
    return this.selectedFunctionsName.join(',');
  }

  validate(): boolean {
    let isValid: boolean = true
    
    this.selectedFunctionsName.forEach(name => {
      if (name.startsWith('PushToCore')) {
        if (this.availableFunctions[name].Parameters.ValueType === 'Binary' &&
        this.availableFunctions[name].Parameters.MediaType === '') {
          isValid = false
          return
        }
      }

      if (name.startsWith('MQTTExport')) {
        if (this.availableFunctions[name].Parameters.AuthMode !== 'none' &&
        this.availableFunctions[name].Parameters.SecretPath === '') {
          isValid = false
          return
        }
      }
    })

    return isValid
  }

  save() {
    let writableRequestObj = {} as Writable;
    let pipelineRequestObj = {
        PerTopicPipelines: {}
    } as Pipeline

    let functions: any | Functions = {}
    this.selectedFunctionsName.forEach(funcName => {
      functions[funcName] = this.availableFunctions[funcName]
    })

    pipelineRequestObj.Functions = functions

    if (this.isDefaultPipelineIndetifier(this.selectedPipelineID)) {
      pipelineRequestObj.ExecutionOrder = this.getFuncExecutionOrder()
    } else {
      for (const [key, ptp] of Object.entries(this.pipeline.PerTopicPipelines)) {
        if (this.selectedPipelineID === ptp.Id) {
          ptp.ExecutionOrder = this.getFuncExecutionOrder()
          ptp.Topics = this.pipelineTopic
          pipelineRequestObj.PerTopicPipelines[key] = ptp
          break
        }
      }
    }

    writableRequestObj.Pipeline = pipelineRequestObj;
    this.registrySvc.deployToConsul({'Writable': writableRequestObj}, this.appServiceKey).subscribe(()=>{
      this.msgSvc.success('deploy Pipeline configuration',`service: ${this.appServiceKey}`);
      this.isEditStatus = false
      this.router.navigate(['../app-service-list'],{relativeTo: this.route})
    })
  }

  cancel() {
    this.isEditStatus = false
  }
}
