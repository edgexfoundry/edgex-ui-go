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

import { SystemAgentService } from './system-agent.service';
import { BaseWithMetricsResponse } from '../contracts/v2/common/base-response';

describe('SystemAgentService: unit test', () => {
  let service: SystemAgentService;
  let controller: HttpTestingController

  const mockSvcName = 'mock-oneSvcName'
  const expectedUrl = `/sys-mgmt-agent/api/v2/system/metrics?services=${mockSvcName}`
  const mockMetrisResponse: BaseWithMetricsResponse[] = []

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SystemAgentService]
    });
    service = TestBed.inject(SystemAgentService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedResp: BaseWithMetricsResponse[] | undefined
  it('verifies that getMetricsBySvcName() works as expected', () => {
    service.getMetricsBySvcName(mockSvcName).subscribe(resp => {
      expectedResp = resp
    })

    const request =  controller.expectOne({
      method: 'GET',
      url: expectedUrl
    })
    request.flush(mockMetrisResponse)
    controller.verify()
    expect(expectedResp).toEqual(mockMetrisResponse)
  })
});
