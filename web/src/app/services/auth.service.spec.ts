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
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { AuthService } from './auth.service';

describe('AuthService: unit test', () => {
  let service: AuthService;
  let controller: HttpTestingController

  const expectedUrl = '/core-metadata/api/v3/ping'
  const mockToken = 'mock-token'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedToken: string | undefined
  it('verifies that tokenValidate() works as expected', () => {
      service.tokenValidate("/core-metadata/api/v3/ping").subscribe(token => {
        expectedToken = token
      })

      //find pending request
      const request = controller.expectOne({
        method: 'GET',
        url: expectedUrl
      })
      request.flush(mockToken)
      controller.verify()
      //verify request has been responsed as expected
      expect(expectedToken).toBe(mockToken)
  })
});
