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

import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CoreCommandParameter, CoreCommand } from '../../contracts/v2/core-command';
import { CommandServiceInfo } from './interfaces/command-service-info';
import { MetadataService } from '../../services/metadata.service';
import { CommandService } from '../../services/command.service';
import { DeviceCoreCommandResponse } from '../../contracts/v2/responses/device-core-command-response';

declare type Parameter = {
  [key: string]: any
}

@Component({
  selector: 'app-command-service-template',
  templateUrl: './command-service-template.component.html',
  styleUrls: ['./command-service-template.component.css']
})
export class CommandServiceTemplateComponent implements OnInit, AfterViewInit {

  //command path example: /api/v2/device/name/Random-Integer-Device/Int16
  cmdURLFixedPrefix: string = '/api/v2/device/name/'
  notCommandPathMsgShow: boolean = false
  deviceName: string = ''
  commandName: string =  ''
  parameter: Parameter = {} as Parameter

  private _url: string = ''
  @Input() 
  get url(): string {return this._url}
  set url(url: string) {
    this._url = url
    if (this._url) {
      this.urlParser(url)
    }
  }

  private _httpMethod: string = ''
  @Input() 
  get httpMethod(): string {return this._httpMethod}
  set httpMethod(method: string) {
    this._httpMethod = method
    this.cmdSvcInfo.httpMethod = this._httpMethod
  }

  private  _requestBodyJSONStr: string = ''
  @Input() 
  get requestBodyJSONStr(): string {return this._requestBodyJSONStr}
  set requestBodyJSONStr(bodyData: string) {
    this._requestBodyJSONStr = bodyData
  }

  @Input() cmdSvcInfo: CommandServiceInfo
  @Output() cmdSvcInfoChange = new EventEmitter<CommandServiceInfo>()

  profileForm = new FormGroup({
    host: new FormControl(''),
    port: new FormControl(''),
    path: new FormControl(''),
    httpMethod: new FormControl(''),
    pushEventOfGetCmdParamter: new FormControl(''),
    returnEventOfGetCmdParamter: new FormControl(''),
  });

  constructor(private metedataSvc: MetadataService, private cmdSvc: CommandService) { 
    this.cmdSvcInfo = {
      host: 'edgex-core-command',
      port: 59882,
      path: '',
      pushEventOfGetCmdParamter: 'yes',
      returnEventOfGetCmdParamter: 'yes',
      parametersOfPutCommand: [] as CoreCommandParameter[],
    } as CommandServiceInfo
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.profileForm.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.cmdSvcInfoChange.emit(this.cmdSvcInfo)
    })
    this.renderPopoverComponent()
  }

  urlParser(url: string) {
    let u: URL = {} as URL
    try {
      u = new URL(url)
    } catch (error) {
      this.notCommandPathMsgShow = true
      return
    }
    
    if (u.pathname.startsWith(this.cmdURLFixedPrefix)) {
      let deviceNameAndCmdArray =  u.pathname.substring(this.cmdURLFixedPrefix.length).split('/')
      if ( deviceNameAndCmdArray.length === 2) {
        this.deviceName = deviceNameAndCmdArray[0]
        this.commandName = deviceNameAndCmdArray[1]
        this.getCommandParameterByDeviceAndCommandName(this.deviceName,this.commandName)

        this.cmdSvcInfo.path = u.pathname
        this.cmdSvcInfo.host = u.hostname
        this.cmdSvcInfo.port = Number(u.port)
        this.cmdSvcInfo.pushEventOfGetCmdParamter = u.searchParams.get('ds-pushevent') || 'yes'
        this.cmdSvcInfo.returnEventOfGetCmdParamter = u.searchParams.get('ds-returnevent') || 'yes'
        
        return
      }
    }  
    this.notCommandPathMsgShow = true
  }

  getCommandParameterByDeviceAndCommandName(deviceName: string, cmdName: string) {
    this.cmdSvc.findDeviceAssociatedCommnadsByDeviceName(deviceName).subscribe((resp: DeviceCoreCommandResponse) => {
      resp.deviceCoreCommand.coreCommands.forEach(coreCmd => {
        if (coreCmd.name === cmdName) {
          this.cmdSvcInfo.parametersOfPutCommand = coreCmd.parameters
        }
      })
    })
  }

  cmdParametersValueRender() {
    let cmdParamsKVObject: any = {}
    try {
      cmdParamsKVObject = JSON.parse(this.requestBodyJSONStr)
    } catch (error) {
      return
    }
    for (const [k,v] of Object.entries(cmdParamsKVObject)) {
      this.cmdSvcInfo.parametersOfPutCommand.forEach(cmd => {
        if (cmd.resourceName === k) {
          $(`#cmd-param-${k}`).val(v)
        }
      })
    }   
  }

  onValueOfPutParamsChange(event: any) {
    this.cmdSvcInfoChange.emit(this.cmdSvcInfo)
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onCmdMethodSelected(method: string) {
    this.cmdSvcInfo.httpMethod = method;
    this.cmdSvcInfoChange.emit(this.cmdSvcInfo)
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 500);
  }

  onCommandSelected(cmd: CoreCommand) {
    this.cmdSvcInfo.path = cmd.path;
    this.cmdSvcInfo.parametersOfPutCommand = cmd.parameters;
  }

  requestBodyAssemble(): string {
    let params: any = {};
    this.cmdSvcInfo.parametersOfPutCommand.forEach(p => {
      if (!p  || !$(`#cmd-param-${p.resourceName}`).val()) {
        return
      }
      if ($(`#cmd-param-${p.resourceName}`).val().trim() !== "") {
        params[p.resourceName] = $(`#cmd-param-${p.resourceName}`).val().trim();
      }
    });
    return JSON.stringify(params)
  }

  resetPathParameterSuffix() {
    if (this.cmdSvcInfo.path.indexOf('ds-pushevent') !== -1 ||  
        this.cmdSvcInfo.path.indexOf('ds-returnevent') !== -1) {
        this.cmdSvcInfo.path = this.cmdSvcInfo.path.split('?')[0];
    }
    this.cmdSvcInfo.path = `${this.cmdSvcInfo.path}?ds-pushevent=${this.cmdSvcInfo.pushEventOfGetCmdParamter}&ds-returnevent=${this.cmdSvcInfo.returnEventOfGetCmdParamter}`;
  }

  getHttpMethod(): string {
    return this.cmdSvcInfo.httpMethod
  }

  getRequestBodyJSONStr(): string {
    return this.requestBodyAssemble()
  }
 
  getUrl(): string {
    if (this.cmdSvcInfo.httpMethod === 'GET') {
      this.resetPathParameterSuffix()
    }
    return `http://${this.cmdSvcInfo.host}:${this.cmdSvcInfo.port}${this.cmdSvcInfo.path}`
  }
}
