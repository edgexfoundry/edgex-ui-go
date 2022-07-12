/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs'

import { DeviceComboListComponent } from './device-combo-list.component';
import { MetadataService } from '../../../services/metadata.service';

describe('DeviceComboListComponent', () => {
  let component: DeviceComboListComponent;
  let fixture: ComponentFixture<DeviceComboListComponent>;
  let mockMetadataService: MetadataService

  const selectedDevicesArray = ["simple-device-1  "," simple-device-2 "]
  const singleSelectedDevice = " simple-device-1 "
  const deviceNamesSelectedStrExpected = "simple-device-1,simple-device-2"
  const singleDeviceNamesSelectedStr = "simple-device-1"

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      allDevicesPagination: of({devices: []})
    })

    await TestBed.configureTestingModule({
      declarations: [ DeviceComboListComponent ],
      imports: [FormsModule],
      providers: [
        {provide: MetadataService, useValue: mockMetadataService},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('sets multiple values of deviceNamesSelectedStr correctly', () => {
    component.deviceSelected = selectedDevicesArray
    expect(component.deviceNamesSelectedStr).toEqual(deviceNamesSelectedStrExpected);
  });

  it('sets the single value of deviceNamesSelectedStr correctly', () => {
    component.singleDeviceSelected = singleSelectedDevice
    expect(component.deviceNamesSelectedStr).toEqual(singleDeviceNamesSelectedStr);
  });

  it('sets the single value of deviceNamesSelectedStr to be empty', () => {
    component.singleDeviceSelected = ''
    expect(component.deviceNamesSelectedStr).toBe('');
  });
});
