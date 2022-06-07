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

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { TestBed,ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { InitializerComponent } from './initializer/initializer.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let debugElement: DebugElement;
  let app: AppComponent

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: 'initializer', component: InitializerComponent}]),FormsModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    app = fixture.componentInstance
    debugElement = fixture.debugElement
  });

  it('renders without errors', () => {
    expect(app).toBeTruthy();
  });

  it('renders Dashboard text link with some basic attributes',() => {
    const testid = '[data-testid="menu-item-dashboard"'
    const testid_context = '[data-testid="menu-item-dashboard-text"'
    let aEl = debugElement.query(By.css(`${testid}`))
    expect(aEl.attributes.routerLink).toBe('/dashboard')
    expect(aEl.attributes.routerLinkActive).toBe('active-link')

    aEl = debugElement.query(By.css(`${testid_context}`))
    expect(aEl.nativeElement.textContent).toBe('Dashboard')
  })
});
