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
  accessToken: string | null = null;
  accessTokenIsValid: boolean = true;
  registryToken: string | null = null;
  registryTokenIsValid: boolean = true;

  constructor(private authSvc: AuthService, private errorSvc: ErrorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.authSvc.setAccessToken(this.accessToken);
    this.authSvc.setRegistryToken(this.registryToken);

    const o1 = this.authSvc.tokenValidate("/core-metadata/api/v3/ping").pipe(
      map((value) => {
        this.authSvc.isLoggedIn = true;
        this.accessTokenIsValid = true;
      }),
      catchError((e)=> {
        this.authSvc.isLoggedIn = false;
        this.accessToken = null;
        this.accessTokenIsValid = false;
        return of(null);
      })
    );
    const o2= this.authSvc.tokenValidate("/api/v3/registrycenter/ping").pipe(
      map((value) => {
        this.authSvc.isRegistryLoggedIn = true;
        this.registryTokenIsValid = true;
      }),
      catchError((e)=> {
        this.authSvc.isRegistryLoggedIn = false;
        this.registryToken = null;
        this.registryTokenIsValid = false;
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
        if (this.authSvc.isLoggedIn && this.authSvc.isRegistryLoggedIn) {
          this.router.navigate(['/dashboard'], {relativeTo: this.route})
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
    this.accessTokenIsValid = true;
    this.registryTokenIsValid = true;
  }
}
