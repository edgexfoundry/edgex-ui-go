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

import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RoutesRecognized, ChildActivationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EdgeX Console';
  isSelected: boolean = false;
  toggleClass: string = '';
  shrink: boolean = false;
  shrinkSidebarOnly: boolean = false;
  shrinkCenterNo: boolean = false;

  navEnd: Observable<NavigationEnd>;
  navStart: Observable<NavigationStart>;
  navRecognized: Observable<RoutesRecognized>;
  
  childStart: Observable<ChildActivationStart>;

  navChainMap = new Map<string, string>();
  navChainCache: string[] = [];
  navChain: string[] = [];
  currentNav: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.navRecognized = router.events.pipe(
      filter(evt => evt instanceof RoutesRecognized)
    ) as Observable<RoutesRecognized>;

    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;

    this.navEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;

    this.childStart = router.events.pipe(
      filter(evt => evt instanceof ChildActivationStart)
    ) as Observable<ChildActivationStart>;
  }

  ngOnInit() {
    this.navEnd.subscribe(evt => {
      this.navChainCache = [];
      this.navChainMap = new Map<string, string>();

      this.currentNav = evt.urlAfterRedirects.split('?')[0].split('/').pop() as string;
      this.navChain = evt.urlAfterRedirects.split('?')[0].split('/');
      this.navChain.shift();
      let self = this;
      let reverseNav1 = this.navChain.map(x => x).reverse();
      reverseNav1.forEach(function (item, index) {
        let reverseNav2 = self.navChain.map(x => x).reverse();
        let t = reverseNav2.slice(index)
        let nav = t.reverse().join('/');
        self.navChainCache.push("/" + nav)
        self.navChainMap.set(item, "/" + nav)
      });
      this.navChainCache.reverse();
    });

    $(window).resize(() => {
      this.shrinkCenterNo = false;
      if (document.body.clientWidth < 1340) {
        this.shrink = true;
      } else {
        this.shrink = false;
      }
    });
    this.router.navigate(['/initializer'], { relativeTo: this.activatedRoute })
  }

  pathFormat(path: string): string {
    let pathArr = path.split('-');
    pathArr.forEach((e,i) =>{
      pathArr[i] = e.charAt(0).toUpperCase() + e.substring(1);
    });
    return pathArr.join(' ');
  }

  sideBarToggle() {
    if (this.shrink) {
      if (document.body.clientWidth < 1340) {
        this.shrinkCenterNo = true;
      }
      this.shrink = false;
    } else {
      if (document.body.clientWidth < 1340) {
        this.shrinkCenterNo = false;
      }
      this.shrink = true;
    }
  }
}
