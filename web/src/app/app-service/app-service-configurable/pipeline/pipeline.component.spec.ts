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
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs'

import { PipelineComponent } from './pipeline.component';
import { RegistryCenterService } from '../../../services/registry-center.service';

describe('PipelineComponent: unit test', () => {
  let component: PipelineComponent;
  let fixture: ComponentFixture<PipelineComponent>;
  let mockRegistryCenterService: RegistryCenterService

  beforeEach(async () => {
    mockRegistryCenterService = jasmine.createSpyObj<RegistryCenterService>('RegistryCenterService',{
      ping: of({}),
      getAppSvcConfigBySvcKey: of(),
      deployToConsul: undefined,
      getAllAppSvc: undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ PipelineComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: RegistryCenterService, useValue: mockRegistryCenterService}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('render without errors', () => {
    expect(component).toBeTruthy();
  });
});
