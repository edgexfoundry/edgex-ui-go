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
