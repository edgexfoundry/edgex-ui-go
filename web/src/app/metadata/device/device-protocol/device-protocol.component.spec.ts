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
import { FormsModule } from '@angular/forms';

import { DeviceProtocolComponent } from './device-protocol.component';

describe('DeviceProtocolComponent: unit test', () => {
  let component: DeviceProtocolComponent;
  let fixture: ComponentFixture<DeviceProtocolComponent>;
  const edit_mode = 'edit'
  const add_mode = 'add'
  const deviceProtocols = {
    'other': {
      'k1':'v1'
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ DeviceProtocolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceProtocolComponent);
    component = fixture.componentInstance;
    component.mode = edit_mode
    component.deviceProtocols = deviceProtocols
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('sets customProtocolPropertyBearer without errors', () => {
    expect(component.customProtocolName).toBe('other');
    expect(component.customProtocolPropertyBearer.length).toBe(1);
    expect(component.customProtocolPropertyBearer[0].propertyName).toBe('k1');
    expect(component.customProtocolPropertyBearer[0].propertyValue).toBe('v1');
  });
});
