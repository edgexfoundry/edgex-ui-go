import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { DeviceProfile } from '../../../contracts/device-profile';

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
      if (params['profileId']) {
        this.metaSvc.findProfileById(params['profileId']).subscribe((data: DeviceProfile) => {
          this.profileList = [];
          this.profileList.push(data);
        });
      } else {
        this.metaSvc.allDeviceProfoles().subscribe((data: DeviceProfile[]) => {
          this.profileList = data;
        });
      }
    });
  }

  refresh() {
    this.metaSvc.allDeviceProfoles().subscribe((data: DeviceProfile[]) => {
      this.profileList = data;
      this.msgSvc.success('refresh');
    });
  }

  edit() {
    let self = this;
    let profileName = "";
    this.profileList.forEach(function (profile) {
      if (profile.id === self.selectedProfiles[0]) {
        profileName = profile.name;
      }
    });

    this.router.navigate(['../edit-profile'], {
      relativeTo: this.route,
      queryParams: {
        'profileId': this.selectedProfiles[0],
        'profileName': profileName
      }
    });
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
    this.selectedProfiles.forEach((profileId) => {
      this.metaSvc.deleteProfileById(profileId).subscribe(() => {
        this.selectedProfiles = [];
        this.profileList.forEach((profile, index) => {
          if (profile.id == profileId) {
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
