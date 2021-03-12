import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Interval } from '../../../contracts/v2/interval';
import { SchedulerService } from '../../../services/scheduler.service';
import { MessageService } from '../../../message/message.service';

import flatpickr from 'flatpickr';

@Component({
  selector: 'app-add-interval',
  templateUrl: './add-interval.component.html',
  styleUrls: ['./add-interval.component.css']
})
export class AddIntervalComponent implements OnInit, OnDestroy {

  interval: Interval = {
    apiVersion: "v2",
    id: "",
    name: "",
    start: "",
    end: "",
    frequency: "",
    runOnce: false
  };
  calendarStart: any;
  calendarEnd: any;

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
    this.initDatePickr();
  }

  initDatePickr() {
    this.calendarStart = flatpickr("input[name='intervalStart']", {
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false
    });
    this.calendarEnd = flatpickr("input[name='intervalEnd']", {
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false
    });
  }

  submit() {
    this.schedulerSvc.addInterval(this.interval).subscribe(() => {
      this.msgSvc.success("create new interval", `name: ${this.interval.name}`);
      this.router.navigate(['../interval-list'], { relativeTo: this.route });
    });
  }

  ngOnDestroy(): void {
    $('[data-toggle="popover"]').popover('dispose');
  }
}
