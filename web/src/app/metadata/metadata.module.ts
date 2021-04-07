import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MetadataRoutingModule } from './metadata-routing.module';
import { MetadataComponent } from './metadata.component';
import { DeviceServiceMediaListComponent } from './device-service/device-service-media-list/device-service-media-list.component';
import { DeviceServiceListComponent } from './device-service/device-service-list/device-service-list.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { EditDeviceComponent } from './device/edit-device/edit-device.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceProfileListComponent } from './profile/device-profile-list/device-profile-list.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { DeviceCenterComponent } from './device/device-center/device-center.component';
import { DeviceProfileCenterComponent } from './profile/device-profile-center/device-profile-center.component';
import { ProvisionWatcherCenterComponent } from './provision-watcher/provision-watcher-center/provision-watcher-center.component';
import { ProvisionWatcherListComponent } from './provision-watcher/provision-watcher-list/provision-watcher-list.component';
import { EditProvisionWatcherComponent } from './provision-watcher/edit-provision-watcher/edit-provision-watcher.component';
import { AddProvisionWatcherComponent } from './provision-watcher/add-provision-watcher/add-provision-watcher.component';

@NgModule({
  declarations: [MetadataComponent, DeviceServiceMediaListComponent, DeviceServiceListComponent, DeviceListComponent, EditDeviceComponent, AddDeviceComponent, DeviceProfileListComponent, EditProfileComponent, AddProfileComponent, DeviceCenterComponent, DeviceProfileCenterComponent, ProvisionWatcherCenterComponent, ProvisionWatcherListComponent, EditProvisionWatcherComponent, AddProvisionWatcherComponent],
  imports: [
    CommonModule,
    FormsModule,
    MetadataRoutingModule,
  ]
})
export class MetadataModule { }
