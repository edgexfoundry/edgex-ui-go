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

import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../../services/data.service';
import { MultiEventsResponse } from '../../contracts/v2/responses/event-response';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy{

  feedInterval: any;
  pauseOperate: boolean = true;

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    
  }

  feedEvents() {
    this.feedInterval = setInterval(() => {
      this.dataSvc.allEventsPagination(0,5).subscribe((resp: MultiEventsResponse) => {
        if (resp.events.length === 0) {
          $("#data-event-stream").prepend('<p class="user-select-all">' + 
          'no data stream available, please confirm whether there is at least one device to collect data' + 
          '</p>');
          return
        }
        resp.events.forEach((e,i) => {
          $("#data-event-stream").prepend('<p class="user-select-all">' + JSON.stringify(e) + '</p>');
        })
      })
    },3000)
  }

  start() {
    this.pauseOperate = false;
    this.feedEvents();
  }

  pause() {
    this.pauseOperate = true;
    window.clearInterval(this.feedInterval);
  }

  operateToggle() {
    if (this.pauseOperate) {
      this.pauseOperate = false;
      return
    } 
    this.pauseOperate = true;
  }

  ngOnDestroy() {
     window.clearInterval(this.feedInterval);
  }

}
