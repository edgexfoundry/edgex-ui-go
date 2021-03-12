import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Interval } from '../../../contracts/v2/interval';
import { SchedulerService } from '../../../services/scheduler.service';
import { MultiIntervalResponse } from '../../../contracts/v2/responses/interval-response';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-add-interval',
  templateUrl: './add-interval.component.html',
  styleUrls: ['./add-interval.component.css']
})
export class AddIntervalComponent implements OnInit {

  interval: Interval = {
    apiVersion: "v2",
    id: "",
    name: "",
    start: "",
    end: "",
    frequency: "",
    runOnce: false
  };

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    $(function () {
      $('[data-toggle="popover"]').popover();
    })

    $("input[name='intervalStart']").flatpickr({
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      defaultDate: new Date()
    });
    $("input[name='intervalEnd']").flatpickr({
      dateFormat: "YmdTHiS",
      enableTime: true,
      enableSeconds: true,
      time_24hr: true,
      allowInput: false,
      defaultDate: Date.now(),
    });
  }

  submit() {
    this.interval.runOnce = this.interval.runOnce?true:false;
    this.schedulerSvc.addInterval(this.interval).subscribe(() => {
      this.msgSvc.success("create new interval", `name: ${this.interval.name}`);
      this.router.navigate(['../interval-list'], { relativeTo: this.route });
    });
  }
}
