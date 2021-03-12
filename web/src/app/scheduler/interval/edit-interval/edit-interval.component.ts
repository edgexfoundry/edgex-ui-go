import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Interval } from '../../../contracts/v2/interval';
import { SchedulerService } from '../../../services/scheduler.service';
import { IntervalResponse } from '../../../contracts/v2/responses/interval-response';
import { MessageService } from '../../../message/message.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-edit-interval',
  templateUrl: './edit-interval.component.html',
  styleUrls: ['./edit-interval.component.css']
})
export class EditIntervalComponent implements OnInit, OnDestroy {

  interval?: Interval;
  calendarStart: any;
  calendarEnd: any;

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(param => {
      if (param['intervalName']) {
        this.schedulerSvc.findIntervalByName(param['intervalName']).subscribe((data: IntervalResponse) => {
          this.interval = data.interval;
          this.interval.runOnce = this.interval.runOnce?true:false;
          this.initDatePickr();
        });
      }
    });
  }

  initDatePickr() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
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

  update() {
    this.schedulerSvc.updateInterval(this.interval as Interval).subscribe(() => {
      this.msgSvc.success('update interval', `name: ${this.interval?.name}`);
      this.router.navigate(['../interval-list'],{relativeTo: this.route})
    });
  }

  ngOnDestroy(): void {
    $('[data-toggle="popover"]').popover('dispose');
  }
}

