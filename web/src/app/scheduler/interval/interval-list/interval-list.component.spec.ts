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

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from  '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { IntervalListComponent } from './interval-list.component';
import { SchedulerService } from '../../../services/scheduler.service';
import { MultiIntervalResponse } from '../../../contracts/v2/responses/interval-response';

describe('IntervalListComponent: unit test', () => {
  let component: IntervalListComponent;
  let fixture: ComponentFixture<IntervalListComponent>;
  let mockSchedulerService: SchedulerService
  let mockMultiIntervalResponse: MultiIntervalResponse = {
    apiVersion: 'v2',
    requestId: 'string',
    message: 'string',
    statusCode: 200,
    intervals: [] 
  }

  beforeEach(async () => {
    mockSchedulerService = jasmine.createSpyObj('SchedulerService', {
      findAllIntervalsPagination: of(mockMultiIntervalResponse)
    })

    await TestBed.configureTestingModule({
      declarations: [ IntervalListComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: SchedulerService, useValue: mockSchedulerService}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(IntervalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
