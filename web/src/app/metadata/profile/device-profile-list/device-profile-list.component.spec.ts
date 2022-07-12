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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { DeviceProfileListComponent } from './device-profile-list.component';
import { MetadataService } from '../../../services/metadata.service';

describe('DeviceProfileListComponent: unit test', () => {
  let component: DeviceProfileListComponent;
  let fixture: ComponentFixture<DeviceProfileListComponent>;
  let mockMetadataService: MetadataService

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      allDeviceProfolesPagination: of({profiles:[]}),
      findProfileByName: undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ DeviceProfileListComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: MetadataService, useValue: mockMetadataService},],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('finds device profiles pagination',() => {
    expect(mockMetadataService.allDeviceProfolesPagination).toHaveBeenCalledWith(0,5);
  })

  it('not find device profile by profileName',() => {
    expect(mockMetadataService.findProfileByName).not.toHaveBeenCalledWith('sample-profile-name');
  })
});
