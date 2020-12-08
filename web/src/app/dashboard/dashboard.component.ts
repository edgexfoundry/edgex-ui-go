import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DataService } from '../services/data.service'

=======
>>>>>>> f61e69e... add init component for each module

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

<<<<<<< HEAD
  eventCount?: number = 0;
  readingCount?: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.eventCount().subscribe((data: number) => this.eventCount = data)
    this.dataService.readingCount().subscribe((data: number) => this.readingCount = data)
=======
  constructor() { }

  ngOnInit(): void {
>>>>>>> f61e69e... add init component for each module
  }

}
