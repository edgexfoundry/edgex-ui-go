import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RoutesRecognized } from '@angular/router';

=======
>>>>>>> f61e69e... add init component for each module
=======
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RoutesRecognized } from '@angular/router';

>>>>>>> 727932f... Finished system agent module basic feature

@Component({
  selector: 'app-system-agent',
  templateUrl: './system-agent.component.html',
  styleUrls: ['./system-agent.component.css']
})
export class SystemAgentComponent implements OnInit {

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url
      .subscribe(url => console.log('The URL changed to: ' + url));
=======
  constructor() { }

  ngOnInit(): void {
>>>>>>> f61e69e... add init component for each module
=======
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url
      .subscribe(url => console.log('The URL changed to: ' + url));
>>>>>>> 727932f... Finished system agent module basic feature
  }

}
