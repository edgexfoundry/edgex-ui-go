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
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { DataService } from '../services/data.service'
import { MetadataService } from '../services/metadata.service';
import { SchedulerService } from '../services/scheduler.service';
import { NotificationsService } from '../services/notifications.service';
import { SystemAgentService } from '../services/system-agent.service';
import { RegistryCenterService } from '../services/registry-center.service';

describe('DashboardComponent: unit test', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDataService: DataService
  let mockMetadataService: MetadataService
  let mockSchedulerService: SchedulerService
  let mockNotificationsService: NotificationsService
  let mockSystemAgentService: SystemAgentService
  let mockRegistryCenterService: RegistryCenterService

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', {
      ping: of({}),
      eventCount: of({}),
      readingCount: of({})
    })
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      ping: of({}),
      allDeviceServices: of({services: []}),
      allDevices: of({devices: []}),
      allDeviceProfolesPagination: of({profiles: []})
    })
    mockSchedulerService = jasmine.createSpyObj('SchedulerService', {
      ping: of({}),
      findAllIntervalsPagination: of({intervals: []})
    })
    mockNotificationsService = jasmine.createSpyObj('NotificationsService', {
      ping: of({}),
      findNotificationsByStatusPagination: of({notifications: []})
    })
    mockSystemAgentService = jasmine.createSpyObj('SystemAgentService', {
      ping: of({}),
      getRegisteredServiceAll: of(),
    })
    mockRegistryCenterService = jasmine.createSpyObj('RegistryCenterService', {
      ping: of({})
    })
    
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [FormsModule],
      providers: [
        {provide: DataService, useValue: mockDataService},
        {provide: MetadataService, useValue: mockMetadataService},
        {provide: SchedulerService, useValue: mockSchedulerService},
        {provide: NotificationsService, useValue: mockNotificationsService},
        {provide: SystemAgentService, useValue: mockSystemAgentService},
        {provide: RegistryCenterService, useValue: mockRegistryCenterService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });
});
