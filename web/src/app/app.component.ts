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
  navEnd: Observable<NavigationEnd>;
  navStart: Observable<NavigationStart>;
  navRecognized: Observable<RoutesRecognized>;

  childStart: Observable<ChildActivationStart>;

  navChainCache = new Map();
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
    this.navRecognized.subscribe(evt => console.log(evt.state.root.pathFromRoot));

    // this.childStart.subscribe(evt => console.log(evt));


    this.navEnd.subscribe(evt => {
      console.log(evt);

      this.currentNav = evt.urlAfterRedirects.split('/').pop() as string;
      // this.navChainCache.set(last, evt.urlAfterRedirects);
      this.navChain = evt.urlAfterRedirects.split('/');
      this.navChain.shift();
      // this.currentNav = this.navChain.slice(0, 1)[0];
      // console.log(this.navChain);
    });

    let self = this;

    // $(window).resize(function () {
    //   let window_width = $(window).width();
    //   console.log(window_width)
    //   if (window_width < 1390) {
    //     self.toggleClass = 'd-sm-none';
    //   } else {
    //     self.toggleClass = '';
    //   }
    // });
  }

  autoHeight() {
    let winHeight = $(document).height();//winHeight即浏览器高度
    console.log(winHeight)
    let menuHeight = $(".sidebar-center").offsetHeight;//菜单高度;其中menu_div为菜单所在标签的id
    if (menuHeight = winHeight) {
      $(".sidebar-center").css("height", "auto");
    }
  }
}
