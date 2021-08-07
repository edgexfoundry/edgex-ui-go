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

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resource-combo-list',
  templateUrl: './resource-combo-list.component.html',
  styleUrls: ['./resource-combo-list.component.css']
})
export class ResourceComboListComponent implements OnInit {

  visible: boolean = false;

  @Input() resourceSelected: string[] = [];

  @Input() selectedProfiles: string[] = [];
  

  constructor() { }

  ngOnInit(): void {
  }

  onMultipleProfileSelectedEvent(profiles: string[]) {
    this.selectedProfiles = profiles;
  }

  close(event: any) {
    this.visible = false;
  }

  toggle(event: any) {
    event.stopPropagation();
    if (this.visible) {
      this.visible = false;
      return
    }
    this.visible = true;
  }

}
