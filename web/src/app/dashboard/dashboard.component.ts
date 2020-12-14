import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventCount?: number = 0;
  readingCount?: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.eventCount().subscribe((data: number) => this.eventCount = data)
    this.dataService.readingCount().subscribe((data: number) => this.readingCount = data)
  }

}
