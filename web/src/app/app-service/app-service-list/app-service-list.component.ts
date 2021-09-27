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
import { MessageService } from '../../message/message.service';
import { AppServiceService } from '../../services/app-service.service';
import { ServiceEndpoint } from '../../contracts/v2/register-center/service-endpoint';

@Component({
  selector: 'app-app-service-list',
  templateUrl: './app-service-list.component.html',
  styleUrls: ['./app-service-list.component.css']
})
export class AppServiceListComponent implements OnInit {

  appServiceList: ServiceEndpoint[] = [];

  constructor(private appSvc: AppServiceService,
    private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.getAllAppSvc();
  }
  
  getAllAppSvc() {
    this.appSvc.getAllAppSvc().subscribe((svcEndpoints: ServiceEndpoint[]) => {
      this.appServiceList = [];
      svcEndpoints.forEach(svc => {
        if (svc.ServiceId.startsWith('app-')) {
          this.appServiceList.push(svc)
        }
      });
      // this.syncLocalStorageCache();
    })
  }

  syncLocalStorageCache() {
    let edgexAppSvcList = window.localStorage.getItem('edgexAppSvcList');
    if (edgexAppSvcList) {
      Object.assign(this.appServiceList, JSON.parse(edgexAppSvcList));
      
      return
    }
    window.localStorage.setItem('edgexAppSvcList',JSON.stringify(this.appServiceList));
  }

  removeSvc(appSvc: ServiceEndpoint) {
    this.appServiceList.forEach((svc,index)=> {
      if (appSvc.ServiceId === appSvc.ServiceId) {
        this.appServiceList.splice(index,1)
      }
    })
    window.localStorage.setItem('edgexAppSvcList',JSON.stringify(this.appServiceList));
  }
}
