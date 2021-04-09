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

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Interval } from '../../../contracts/v2/interval';

@Component({
  selector: 'app-interval-combo-list',
  templateUrl: './interval-combo-list.component.html',
  styleUrls: ['./interval-combo-list.component.css']
})
export class IntervalComboListComponent implements OnInit {

  visible: boolean = false;
  @Input() validate: boolean = false;
  @Input() selectedInterval: Interval;
  @Output() intervalSelectedEvent = new EventEmitter<Interval>();

  constructor() { 
    this.selectedInterval = {} as Interval;
  }

  ngOnInit(): void {
  }

  onSingleIntervalSelected(interval: Interval) {
    this.selectedInterval = interval;
    this.intervalSelectedEvent.emit(interval);
  }

  toggle() {
    if (this.visible) {
      this.visible = false;
      return
    }
    this.visible = true;
  }
}
