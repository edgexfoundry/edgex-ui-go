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
 

interface appService {
  name: string,
  port: string
}

@Component({
  selector: 'app-app-service-list',
  templateUrl: './app-service-list.component.html',
  styleUrls: ['./app-service-list.component.css']
})
export class AppServiceListComponent implements OnInit {

  appServiceList: appService[] = [
    {
      name: 'app-rules-engine',
      port: '59701'
    }
  ];

  constructor(private appSvc: AppServiceService,
    private msgSvc: MessageService) { }

  ngOnInit(): void {
    let edgexAppSvcList = window.localStorage.getItem('edgexAppSvcList');
    if (edgexAppSvcList) {
      this.appServiceList = JSON.parse(edgexAppSvcList);
      return
    }
    window.localStorage.setItem('edgexAppSvcList',JSON.stringify(this.appServiceList));
  }
  
  removeSvc(appSvc: appService) {
    this.appServiceList.splice(this.appServiceList.indexOf(appSvc),1);
    window.localStorage.setItem('edgexAppSvcList',JSON.stringify(this.appServiceList));
  }
}
