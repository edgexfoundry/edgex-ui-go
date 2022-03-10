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
import { Rule } from 'src/app/contracts/kuiper/rule';
import { RuleEngineService } from '../../../services/rule-engine.service';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css']
})
export class RulesListComponent implements OnInit {

  rulesList: Rule[] = [];
  selectedRules: Rule[] = [];

  ruleStatusMetrics: string = '';
  statusMetricsRuleID: string  = '';

  operationStatus: boolean = false;

  constructor(
    private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.getRulesList()
    });
  }

  getRulesList() {
    this.ruleSvc.allRules().subscribe((data: Rule[]) => { this.rulesList = data });
  }

  refresh() {
    this.ruleSvc.allRules().subscribe((data: Rule[]) => {
      this.rulesList = data;
      this.msgSvc.success('refresh');
    });
  }

  edit() {
    this.router.navigate(['../edit-rules'], {
      relativeTo: this.route,
      queryParams: { 'ruleID': this.selectedRules[0].id }
    })
  }

  statusMetrics(id: string){
    this.statusMetricsRuleID = '';
    this.ruleStatusMetrics = '';
    this.ruleSvc.getRuleStatusMetricsById(id).subscribe((data) => {
      this.statusMetricsRuleID = id;
      let obj: {}
      try {
        obj = JSON.parse(data)
      } catch (e) {
        this.ruleStatusMetrics = data
        return
      }
      this.ruleStatusMetrics = JSON.stringify(obj, null, 3);
    });
  }

  statusMetricsShowClose() {
    this.statusMetricsRuleID = '';
    this.ruleStatusMetrics = '';
  }

  statusMetricsRefresh(id: string) {
    this.statusMetrics(id)
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }
  
  delete() {
    this.selectedRules.forEach((ruleSelected,i) => {
      this.ruleSvc.deleteOneRuleById(ruleSelected.id).subscribe(() => {
        this.selectedRules.splice(i,1);
        this.rulesList.forEach((rule: Rule, index) => {
          if (rule.id === ruleSelected.id) {
            this.rulesList.splice(index, 1);
            this.msgSvc.success('remove rule ', ` Id: ${ruleSelected.id}`);
          }
        });
      })
    });
    $("#deleteConfirmDialog").modal('hide');
  }

  isCheckedAll(): boolean {
    let checkedAll = true;
    if (this.rulesList && this.rulesList.length === 0) {
      checkedAll = false
    }
    this.rulesList.forEach(rule => {
      if (this.selectedRules.findIndex(ruleSelected => ruleSelected.id === rule.id) === -1) {
        checkedAll = false
      }
    });
    return checkedAll
  }

  selectAll(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.rulesList.forEach(rule => {
        if (this.selectedRules.findIndex(ruleSelected => ruleSelected.id === rule.id) !== -1) {
            return
        }
        this.selectedRules.push(rule);
      });
    } else {
      this.rulesList.forEach(rule => {
        let found = this.selectedRules.findIndex(ruleSelected => ruleSelected.id === rule.id);
        if (found !== -1) {
          this.selectedRules.splice(found,1)
        }
      });
    }
  }

  isChecked(id: string): boolean {
    return this.selectedRules.findIndex(rule => rule.id === id) >= 0;
  }

  selectOne(event: any, rule: Rule) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedRules.push(rule);
      return
    }
    let found = this.selectedRules.findIndex(ruleSelected => ruleSelected.id === rule.id);
    if (found !== -1) {
      this.selectedRules.splice(found,1)
    }
  }

  start(ruleID: string) {
    this.operationStatus = true
    window.setTimeout(() => {
      this.operationStatus = false
    },1500)
    this.ruleSvc.startRule(ruleID).subscribe(() => {
      this.msgSvc.success(`start ${ruleID}`);
      this.getRulesList();
    })
  }

  stop(ruleID: string) {
    this.operationStatus = true
    window.setTimeout(() => {
      this.operationStatus = false
    },1500)
    this.ruleSvc.stopRule(ruleID).subscribe(() => {
      this.msgSvc.success(`stop ${ruleID}`);
      this.getRulesList();
    })
  }

  restart(ruleID: string) {
    this.operationStatus = true
    window.setTimeout(() => {
      this.operationStatus = false
    },1500)
    this.ruleSvc.restartRule(ruleID).subscribe(() => {
      this.msgSvc.success(`restart ${ruleID}`);
      this.getRulesList();
    })
  }
}
