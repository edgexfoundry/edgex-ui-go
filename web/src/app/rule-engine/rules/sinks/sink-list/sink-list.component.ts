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

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Sink, EdgeXSink, MQTTSink, RESTSink, NopSink, LogSink} from '../../../../contracts/kuiper/sink';


@Component({
  selector: 'app-sink-list',
  templateUrl: './sink-list.component.html',
  styleUrls: ['./sink-list.component.css']
})
export class SinkListComponent implements OnInit, OnChanges{

  // log: Send the result to log file.
  // mqtt: Send the result to an MQTT broker.
  // edgex: Send the result to EdgeX message bus.
  // rest: Send the result to a Rest HTTP server.
  // nop: Send the result to a nop operation.

  EdgeX_SINK = "edgex";
  MQTT_SINK = "mqtt";
  REST_SINK = "rest";
  LOG_SINK = "log";
  NOP_SINK = "nop";

  private _ruleActions: Sink[];
  @Input() 
  get ruleActions(): Sink[] {return this._ruleActions};
  set ruleActions(sinks: Sink[]) {
    if (!sinks) {return}
    this._ruleActions = sinks
  }
  @Output() ruleActionsChange = new EventEmitter<Sink[]>();

  edgeXSink: EdgeXSink = {} as EdgeXSink;
  mqttSink: MQTTSink = {} as MQTTSink;
  restSink: RESTSink = {} as RESTSink;
  nopSink: NopSink = {} as NopSink;
  logSink: LogSink = {} as LogSink;

  selectedSinkIndex: number = -1;
  selectedSinkType: string = '';
  sinkAddOrEditStatus: boolean = false;
  sinkOperation_ADD = 'add';
  sinkOperation_EDIT = 'edit';
  sinkAddOrEditOperation: string = ''; //add,edit

  updateTimestamp: string = '';

  constructor() { 
    this._ruleActions = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      this.ruleActionsChange.emit(this.ruleActions)
  }

  resetSinksConcreteAll() {
    this.edgeXSink = {} as EdgeXSink;
    this.mqttSink = {} as MQTTSink;
    this.restSink = {} as RESTSink;
    this.nopSink = {} as NopSink;
    this.logSink = {} as LogSink;
  }

  getSinkTypeOfAction(sink: Sink): string {
    let sinkTypes = Object.keys(sink);
    if (sinkTypes.length === 0)  {
      return '';
    }
    return sinkTypes[0]
  }

  getSinkByType(sinkType: string): Sink {
    let sink: Sink = {} as Sink;
    switch (sinkType) {
      case this.EdgeX_SINK:
        sink.edgex = this.edgeXSink
        break 
      
      case this.MQTT_SINK:
        sink.mqtt = this.mqttSink
        break 
      
      case this.REST_SINK:
        sink.rest = this.restSink
        break 

      case this.LOG_SINK:
        sink.log = this.logSink
        break 

      default:
        sink.nop = this.nopSink
        break 
    }
    return sink
  }

  sinkConcreteExtractor(sink: Sink){
    let sinkType = this.getSinkTypeOfAction(sink);
    this.selectedSinkType = sinkType;
    switch (sinkType) {
      case this.EdgeX_SINK:
        this.edgeXSink = sink.edgex as EdgeXSink
        break;
      
      case this.MQTT_SINK:
        this.mqttSink = sink.mqtt as MQTTSink
        break;
      
      case this.REST_SINK:
        this.restSink = sink.rest as RESTSink
        break;

      case this.LOG_SINK:
        this.logSink = sink.log as LogSink
        break;

      default:
        this.nopSink = sink.nop as NopSink
        break;
    }
  }

  addSinkTransfer() {
    this.sinkAddOrEditStatus = true;
    this.sinkAddOrEditOperation = this.sinkOperation_ADD;

    //init for adding one new sink
    this.selectedSinkIndex = -1;
    this.selectedSinkType = '';
    this.resetSinksConcreteAll();
  }

  //high light background of one sink which is going on editing, but need to remove the bg when executing delete or add operation.
  // the condition is (index === selectedSinkIndex)
  editSinkTransfer(sink: Sink, index: number) {
    this.sinkAddOrEditStatus = true;
    this.sinkAddOrEditOperation = this.sinkOperation_EDIT;
    this.selectedSinkIndex = index;
    this.sinkConcreteExtractor(sink);
    this.selectedSinkType = this.getSinkTypeOfAction(sink)
  }

  addOneNewSink() {
    this.ruleActions.push(this.getSinkByType(this.selectedSinkType));
    this.sinkAddOrEditStatus = false;
  }

  updateSink() {
    this.ruleActions.splice(this.selectedSinkIndex,1, this.getSinkByType(this.selectedSinkType));
    this.sinkAddOrEditStatus = false;
  }

  deleteSink(sink: Sink,index: number){
    this.ruleActions.splice(index,1);
    this.selectedSinkIndex = -1; // remove background color of edited status if one sink is deleted.
  }

  cancel() {
    this.sinkAddOrEditStatus = false;
  }

  validate(): boolean {
    if (!this.selectedSinkType) {
      return false
    }
    
    switch (this.selectedSinkType) {
      case this.MQTT_SINK:
        if (!this.mqttSink.server || !this.mqttSink.topic) {
          return false
        }
        break;
      case this.REST_SINK:
        if (!this.restSink.url) {
          return false
        }
        break;
    }

    return true
  }
}
