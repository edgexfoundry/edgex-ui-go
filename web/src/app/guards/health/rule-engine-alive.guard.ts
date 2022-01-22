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

 import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
 import { Observable, of } from 'rxjs';
 import { RuleEngineService } from '../../services/rule-engine.service';
 import { mergeMap, take ,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RuleEngineAliveGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private ruleSvc: RuleEngineService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAvailable(route,
      state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route,state)
  }

  checkAvailable(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.ruleSvc.ping().pipe(
      take(1),
      catchError((error)=>{
        return this.router.navigate(['/svc-unavailable'],{ 
          queryParams: {'svcName':'rule engine','routerPath':`/${state.url.split('/')[1]}`}
        })
      }),
      mergeMap(() => {
        return of(true)
      })
    )
  }
  
}
