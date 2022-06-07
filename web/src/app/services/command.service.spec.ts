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

import { CommandService } from './command.service';
import { MultiDeviceCoreCommandsResponse } from '../contracts/v2/responses/device-core-command-response';

describe('CommandService: unit test', () => {
  let service: CommandService;
  let controller: HttpTestingController

  const offset = 0
  const limit = 5
  const expectedUrl = `/core-command/api/v2/device/all?offset=${offset}&limit=${limit}`
  const mockDeviceName = 'mock-device-name'
  const mockProfileName = 'mock-profile-name'
  const mockCommandResponse: MultiDeviceCoreCommandsResponse = {
    apiVersion: 'v2',
    requestId: 'mock-request-id',
    message: 'success',
    statusCode: 200,
    deviceCoreCommands: [
      {
        deviceName: mockDeviceName,
        profileName: mockProfileName,
        coreCommands: [
          {
            name: 'string',
            get: true,
            set: true,
            path: 'string',
            url: 'string',
            parameters: [{
              resourceName: 'string',
              valueType: 'string'
            }]
          }
        ]
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommandService]
    });
    service = TestBed.inject(CommandService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  let expectedAssociatedCommands: MultiDeviceCoreCommandsResponse | undefined
  it('verifies that allDeviceCoreCommandsPagination() works as expected',() => {
    service.allDeviceCoreCommandsPagination(offset,limit).subscribe(cmds => {
      expectedAssociatedCommands = cmds
    })

    const request = controller.expectOne({
      method: 'GET',
      url: expectedUrl
    })
    request.flush(mockCommandResponse)
    controller.verify()
    //verify request has been responsed as expected
    expect(expectedAssociatedCommands).toEqual(mockCommandResponse)
  })
});
