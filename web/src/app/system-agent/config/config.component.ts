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

import { SystemAgentService } from '../../services/system-agent.service';
import { CommandService } from '../../services/command.service';
import { DataService } from '../../services/data.service';
import { MetadataService } from '../../services/metadata.service';
import { NotificationsService } from '../../services/notifications.service';
import { SchedulerService } from '../../services/scheduler.service';
import { BaseWithConfigResponse } from '../../contracts/v2/common/base-response';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  service: string = '';
  config?: any;

  constructor(private sysService: SystemAgentService,
    private route: ActivatedRoute,
    private cmdSvc: CommandService,
    private dataService: DataService,
    private metadataSvc:MetadataService,
    private schedulerSvc: SchedulerService,
    private notiSvc :NotificationsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['svcName']) {
        this.service = params['svcName'];
        this.getConfigs();
      }
    });
  }

  //deprecated
  getConfigV2(service: string): any {
    switch (service) {
      case "edgex-core-data":
        return this.dataService.getConfig().subscribe((resp) => {this.config = JSON.stringify(resp, null, 3);})
      case "edgex-core-metadata":
        return this.metadataSvc.getConfig().subscribe((resp) => {this.config = JSON.stringify(resp, null, 3);})
      case "edgex-core-command":
        return this.cmdSvc.getConfig().subscribe((resp) => {this.config = JSON.stringify(resp, null, 3);})
      case "edgex-support-notifications":
        return this.schedulerSvc.getConfig().subscribe((resp) => {this.config = JSON.stringify(resp, null, 3);})
      case "edgex-support-scheduler":
        return this.notiSvc.getConfig().subscribe((resp) => {this.config = JSON.stringify(resp, null, 3);})
    }
  }

  
  getConfigs() {
    this.sysService.getConfigBySvcName(this.service as string).subscribe((resp: BaseWithConfigResponse[]) => {
      this.config = JSON.stringify(resp[0].config, null, 3);
    });
  }

  edit() {
    
  }
}
