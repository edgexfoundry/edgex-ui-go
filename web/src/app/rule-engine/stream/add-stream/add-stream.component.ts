import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { RuleEngineService } from 'src/app/services/rule-engine.service';

import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.css']
})
export class AddStreamComponent implements OnInit {

  EDGEX: string = "edgex";
  CUSTOM: string  =  "custom";
  SQL_CUSTOM_KEYWORDS = ['STREAM','stream'];

  sqlEditor: any;
  templateTypeSelected: string = this.EDGEX;
  edgexStreamDataTemplate: string = 'CREATE STREAM EdgeXStream () WITH ( FORMAT = "JSON", TYPE = "edgex" )';
  customStreamDataTemplate: string = 'CREATE STREAM demo ( field1 bigint, field2 float ) WITH ( DATASOURCE = "", KEY = "", FORMAT = "JSON", CONF_KEY = "", TYPE = "edgex", STRICT_VALIDATION = "true", TIMESTAMP = "", TIMESTAMP_FORMAT = "", RETAIN_SIZE = "0", SHARED = "false" )';

  streamIsNullMsg: boolean = false;

  constructor(private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sqlEditorRender();
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  templateTypeToggle(template: string) {
    this.templateTypeSelected = template;
    if (template === this.EDGEX) {
      this.sqlEditor.setValue(this.edgexStreamDataTemplate);
    } else {
      this.sqlEditor.setValue(this.customStreamDataTemplate);
      this.formatSql()
    }
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
    this.sqlEditor.setValue(this.edgexStreamDataTemplate)
  }

  //sql-fomatter has a bug when a false value in sql string, true vaule is ok, holding on until the bug is fixed. but if set l=postgresql will works.
  formatSql() {
    let streamSql: string= '';
    streamSql = this.sqlEditor.getValue();
    this.sqlEditor.setValue(sqlFormatter.format(streamSql,{language: 'postgresql'}));
  }

  documentShow() {
    $("#stream-document").modal('show');
  }

  submit() {
    let sql = this.sqlEditor.getValue() as string;
    if (!sql.trim()) {
      this.streamIsNullMsg = true;
      window.setTimeout(()=>{this.streamIsNullMsg = false},2000);
      return
    }
    
    this.ruleSvc.addStream(JSON.stringify({'sql': sql})).subscribe(() => {
      this.msgSvc.success('Add Stream');
      this.router.navigate(['../stream-list'], { relativeTo: this.route })
    });
  }
}
