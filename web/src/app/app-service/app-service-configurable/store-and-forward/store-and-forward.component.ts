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

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreAndForward } from '../../../contracts/v2/appsvc/store-and-forward';
import { Writable } from "../../../contracts/v2/appsvc/writable";
import { RegistryCenterService } from "../../../services/registry-center.service";
import { MessageService } from "../../../message/message.service";

@Component({
  selector: 'app-appsvc-store-and-forward',
  templateUrl: './store-and-forward.component.html',
  styleUrls: ['./store-and-forward.component.css']
})
export class StoreAndForwardComponent implements OnInit, OnChanges {

  @Input() appServiceKey: string = ''
  @Input() storeAndForward: StoreAndForward
  @Output() storeAndForwardChange = new EventEmitter<StoreAndForward>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private registrySvc: RegistryCenterService,
    private msgSvc: MessageService) { 
    this.storeAndForward = {
      Enabled: 'false'
    } as StoreAndForward
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.storeAndForwardChange.emit(this.storeAndForward)
  }

  save() {
    let writableRequestObj = {} as Writable;
    writableRequestObj.StoreAndForward = this.storeAndForward
    this.registrySvc.deployToConsul({'Writable': writableRequestObj}, this.appServiceKey).subscribe(()=>{
      this.msgSvc.success('deploy StoreAndForward configuration',`service: ${this.appServiceKey}`);
      this.router.navigate(['../app-service-list'],{relativeTo: this.route})
    })
  }
}
