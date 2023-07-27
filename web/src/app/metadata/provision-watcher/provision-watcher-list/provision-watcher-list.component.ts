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
  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.getDeviceListPagination();
    });
  }
  getDeviceListPagination() {
    this.metaSvc.allProvisionWatchersPagination(this.pageOffset, this.pageLimit).subscribe((data: MultiProvisionWatcherResponse) => {
      this.provisionWatcherList = data.provisionWatchers;
      console.log(this.provisionWatcherList);
    });
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
}
