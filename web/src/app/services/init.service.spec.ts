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

import { InitService } from './init.service';

describe('InitService: unit test', () => {
  let service: InitService;
  let controller: HttpTestingController

  const mockSecureMode = 'insecure'
  const expectedUrl =  '/api/v2/auth/securemode'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InitService]
    });
    service = TestBed.inject(InitService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedSecureMode: string | undefined
  it('verifies that getSecureMode() works as expected', () => {
    service.getSecureMode().subscribe(mode => {
      expectedSecureMode = mode
    })

    const request = controller.expectOne({
      method: 'GET',
      url: expectedUrl
    })
    request.flush(mockSecureMode)
    controller.verify()
    expect(expectedSecureMode).toBe(mockSecureMode)
  })
});
