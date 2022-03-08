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

import { Component, OnInit, OnChanges, Input, Output, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import { RESTSink } from '../../../../contracts/kuiper/sink';
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';
import { CommandServiceTemplateComponent }  from '../../../../command/command-service-template/command-service-template.component';

declare type RequestHeader = {
  [key: string]: any;
};

@Component({
  selector: 'app-rest-sink',
  templateUrl: './rest-sink.component.html',
  styleUrls: ['./rest-sink.component.css']
})
export class RestSinkComponent implements OnInit, OnChanges, AfterViewInit {

  SVC_TYPE_COMMAND = "command" // EdgeX command service
  SVC_TYPE_CUSTOM = "custom" // others http service
  templateTypeSelected: string = this.SVC_TYPE_COMMAND

  sinkBaseProperties: SinkBaseProperties = {} as SinkBaseProperties

  private _restSink: RESTSink;
  @Input() 
  get restSink(): RESTSink {return this._restSink};
  set restSink(sink: RESTSink) {
    Object.assign(this._restSink,sink)
  }
  @Output() restSinkChange = new EventEmitter<RESTSink>();

  requestHeaderList: RequestHeader[] = [];

  @ViewChild(CommandServiceTemplateComponent)
  private cmdSvcTemplate!:CommandServiceTemplateComponent
 
  constructor() {
    this._restSink = {
      method: 'GET',
      bodyType: 'json',
      debugResp: false,
      insecureSkipVerify: true,
      timeout: 5000,
      sendSingle: false,
      dataTemplate:''
    } as RESTSink;
  }

  ngOnInit(): void {
    Object.assign(this.sinkBaseProperties, this.restSink)
    if(this.restSink.headers) {
      for(const [k,v] of Object.entries(this.restSink.headers)) {
        this.requestHeaderList.push({key: k, value: v} as RequestHeader)
      }
    }
    this.renderPopoverComponent();
  }

  ngOnChanges(): void {
    this.restSinkChange.emit(this.restSink)
  }

  ngAfterViewInit(): void {
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  templateTypeToggle(templateType: string) {
    this.templateTypeSelected = templateType
    window.setTimeout(()=>{this.renderPopoverComponent()},1000)
  }

  requestHeaderChange($event: any) {
    this.headersResovler()
  }

  headersResovler() {
    let heards: RequestHeader = {};
    this.requestHeaderList.forEach((header) => {
      heards[`${header.key}`] = `${header.value}`
    })
    this.restSink.headers = heards;
    this.restSinkChange.emit(this.restSink);
  }

  addRequestHeader() {
    this.requestHeaderList.push({key:  '', value: ''})
  }
  
  removeRequestHeader(index: number, header?: RequestHeader) {
    this.requestHeaderList.splice(index,1)
    this.headersResovler();
  }

  onSinkBasePropertiesChange(sinkBaseProperties: SinkBaseProperties) {
    Object.assign(this.restSink, sinkBaseProperties)
  }

  onCmdSvcTemplateInfoChange(event: any) {
    this.getValuesSettingAllOfCommandTemplate()
  }

  getValuesSettingAllOfCommandTemplate() {
    this.restSink.method = this.cmdSvcTemplate.getHttpMethod()
    this.restSink.url = this.cmdSvcTemplate.getUrl()
    this.restSink.dataTemplate = this.cmdSvcTemplate.getRequestBodyJSONStr()
  }
}
