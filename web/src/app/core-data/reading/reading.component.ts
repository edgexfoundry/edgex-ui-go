import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { MultiReadingResponse } from '../../contracts/v3/responses/reading-response';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {

  feedInterval: any;
  pauseOperate: boolean = true;

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
  }

  feedEvents() {
    this.feedInterval = setInterval(() => {
      this.dataSvc.allReadingsPagination(0,5).subscribe((resp: MultiReadingResponse) => {
        if (resp.readings.length === 0) {
          $("#data-event-stream").prepend('<p class="user-select-all">' +
          'no data stream available, please confirm whether there is at least one device to collect data' +
          '</p>');
          return
        }
        resp.readings.forEach((r,i) => {
          $("#data-reading-stream").prepend('<p class="user-select-all">' + JSON.stringify(r) + '</p>');
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
