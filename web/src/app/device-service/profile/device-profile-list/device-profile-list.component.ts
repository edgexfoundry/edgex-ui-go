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

import { Component, OnInit } from '@angular/core';
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

  profileList: DeviceProfile[] = [];
  selectedProfiles: string[] = [];
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

  refresh() {
    this.metaSvc.allDeviceProfolesPagination(0,this.pageLimit).subscribe((data: MultiDeviceProfileResponse) => {
      this.profileList = data.profiles;
      this.msgSvc.success('refresh');
      this.pagination = 1;
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

  resetPagination() {
    this.pageOffset = 0;
    this.pageLimit = 5;
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
   
  }

  edit() {
    this.router.navigate(['../edit-profile'], {
      relativeTo: this.route,
      queryParams: {
        'profileName': this.selectedProfiles[0]
      }
    });
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
    this.selectedProfiles.forEach((profileName) => {
      this.metaSvc.deleteProfileByName(profileName).subscribe(() => {
        this.selectedProfiles = [];
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

  selectAll(event: any) {
    const checkbox = event.target;
    let self = this;
    if (checkbox.checked) {
      this.selectedProfiles = [];
      this.profileList.forEach(function (item) {
        self.selectedProfiles.push(item.id);
        self.isChecked(item.id);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.selectedProfiles = [];
    this.profileList.forEach(function (item) {
      self.isChecked(item.id);
    });
  }

  isChecked(id: string): boolean {
    return this.selectedProfiles.findIndex(v => v === id) >= 0;
  }

  selectOne(event: any, id: string) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedProfiles.push(id);
      // console.log(this.selectedDevice)
      if (this.selectedProfiles.length === this.profileList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(id);
    this.selectedProfiles.splice(this.selectedProfiles.indexOf(id), 1)
  }

}
