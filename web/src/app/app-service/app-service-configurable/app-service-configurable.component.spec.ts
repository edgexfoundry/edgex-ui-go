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
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppServiceConfigurableComponent } from './app-service-configurable.component';
import { AppServiceService } from '../../services/app-service.service';

describe('AppServiceConfigurableComponent: unit test', () => {
  let component: AppServiceConfigurableComponent;
  let fixture: ComponentFixture<AppServiceConfigurableComponent>;
  let mockAppServiceService: AppServiceService

  beforeEach(async () => {
    mockAppServiceService = jasmine.createSpyObj<AppServiceService>('AppServiceService',{
      getAppSvcConfigBySvcKey: of({}),
      deployToConsul: undefined,
      getAllAppSvc: undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ AppServiceConfigurableComponent ],
      imports: [FormsModule],
      providers:[
        {
            provide: ActivatedRoute, 
            useValue: 
            {
              queryParams: of({'appSvcKey':'sample-svc'})
            }
        },
        {provide: AppServiceService, useValue: mockAppServiceService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppServiceConfigurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('calls loadAppSvcConfig', () => {
    component.ngOnInit()
    fixture.detectChanges();
    expect(mockAppServiceService.getAppSvcConfigBySvcKey).toHaveBeenCalled()
  })
});
