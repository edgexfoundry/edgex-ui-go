import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rule } from '../../../contracts/rule';
import { RuleEngineService } from '../../../services/rule-engine.service';
import { MessageService } from '../../../message/message.service';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css']
})

export class RulesListComponent implements OnInit {

  rulesList: Rule[] = [];
  selectedRule: string[] = [];
  isCheckedAll: boolean = false;
  ruleTemp: any;
  ruleModelTitle:string = '';

  constructor(
    private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private route: ActivatedRoute,
    private commandSvc: CommandService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.getRulesList()
    });
  }

  getRulesList() {
    this.ruleSvc.allRules().subscribe((data: Rule[]) => { this.rulesList = data ;});
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
      queryParams: { 'id': this.selectedRule[0] }
    })
  }

  deleteConfirm() {
    $("#deleteConfirmDialog").modal('show');
  }

  delete() {
    this.selectedRule.forEach((id) => {
      this.ruleSvc.deleteOneRuleById(id).subscribe((response) => {
      if(response.code == "200"){
      }
        this.selectedRule = [];
        this.rulesList.forEach((rule: Rule, index) => {
          if (rule.id === id) {
            this.rulesList.splice(index, 1);
            return
          }
        });
      },error =>{
        if(error.status ==200 && error.statusText =="OK"){
         this.selectedRule = [];
         this.rulesList.forEach((rule: Rule, index) => {
           if (rule.id === id) {
             this.rulesList.splice(index, 1);
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
      this.selectedRule = [];
      this.rulesList.forEach(function (item) {
        self.selectedRule.push(item.id);
        self.isChecked(item.id);
      });
      this.isCheckedAll = true;
      return
    }
    this.isCheckedAll = false;
    this.selectedRule = [];
    this.rulesList.forEach(function (item) {
      self.isChecked(item.id);
    });

  }

  isChecked(id: string): boolean {
    return this.selectedRule.findIndex(v => v === id) >= 0;
  }

  selectOne(event: any, id: string) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.selectedRule.push(id);
      if (this.selectedRule.length === this.rulesList.length) {
        this.isCheckedAll = true;
      }
      return
    }
    this.isCheckedAll = false;
    this.isChecked(id);
    this.selectedRule.splice(this.selectedRule.indexOf(id), 1)

  }

  start() {
    this.selectedRule.forEach((id) => {
      this.ruleSvc.startRule(id).subscribe(() => {
        this.selectedRule = [];
        this.rulesList.forEach((rule: Rule, index) => {
          if (rule.id === id) {
            this.rulesList.splice(index, 1);
            this.msgSvc.success('start rule ', ` Name: ${rule.id}`);
            this.refresh();
            return
          }
        });
      });
    });
  }

  stop() {
    this.selectedRule.forEach((id) => {
      this.ruleSvc.stopRule(id).subscribe(() => {
        this.selectedRule = [];
        this.rulesList.forEach((rule: Rule, index) => {
          if (rule.id === id) {
            this.rulesList.splice(index, 1);
            this.msgSvc.success('stop rule ', ` Name: ${rule.id}`);
            this.refresh();
            return
          }
        });
      });
    });
  }

  restart() {
    this.selectedRule.forEach((id) => {
      this.ruleSvc.restartRule(id).subscribe(() => {
        this.selectedRule = [];
        this.rulesList.forEach((rule: Rule, index) => {
          if (rule.id === id) {
            this.rulesList.splice(index, 1);
            this.msgSvc.success('restart rule ', ` Name: ${rule.id}`);
            this.refresh();
            return
          }
        });
      });
    });
  }

  ruleDetail(id: string){
    this.ruleSvc.findRuleById(id).subscribe((data) => {
      this.ruleTemp = JSON.stringify(data, null, 3);
      $("#ruleDetailDialog").modal('show');
      this.ruleModelTitle = 'Rule Details';
    });
  }

  statusDetail(id: string){
    this.ruleSvc.getRuleStatusById(id)
    .subscribe((data) => {
      this.ruleTemp = JSON.stringify(data, null, 3);
      $("#ruleDetailDialog").modal('show');
      this.ruleModelTitle = 'Status Details';
    },error =>{
      this.ruleTemp = error.error.text
      $("#ruleDetailDialog").modal('show');
      this.ruleModelTitle = 'Status Details';
    });
  }

  topologyStructure(id: string){
    this.ruleSvc.getRuleTopoById(id).subscribe((data) => {
      this.ruleTemp = JSON.stringify(data, null, 3);
      $("#ruleDetailDialog").modal('show');
      this.ruleModelTitle = 'Topology Structure';
    });
  }
}
