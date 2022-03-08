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

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Rule } from 'src/app/contracts/kuiper/rule';
import { RuleEngineService } from 'src/app/services/rule-engine.service';

import { MessageService } from '../../../message/message.service';
import { CoreCommand } from '../../../contracts/v2/core-command';

@Component({
  selector: 'app-edit-rules',
  templateUrl: './edit-rules.component.html',
  styleUrls: ['./edit-rules.component.css']
})

export class EditRulesComponent implements OnInit {
  rule: Rule;
  ruleSql: string = '';
  sqlEditor: any;
  
  SQL_CUSTOM_KEYWORDS = ['CONCAT','concat'];

  constructor(private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.rule = {} as Rule
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let ruleID = params['ruleID']
      this.getRuleByID(ruleID)
    })
    this.sqlEditorRender();
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    });
    this.renderPopoverComponent();
  }

  getRuleByID(ruleID: string) {
    this.ruleSvc.findRuleById(ruleID).subscribe((data: Rule) => {
      this.rule = data
      this.sqlEditor.setValue(this.rule.sql)
    })
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
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
      cursorHeight: 0.85
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

  validate(): boolean {
    if (!this.rule.id || 
      !this.sqlEditor.getValue() || 
      !this.rule.actions || this.rule.actions.length === 0) {
      return false
    }
    return true
  }

  update() {
    this.rule.sql = this.sqlEditor.getValue()
    this.ruleSvc.updateRule(this.rule).subscribe(() => {
      this.msgSvc.success('update',`name: ${this.rule.id}`)
      this.router.navigate(['../rules-list'], { relativeTo: this.route })
    })
  }
}
