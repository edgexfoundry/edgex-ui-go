/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
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

 import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragHighlight]'
})
export class DragHighlightDirective {

  classes = "border border-info shadow-lg bg-white rounded"

  constructor(private el: ElementRef) { }

  @HostListener('dragover',['$event']) ondragover(event: any) {
    event.preventDefault();
    let classList = this.classes.split(' ')
    classList.forEach((v) => {
      this.el.nativeElement.classList.add(v)
    })
  }

  @HostListener('dragenter',['$event']) ondragenter(event: any) {}

  @HostListener('dragend',['$event']) ondragend(event: any) {}

  @HostListener('dragleave',['$event']) ondragleave(event: any) {
    let classList = this.classes.split(' ')
    classList.forEach((v) => {
      this.el.nativeElement.classList.remove(v)
    })
  }

  @HostListener('dragexit',['$event']) ondragexit(event: any) {}

  @HostListener('drop',['$event']) ondrop(event: any) {
    let classList = this.classes.split(' ')
    classList.forEach((v) => {
      this.el.nativeElement.classList.remove(v)
    })
  }
}
