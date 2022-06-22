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
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ServiceUnavailableComponent } from './service-unavailable.component';
import { MetadataService } from '../../../services/metadata.service'
import { DataService } from '../../../services/data.service'
import { SchedulerService } from '../../../services/scheduler.service'
import { NotificationsService } from '../../../services/notifications.service'
import { SystemAgentService } from '../../../services/system-agent.service'
import { RuleEngineService } from '../../../services/rule-engine.service'
import { RegistryCenterService } from '../../../services/registry-center.service';

describe('ServiceUnavailableComponent', () => {
  let component: ServiceUnavailableComponent;
  let fixture: ComponentFixture<ServiceUnavailableComponent>;
  let mockMetadataService: MetadataService
  let mockDataService: DataService
  let mockSchedulerService: SchedulerService
  let mockNotificationsService: NotificationsService
  let mockSystemAgentService: SystemAgentService
  let mockRuleEngineService: RuleEngineService
  let mockRegistryCenterService: RegistryCenterService

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      ping: of({})
    })
    mockDataService = jasmine.createSpyObj('DataService', {
      ping: of({})
    })
    mockSchedulerService = jasmine.createSpyObj('SchedulerService', {
      ping: of({})
    })
    mockNotificationsService = jasmine.createSpyObj('NotificationsService', {
      ping: of({})
    })
    mockSystemAgentService = jasmine.createSpyObj('SystemAgentService', {
      ping: of({})
    })
    mockRuleEngineService = jasmine.createSpyObj('RuleEngineService', {
      ping: of({})
    })
    mockRegistryCenterService = jasmine.createSpyObj('RegistryCenterService', {
      ping: of({})
    })

    await TestBed.configureTestingModule({
      declarations: [ ServiceUnavailableComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {provide: MetadataService, useValue: mockMetadataService},
        {provide: DataService, useValue: mockDataService},
        {provide: SchedulerService, useValue: mockSchedulerService},
        {provide: NotificationsService, useValue: mockNotificationsService},
        {provide: SystemAgentService, useValue: mockSystemAgentService},
        {provide: RuleEngineService, useValue: mockRuleEngineService},
        {provide: RegistryCenterService, useValue: mockRegistryCenterService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });
});
