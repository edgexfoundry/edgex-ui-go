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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';  

import { SubscriptionListComponent } from './subscription-list.component';
import { NotificationsService } from '../../../services/notifications.service';
import { MultiSubscriptionResponse } from '../../../contracts/v2/responses/subscription-response';

describe('SubscriptionListComponent: unit test', () => {
  let component: SubscriptionListComponent;
  let fixture: ComponentFixture<SubscriptionListComponent>;
  let mockNotificationsService: NotificationsService
  let mockMultiSubscriptionResponse: MultiSubscriptionResponse =  {
    apiVersion: 'v2',
    requestId: 'string',
    message: 'string',
    statusCode: 200,
    subscriptions: [] 
  }

  beforeEach(async () => {
    mockNotificationsService = jasmine.createSpyObj('NotificationsService', {
      findAllSubscriptionPagination: of(mockMultiSubscriptionResponse)
    })

    await TestBed.configureTestingModule({
      declarations: [ SubscriptionListComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: NotificationsService, useValue: mockNotificationsService}]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
