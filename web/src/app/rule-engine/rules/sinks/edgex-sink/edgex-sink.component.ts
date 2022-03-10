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

import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { EdgeXSink } from '../../../../contracts/kuiper/sink';
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';

@Component({
  selector: 'app-edgex-sink',
  templateUrl: './edgex-sink.component.html',
  styleUrls: ['./edgex-sink.component.css']
})
export class EdgexSinkComponent implements OnInit, OnChanges {

  sinkBaseProperties: SinkBaseProperties = {} as SinkBaseProperties

  private _edgeXSink: EdgeXSink
  @Input() 
  get edgeXSink(): EdgeXSink {return this._edgeXSink};
  set edgeXSink(sink: EdgeXSink) {
    Object.assign(this._edgeXSink, sink)
  }
  @Output() edgeXSinkChange = new EventEmitter<EdgeXSink>();

  constructor() {
    this._edgeXSink = {
      type: 'redis',
      protocol: 'redis',
      host: 'edgex-redis',
      port: 6379,
      contentType: 'application/json',
      messageType: 'event',
      sendSingle: false
    } as EdgeXSink
  }

  ngOnInit(): void {
    this.renderPopoverComponent()
    Object.assign(this.sinkBaseProperties, this.edgeXSink)
  }

  ngOnChanges(): void {
    this.edgeXSinkChange.emit(this.edgeXSink);
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onSinkBasePropertiesChange(sinkBaseProperties: SinkBaseProperties) {
    Object.assign(this.edgeXSink, sinkBaseProperties)
  }

}
