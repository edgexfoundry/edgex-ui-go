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

import { SystemAgentService } from '../../services/system-agent.service';
import { MetricsComponent } from './metrics.component';

describe('MetricsComponent: unit test', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;
  let mockSystemAgentService: SystemAgentService

  beforeEach(async () => {
    mockSystemAgentService = jasmine.createSpyObj('SystemAgentService', {
      getRegisteredServiceAll: of([]),
      getAllSvcHealth: of([])
    })

    await TestBed.configureTestingModule({
      declarations: [ MetricsComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: SystemAgentService, useValue: mockSystemAgentService}]
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
