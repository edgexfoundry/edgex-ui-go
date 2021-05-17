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
import { SystemAgentService } from '../../services/system-agent.service';

import { MessageService } from '../../message/message.service';
import { ErrorService } from '../../services/error.service';

interface service {
  name: string,
  state: string,
  metrics?: string,
  config?: string,
  operation?: string,
  health?: boolean,
}

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  defaultServcies = [
    "edgex-core-metadata", "edgex-core-data", "edgex-core-command",
    "edgex-support-notifications", "edgex-support-scheduler",
    // "edgex-redis",
    "rule-engine",
    // "edgex-ui-go",
    //"edgex-sys-mgmt-agent",
    "edgex-app-service-configurable-rules"];

  disabled: boolean = false;
  toggleClass: string = "";

  availServices: service[] = [];

  constructor(private sysService: SystemAgentService, 
    private msgSvc: MessageService,
    private errorSvc: ErrorService) { }

  ngOnInit(): void {
    this.sysService.getHealth(this.defaultServcies.join(",")).subscribe(data => {
      for (const [k, v] of Object.entries(data)) {
        if (v) {
          let s: service = { name: `${k}`, state: `${v}` }
          this.availServices.push(s)
        }
      }
    });
  }

  refresh() {
    this.disabled = true;
    this.sysService.getHealth(this.defaultServcies.join(",")).subscribe(data => {

      this.availServices = [];

      for (const [k, v] of Object.entries(data)) {
        if (v) {
          let s: service = { name: `${k}`, state: `${v}` }
          this.availServices.push(s)
        }
      }
      this.disabled = false;
      this.msgSvc.success('refresh');
    });
  }

  start(name: string) {
    this.disabled = true;
    this.toggleClass = "badge badge-secondary";
    let self = this;
    this.sysService.start(name).subscribe((resp: any) => {
      if (!resp[0].Success) {
        this.msgSvc.errors(resp[0].errorMessage)
        return
      }
      this.availServices.forEach(function (svc) {
        if (svc.name == name) {
          svc.state = "true";
          self.disabled = false;
          self.toggleClass = "";
          return
        }
      });
    });
  }

  restart(name: string) {
    this.disabled = true;
    let self = this;
    this.sysService.restart(name).subscribe((resp: any) => {
      if (!resp[0].Success) {
        this.msgSvc.errors(resp[0].errorMessage)
        return
      }
      this.availServices.forEach(function (svc) {
        if (svc.name == name) {
          svc.state = "true";
          self.disabled = false;
          return
        }
      });
    });
  }

  stop(name: string) {
    this.disabled = true;
    let self = this;
    this.sysService.stop(name).subscribe((resp: any) => {
      if (!resp[0].Success) {
        this.msgSvc.errors(resp[0].errorMessage)
        return
      }
      this.availServices.forEach(function (svc) {
        if (svc.name == name) {
          svc.state = "false";
          self.disabled = false;
          return
        }
      });
    });
  }

}
