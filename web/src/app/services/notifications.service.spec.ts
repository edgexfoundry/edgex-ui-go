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

import { NotificationsService } from './notifications.service';
import { BaseWithIdResponse } from '../contracts/v2/common/base-response';
import { Subscription } from '../contracts/v2/subscription';

describe('NotificationsService: unit test', () => {
  let service: NotificationsService;
  let controller: HttpTestingController

  const expectedUrl = '/support-notifications/api/v2/subscription'
  const mockSubscription: Subscription = {} as Subscription
  const mockResp: BaseWithIdResponse = {
    apiVersion: 'v2',
    requestId: 'string',
    message: 'string',
    statusCode: 200,
    id: 'string'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationsService]
    });
    service = TestBed.inject(NotificationsService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedResp: BaseWithIdResponse | undefined
  it('verifies that addOneSubscription() works as expected', () => {
    service.addOneSubscription(mockSubscription).subscribe(resp =>  {
      expectedResp = resp
    })

    const request = controller.expectOne({
      method: 'POST',
      url: expectedUrl
    })
    request.flush(mockResp)
    controller.verify()
    expect(expectedResp).toEqual(mockResp)
  })
});
