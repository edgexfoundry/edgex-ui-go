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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { MultiDeviceProfileResponse, DeviceProfileResponse} from '../../../contracts/v2/responses/device-profile-response';
import { DeviceProfile } from '../../../contracts/v2/device-profile';

@Component({
  selector: 'app-device-profile-list',
  templateUrl: './device-profile-list.component.html',
  styleUrls: ['./device-profile-list.component.css']
})
export class DeviceProfileListComponent implements OnInit {
  
  @Input() toolbars: boolean = true;
  @Input() enableSelectAll: boolean = true;
  @Output() singleProfileSelectedEvent = new EventEmitter<DeviceProfile>();
  profileList: DeviceProfile[] = [];
  multiProfilesSelected: string[] = [];
  singleProfileSelected?: DeviceProfile;
  isCheckedAll: boolean = false;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;
  
  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['profileName']) {
        this.metaSvc.findProfileByName(params['profileName']).subscribe((data: DeviceProfileResponse) => {
          this.profileList = [];
          this.profileList.push(data.profile);
        });
      } else {
        this.metaSvc.allDeviceProfolesPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiDeviceProfileResponse) => {
          this.profileList = data.profiles;
        });
      }
    });
  }

  onSingleProfileSelectedEmitter() {
    this.singleProfileSelectedEvent.emit(this.singleProfileSelected);
  }

  refresh() {
    this.metaSvc.allDeviceProfolesPagination(0,this.pageLimit).subscribe((data: MultiDeviceProfileResponse) => {
      this.profileList = data.profiles;
      this.msgSvc.success('refresh');
      this.pagination = 1;
      this.resetCheckbox();
    });
  }

  prePage() {
    this.setPagination(-1);
    this.metaSvc.allDeviceProfolesPagination(this.pageOffset,this.pageLimit).subscribe((data: MultiDeviceProfileResponse) => {
      this.profileList = data.profiles;
      
    });
  }

  nextPage() {
    this.setPagination(1);
    this.metaSvc.allDeviceProfolesPagination(this.pageOffset,this.pageLimit).subscribe((data: MultiDeviceProfileResponse) => {
      this.profileList = data.profiles;
    });
  }

  setPageLimit(n: number) {
    this.pageLimit = n;
  }

  setPagination(n?: number) {
    if (n === 1) {
      this.pagination += 1;
    } else {
      this.pagination -= 1;
    }
    this.pageOffset = (this.pagination - 1) * this.pageLimit;

    this.resetCheckbox();
  }

  resetPagination() {
    this.pageOffset = 0;
    this.pageLimit = 5;
    this.resetCheckbox();
  }

  resetCheckbox() {
    this.isCheckedAll = false; //reset checkbox all
    this.multiProfilesSelected = [];
  }

  edit() {
    this.router.navigate(['../edit-profile'], {
      relativeTo: this.route,
      queryParams: {
        'profileName': this.multiProfilesSelected[0]
      }
    });
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
    this.multiProfilesSelected.forEach((profileName) => {
      this.metaSvc.deleteProfileByName(profileName).subscribe(() => {
        this.multiProfilesSelected = [];
        this.profileList.forEach((profile, index) => {
          if (profile.name == profileName) {
            this.profileList.splice(index, 1);
            this.msgSvc.success('delete', `  Name: ${profile.name}`);
          }
        });
      });
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  isSingleProfileChecked(name: string): boolean {
    return this.singleProfileSelected?.name === name
  }

  selectSingleProfile(event: any, name: string) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.profileList.forEach((profile) => {
        if (profile.name === name) {
          this.singleProfileSelected = profile;
        }
      });
    } else {
      this.singleProfileSelected = undefined;
    }
    this.onSingleProfileSelectedEmitter();
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.multiProfilesSelected = [];
      this.profileList.forEach(profile => {
        this.multiProfilesSelected.push(profile.name);
        this.isChecked(profile.name);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.multiProfilesSelected = [];
    this.profileList.forEach(profile => {
      this.isChecked(profile.name);
    });
  }

  isChecked(name: string): boolean {
    if (!this.enableSelectAll) {
      return this.isSingleProfileChecked(name)
    }
    return this.multiProfilesSelected.findIndex(v => v === name) >= 0;
  }

  selectOne(event: any, name: string) {
    if (!this.enableSelectAll) {
      this.selectSingleProfile(event, name);
      return
    }
    const checkbox = event.target;
    if (checkbox.checked) {
      this.multiProfilesSelected.push(name);
      if (this.multiProfilesSelected.length === this.profileList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(name);
    this.multiProfilesSelected.splice(this.multiProfilesSelected.indexOf(name), 1)
  }

}
