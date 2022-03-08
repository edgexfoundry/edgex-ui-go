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

import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';

import { DeviceProfile } from '../../../contracts/v2/device-profile';

@Component({
  selector: 'app-device-profile-combo-list',
  templateUrl: './device-profile-combo-list.component.html',
  styleUrls: ['./device-profile-combo-list.component.css']
})
export class DeviceProfileComboListComponent implements OnInit {

  selectedProfilesStr: string = "";

  private _selectedProfiles: string[]= [];
  @Input() 
  get selectedProfiles(): string[] { return this._selectedProfiles } 
  set selectedProfiles(profileNames : string[]) {
    profileNames.forEach((v,i) => {profileNames[i] = v.trim()});
    this._selectedProfiles = profileNames;
    this.selectedProfilesStr = this._selectedProfiles.join(',');
  }
  @Output() deviceProfileSelectedEvent = new EventEmitter<string[]>();

  singleProfileSelectedObject: DeviceProfile = {} as DeviceProfile
  private  _singleProfileSelected: string
  @Input() 
  get singleProfileSelected(): string {return this._singleProfileSelected}
  set singleProfileSelected(profileName: string) {
    if (!profileName) {//if value is undefined/null
      this._singleProfileSelected = ''
    } else {
      this._singleProfileSelected = profileName.trim()
    }
    this.selectedProfilesStr = this._singleProfileSelected
    this.singleProfileSelectedObject = {name: this._singleProfileSelected} as DeviceProfile
  }
  @Output() singleProfileSelectedChange = new EventEmitter<string>();

  visible: boolean = false;
  @Input() validate: boolean = false;

  //single-selection Mode indecates that if true indicates single selection, else multiple selection.
  @Input() singleSelectionMode: boolean = false;

  constructor() {
    this._singleProfileSelected = ''
  }

  ngOnInit(): void {}

  onMultipleProfileSelectedEvent(profiles: string[]) {
    this.selectedProfiles = profiles;
    this.selectedProfilesStr = this.selectedProfiles.join(',');
    this.deviceProfileSelectedEvent.emit(this.selectedProfiles)
  }

  onSingleProfileSelectedEvent(profile: DeviceProfile) {
    if (!profile) {
      this.singleProfileSelected = ''
    } else {
      this.singleProfileSelected = profile.name
    }
    this.selectedProfilesStr = this.singleProfileSelected
    this.singleProfileSelectedChange.emit(this.singleProfileSelected)
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
