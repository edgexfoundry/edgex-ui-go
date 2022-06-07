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
import { of } from 'rxjs';

import { EditStreamComponent } from './edit-stream.component';
import { RuleEngineService } from '../../../services/rule-engine.service';

describe('EditStreamComponent: unit test', () => {
  let component: EditStreamComponent;
  let fixture: ComponentFixture<EditStreamComponent>;
  let mockRuleEngineService: RuleEngineService 

  beforeEach(async () => {
    mockRuleEngineService = jasmine.createSpyObj('RuleEngineService', {
      allStreams: of([])
    })

    await TestBed.configureTestingModule({
      declarations: [ EditStreamComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: RuleEngineService, useValue: mockRuleEngineService}]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
