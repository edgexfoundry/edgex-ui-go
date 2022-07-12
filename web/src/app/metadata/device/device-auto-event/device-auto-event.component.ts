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

import { Component, Input, OnInit, OnChanges ,Output, EventEmitter} from '@angular/core';

import { AutoEvent } from '../../../contracts/v2/auto-event';
import { DeviceProfile } from '../../../contracts/v2/device-profile';

interface AutoEventDecorator {
  interval: string,
  onChange: boolean,
  resource: string,
  unit: string
}

@Component({
  selector: 'app-device-auto-event',
  templateUrl: './device-auto-event.component.html',
  styleUrls: ['./device-auto-event.component.css']
})
export class DeviceAutoEventComponent implements OnInit, OnChanges {

  @Input() autoEvents: AutoEvent[] = []
  @Output() autoEventsChange = new EventEmitter<AutoEvent[]>()
  @Input() deviceProfile?: DeviceProfile

  @Input() isValid: boolean = false
  @Output() isValidChange = new EventEmitter<boolean>()

  autoEventDecoratorBearer: AutoEventDecorator[] = [];
  autoEventResourceNameSet: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.resetAutoEventDecoratorBearer()
    this.setAutoEventDecorator(this.autoEvents)
    this.setupAutoEventResourceNameSet(this.deviceProfile)
    this.resumeOriginalAutoEvents()
  }

  onValueChange() {
    this.resumeOriginalAutoEvents()
  }

  resetAutoEventDecoratorBearer() {
    this.autoEventDecoratorBearer.splice(0,this.autoEventDecoratorBearer.length);
  }

  addAutoEvent() {
    this.autoEventDecoratorBearer.push({
      interval: '',
      onChange: false,
      resource: '',
      unit: 'ms'
    });
    this.resumeOriginalAutoEvents()
  }

  removeAutoEvent(event: AutoEventDecorator) {
    this.autoEventDecoratorBearer.splice(this.autoEventDecoratorBearer.indexOf(event), 1);
    this.resumeOriginalAutoEvents()
  }

  setupAutoEventResourceNameSet(profile?: DeviceProfile) {
    if  (!profile) {
      return
    }
    this.autoEventResourceNameSet.splice(0,this.autoEventResourceNameSet.length)
    profile.deviceResources.forEach((r,i) => {
      this.autoEventResourceNameSet.push(r.name);
    })
    profile.deviceCommands.forEach((cmd,i) => {
      this.autoEventResourceNameSet.push(cmd.name);
    })
  }

  eventIntervalNumType(interval: any): boolean {
    if (!isNaN(interval) && (parseFloat(interval) === parseInt(interval))) {
      return true
    }
    return false
  }

  setAutoEventDecorator(events?: AutoEvent[]) {
    if (!events) {
      return
    }

    events!.forEach(e => {
      let index: number = 0;

      if (e.interval.indexOf('ms') !== -1) {
        index = e.interval.indexOf('ms');
      } else if (e.interval.indexOf('s') !== -1) {
        index = e.interval.indexOf('s');
      } else if (e.interval.indexOf('m') !== -1) {
        index = e.interval.indexOf('m');
      } else if (e.interval.indexOf('h') !== -1) {
        index = e.interval.indexOf('h');
      }
      this.autoEventDecoratorBearer.push({
        interval: e.interval.slice(0, index),
        onChange: e.onChange ? e.onChange : false,
        resource: e.sourceName,
        unit: e.interval.substring(index)
      });
    });
  }

  resumeOriginalAutoEvents() {
    if (!this.autoEvents) {
      this.autoEvents = []
    } else {
      this.autoEvents.splice(0,this.autoEvents.length);
    }
    
    this.autoEventDecoratorBearer.forEach(e => {
      this.autoEvents.push({
        interval: `${e.interval}${e.unit}`,
        onChange: e.onChange ? true : false,
        sourceName: e.resource
      })
    });
    this.validate()
    this.autoEventsChange.emit(this.autoEvents)
  }

  validate() {
    this.isValid = true
    if (this.autoEventDecoratorBearer.length !== 0) {
      this.autoEventDecoratorBearer.forEach(e => {
        if (!this.eventIntervalNumType(e.interval) || e.resource === '') {
          this.isValid = false
          return
        }
      })
    }
    this.isValidChange.emit(this.isValid)
  }
}
