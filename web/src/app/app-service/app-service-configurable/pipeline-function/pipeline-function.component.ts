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

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Functions, AddTags, Batch,Compress, Encrypt, 
  FilterByDeviceName, FilterByProfileName, FilterBySourceName, 
  FilterByResourceName, HTTPExport, MQTTExport, PushToCore,
  Transform,SetResponseData, JSONLogic } from '../../../contracts/v2/appsvc/functions';

@Component({
  selector: 'app-pipeline-function',
  templateUrl: './pipeline-function.component.html',
  styleUrls: ['./pipeline-function.component.css']
})
export class PipelineFunctionComponent implements OnInit, OnChanges {

    //funcExecOrder drop zone identifier
    funcExecOrderZoneIdentifier = 'funcExecOrder-';
    //builtinFunc drop zone identifier
    builtinFuncZoneIdentifier = 'builtinFunc-';
    objectKeys = Object.keys;

    profileNames: string[] = [];
    deviceNames: string[] = [];

    // using get and set method to avoid overwriting on init value of InsecureSecrets when parent component was binding on.
    private _availableFunctions: Functions;
    @Input() 
    get availableFunctions(): Functions {return this._availableFunctions};
    set availableFunctions(funcs: Functions) {Object.assign(this._availableFunctions, funcs);};
    @Output() availableFunctionsChange = new EventEmitter<Functions>();

    private _selectedFunctionsName: string[] = [];
    @Input() 
    get selectedFunctionsName(): string[] {return this._selectedFunctionsName };
    set selectedFunctionsName(funcNames: string[]) {
        funcNames.forEach((v,i) => {funcNames[i] = v.trim()});
        this._selectedFunctionsName = funcNames;
    }
    @Output() selectedFunctionsNameChange = new EventEmitter<string[]>();

    constructor() { 
        this._availableFunctions = {} as Functions;
        this.initAvailableFunctions();
    }

    ngOnInit(): void {
        //   console.log(this.availableFunctions)
    }

    ngOnChanges() {
        this.setSelectedProfiles()
        this.selectedFunctionsNameChange.emit(this.selectedFunctionsName)
        this.availableFunctionsChange.emit(this.availableFunctions);
    }
 
    setSelectedProfiles() {
        if (this.availableFunctions.FilterByProfileName?.Parameters) {
            if (this.availableFunctions.FilterByProfileName!.Parameters.ProfileNames) {
                this.profileNames  = this.availableFunctions.FilterByProfileName!.Parameters.ProfileNames.split(',');
                this.profileNames.forEach((v,i) => {this.profileNames[i] = v.trim()});
            }
        }
    }

    initAvailableFunctions() {
            this.availableFunctions.AddTags = {Parameters:{Tags:""}} as AddTags;
            this.availableFunctions.Batch = {Parameters:{Mode:"",BatchThreshold:"",TimeInterval:""}} as Batch;
            this.availableFunctions.FilterByDeviceName = {Parameters:{FilterOut:"false"}} as FilterByDeviceName;
            this.availableFunctions.FilterByProfileName = {Parameters:{FilterOut:"false"}} as FilterByProfileName;
            this.availableFunctions.FilterBySourceName = {Parameters:{FilterOut:"false"}} as FilterBySourceName;
            this.availableFunctions.FilterByResourceName = {Parameters:{FilterOut:"false"}} as FilterByResourceName;
            this.availableFunctions.Transform = {Parameters:{Type:"json"}} as Transform;
            this.availableFunctions.Compress = {Parameters:{Algorithm:"gzip"}} as Compress;
            this.availableFunctions.Encrypt = {Parameters:{Algorithm:"aes"}} as Encrypt;
            this.availableFunctions.HTTPExport = {Parameters:{}} as HTTPExport;
            this.availableFunctions.MQTTExport = {Parameters:{}} as MQTTExport;
            this.availableFunctions.PushToCore = {Parameters:{}} as PushToCore;
            this.availableFunctions.SetResponseData = {Parameters:{}} as SetResponseData;
            this.availableFunctions.JSONLogic = {Parameters:{}} as JSONLogic;
    }

    onDeviceProfileSelectedEvent(profiles: string[]) {
        this.profileNames = profiles;
        this.availableFunctions.FilterByProfileName!.Parameters.ProfileNames = this.profileNames.join(',');
    }

    renderPopoverComponent() {
        window.setTimeout(()=>{
            $('[data-toggle="popover"]').popover({
                trigger: 'hover'
            });
        },200)
    }

    selectOnefunc(funcName: string) {
        this.selectedFunctionsName.push(funcName)
    }

    unselectFunc(funcName: string) {
        if (this.selectedFunctionsName.indexOf(funcName) === -1)  {
            return
        }
        this.selectedFunctionsName.splice(this.selectedFunctionsName.indexOf(funcName),1)
    }

    getFuncExecutionOrder(): string {
        return this.selectedFunctionsName.join(',');
    }

    isSelected(funcName: string): boolean {
        let selected = false
        this.selectedFunctionsName.forEach((name) => {
            if (funcName === name.trim()) {
                selected = true
                return 
            }
        });
        return selected
    }

    ondropBuiltinFunction(event: any) {
        event.preventDefault();
        let funcName = event.dataTransfer.getData("funcName");
        if (!funcName) {
            return
        }
        this.unselectFunc(funcName)
    }

    ondragstartBuiltinFunction(event: any, funcName: string) {
        event.dataTransfer.setData("funcName",funcName);
    }

    sortSelectedFuncsExecuterOrder(src: string, dest: string) {
        let t = this.selectedFunctionsName.slice(0);
        t.splice(t.indexOf(src),1);
        t.splice(t.indexOf(dest),0,src);
        this.selectedFunctionsName = t;
    }

    ondropFuncExecutionOrder(event: any) {
        event.preventDefault();
        let sourceFuncName = event.dataTransfer.getData("funcName");
        if (!sourceFuncName) {
            return 
        }

        let sourceElementId = `${this.funcExecOrderZoneIdentifier}${sourceFuncName}`;
        // let targetElementId = event.toElement.id; // firefox not support toElement property
        let targetElementId = event.target.id;

        //if source element and target element are self equal, sort action abort.
        if (sourceElementId === targetElementId) {
            return
        }

        let sourceElement = document.getElementById(sourceElementId);
        if (sourceElement && targetElementId.indexOf(this.funcExecOrderZoneIdentifier) === 0) { //source and target element are both from the same draggable zone, do sort action.
            let targetFuncName = targetElementId.replace(this.funcExecOrderZoneIdentifier,'');
            this.sortSelectedFuncsExecuterOrder(sourceFuncName, targetFuncName)
        } else if (!sourceElement) { //element from other draggable zone, appended this ele to drop zone
            this.selectOnefunc(sourceFuncName)
        }

        this.renderPopoverComponent();
    }

    ondragstartFuncExecutionOrder(event: any, funcName: string) {
        event.dataTransfer.setData("funcName",funcName);
    }

    ondragoverFuncExecutionOrder(event: any) {
        $(event.target).addClass('ml-3')
    }

}
