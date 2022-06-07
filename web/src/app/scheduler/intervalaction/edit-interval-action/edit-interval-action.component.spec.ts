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

import { EditIntervalActionComponent } from './edit-interval-action.component';
import { SchedulerService } from '../../../services/scheduler.service';

describe('EditIntervalActionComponent: unit test', () => {
  let component: EditIntervalActionComponent;
  let fixture: ComponentFixture<EditIntervalActionComponent>;
  let mockSchedulerService: SchedulerService

  beforeEach(async () => {
    mockSchedulerService = jasmine.createSpyObj('SchedulerService', {
      ping: of({})
    })

    await TestBed.configureTestingModule({
      declarations: [ EditIntervalActionComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: SchedulerService, useValue: mockSchedulerService}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EditIntervalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
