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

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InsecureSecrets } from '../../../contracts/v2/appsvc/insecure-secrets';
import { Writable } from "../../../contracts/v2/appsvc/writable";
import { RegistryCenterService } from "../../../services/registry-center.service";
import { MessageService } from "../../../message/message.service";

@Component({
  selector: 'app-appsvc-insecure-secrets',
  templateUrl: './insecure-secrets.component.html',
  styleUrls: ['./insecure-secrets.component.css']
})
export class InsecureSecretsComponent implements OnInit, OnChanges {

  @Input() appServiceKey: string = ''
  
  private _insecureSecrets: InsecureSecrets = {} as InsecureSecrets;
  // using get and set method to avoid overwriting on init value of InsecureSecrets when parent component was binding on.
  @Input() 
  get insecureSecrets(): InsecureSecrets {return this._insecureSecrets};
  set insecureSecrets(is: InsecureSecrets) { 
    Object.assign(this._insecureSecrets, is)
  }
  @Output() insecureSecretsChange = new EventEmitter<InsecureSecrets>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private registrySvc: RegistryCenterService,
    private msgSvc: MessageService) { 
    this.insecureSecrets = {
      DB: {Secrets: {}},
      mqtt: {Secrets: {}} ,
      http: {Secrets: {}},
      AES: {Secrets:{}}
    } as InsecureSecrets;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.insecureSecretsChange.emit(this.insecureSecrets)
  }

  save() {
    let writableRequestObj = {} as Writable;
    writableRequestObj.InsecureSecrets = this.insecureSecrets
    this.registrySvc.deployToConsul({'Writable': writableRequestObj}, this.appServiceKey).subscribe(()=>{
      this.msgSvc.success('deploy InsecureSecrets configuration',`service: ${this.appServiceKey}`);
      this.router.navigate(['../app-service-list'],{relativeTo: this.route})
    })
  }
}
