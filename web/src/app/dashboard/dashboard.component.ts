import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { DataService } from '../services/data.service'

=======
>>>>>>> f61e69e... add init component for each module
=======
import { DataService } from '../services/data.service'

>>>>>>> 11767c5... init dashboard module

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 11767c5... init dashboard module
  eventCount?: number = 0;
  readingCount?: number = 0;

  constructor(private dataService: DataService) { }
<<<<<<< HEAD

  ngOnInit(): void {
    this.dataService.eventCount().subscribe((data: number) => this.eventCount = data)
    this.dataService.readingCount().subscribe((data: number) => this.readingCount = data)
=======
  constructor() { }

  ngOnInit(): void {
>>>>>>> f61e69e... add init component for each module
=======

  ngOnInit(): void {
    this.dataService.eventCount().subscribe((data: number) => this.eventCount = data)
    this.dataService.readingCount().subscribe((data: number) => this.readingCount = data)
>>>>>>> 11767c5... init dashboard module
  }

}
