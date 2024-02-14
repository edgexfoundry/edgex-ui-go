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
import { catchError } from 'rxjs/operators';
import { forkJoin, map, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  gatewayToken: string | null = null;
  gatewayTokenIsValid: boolean = false;
  aclToken: string | null = null;
  aclTokenIsValid: boolean = false;
  userInputAdded: boolean = false;
  loginAttempted: boolean = false;
  serviceName: string = "";
  routerPath: string = "";

  constructor(private authSvc: AuthService, private errorSvc: ErrorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gatewayToken = this.authSvc.getGatewayToken() || "";
    this.aclToken = this.authSvc.getAclToken() || "";
    this.gatewayTokenIsValid = this.authSvc.isGatewayLoggedIn;
    this.aclTokenIsValid = this.authSvc.isAclLoggedIn;
    const queryParams = this.route.snapshot.queryParams;
    this.serviceName = queryParams['svcName'];
    this.routerPath = queryParams['routerPath'];
    if(!this.routerPath || this.routerPath?.length < 1) {
      this.routerPath = '/dashboard';
    }
  }

  get showGatewayTokenFields() {
    return this.gatewayToken === "" && !this.loginAttempted;
  }
  get showAclTokenFields() {
    return this.aclToken === "" && !this.loginAttempted;
  }

  get isGatewayTokenInvalid() {
    return !this.gatewayTokenIsValid && this.loginAttempted;
  }
  get isAclTokenInvalid() {
    return !this.aclTokenIsValid && this.loginAttempted && this.serviceName === "registry center";
  }

  login() {
    this.loading = true;
    this.loginAttempted = true;
    this.authSvc.setGatewayToken(this.gatewayToken);
    this.authSvc.setAclToken(this.aclToken);

    const o1 = this.authSvc.tokenValidate("/core-metadata/api/v3/ping").pipe(
      map((value) => {
        this.authSvc.isGatewayLoggedIn = true;
        this.gatewayTokenIsValid = true;
      }),
      catchError((e)=> {
        this.authSvc.isGatewayLoggedIn = false;
        this.gatewayToken = null;
        this.gatewayTokenIsValid = false;
        return of(null);
      })
    );
    const o2= this.authSvc.tokenValidate("/api/v3/registrycenter/ping").pipe(
      map((value) => {
        this.authSvc.isAclLoggedIn = true;
        this.aclTokenIsValid = true;
      }),
      catchError((e)=> {
        this.authSvc.isAclLoggedIn = false;
        this.aclToken = null;
        this.aclTokenIsValid = false;
        return of(null);
      })
    );

    forkJoin([o1, o2]).pipe(
      catchError(errors => {
        this.router.navigate(['/login'], { relativeTo: this.route })
        return [];
      })
    ).subscribe((result1) => {
        this.loading = false;
        if (this.serviceName === "registry center") {
          if (this.authSvc.isAclLoggedIn) {
            this.router.navigate([this.routerPath], {relativeTo: this.route});
          }
        } else if (this.authSvc.isGatewayLoggedIn) {
          // do not condese this if/else if, it affects the login logic
          this.router.navigate([this.routerPath], {relativeTo: this.route});
        }
      }
    );
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onInput() {
    this.userInputAdded = true;
  }
}
