import { Component, OnInit } from '@angular/core';
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
  currentNav?: string;

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
    // console.log(this.router.config);
    // this.activatedRoute.root.queryParams
    //   .subscribe(queryParams => console.log('The URL changed to: ' + queryParams));
    // this.activatedRoute.url
    //   .subscribe(url => console.log('The URL changed to: ' + url));
    // this.navStart.subscribe(evt => console.log(evt));
    // this.navRecognized.subscribe(evt => console.log(evt.state.root.pathFromRoot));

    // this.childStart.subscribe(evt => console.log(evt));


    this.navEnd.subscribe(evt => {
      this.navChainCache = [];
      this.navChainMap = new Map<string, string>();
      // console.log(evt);

      this.currentNav = evt.urlAfterRedirects.split('?')[0].split('/').pop() as string;
      // this.navChainCache.set(last, evt.urlAfterRedirects);
      this.navChain = evt.urlAfterRedirects.split('?')[0].split('/');
      this.navChain.shift();
      // this.currentNav = this.navChain.slice(0, 1)[0];
      // console.log(this.navChain);
      let self = this;
      let reverseNav1 = this.navChain.map(x => x).reverse();
      // console.log(this.navChain);
      // console.log(reverseNav1)
      reverseNav1.forEach(function (item, index) {
        // console.log(item, index)
        let reverseNav2 = self.navChain.map(x => x).reverse();
        let t = reverseNav2.slice(index)
        // console.log(t)
        // console.log(t.reverse().push(item))
        let nav = t.reverse().join('/');
        // console.log(nav)
        self.navChainCache.push("/" + nav)
        self.navChainMap.set(item, "/" + nav)
      });
      this.navChainCache.reverse();
      // console.log(this.navChainCache)
      // console.log(this.navChainMap)
      // console.log(this.navChain)
    });

    $(window).resize(() => {
      this.shrinkCenterNo = false;
      if (document.body.clientWidth < 1340) {
        this.shrink = true;
      } else {
        this.shrink = false;
      }
    });
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
