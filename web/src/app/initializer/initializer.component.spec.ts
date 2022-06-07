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
import { InitializerComponent } from './initializer.component';
import { InitService } from '../services/init.service';
import { AuthService } from '../services/auth.service';

describe('InitializerComponent: unit test', () => {
  let fixture: ComponentFixture<InitializerComponent>;
  let component: InitializerComponent;
  let mockInitService: InitService
  let mockAuthService: AuthService

  beforeEach(async () => {
    mockInitService = jasmine.createSpyObj('InitService',{
      getSecureMode: of()
    })
    mockAuthService = jasmine.createSpyObj('AuthService',{
      tokenValidate: of(),
      login: undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ InitializerComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: InitService, useValue: mockInitService},
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InitializerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });
});
