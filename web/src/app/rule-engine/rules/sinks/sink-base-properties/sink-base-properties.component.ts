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

import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';

@Component({
  selector: 'app-sink-base-properties',
  templateUrl: './sink-base-properties.component.html',
  styleUrls: ['./sink-base-properties.component.css']
})
export class SinkBasePropertiesComponent implements AfterViewInit, OnChanges {

  collapseToggleStatus: boolean = false; //down-open-true, up-close-false

  /* sendSingle, dataTemplate will be ignored.
  * although this two properties are treated as common properties, see https://github.com/lf-edge/ekuiper/blob/master/docs/en_US/rules/overview.md
  * but the frequency used by user is very high, after discussed with kuiper team.
  * especial the dataTemplate property which is treated as http request boy and mqqt payload.
  * maybe kuiper team will redesign their struct of the sink object.
  * so will not render them here, will show them in each one sink type.
  */
  sinkBasePropertiesForm = new FormGroup({
    concurrency: new FormControl(1),
    bufferLength: new FormControl(1024),
    runAsync: new FormControl(false),
    retryInterval: new FormControl(1000),
    retryCount: new FormControl(0),
    cacheLength: new FormControl(1024),
    cacheSaveInterval: new FormControl(1000),
    omitIfEmpty: new FormControl(false)
  });

  //be treated as advanced options/properties
  @Input() sinkBaseProperties: SinkBaseProperties;
  @Output() sinkBasePropertiesChange = new EventEmitter<SinkBaseProperties>();

  constructor() {
    this.sinkBaseProperties = {} as SinkBaseProperties;
  }

  ngOnChanges(): void {
    //remove below two properties avoiding binding back to parent component
    delete this.sinkBaseProperties.sendSingle
    delete this.sinkBaseProperties.dataTemplate
     let obj: any = {}
     for (const [k,v]of Object.entries(this.sinkBaseProperties)) {
       if (this.sinkBasePropertiesForm.value.hasOwnProperty(k) && v) {
         obj[k] = v
       }
     }
    this.sinkBasePropertiesForm.patchValue(obj)
  }

  ngAfterViewInit(): void {
    this.sinkBasePropertiesForm.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      Object.assign(this.sinkBaseProperties,this.sinkBasePropertiesForm.value)
      this.sinkBasePropertiesChange.emit(this.sinkBaseProperties)
    })
  }

  collapseToggle() {
    if (this.collapseToggleStatus) {
      this.collapseToggleStatus = false //close
      return
    }
    this.collapseToggleStatus = true //open
  }
}
