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

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../auth.service';

describe('AuthInterceptor: unit test', () => {
  let interceptor: AuthInterceptor
  let mockAuthService: AuthService

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', {
      login: of({})
    })
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthInterceptor, {provide: AuthService, useValue: mockAuthService}]
    })
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('is created without errors', () => {
    expect(interceptor).toBeTruthy();
  });
});
