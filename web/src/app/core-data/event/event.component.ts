import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../../services/data.service';
import { MultiEventsResponse } from '../../contracts/v2/responses/event-response';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy{

  feedInterval: any;
  pauseOperate: boolean = true;

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    
  }

  feedEvents() {
    this.feedInterval = setInterval(() => {
      this.dataSvc.allEventsPagination(0,5).subscribe((resp: MultiEventsResponse) => {
        resp.events.forEach((e,i) => {
          $("#data-event-stream").prepend('<p class="user-select-all">' + JSON.stringify(e) + '</p>');
        })
      })
    },3000)
  }

  start() {
    this.pauseOperate = false;
    this.feedEvents();
  }

  pause() {
    this.pauseOperate = true;
    window.clearInterval(this.feedInterval);
  }

  operateToggle() {
    if (this.pauseOperate) {
      this.pauseOperate = false;
      return
    } 
    this.pauseOperate = true;
  }

  ngOnDestroy() {
     window.clearInterval(this.feedInterval);
  }

}
