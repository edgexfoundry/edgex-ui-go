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

import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  // @Input('appDraggable') appDraggable: boolean = true;

  @Input() dataTransferedIn: string = '';

  @Output() dataTransferedOut: EventEmitter<string> = new EventEmitter<string>();;

  constructor(private el: ElementRef) { 
    el.nativeElement.draggable = true;
  }

  @HostListener('dragstart',['$event']) ondragstart(event: any) {
    
    event.dataTransfer.setData("key",this.dataTransferedIn);
  }

  @HostListener('dragover',['$event']) ondragover(event: any) {
    event.preventDefault();
    $(this.el.nativeElement).addClass("border border-info")
  }

  @HostListener('drop',['$event']) ondrop(event: any) {
    let v = event.dataTransfer.getData("key");
    if (!v) {
        return
    }
    this.dataTransferedOut.emit(v);
    event.preventDefault();
  }

  @HostListener('dragend',['$event']) ondragend(event: any) {
    event.preventDefault();
    $(this.el.nativeElement).removeClass("border border-info shadow-lg")
  }

  @HostListener('dragleave',['$event']) ondragleave(event: any) {
    event.preventDefault();
    $(this.el.nativeElement).removeClass("border border-info shadow-lg")
  }

}
