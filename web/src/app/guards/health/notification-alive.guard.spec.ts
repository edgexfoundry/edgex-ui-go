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

import { NotificationAliveGuard } from './notification-alive.guard';
import { NotificationsService } from '../../services/notifications.service'

describe('NotificationAliveGuard: unit test', () => {
  let guard: NotificationAliveGuard;
  let mockNotificationsService: NotificationsService

  beforeEach(() => {
    mockNotificationsService = jasmine.createSpyObj('NotificationsService', {
      addOneSubscription: of({})
    })
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{provide: NotificationsService,useValue: mockNotificationsService}]
    });
    guard = TestBed.inject(NotificationAliveGuard);
  });

  it('is created without errors', () => {
    expect(guard).toBeTruthy();
  });
});
