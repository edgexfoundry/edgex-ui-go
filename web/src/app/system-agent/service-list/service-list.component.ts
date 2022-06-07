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
import { ErrorService } from '../../services/error.service';
import { SystemAgentService } from '../../services/system-agent.service';
import { BaseWithServiceNameResponse } from '../../contracts/v2/common/base-response';

interface service {
  name: string,
  statusCode: string,
  metrics?: string,
  config?: string,
  operation?: string,
  alive?: boolean,
}

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  defaultServcies: string[] = [];

  operationBtnDisabled: boolean = false;
  toggleClass: string = "";

  availServices: service[] = [];

  constructor(private sysService: SystemAgentService, 
    private msgSvc: MessageService,
    private errorSvc: ErrorService) { }

  ngOnInit(): void {
    this.GetAllSvc();
  }

  GetAllSvc() {
    this.sysService.getRegisteredServiceAll().subscribe((resp: any) => {
      resp.forEach((svc: any) => {
        this.defaultServcies.push(svc.ServiceId);
      });
      this.allSvcHealthCheck();
    });
  }

  allSvcHealthCheck() {
    this.sysService.getAllSvcHealth(this.defaultServcies.join(",")).subscribe((resp: BaseWithServiceNameResponse[]) => {
      this.availServices = [];
      resp.forEach((data,index) => {
        let s: service = { name: `${data.serviceName}`, statusCode: `${data.statusCode}` }
        s.alive = data.statusCode === 200 ? true: false;
        this.availServices.push(s);
      });
      this.availServices.sort((a,b) => {
        if (a.name > b.name) {
          return 1
        }
        return -1
      });
    });
  }

  refresh() {
    this.operationBtnDisabled = true;
    this.sysService.getAllSvcHealth(this.defaultServcies.join(",")).subscribe((resp: BaseWithServiceNameResponse[]) => {
      this.availServices = [];
      resp.forEach((data,index) => {
        let s: service = { name: `${data.serviceName}`, statusCode: `${data.statusCode}` }
        s.alive = data.statusCode === 200 ? true: false;
        this.availServices.push(s);
      });
      this.operationBtnDisabled = false;
      this.availServices.sort((a,b) => {
        if (a.name > b.name) {
          return 1
        }
        return -1
      });
      this.msgSvc.success('refresh');
    });
  }

  start(name: string) {
    this.operationBtnDisabled = true;
    this.sysService.startV2(name).subscribe((resp: BaseWithServiceNameResponse[]) => {
      if (resp[0].statusCode !== 200 ) {
        this.msgSvc.errors(resp[0].message);
        return
      }
      this.availServices.forEach(svc => {
        if (`${svc.name}` === resp[0].serviceName) {
          svc.statusCode = String(resp[0].statusCode);
          svc.alive = true;
          return
        }
      })
      setTimeout(() => {
        // this.allSvcHealthCheck();
        this.operationBtnDisabled = false;
      }, 2000);
      
    });
  }

  restart(name: string) {
    this.operationBtnDisabled = true;
    this.sysService.restartV2(name).subscribe((resp: BaseWithServiceNameResponse[]) => {
      if (resp[0].statusCode !== 200 ) {
        this.msgSvc.errors(resp[0].message);
        return
      }
      setTimeout(() => {
        this.allSvcHealthCheck();
        this.operationBtnDisabled = false;
      }, 2000);
    });
  }

  stop(name: string) {
    this.operationBtnDisabled = true;
    this.sysService.stopV2(name).subscribe((resp: BaseWithServiceNameResponse[]) => {
      if (resp[0].statusCode !== 200 ) {
        this.msgSvc.errors(resp[0].message);
        return
      }
      setTimeout(() => {
        this.allSvcHealthCheck();
        this.operationBtnDisabled = false;
      }, 2000);
    });
  }

}
