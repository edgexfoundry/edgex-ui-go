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

import { AppServiceService } from './app-service.service';
import { ServiceEndpoint } from '../contracts/v2/register-center/service-endpoint'

describe('AppServiceService: unit test', () => {
  let service: AppServiceService;
  let controller: HttpTestingController

  const expectedUrl = '/api/v2/registercenter/service/all'
  const mockEndponts: ServiceEndpoint[] = [
    {
      ServiceId: 'core-metadata',
      Host: 'edgex-core-metadata',
      Port: 49981
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppServiceService]
    });
    service = TestBed.inject(AppServiceService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedEndpoints: ServiceEndpoint[] | undefined
  it('verifies that getAllAppSvc() works as expected', () => {
    service.getAllAppSvc().subscribe(endpoints => {
      expectedEndpoints = endpoints
    })

    //find pending request
    const request = controller.expectOne({
      method: 'GET',
      url: expectedUrl
    })
    request.flush(mockEndponts)
    //verify request has been responsed
    controller.verify()
    expect(expectedEndpoints).toEqual(mockEndponts)
  })
});
