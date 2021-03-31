import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MetadataRoutingModule } from './metadata-routing.module';
import { MetadataComponent } from './metadata.component';
import { DeviceServiceMediaListComponent } from './device-service/device-service-media-list/device-service-media-list.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { EditDeviceComponent } from './device/edit-device/edit-device.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceProfileListComponent } from './profile/device-profile-list/device-profile-list.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { DeviceCenterComponent } from './device/device-center/device-center.component';
import { DeviceProfileCenterComponent } from './profile/device-profile-center/device-profile-center.component';

@NgModule({
  declarations: [MetadataComponent, DeviceServiceMediaListComponent, DeviceListComponent, EditDeviceComponent, AddDeviceComponent, DeviceProfileListComponent, EditProfileComponent, AddProfileComponent, DeviceCenterComponent, DeviceProfileCenterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MetadataRoutingModule,
  ]
})
export class MetadataModule { }
