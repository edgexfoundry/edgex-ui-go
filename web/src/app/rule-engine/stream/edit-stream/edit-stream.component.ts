import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stream } from 'src/app/contracts/stream';
import { MessageService } from 'src/app/message/message.service';
import { RuleEngineService } from 'src/app/services/rule-engine.service';

@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.css']
})
export class EditStreamComponent implements OnInit {

  streamTemp?: Stream;
  editStreamSimple:string = '';
  
  constructor(
    private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['streamName']) {
        this.toEditStream(params['streamName']);
      }
    });
  }

  toEditStream(streamName:string){
    
    this.ruleSvc.findStreamByName(streamName).subscribe((data: Stream) => {
      this.streamTemp = data;
      let editStreamStr: string = '{"sql":"create stream '+this.streamTemp.Name+' (';
      let streamFieldTemp:string = '';
      if(this.streamTemp.StreamFields != null){
        for (let index in this.streamTemp.StreamFields) {
          if(Number.parseInt(index)+1 != this.streamTemp.StreamFields.length){
            streamFieldTemp += this.streamTemp.StreamFields[index].Name + " " + this.streamTemp.StreamFields[index].FieldType + ", ";
          }else{
            streamFieldTemp += this.streamTemp.StreamFields[index].Name + " " + this.streamTemp.StreamFields[index].FieldType;
          }
        }
      }
      editStreamStr += streamFieldTemp+') WITH ( ';
      if(this.streamTemp.Options.DATASOURCE != undefined){
        editStreamStr += 'DATASOURCE = \\"'+this.streamTemp.Options.DATASOURCE+'\\",'
      }
      if(this.streamTemp.Options.FORMAT != undefined){
        editStreamStr += 'FORMAT = \\"'+this.streamTemp.Options.FORMAT+'\\",';
      }
      if(this.streamTemp.Options.KEY != undefined){
        editStreamStr += 'KEY = \\"'+this.streamTemp.Options.KEY+'\\",';
      }
      if(this.streamTemp.Options.TYPE != undefined){
        editStreamStr += 'TYPE=\\"'+this.streamTemp.Options.TYPE+'\\"';
      }else{
        editStreamStr = editStreamStr.substring(0,editStreamStr.length-1);
      }
      editStreamStr += ')"}';
      this.editStreamSimple = editStreamStr;
    });
  }

  submit() {
    this.ruleSvc.updateStream(this.editStreamSimple).subscribe(() => {
      this.msgSvc.success('Update Stream Success!');
      this.router.navigate(['../stream-list'], { relativeTo: this.route })
    });
  }
}
