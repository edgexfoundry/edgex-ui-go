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

import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { MQTTSink } from  '../../../../contracts/kuiper/sink';
import { SinkBaseProperties } from '../../../../contracts/kuiper/sink-base-properties';

@Component({
  selector: 'app-mqtt-sink',
  templateUrl: './mqtt-sink.component.html',
  styleUrls: ['./mqtt-sink.component.css']
})
export class MqttSinkComponent implements OnInit, OnChanges {

  sinkBaseProperties: SinkBaseProperties = {} as SinkBaseProperties

  private _mqttSink: MQTTSink;
  @Input() 
  get mqttSink(): MQTTSink {return this._mqttSink};
  set mqttSink(sink: MQTTSink) {
    Object.assign(this._mqttSink,sink)
  }
  @Output() mqttSinkChange = new EventEmitter<MQTTSink>();

  constructor() {
    this._mqttSink = {
      server: 'tcp://127.0.0.1:1883',
      protocolVersion: '3.1',
      qos: 0,
      insecureSkipVerify: true,
      retained: false,
      sendSingle: false
    } as MQTTSink;
  }

  ngOnInit(): void {
    this.renderPopoverComponent()
    Object.assign(this.sinkBaseProperties, this.mqttSink)
  }

  ngOnChanges(): void {
    this.mqttSinkChange.emit(this.mqttSink); 
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onSinkBasePropertiesChange(sinkBaseProperties: SinkBaseProperties) {
    Object.assign(this.mqttSink, sinkBaseProperties)
  }
}
