import { Component, OnInit } from '@angular/core';
import { Interval } from '../../../contracts/v2/interval';


@Component({
  selector: 'app-interval-list',
  templateUrl: './interval-list.component.html',
  styleUrls: ['./interval-list.component.css']
})
export class IntervalListComponent implements OnInit {

  intervalList: Interval[] = [];
  intervalSelected?: Interval;

  constructor() { }

  ngOnInit(): void {
  }

  refresh() {

  }

  selectAll(event: any) {

  }

  isChecked(name: string): boolean {
    return false
  }

  selectOne(event: any, interval: Interval) {

  }
}
