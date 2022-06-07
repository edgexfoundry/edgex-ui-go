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

import { MetadataService } from './metadata.service';
import { BaseResponse } from '../contracts/v2/common/base-response';

describe('MetadataService: unit test', () => {
  let service: MetadataService;
  let controller: HttpTestingController

  const mockDeviceName = 'mock-device-name'
  const expectedUrl = `/core-metadata/api/v2/device/name/${mockDeviceName}`
  const mockResp: BaseResponse =  {
    apiVersion: 'v2',
    requestId: 'string',
    message: 'string',
    statusCode: 200
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MetadataService]
    });
    service = TestBed.inject(MetadataService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedResponse: BaseResponse | undefined
  it('verifies that deleteOneDeviceByName() works as expected', () => {
    service.deleteOneDeviceByName(mockDeviceName).subscribe(resp => {
      expectedResponse = resp
    })

    const request = controller.expectOne({
      method: 'DELETE',
      url: expectedUrl
    })
    request.flush(mockResp)
    controller.verify()
    expect(expectedResponse).toEqual(mockResp)
  })
});
