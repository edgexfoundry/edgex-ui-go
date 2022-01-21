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
import { Observable, of,throwError } from 'rxjs';
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
  tokenIsValid: boolean = true;

  constructor(private authSvc: AuthService, private errorSvc: ErrorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.authSvc.setAccessToken(this.accessToken); 
    this.authSvc.login()
    .pipe(
      catchError((error) => {
        this.loading = false;
        this.authSvc.isLoggedIn = false;
        this.accessToken = null;
        this.tokenIsValid = false;
        return throwError(error)
      })
      ).subscribe(() => {
      this.authSvc.isLoggedIn = true;
      this.loading = false;
      this.tokenIsValid = true;
      this.router.navigate(['/dashboard'], { relativeTo: this.route })
    });
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  onInput() {
    this.tokenIsValid = true;
  }
}
