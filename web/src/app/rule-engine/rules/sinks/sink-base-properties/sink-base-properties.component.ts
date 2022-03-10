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
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';

@Component({
  selector: 'app-sink-base-properties',
  templateUrl: './sink-base-properties.component.html',
  styleUrls: ['./sink-base-properties.component.css']
})
export class SinkBasePropertiesComponent implements OnInit, AfterViewInit {

  collapseToggleStatus: boolean = false; //down-open-true, up-close-false

  profileForm = new FormGroup({
    concurrency: new FormControl(''),
    bufferLength: new FormControl(''),
    runAsync: new FormControl(''),
    retryInterval: new FormControl(''),
    retryCount: new FormControl(''),
    cacheLength: new FormControl(''),
    cacheSaveInterval: new FormControl(''),
    omitIfEmpty: new FormControl('')
  });

  //be treated as advanced options/properties
  private _sinkBaseProperties: SinkBaseProperties;
  @Input() 
  get sinkBaseProperties(): SinkBaseProperties {return this._sinkBaseProperties}
  set sinkBaseProperties(sbp: SinkBaseProperties) {
    this._sinkBaseProperties = {
      concurrency: sbp.concurrency,
      bufferLength: sbp.bufferLength,
      runAsync: sbp.runAsync,
      retryInterval: sbp.retryInterval,
      retryCount: sbp.retryCount,
      cacheLength: sbp.cacheLength,
      cacheSaveInterval: sbp.cacheSaveInterval,
      omitIfEmpty: sbp.omitIfEmpty,

      /* this two properties are treated as common properties, see https://github.com/lf-edge/ekuiper/blob/master/docs/en_US/rules/overview.md
      * but the frequency used by user is very high, after discussed with kuiper team.
      * especial the dataTemplate property which is treated as http request boy and mqqt payload.
      * maybe kuiper team will redesign their struct of the sink object.
      * so will not render them here, will show them in each one sink type.
      * but still assigning input values to them for binding callback.
      */
      sendSingle: sbp.sendSingle,
      dataTemplate: sbp.dataTemplate
    }
  }
  @Output() sinkBasePropertiesChange = new EventEmitter<SinkBaseProperties>();

  constructor() {
    this._sinkBaseProperties = {
      concurrency: 1,
      bufferLength: 1024,
      runAsync: false,
      retryInterval: 1000,
      retryCount: 0,
      cacheLength: 1024,
      cacheSaveInterval: 1000,
      omitIfEmpty: false
    } as SinkBaseProperties;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.profileForm.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
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
