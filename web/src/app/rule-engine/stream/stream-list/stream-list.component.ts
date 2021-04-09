import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Stream } from '../../../contracts/kuiper/stream';
import { RuleEngineService } from '../../../services/rule-engine.service';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {

  streamTemp?: Stream;
  streamTempStr?: string;
  streamTempShow: boolean = false;
  streamList: Stream[] = [];
  selectedStream: string[] = [];
  isCheckedAll: boolean = false;
  addStreamSimple: string = '';

  constructor(
    private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.getStreamList()
    });
  }

  getStreamList() {
    this.ruleSvc.allStreams().subscribe((data: Stream[]) => { this.streamList = data });
  }

  refresh() {
    this.ruleSvc.allStreams().subscribe((data: Stream[]) => {
      this.streamList = data;
      this.msgSvc.success('refresh');
    });
  }
  
  toEditStream() {
    this.router.navigate(['../edit-stream'], {
      relativeTo: this.route,
      queryParams: {
        'streamName': this.selectedStream[0]
      }
    });
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
    this.selectedStream.forEach((name) => {
      this.ruleSvc.deleteOneStreamById(name).subscribe(() => {
        this.selectedStream = [];
        this.streamList.forEach((stream: Stream, index) => {
          if (stream.toString() === name) {
            this.streamList.splice(index, 1);
            return
          }
        });
      },error =>{
       if(error.status ==200 && error.statusText =="OK"){
        this.selectedStream = [];
        this.streamList.forEach((stream: Stream, index) => {
          if (stream.toString() === name) {
            this.streamList.splice(index, 1);
            return
          }
        });
       }
      });
    });
    this.refresh();
    $("#deleteConfirmDialog").modal('hide');
  }

  selectAll(event: any) {
    const checkbox = event.target;
    let self = this;
    if (checkbox.checked) {
      this.selectedStream = [];
      this.streamList.forEach(function (item) {
        self.selectedStream.push(item.toString());
        self.isChecked(item);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.selectedStream = [];
    this.streamList.forEach(function (item) {
      self.isChecked(item);
    });

  }

  isChecked(name: any): boolean {
    return this.selectedStream.findIndex(v => v === name) >= 0;
  }

  selectOne(event: any, name: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedStream.push(name);
      if (this.selectedStream.length === this.streamList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(name);
    this.selectedStream.splice(this.selectedStream.indexOf(name), 1)

  }

  streamDetail(name: any){
    this.ruleSvc.findStreamByName(name).subscribe((data: Stream) => {
      this.streamTempStr = JSON.stringify(data, null, 3);
      $("#streamDetailDialog").modal('show');
    });
  }
}
