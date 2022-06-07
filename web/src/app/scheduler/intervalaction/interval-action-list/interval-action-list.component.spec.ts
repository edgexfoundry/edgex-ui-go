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
import { FormsModule }  from '@angular/forms'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IntervalActionListComponent } from './interval-action-list.component';
import { SchedulerService } from '../../../services/scheduler.service';
import { IntervalAction } from '../../../contracts/v2/interval-action';

describe('IntervalActionListComponent', () => {
  let component: IntervalActionListComponent;
  let fixture: ComponentFixture<IntervalActionListComponent>;
  let mockSchedulerService: SchedulerService
  let mockIntervalActionList: IntervalAction[] = []

  beforeEach(async () => {
    mockSchedulerService = jasmine.createSpyObj('SchedulerService', {
      isCheckedAll: false,
      intervalActionList: mockIntervalActionList,
      findAllIntervalActionsPagination: of([])
    })

    await TestBed.configureTestingModule({
      declarations: [ IntervalActionListComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {
          provide: SchedulerService, 
          useValue: mockSchedulerService
        },
        {
        provide: ActivatedRoute, 
        useValue: 
        {
          queryParams: of({'intervalName':'sample-interval-name'})
        }
    },],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(IntervalActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
