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

import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChanges} from '@angular/core';
import { LogSink } from '../../../../contracts/kuiper/sink';
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';

@Component({
  selector: 'app-log-sink',
  templateUrl: './log-sink.component.html',
  styleUrls: ['./log-sink.component.css']
})
export class LogSinkComponent implements OnInit, OnChanges {

  sinkBaseProperties: SinkBaseProperties = {} as SinkBaseProperties

  private _logSink: LogSink
  @Input() 
  get logSink(): LogSink {return this._logSink};
  set logSink(sink: LogSink) {
    Object.assign(this._logSink, sink)
  }
  @Output() logSinkChange = new EventEmitter<LogSink>();


  constructor() { 
    this._logSink = { sendSingle: false} as LogSink
  }

  ngOnInit(): void {
    Object.assign(this.sinkBaseProperties, this.logSink)
    this.renderPopoverComponent()
  }

  ngOnChanges(): void {
    this.logSinkChange.emit(this.logSink)
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onSinkBasePropertiesChange(sinkBaseProperties: SinkBaseProperties) {
    Object.assign(this.logSink, sinkBaseProperties)
  }
}
