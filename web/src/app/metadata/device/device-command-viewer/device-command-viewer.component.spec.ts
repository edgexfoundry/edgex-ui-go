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

import { DeviceCommandViewerComponent } from './device-command-viewer.component';
import { CommandService } from '../../../services/command.service';
import { MetadataService } from '../../../services/metadata.service';
import { of } from 'rxjs';

describe('DeviceCommandViewerComponent: unit test', () => {
  let component: DeviceCommandViewerComponent;
  let fixture: ComponentFixture<DeviceCommandViewerComponent>;
  let mockCommandService: CommandService
  let mockMetadataService: MetadataService

  let mockDeviceName: string = "simple-device-name"
  let mockProfileName: string = "simple-profile-name"

  beforeEach(async () => {
    mockCommandService = jasmine.createSpyObj("CommandService",{
      findDeviceAssociatedCommnadsByDeviceName: of({
        deviceCoreCommand: {
          deviceName: mockDeviceName,
          profileName: mockProfileName,
          coreCommands: [{
            name: "coolingpoint1",
            parameters: [
              {
                resourceName: "resource1",
                valueType: "Int32"
              }
            ]
          }]
        }
      })
    })
    mockMetadataService = jasmine.createSpyObj("MetadataService",{
      findProfileByName: of({profile: {name: mockProfileName}})
    })

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ DeviceCommandViewerComponent ],
      providers: [
        {provide: CommandService, useValue: mockCommandService},
        {provide: MetadataService, useValue: mockMetadataService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCommandViewerComponent);
    component = fixture.componentInstance;
    component.deviceName =  mockDeviceName
    component.ngOnChanges()
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('expects that findDeviceAssociatedCommnadsByDeviceName be called', () => {
    expect(mockCommandService.findDeviceAssociatedCommnadsByDeviceName).toHaveBeenCalledWith(mockDeviceName);
  });

  it('expects that findProfileByName be called', () => {
    expect(mockMetadataService.findProfileByName).toHaveBeenCalledWith(mockProfileName);
  });

  // it('expects that findDeviceAssociatedCommnadsByDeviceName not be called', () => {
  //   component.deviceName =  ''
  //   component.ngOnChanges()
  //   fixture.detectChanges();
  //   expect(mockCommandService.findDeviceAssociatedCommnadsByDeviceName).not.toHaveBeenCalledWith(mockDeviceName);
  // });
});
