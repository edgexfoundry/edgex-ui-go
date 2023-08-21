import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { MultiProvisionWatcherResponse } from '../../../contracts/v3/responses/provision-watcher-response';
import { ProvisionWatcher } from '../../../contracts/v3/provision-watcher';
import { AutoEvent } from '../../../contracts/v3/auto-event';
import { DeviceProfile } from '../../../contracts/v3/device-profile';

@Component({
  selector: 'app-provision-watcher-list',
  templateUrl: './provision-watcher-list.component.html',
  styleUrls: ['./provision-watcher-list.component.css']
})
export class ProvisionWatcherListComponent implements OnInit {

  pagination: number = 1;
  pageLimit: number = 5;
  pageOffset: number = (this.pagination - 1) * this.pageLimit;
  provisionWatcherList: ProvisionWatcher[] = [];
  selectedProvisionWatcher: ProvisionWatcher[] = [];
  specialFeatureAssociatedProvisionWatcherName?: string;
  specialFeatureName?: string

  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.getProvisionWatcherListPagination();
    });
  }
  getProvisionWatcherList() {
    this.getProvisionWatcherListPagination();
  }

  getProvisionWatcherListPagination() {
    this.metaSvc.allProvisionWatchersPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiProvisionWatcherResponse) => {
      this.provisionWatcherList = data.provisionWatchers;
      console.log(this.provisionWatcherList);
    });
  }
  edit() {
    this.router.navigate(['../edit-provision-watcher'], {
      relativeTo: this.route,
      queryParams: { 'provisionWatcherName': this.selectedProvisionWatcher[0].name }
    })
  }
  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.provisionWatcherList.forEach(provisionWatcher => {
        if (this.selectedProvisionWatcher.findIndex(d => d.name === provisionWatcher.name) !== -1) {
          return
        }
        this.selectedProvisionWatcher.push(provisionWatcher);
      });
    } else {
      this.provisionWatcherList.forEach(provisionWatcher => {
        this.selectedProvisionWatcher.forEach((provisionWatcherSelected, index) => {
          if (provisionWatcherSelected.name === provisionWatcher.name) {
            this.selectedProvisionWatcher.splice(index,1);
          }
        })
      });
    }
  }
  selectOne(event: any, provisionWatcher: ProvisionWatcher) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedProvisionWatcher.push(provisionWatcher);
      return
    }
    this.selectedProvisionWatcher.forEach((d,i) => {
      if (d.name === provisionWatcher.name) {
        this.selectedProvisionWatcher.splice(i, 1);
      }
    })
  }

  isChecked(id: string): boolean {
    return this.selectedProvisionWatcher.findIndex(provisionWatcher => provisionWatcher.id === id) >= 0;
  }
  isCheckedAll(): boolean {
    let checkedAll = true;
    if (this.provisionWatcherList &&  this.provisionWatcherList.length === 0) {
      checkedAll = false
    }
    this.provisionWatcherList.forEach(provisionWatcher => {
      if (this.selectedProvisionWatcher.findIndex(d => d.name === provisionWatcher.name) === -1) {
        checkedAll = false
      }
    });
    return checkedAll
  }
  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }
  refresh() {
    this.metaSvc.allProvisionWatchersPagination(0, this.pageLimit).subscribe((data: MultiProvisionWatcherResponse) => {
      this.provisionWatcherList = data.provisionWatchers;
      this.msgSvc.success('refresh');
      this.resetPagination();
    });
  }
  delete() {
    this.selectedProvisionWatcher.forEach((d,i) => {
      this.metaSvc.deleteOneProvisionWatcherByName(d.name).subscribe(() => {
        this.selectedProvisionWatcher.splice(i,1);
        this.provisionWatcherList.forEach((provisionWatcher: ProvisionWatcher, index) => {
          if (provisionWatcher.id === d.id) {
            this.provisionWatcherList.splice(index, 1);
            this.msgSvc.success('remove provisionWatcher ', ` Name: ${provisionWatcher.name}`);
            return
          }
        });
      });

    });
    //close Command or AutoEvent feature viewer window
    this.specialFeatureName = undefined;
    $("#deleteConfirmDialog").modal('hide');
  }
  onPageSelected() {
    this.resetPagination();
    this.getProvisionWatcherList();
  }

  prePage() {
    this.setPagination(-1);
    this.getProvisionWatcherList();
  }

  nextPage() {
    console.log('next');
    this.setPagination(1);
    this.getProvisionWatcherList();
  }

  setPagination(n?: number) {
    if (n === 1) {
      this.pagination += 1;
    } else if (n === -1) {
      this.pagination -= 1;
    }
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }

  resetPagination() {
    this.pagination = 1;
    this.pageOffset = (this.pagination - 1) * this.pageLimit;
  }
}
