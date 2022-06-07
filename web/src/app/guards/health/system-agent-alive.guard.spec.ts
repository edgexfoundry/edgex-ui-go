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
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SystemAgentAliveGuard } from './system-agent-alive.guard';
import { SystemAgentService } from '../../services/system-agent.service'

describe('SystemAgentAliveGuard', () => {
  let guard: SystemAgentAliveGuard;
  let mockSystemAgentService: SystemAgentService

  beforeEach(() => {
    mockSystemAgentService = jasmine.createSpyObj('SystemAgentService', {
      getRegisteredServiceAll: of({})
    })

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{provide: SystemAgentService, useValue: mockSystemAgentService}]
    });
    guard = TestBed.inject(SystemAgentAliveGuard);
  });

  it('is created without errors', () => {
    expect(guard).toBeTruthy();
  });
});
