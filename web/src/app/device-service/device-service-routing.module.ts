import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceServiceComponent } from './device-service.component';
import { DeviceServiceListComponent } from './device-service-list/device-service-list.component';

import { DeviceCenterComponent } from './device/device-center/device-center.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { EditDeviceComponent } from './device/edit-device/edit-device.component';

import { DeviceProfileCenterComponent } from './profile/device-profile-center/device-profile-center.component';
import { DeviceProfileListComponent } from './profile/device-profile-list/device-profile-list.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceServiceComponent,
    children: [
      {
        path: '',
        redirectTo: 'device-service-list',
        pathMatch: 'full',
      },
      {
        path: 'device-service-list',
        component: DeviceServiceListComponent,
      },
      {
        path: 'device-center',
        component: DeviceCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'device-list',
            pathMatch: 'full',
          },
          {
            path: 'device-list',
            component: DeviceListComponent,
          },
          {
            path: 'add-device',
            component: AddDeviceComponent,
          },
          {
            path: 'edit-device',
            component: EditDeviceComponent,
          }
        ]
      },
      {
        path: 'device-profile-center',
        component: DeviceProfileCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'device-profile-list',
            pathMatch: 'full',
          },
          {
            path: 'device-profile-list',
            component: DeviceProfileListComponent
          },
          {
            path: 'edit-profile',
            component: EditProfileComponent
          },
          {
            path: 'add-profile',
            component: AddProfileComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceServiceRoutingModule { }
