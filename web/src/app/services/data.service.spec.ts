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

import { DataService } from './data.service';
import { CountResponse } from '../contracts/v2/common/count-response';

describe('DataService: unit test', () => {
  let service: DataService;
  let controller: HttpTestingController
  
  const expectedUrl = '/core-data/api/v2/event/count'
  const mockCountResponse: CountResponse = {
    apiVersion: 'v2',
    requestId: 'string',
    message: 'string',
    statusCode: 200,
    Count: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedCount: CountResponse | undefined
  it('verifies that eventCount() works as expected', () => {
    service.eventCount().subscribe(count => {
      expectedCount = count
    })

    const request = controller.expectOne({
      method: 'GET',
      url: expectedUrl
    })
    request.flush(mockCountResponse)
    controller.verify()
    expect(expectedCount).toEqual(mockCountResponse)
  })
});
