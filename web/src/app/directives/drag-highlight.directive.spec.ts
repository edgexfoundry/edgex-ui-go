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

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DragHighlightDirective } from './drag-highlight.directive';

function makeDragoverEvent(
  target: EventTarget
): Partial<DragEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'dragover',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
    isTrusted: true,
    dataTransfer: new DataTransfer()
  };
}

@Component({
  template: `
  <div appDragHighlight data-testid="mock-dragHighlight">MockDragHightlight<div>
  `
})
class MockHostComponent {}

describe('DragHighlightDirective', () => {
  let fixture: ComponentFixture<MockHostComponent>
  let debugElement: DebugElement;

  const testid = '[data-testid="mock-dragHighlight"]' 
  const highlightClassGroup = 'border border-info shadow-lg bg-white rounded'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragHighlightDirective,MockHostComponent]
    }).compileComponents()
    fixture = TestBed.createComponent(MockHostComponent)
    fixture.detectChanges()
    debugElement = fixture.debugElement
  })
  
  it('does not set the hightlight class initially', () => {
    const divEl = debugElement.query(By.css(`${testid}`))
    expect(divEl.nativeElement.classList.value).not.toEqual(highlightClassGroup)
  });

  it('adds hightlight class when dragover event happens',() => {
    const divEl = debugElement.query(By.css(`${testid}`))
    divEl.triggerEventHandler('dragover',makeDragoverEvent(divEl.nativeElement))
    fixture.detectChanges()
    expect(divEl.nativeElement.classList.value).toEqual(highlightClassGroup)
  })

  it('removes hightlight class when dragleave event happens',() => {
    const divEl = debugElement.query(By.css(`${testid}`))
    divEl.triggerEventHandler('dragleave',{})
    fixture.detectChanges()
    expect(divEl.nativeElement.classList.value).not.toBe(highlightClassGroup)
  })

  it('removes hightlight class when drop event happens',() => {
    const divEl = debugElement.query(By.css(`${testid}`))
    divEl.triggerEventHandler('drop',{})
    fixture.detectChanges()
    expect(divEl.nativeElement.classList.value).not.toBe(highlightClassGroup)
  })

});
