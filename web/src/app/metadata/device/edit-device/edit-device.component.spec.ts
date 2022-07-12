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

import { NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { EditDeviceComponent } from './edit-device.component';
import { MetadataService } from '../../../services/metadata.service';

describe('EditDeviceComponent', () => {
  let component: EditDeviceComponent;
  let fixture: ComponentFixture<EditDeviceComponent>;
  let mockMetadataService: MetadataService
  const mockDeviceName: string = 'sample-device-name'

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      findDeviceByName: of({
        device: {
          name: mockDeviceName,
          labels: ["device-virtual-example"],
          autoEvents: [
            {
              interval: "10s",
              onChange: false,
              sourceName: "Bool"
            }
          ],
          protocols: {
            "other": {
              "Address": "device-virtual-bool-01",
              "Port": "300"
            }
          }
        }
      }),
      findDevcieServiceByName: of({
        service: {
          name: "simple-device-service-name"
        }
      }),
      findProfileByName: of({
        profile: {
          name: "simple-profile-name",
          deviceResources: [],
          deviceCommands: []
        }
      })
    })
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ EditDeviceComponent ],
      providers: [
        {provide: MetadataService, useValue: mockMetadataService},
        {
          provide: ActivatedRoute, 
          useValue: 
          {
            queryParams: of({'deviceName': mockDeviceName})
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('expects that findDeviceByName be called', () => {
    expect(mockMetadataService.findDeviceByName).toHaveBeenCalledWith(mockDeviceName);
  });

  // it('sets the autoEventDecoratorBearer correctly', () => {
  //   expect(component.autoEventDecoratorBearer[0].unit).toBe('s');
  //   expect(component.autoEventDecoratorBearer[0].interval).toBe('10');
  // });

  // it('sets the protocolPropertyBearer correctly', () => {
  //   expect(component.protocolPropertyBearer[0].propertyName).toBe('Address');
  //   expect(component.protocolPropertyBearer[0].propertyValue).toBe('device-virtual-bool-01');
  // });
});
