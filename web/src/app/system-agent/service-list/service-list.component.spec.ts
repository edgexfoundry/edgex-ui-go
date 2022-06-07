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
import { of } from 'rxjs';

import { ServiceListComponent } from './service-list.component';
import { SystemAgentService } from '../../services/system-agent.service';

describe('ServiceListComponent: unit test', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;
  let mockSystemAgentService: SystemAgentService

  beforeEach(async () => {
    mockSystemAgentService = jasmine.createSpyObj('SystemAgentService', {
      getRegisteredServiceAll: of([]),
      getAllSvcHealth: of([])
    })

    await TestBed.configureTestingModule({
      declarations: [ ServiceListComponent ],
      providers: [{provide: SystemAgentService, useValue: mockSystemAgentService}]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
