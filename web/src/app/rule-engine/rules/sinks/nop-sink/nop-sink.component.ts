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

import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NopSink } from '../../../../contracts/kuiper/sink';
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';

@Component({
  selector: 'app-nop-sink',
  templateUrl: './nop-sink.component.html',
  styleUrls: ['./nop-sink.component.css']
})
export class NopSinkComponent implements OnInit, OnChanges {

  sinkBaseProperties: SinkBaseProperties = {} as SinkBaseProperties

  private _nopSink: NopSink
  @Input() 
  get nopSink(): NopSink {return this._nopSink}; 
  set nopSink(sink: NopSink) {
    Object.assign(this._nopSink,sink)
  }
  @Output() nopSinkChange = new EventEmitter<NopSink>();

  constructor() {
    this._nopSink = {
      log: false,
      sendSingle: false
    } as NopSink
  }

  ngOnInit(): void {
    this.renderPopoverComponent()
    Object.assign(this.sinkBaseProperties, this.nopSink)
  }

  ngOnChanges(): void {
    this.nopSinkChange.emit(this.nopSink);
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onSinkBasePropertiesChange(sinkBaseProperties: SinkBaseProperties) {
    Object.assign(this.nopSink, sinkBaseProperties)
  }
}
