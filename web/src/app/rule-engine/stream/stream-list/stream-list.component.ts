/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RuleEngineService } from '../../../services/rule-engine.service';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {

  streamList: string[] = [];
  selectedStream: string = '';

  constructor(
    private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getStreamList()
  }

  getStreamList() {
    this.ruleSvc.allStreams().subscribe((data: string[]) => {
      this.streamList = data; 
    });
  }

  refresh() {
    this.ruleSvc.allStreams().subscribe((data: string[]) => {
      this.streamList = data;
      this.msgSvc.success('refresh');
    });
  }
  
  add() {
    this.router.navigate(['../add-stream'], {relativeTo: this.route});
  }

  edit(streamName: string) {
    this.router.navigate(['../edit-stream'], {
      relativeTo: this.route,
      queryParams: {
        'streamName': streamName
      }
    });
  }

  deleteConfirm(streamName: string) {
    this.selectedStream = streamName;
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
      $("#deleteConfirmDialog").modal('hide');
      this.ruleSvc.deleteOneStreamById(this.selectedStream).subscribe(() => {
        this.msgSvc.success('delete', `name: ${this.selectedStream}`);
        this.streamList.forEach((stream, i) => {
          if (stream === this.selectedStream) {
            this.streamList.splice(i,1)
          }
        })
      });
  }
}
