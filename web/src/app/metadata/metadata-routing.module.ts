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

import { MetadataComponent } from './metadata.component';
import { DeviceServiceMediaListComponent } from './device-service/device-service-media-list/device-service-media-list.component';

import { DeviceCenterComponent } from './device/device-center/device-center.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { EditDeviceComponent } from './device/edit-device/edit-device.component';

import { DeviceProfileCenterComponent } from './profile/device-profile-center/device-profile-center.component';
import { DeviceProfileListComponent } from './profile/device-profile-list/device-profile-list.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

import { ProvisionWatcherCenterComponent } from './provision-watcher/provision-watcher-center/provision-watcher-center.component';
import { ProvisionWatcherListComponent } from './provision-watcher/provision-watcher-list/provision-watcher-list.component';
import { AddProvisionWatcherComponent } from './provision-watcher/add-provision-watcher/add-provision-watcher.component';
import { EditProvisionWatcherComponent } from './provision-watcher/edit-provision-watcher/edit-provision-watcher.component';

const routes: Routes = [
  {
    path: '',
    component: MetadataComponent,
    children: [
      {
        path: '',
        redirectTo: 'device-service-list',
        pathMatch: 'full',
      },
      {
        path: 'device-service-list',
        component: DeviceServiceMediaListComponent,
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
      },
      {
        path: 'provision-watcher-center',
        component: ProvisionWatcherCenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'provision-watcher-list',
            pathMatch: 'full',
          },
          {
            path: 'provision-watcher-list',
            component: ProvisionWatcherListComponent
          },
          {
            path: 'edit-provision-watcher',
            component: EditProvisionWatcherComponent
          },
          {
            path: 'add-provision-watcher',
            component: AddProvisionWatcherComponent
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
export class MetadataRoutingModule { }
