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
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ConfigComponent } from './config.component';
import { SystemAgentService } from '../../services/system-agent.service';
import { CommandService } from '../../services/command.service';
import { DataService } from '../../services/data.service';
import { MetadataService } from '../../services/metadata.service';
import { NotificationsService } from '../../services/notifications.service';
import { SchedulerService } from '../../services/scheduler.service';

describe('ConfigComponent: unit test', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  let mockSystemAgentService: SystemAgentService
  let mockCommandService:  CommandService
  let mockDataService: DataService
  let mockMetadataService: MetadataService
  let mockNotificationsService: NotificationsService
  let mockSchedulerService: SchedulerService

  beforeEach(async () => {
    mockSystemAgentService = jasmine.createSpyObj('SystemAgentService', {
      getRegisteredServiceAll: of([]),
      getAllSvcHealth: of([])
    })

    await TestBed.configureTestingModule({
      declarations: [ ConfigComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {provide: SystemAgentService, useValue: mockSystemAgentService},
        {provide: CommandService, useValue: mockCommandService},
        {provide: DataService, useValue: mockDataService},
        {provide: MetadataService, useValue: mockMetadataService},
        {provide: NotificationsService, useValue: mockNotificationsService},
        {provide: SchedulerService, useValue: mockSchedulerService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
