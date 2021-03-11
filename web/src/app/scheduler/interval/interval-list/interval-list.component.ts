import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Interval } from '../../../contracts/v2/interval';
import { SchedulerService } from '../../../services/scheduler.service';
import { MultiIntervalResponse } from '../../../contracts/v2/responses/interval-response';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-interval-list',
  templateUrl: './interval-list.component.html',
  styleUrls: ['./interval-list.component.css']
})
export class IntervalListComponent implements OnInit {

  intervalList: Interval[] = [];
  intervalSelected: Interval[] = [];
  isCheckedAll: boolean = false;
  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;

  constructor(private schedulerSvc:SchedulerService, 
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.findSchedulersPagination();
  }

  refresh() {
    this.schedulerSvc.findAllIntervalsPagination(0, this.pageLimit).subscribe((data: MultiIntervalResponse) => {
      this.intervalList = data.intervals;
      this.msgSvc.success('refresh');
      this.resetPagination();
    });
  }

  findSchedulersPagination() {
    this.schedulerSvc.findAllIntervalsPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiIntervalResponse) => {
      this.intervalList = data.intervals;
    });
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalSelected = [];
      this.intervalList.forEach(interval => {
        this.intervalSelected.push(interval);
        this.isChecked(interval.name);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.intervalSelected = [];
    this.intervalList.forEach(interval => {
      this.isChecked(interval.name);
    });
  }

  isChecked(name: string): boolean {
    return this.intervalSelected.findIndex(v => v.name === name) >= 0;
  }

  selectOne(event: any, interval: Interval) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.intervalSelected.push(interval);
      if (this.intervalSelected.length === this.intervalList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(interval.name);
    this.intervalSelected.splice(this.intervalSelected.indexOf(interval), 1)
  }

  edit() {
    this.router.navigate(['../edit-interval'], {
      relativeTo: this.route,
      queryParams: { 'intervalName': this.intervalSelected[0].name }
    })
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  deleteIntervals() {
    this.intervalSelected.forEach(interval => {
      this.schedulerSvc.deleteIntervalByName(interval.name).subscribe(() => {
        this.intervalList.forEach((item, index) => {
          if (item.name === interval.name) {
            this.intervalList.splice(index,1);
            return
          }
        });
        this.msgSvc.success('delete', `name: ${interval.name}`);
        this.resetPagination();
        this.findSchedulersPagination();
      });
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  prePage() {
    this.setPagination(-1);
    this.findSchedulersPagination();
  }

  nextPage() {
    this.setPagination(1);
    this.findSchedulersPagination();
  }

  setPagination(n?: number) {
    if (n === 1) {
      this.pagination += 1;
    } else {
      this.pagination -= 1;
    }
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }

  resetPagination() {
    this.pagination = 1;
  }
}
