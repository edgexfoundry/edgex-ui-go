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
        this.metaSvc.allDeviceProfoles().subscribe((data: MultiDeviceProfileResponse) => {
          this.profileList = data.profiles;
        });
      }
    });
  }

  refresh() {
    this.metaSvc.allDeviceProfoles().subscribe((data: MultiDeviceProfileResponse) => {
      this.profileList = data.profiles;
      this.msgSvc.success('refresh');
    });
  }

  edit() {
    // let self = this;
    // let profileName = "";
    // this.profileList.forEach(function (profile) {
    //   if (profile.id === self.selectedProfiles[0]) {
    //     profileName = profile.name;
    //   }
    // });

    this.router.navigate(['../edit-profile'], {
      relativeTo: this.route,
      queryParams: {
        // 'profileId': this.selectedProfiles[0],
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
