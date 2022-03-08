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
import { ActivatedRoute, Router } from '@angular/router';

import { Stream } from 'src/app/contracts/kuiper/stream';
import { StreamFields } from '../../../contracts/kuiper/stream-fields';
import { MessageService } from 'src/app/message/message.service';
import { RuleEngineService } from 'src/app/services/rule-engine.service';

@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.css']
})
export class EditStreamComponent implements OnInit {

  SQL_CUSTOM_KEYWORDS = ['STREAM','stream'];

  sqlEditor: any;
  streamJSONFormatObj?: Stream;
  streamName: string = '';
  streamStringFormatObj: string = '';
  streamIsNullMsg: boolean = false;
  
  constructor(
    private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['streamName']) {
        this.streamName = params['streamName'];
        this.getStreamByNameOrID();
      }
    });

    this.sqlEditorRender();

    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  getStreamByNameOrID(){
    this.ruleSvc.findStreamByName(this.streamName).subscribe((data: Stream) => {
      this.streamJSONFormatObj = data;
      this.dataFormatJSONToStringConvertor();
      this.sqlEditor.setValue(this.streamStringFormatObj);
      this.formatSql();
    })
  }

  //stream data string format example:
  //CREATE STREAM  my_stream (id bigint, name string, score float) WITH ( datasource = "topic/temperature", FORMAT = "json", KEY = "id");
  dataFormatJSONToStringConvertor() {
    if (!this.streamJSONFormatObj) {
      return
    }

    //StreamFields
    let fieldsKVFormatArray: string[] = [];
    this.streamJSONFormatObj?.StreamFields?.forEach((field: StreamFields, index) => {
      fieldsKVFormatArray.push(`${field.Name} ${field.FieldType}`)
    })

    //StreamOption
    let streamOptKVFormatArray: string[] = [];
    for (const [k,v] of Object.entries(this.streamJSONFormatObj!.Options)) {
      streamOptKVFormatArray.push(`${k} = "${v}"`)
    }
    
    //Stream artifacts
    this.streamStringFormatObj = `CREATE STREAM ${this.streamJSONFormatObj?.Name} ( ${fieldsKVFormatArray.join(', ')} ) WITH ( ${streamOptKVFormatArray.join(', ')} )`
  }

  sqlEditorRender() {
    let sqlEditorTextarea = document.getElementById('sql-editor');
    this.SQL_CUSTOM_KEYWORDS.forEach((word) => {
      CodeMirror.resolveMode('text/x-pgsql').keywords[word] = true;
    })
    this.sqlEditor = CodeMirror.fromTextArea(sqlEditorTextarea, {
      mode: 'text/x-pgsql',
      tabSize: 4,
      theme: "gruvbox-dark",
      lineNumbers: true,
      lineWrapping: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      autofocus: true,
      matchBrackets: true,
      styleActiveLine: true,
      cursorHeight: 0.85,
      hint: CodeMirror.hint.sql
    });
    this.sqlEditor.setSize('auto', '500px');
    this.sqlEditor.on('drop', (instance: any, event: any) => {
    });

    this.sqlEditor.on('paste', (instance: any, event: any) => {
    });

    this.sqlEditor.on('keyup', (instance: any, event: any) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        instance.showHint({completeSingle:false})
      }
    });
  }

  //sql-fomatter has a bug when a false value in sql string, true vaule is ok, holding on until the bug is fixed. but if set l=postgresql will works.
  formatSql() {
    let streamSql: string= '';
    streamSql = this.sqlEditor.getValue();
    this.sqlEditor.setValue(sqlFormatter.format(streamSql,{language: 'postgresql'}));
  }

  submit() {
    let streamSql = this.sqlEditor.getValue() as string;
    if (!streamSql.trim()) {
      this.streamIsNullMsg = true;
      window.setTimeout(()=>{this.streamIsNullMsg = false},2000);
      return
    }
    this.ruleSvc.updateStream(JSON.stringify({'sql': streamSql}),this.streamName).subscribe(() => {
      this.msgSvc.success('Update Stream');
      this.router.navigate(['../stream-list'], { relativeTo: this.route })
    });
  }
}
