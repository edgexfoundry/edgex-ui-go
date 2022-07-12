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

import { DeviceAutoEventComponent } from './device-auto-event.component';
import { AutoEvent } from '../../../contracts/v2/auto-event';
import { DeviceProfile } from '../../../contracts/v2/device-profile';

describe('DeviceAutoEventComponent: unit test', () => {
  let component: DeviceAutoEventComponent;
  let fixture: ComponentFixture<DeviceAutoEventComponent>;
  const autoEvents: AutoEvent[] =  [{
    interval: '15s',
    onChange: false,
    sourceName: 'simple-device-resource-name'
  }]
  const deviceProfile: DeviceProfile =  {
    name: 'simple-profile-name',
    deviceCommands: [{
      name: 'simple-command-name'
    }],
    deviceResources: [{
      name: 'simple-device-resource-nam'
    }]
  } as DeviceProfile

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ DeviceAutoEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAutoEventComponent);
    component = fixture.componentInstance;
    component.autoEvents = autoEvents
    component.deviceProfile = deviceProfile
    component.ngOnChanges()
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('set autoEventDecoratorBearer without errors', () => {
    expect(component.autoEventDecoratorBearer.length).toBe(1);
    expect(component.autoEventDecoratorBearer[0].resource).toBe(autoEvents[0].sourceName);
  });
});
