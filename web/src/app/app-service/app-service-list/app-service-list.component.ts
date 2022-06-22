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

import { Component, OnInit } from '@angular/core';
import { RegistryCenterService } from '../../services/registry-center.service';
import { ServiceEndpoint } from '../../contracts/v2/register-center/service-endpoint';

@Component({
  selector: 'app-app-service-list',
  templateUrl: './app-service-list.component.html',
  styleUrls: ['./app-service-list.component.css']
})
export class AppServiceListComponent implements OnInit {

  appServiceList: ServiceEndpoint[] = [];
  constructor(private registrySvc: RegistryCenterService) { }

  ngOnInit(): void {
    this.getAllAppSvc();
  }
  
  getAllAppSvc() {
    this.registrySvc.getAllAppSvc().subscribe((svcEndpoints: ServiceEndpoint[]) => {
      this.appServiceList = [];
      svcEndpoints.forEach(svc => {
        if (svc.ServiceId.startsWith('app-')) {
          this.appServiceList.push(svc)
        }
      });
    })
  }
}
