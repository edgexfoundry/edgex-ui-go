import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RoutesRecognized } from '@angular/router';


@Component({
  selector: 'app-system-agent',
  templateUrl: './system-agent.component.html',
  styleUrls: ['./system-agent.component.css']
})
export class SystemAgentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url
      .subscribe(url => console.log('The URL changed to: ' + url));
  }

}
