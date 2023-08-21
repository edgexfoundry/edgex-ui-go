import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DeviceService } from '../../../contracts/v3/device-service';
import { ProvisionWatcher } from '../../../contracts/v3/provision-watcher';
import { DeviceProfile } from '../../../contracts/v3/device-profile';
import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { ErrorService } from '../../../services/error.service';
//import { DeviceProtocolComponent } from  '../device-protocol/device-protocol.component';

@Component({
  selector: 'app-add-provision-watcher',
  templateUrl: './add-provision-watcher.component.html',
  styleUrls: ['./add-provision-watcher.component.css']
})
export class AddProvisionWatcherComponent implements OnInit {
  newProvisionWatcher: ProvisionWatcher;
  profileYamlSource?: any;
  codeMirrorEditor: any;
  yamlFile?: File;
  currentStep = 0;
  selectedClass = "text-white rounded px-2 bg-success  font-weight-bold";
  noSelectedClass = "text-white rounded px-2 bg-secondary  font-weight-bold";
  isProtocolValid: boolean = false;
  isAutoEventsValid: boolean = false;
  selectedSvc?: DeviceService;
  selectedProfile?: DeviceProfile;
  provisionWatcherLabels: string = '';
  provisionWatcherBlockingIdentifiers: string = '';
  provisionWatcherIdentifiersAddress: string = '';
  provisionWatcherIdentifiersPort: string = '';
  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private errorSvc: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.newProvisionWatcher = {
    name: "",
    serviceName: "",
    adminState: "LOCKED",
    labels: [],
    identifiers: {
      address: "",
      port: ""
    },
    blockingIdentifiers: {
      port: []
    },
    discoveredDevice:{
      adminState: 'LOCKED',
      profileName: "",
  }
  } as unknown as ProvisionWatcher;}

  ngOnInit(): void {
  }

  
  onSingleDeviceSvcSelected(svc: DeviceService) {
    this.selectedSvc = svc;
  }

  onSingleProfileSelected(profile: DeviceProfile) {
    this.selectedProfile = profile;
  }

  submit() {
    this.newProvisionWatcher.labels = this.provisionWatcherLabels?.split(','),
    this.newProvisionWatcher.serviceName = this.selectedSvc?.name as string;
    this.newProvisionWatcher.discoveredDevice.profileName = this.selectedProfile?.name as string;
    this.newProvisionWatcher.identifiers.address = this.provisionWatcherIdentifiersAddress,
    this.newProvisionWatcher.identifiers.port = this.provisionWatcherIdentifiersPort,
    this.newProvisionWatcher.blockingIdentifiers.port = this.provisionWatcherBlockingIdentifiers?.split(','),
    console.log(this.newProvisionWatcher)

    this.metaSvc.addProvisionWatcher(this.newProvisionWatcher).subscribe((resp:any) => {
      if(this.errorSvc.handleErrorForAPI(resp)) {
        return
      }
      this.msgSvc.success('Add ProvisionWatcher',`name: ${this.newProvisionWatcher.name}`);
      this.router.navigate(['../provision-watcher-list'], { relativeTo: this.route })
    })
  }

  next() {
    this.currentStep += 1;
  }

  previous() {
    this.currentStep = this.currentStep - 1;
  }

  stepStateLock(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.selectedSvc === undefined
      case 1:
        return this.selectedProfile === undefined
      case 2:
        return !this.newProvisionWatcher.name
      case 3:
        return !this.isAutoEventsValid
      case 4:
        return !this.isProtocolValid
      default:
        return false
    }
  }
}
