import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DeviceProfile } from '../../../contracts/v3/device-profile';
import { DeviceService } from '../../../contracts/v3/device-service';
import { ProvisionWatcher } from '../../../contracts/v3/provision-watcher';
import { DeviceProfileResponse } from '../../../contracts/v3/responses/device-profile-response';
import { DeviceServiceResponse } from '../../../contracts/v3/responses/device-service-response';
import { ProvisionWatcherResponse } from '../../../contracts/v3/responses/provision-watcher-response';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
import { MetadataService } from '../../../services/metadata.service';
@Component({
  selector: 'app-edit-provision-watcher',
  templateUrl: './edit-provision-watcher.component.html',
  styleUrls: ['./edit-provision-watcher.component.css']
})
export class EditProvisionWatcherComponent implements OnInit {
  provisionWatcher?: ProvisionWatcher;
  provisionWatcherLabels?: string;
  selectedSvc?: DeviceService;
  selectedProfile?: DeviceProfile;
  blockingIdentifiers?: string;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private errorSvc: ErrorService) { }

    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        let provisionWatcherName = params['provisionWatcherName'];
        if (!params['provisionWatcherName']) {
          return
        }
        this.metaSvc.findProvisionWatcherByName(provisionWatcherName).subscribe((data: ProvisionWatcherResponse) => {
          this.provisionWatcher = data.provisionWatcher;
          this.blockingIdentifiers = JSON.stringify(data.provisionWatcher.blockingIdentifiers);
          this.provisionWatcherLabels = this.provisionWatcher.labels?.join(',');
          this.setDefaultDeviceSvcSelected(this.provisionWatcher.serviceName);
          this.setDefaultDeviceProfileSelected(this.provisionWatcher.discoveredDevice.profileName);
        });
      });
    }
    setDefaultDeviceSvcSelected(svcName: string) {
      this.metaSvc
      .findDevcieServiceByName(svcName)
      .subscribe((resp: DeviceServiceResponse) => {
        this.selectedSvc = resp.service;
      });
    }
    onSingleProfileSelected(profile: DeviceProfile) {
      this.selectedProfile = profile;
    }

    onSingleDeviceSvcSelected(svc: DeviceService) {
      this.selectedSvc = svc;
    }
    setDefaultDeviceProfileSelected(profileName: string) {
      this.metaSvc
      .findProfileByName(profileName)
      .subscribe((resp: DeviceProfileResponse) => {
        this.selectedProfile = resp.profile;
      });
    }
    validateBeforeSave(): boolean {
      if (this.provisionWatcher!.name === '') {
        return true
      }
      return false;
    }

    save() {
      this.provisionWatcher!.labels  = this.provisionWatcherLabels?.split(",") as string[];
      this.provisionWatcher!.serviceName = this.selectedSvc?.name as string;
      this.provisionWatcher!.discoveredDevice.profileName = this.selectedProfile?.name as string;

      this.metaSvc.updateProvisionWatcher(this.provisionWatcher as ProvisionWatcher).subscribe((resp: any) => {
        if(this.errorSvc.handleErrorForAPI(resp)) {
          return
        }
        this.msgSvc.success('update ProvisionWatcher', `name: ${this.provisionWatcher?.name}`);
        this.router.navigate(['../provision-watcher-list'], { relativeTo: this.route });
      });
    }
}