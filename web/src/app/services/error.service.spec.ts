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

import { ErrorService } from './error.service';
import { MessageService } from '../message/message.service'

describe('ErrorService: integration test', () => {
  let service: ErrorService;

  const mockError: any = {
    statusCode: 500,
    message: 'Service Internal error'
  }

  const mockMultipleErrors: any = [{
    statusCode: 500,
    message: 'Service Internal error'
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.inject(ErrorService);
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  it('verifies handleErrorForV2API() works as expected',() => {
    expect(service.handleErrorForV2API(mockError)).toBe(true)
    expect(service.handleErrorForV2API(mockMultipleErrors)).toBe(true)
  })
});
