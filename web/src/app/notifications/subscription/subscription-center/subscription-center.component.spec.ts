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

import { SubscriptionCenterComponent } from './subscription-center.component';

describe('SubscriptionCenterComponent: unit test', () => {
  let component: SubscriptionCenterComponent;
  let fixture: ComponentFixture<SubscriptionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCenterComponent ],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created without errors', () => {
    expect(component).toBeTruthy();
  });
});
