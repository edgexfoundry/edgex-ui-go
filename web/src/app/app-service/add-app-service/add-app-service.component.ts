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
import { Router, ActivatedRoute } from '@angular/router';

interface appService {
  name: string,
  port: string
}

@Component({
  selector: 'app-add-app-service',
  templateUrl: './add-app-service.component.html',
  styleUrls: ['./add-app-service.component.css']
})
export class AddAppServiceComponent implements OnInit {

  appSvc: appService;

  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.appSvc = {} as appService;
  }

  ngOnInit(): void {
    this.renderPopoverComponent()
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  save() {
    let appSvcListStr = window.localStorage.getItem('edgexAppSvcList');
    if (appSvcListStr) {
      let appSvcList = JSON.parse(appSvcListStr) as appService[];
      appSvcList.push(this.appSvc);
      window.localStorage.setItem('edgexAppSvcList',JSON.stringify(appSvcList));
    }
    this.router.navigate(['../app-service-list'], { relativeTo: this.route })
  }

}
