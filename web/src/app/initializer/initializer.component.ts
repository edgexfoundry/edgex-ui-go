/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
 * Copyright © 2022 Intel Corporation
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
import { tap, delay,map } from 'rxjs/operators';

import { InitService } from '../services/init.service';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-initializer',
  templateUrl: './initializer.component.html',
  styleUrls: ['./initializer.component.css']
})
export class InitializerComponent implements OnInit {

  progressMsg?: string

  constructor(private initSvc: InitService, private errorSvc: ErrorService,
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.initializor();
  }

  initializor() {
    this.environmentCheck();
  }

   environmentCheck() {
    this.progressMsg = "environment checking";
     this.initSvc.getSecureMode().subscribe((resp:any) => {
       if (resp === "secure") {
         this.authSvc.isSecureMode = true;
         this.tokenValidate()
       } else {
         this.authSvc.isSecureMode = false;
         this.navigateToHome();
       }
     });
  }

  tokenValidate() {
    this.progressMsg = "access token validating";
    this.authSvc.tokenValidate()
    .pipe(
      catchError((error) => {
        this.authSvc.isLoggedIn = false;
        this.router.navigate(['/login'], { relativeTo: this.route })
        return throwError(error)
      })
      )
    .subscribe(()=>{
      this.authSvc.isLoggedIn = true;
      this.navigateToHome();
    })
  }

  navigateToHome() {
    this.router.navigate(['/dashboard'], { relativeTo: this.route })
  }
}
