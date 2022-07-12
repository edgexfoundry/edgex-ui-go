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
import { Router, ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DeviceListComponent } from './device-list.component';
import { CommandService } from '../../../services/command.service';
import { MetadataService } from '../../../services/metadata.service';

describe('DeviceListComponent: unit test', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  let mockMetadataService: MetadataService
  let mockCommandService: CommandService

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      allDevicesPagination: of({devices: []}),
      findDevicesByServiceName: of({devices: []}),
      findDevicesByProfileName: undefined
    })

    await TestBed.configureTestingModule({
      declarations: [ DeviceListComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {provide: MetadataService, useValue: mockMetadataService},
        {provide: CommandService, useValue: mockCommandService},
        // {
        //   provide: ActivatedRoute, 
        //   useValue: 
        //   {
        //     queryParams: of({'svcName':'sample-service-name'})
        //   }
        // }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('not find device by serviceName',() => {
    expect(mockMetadataService.findDevicesByServiceName).not.toHaveBeenCalledWith(0,5,'sample-service-name');
  })

  it('not find device by profileName',() => {
    expect(mockMetadataService.findDevicesByProfileName).not.toHaveBeenCalledWith(0,5,'sample-profile-name');
  })

  it('reloads device list',() => {
    click(fixture, 'device-list-refresh-btn');
    expect(mockMetadataService.allDevicesPagination).toHaveBeenCalledWith(0,5);
  })
});

function testIdSelector(testId: string): string {
  return `[data-testid="${testId}"]`;
}

function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}


function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
  return queryByCss<T>(fixture, testIdSelector(testId));
}

function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0
  };
}

function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}