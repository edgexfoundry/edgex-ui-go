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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { NotificationsService } from '../../../services/notifications.service';
import { SchedulerService } from '../../../services/scheduler.service';
import { RuleEngineService } from '../../../services/rule-engine.service';
import { SystemAgentService } from '../../../services/system-agent.service';
import { RegistryCenterService } from '../../../services/registry-center.service';

@Component({
  selector: 'app-service-unavailable',
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.css']
})
export class ServiceUnavailableComponent implements OnInit {

  svcName?: string
  routerPath?: string
  refresgMsg: boolean = false
  refreshBtnDisable: boolean = false

  constructor(private router: Router,
    private route: ActivatedRoute,
    private coredataSvc: DataService,
    private metadataSvc: MetadataService,
    private notiSvc: NotificationsService,
    private schedulerSvc: SchedulerService,
    private ruleSvc: RuleEngineService,
    private systemSvc: SystemAgentService,
    private registrySvc: RegistryCenterService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.svcName = params['svcName'];
      this.routerPath = params['routerPath'];
    });
  }

  refresh() {
    this.refreshBtnDisable = true
    this.ping().pipe(
      catchError(error => {
        this.refresgMsg = true
        window.setTimeout(()=>{
          this.refresgMsg = false
          this.refreshBtnDisable = false
        },3000)
        return throwError(()=>'Something bad happened; please try again later.');
      })
    ).subscribe(() =>this.router.navigate([`${this.routerPath}`]))
  }

  ping(): Observable<any>  {
    switch (this.svcName) {
      case 'core data':
        return this.coredataSvc.ping()   
      case 'metadata':
        return this.metadataSvc.ping()  
      case 'scheduler':
        return this.schedulerSvc.ping()   
      case 'notification':
        return this.notiSvc.ping() 
      case 'rule engine':
        return this.ruleSvc.ping() 
      case 'system agent':
          return this.systemSvc.ping() 
      case 'registry center':
        return this.registrySvc.ping() 
      default:
        return of()
    }
  }

}
