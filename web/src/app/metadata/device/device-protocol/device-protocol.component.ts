/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 * Copyright @2025 YIQISOFT
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ModusRTUProtocolTemplate,
  ModusTCPProtocolTemplate,
  MqttProtocolTemplate,
  OnvifProtocolTemplate,
  OPCUAProtocolTemplate,
  S7ProtocolTemplate,
  TCPProtocolTemplate,
  VirtualProtocolTemplate
} from './builtin-protocol-template/types';

declare type protocol = {
  [key: string]: properties;
};

declare type properties = {
  [key: string]: any;
};

interface ProtocolProperty {
  propertyName: string,
  propertyValue: string
}

@Component({
  selector: 'app-device-protocol',
  templateUrl: './device-protocol.component.html',
  styleUrls: ['./device-protocol.component.css']
})
export class DeviceProtocolComponent implements OnInit {

  MODE_ADD = 'add'
  MODE_EDIT = 'edit'
  @Input() mode?: string //add or edit

  @Input() deviceProtocols: protocol = {}
  protocolName?: string

  @Input() isValid: boolean = false
  @Output() isValidChange = new EventEmitter<boolean>()

  TEMPLATE_CUSTOM = "custom"
  TEMPLATE_BUILT_IN = "built-in"
  protocolTemplateMode?: string; //custom or built-in

  customProtocolName?: string;
  customProtocolPropertyBearer: ProtocolProperty[] = []
  customProtocols: Map<string, ProtocolProperty[]> = new Map()

  builtinProtocolName?: string
  builtinProtocolTemplateSelected: any;
  builtinProtocolTemplateProperties: string[] = [];

  constructor() { }

  ngOnInit(): void {
    if(!this.mode)  {
      return
    }

    //right now, edit mode only supports rendering custom protocol template 
    //the protocol template conversion between 
    //custom and built-in, add and edit mode is quite complex in angular two-way binding mode.
    if (this.mode ==  this.MODE_EDIT) {
      this.protocolTemplateMode = this.TEMPLATE_CUSTOM
      this.extractProtocolName()
      if (!this.protocolName) {
        this.customProtocolName  = ''
      } else {
        this.customProtocolName = this.protocolName
      }
     
      this.setCustomProtocolPropertysBearer()
      return
    }

    //add mode
    if (this.mode ==  this.MODE_ADD) {
      this.protocolTemplateMode = this.TEMPLATE_BUILT_IN
    }
    this.validate()
  }

  extractProtocolName() {
    if (!this.deviceProtocols || Object.keys(this.deviceProtocols).length === 0) {
      return
    }
    this.protocolName = Object.keys(this.deviceProtocols)[0];
  }

  onSelectBuiltinProtocolTemplate() {
    this.validate()
    switch (this.builtinProtocolName) {
      case 'mqtt':
        this.builtinProtocolTemplateSelected = new MqttProtocolTemplate();
        break
      case 'modbus-tcp':
        this.builtinProtocolTemplateSelected = new ModusTCPProtocolTemplate();
        break
      case 'modbus-rtu':
        this.builtinProtocolTemplateSelected = new ModusRTUProtocolTemplate();
        break
      case 'other':
          this.builtinProtocolTemplateSelected = new VirtualProtocolTemplate();
          break
      case 'other-rest':
        this.builtinProtocolTemplateSelected = {};
        break
      case 'Onvif':
        this.builtinProtocolTemplateSelected = new OnvifProtocolTemplate();
        break
      case 'opcua':
        this.builtinProtocolTemplateSelected = new OPCUAProtocolTemplate();
        break
      case 's7':
        this.builtinProtocolTemplateSelected = new S7ProtocolTemplate();
        break
      case 'tcp':
        this.builtinProtocolTemplateSelected = new TCPProtocolTemplate();
        break
      default:
        this.builtinProtocolTemplateSelected = {};
    }
    this.builtinProtocolTemplateProperties = Object.keys(this.builtinProtocolTemplateSelected)
  }

  changeProtocolTemplateMode(templateMode: string) {
    this.protocolTemplateMode = templateMode;
    this.validate()
  }

  onCustomProtocolNameChange(protocolName: string, property: ProtocolProperty[]) {
    this.customProtocols.set(protocolName, property as ProtocolProperty[])
    // this.customProtocols.delete(this.customProtocolName as string)
    this.customProtocolName = protocolName
    this.validate()
  }

  onCustomProtocolNameFocus(protocolName: string) {
    this.customProtocolName = protocolName
    this.validate()
  }

  onCustomProtocolNameBlur(protocolName: string, property: ProtocolProperty[]) {
    if (this.customProtocolName === protocolName) {
      return
    }
    this.customProtocols.set(protocolName, property as ProtocolProperty[])
    this.customProtocols.delete(this.customProtocolName as string)
    this.customProtocolName = protocolName
    this.validate()
  }

  setCustomProtocolPropertysBearer() {
    if (!this.customProtocolName) {
      return
    }

    for (const [protocolName, property] of Object.entries(this.deviceProtocols)) {
      if (!this.customProtocols.has(protocolName)) {
        this.customProtocols.set(protocolName, [])
      }
      for (const [key, value] of Object.entries(property)) {
        this.customProtocols.get(protocolName)?.push({ propertyName: key, propertyValue: value as string })
      }
    }
  }

  addCustomProtocolProperty(protocolName: string) {
    if (!this.customProtocols.has(protocolName)) {
      this.customProtocols.set(protocolName, [])
    }
    this.customProtocols.forEach((p, pName) => {
      if ( pName === protocolName) {
        p.push({propertyName:'',  propertyValue: ''})
      }
    })
  }

  removeCustomProtocolProperty(protocolName: string, property: ProtocolProperty) {
    this.customProtocols.forEach((p, pName) => {
      if ( pName === protocolName) {
        p.splice(p.indexOf(property),1)
      }
    })
  }

  addCustomProtocol() {
    this.customProtocols.set("", [])
    this.customProtocolName = ""
    this.validate()
  }

  removeCustomProtocol(protocolName: string) {
    if (this.customProtocols.has(protocolName)) {
      this.customProtocols.delete(protocolName)
    }
    this.customProtocols.forEach((p, pName) => {
      this.customProtocolName = pName
    })
    this.validate()
  }

  getDeviceProtocols(): protocol {
    this.deviceProtocols = {}
    if (this.protocolTemplateMode === this.TEMPLATE_BUILT_IN) {
      this.deviceProtocols[this.builtinProtocolName as string] = Object.assign({}, this.builtinProtocolTemplateSelected)
    } else {
      this.customProtocols.forEach((p, pName) => {
        if (pName !== "") {
          let property: properties = {}
          p.forEach(p => {
            property[p.propertyName] = p.propertyValue
          })
          this.deviceProtocols[pName] = property
        }
      })
    }
    return this.deviceProtocols
  }

  validate() {
    this.isValid = true
    switch (this.protocolTemplateMode) {
      case this.TEMPLATE_BUILT_IN:
        if (!this.builtinProtocolName) {
          this.isValid = false
        }
        break;
    
      default:
        if (!this.customProtocolName) {
          this.isValid = false
        }
        break;
    }
    this.isValidChange.emit(this.isValid)
  }
}
