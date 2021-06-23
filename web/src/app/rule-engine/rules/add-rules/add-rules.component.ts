import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Rule } from 'src/app/contracts/kuiper/rule';
import { RuleEngineService } from 'src/app/services/rule-engine.service';

import { MessageService } from '../../../message/message.service';
import { CoreCommand } from '../../../contracts/v2/core-command';

@Component({
  selector: 'app-add-rules',
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.css']
})

export class AddRulesComponent implements OnInit {
  currentStep = 0;
  ruleName: string = '';
  ruleSql: string = '';
  ruleAction: any[] = [];

  restModelList: any[] = [];
  mqttModelList: any[] = [];
  edgexModelList: any[] = [];
  showRestTabs:boolean = false;
  showMqttTabs:boolean = false;
  showEdgexTabs:boolean = false;
  chooseActionLog:boolean = false;
  targetActionConfigs: any[] = [];

  templateSelectedList: string[] = [];

  selectedClass = "text-white rounded px-2 bg-success  font-weight-bold";
  noSelectedClass = "text-white rounded px-2 bg-secondary  font-weight-bold";
  constructor(private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 10);
  }

  renderPopoverComponent() {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  }

  templateToggle(template: string,index:number) {
    this.templateSelectedList[index] = template;
    switch (this.templateSelectedList[index]) {
      case 'coredata':
        this.restModelList[index].method = 'DELETE';
        this.restModelList[index].host = 'edgex-core-data';
        this.restModelList[index].port = 59880;
        setTimeout(() => {
          this.renderPopoverComponent();
        }, 300);
        break;
      case 'command':
        this.restModelList[index].method = '';
        this.restModelList[index].host = 'edgex-core-command';
        this.restModelList[index].port = 59882;
        setTimeout(() => {
          this.renderPopoverComponent();
        }, 300); 
        break;
      case 'custom':
        this.restModelList[index].method = 'GET';
        this.restModelList[index].retained = false;
    }
  }

  onCmdMethodSelected(method: string,index:number) {
    this.restModelList[index].method = method;
  }

  onCommandSelected(cmd: CoreCommand,index:number) {
    this.restModelList[index].path = cmd.path;
  }

  isPureIntegerType(value: any): boolean {
    if (!isNaN(value) && (parseFloat(value) === parseInt(value))) {
      return true
    }
    return false
  }

  stepStateLock(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.ruleName === '' || this.ruleSql === ''
      case 1:
        if(this.el.nativeElement.querySelector("#restCheckbox").checked || 
        this.el.nativeElement.querySelector("#mqttCheckbox").checked ||
        this.el.nativeElement.querySelector("#edgexCheckbox").checked ||
        this.el.nativeElement.querySelector("#logCheckbox").checked){
          return false;
        }else{
          return true;
        }
      default:
        return false
    }
  }

  next() {
    this.currentStep += 1;
  }

  previous() {
    this.currentStep = this.currentStep - 1;
  }

  changeStep() {
    this.currentStep += 1;
  }

  done() {
			if(this.el.nativeElement.querySelector("#restCheckbox").checked){
        this.restModelList.forEach((event) => {
          let rest:any = {};
					if(event.retryInterval != null && event.retryInterval != ""){
						rest.retryInterval = event.retryInterval;
					}
					if(event.sendSingle != null && event.sendSingle != ""){
						//rest.sendSingle = eval(event.sendSingle.toLowerCase());
            rest.sendSingle = event.sendSingle;
					}
					if( event.host != null && event.host != "" && event.port != null && event.port != "" && event.path != null && event.path != ""){
						rest.url= "http://"+ event.host + ":" + event.port + event.path;
					}else{
						this.msgSvc.errors("Url cannot be empty.");
						return;
					}
					if(event.method != null && event.method != ""){
						rest.method = event.method;
					}
					if(event.method == "PUT"){
						if(event.dataTemplate != null && event.dataTemplate != ""){
							let param = event.dataTemplate.replace(/\"/g, '\\\"');
							rest.dataTemplate = param;
						}
					}
          this.ruleAction.push({rest})
        });
			}
      
			if(this.el.nativeElement.querySelector("#mqttCheckbox").checked){
				this.mqttModelList.forEach((mqtt) => {
          this.ruleAction.push({mqtt})
        });
			}

			if(this.el.nativeElement.querySelector("#edgexCheckbox").checked){
				this.edgexModelList.forEach((edgex) => {
          this.ruleAction.push({edgex})
        });
			}

			if(this.el.nativeElement.querySelector("#logCheckbox").checked){
				let log = {log:{}};
				this.ruleAction.push({log})
			}
    let rule: Rule = {
      id:this.ruleName,
      sql:this.ruleSql,
      actions:this.ruleAction
    } as Rule
    this.ruleSvc.addRule(rule).subscribe(() => {
      this.msgSvc.success('Add rule success');
      this.router.navigate(['../rules-list'], { relativeTo: this.route })
    })
  }

  chooseRest(check:any){
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 10);
    if(check.checked){
      if(this.restModelList.length == 0){
        this.addRestTab();
      }
      this.showRestTabs = true;
    }else{
      this.showRestTabs = false;
    }
  }

  chooseMqtt(check:any){
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 10);
    if(check.checked){
      if(this.mqttModelList.length == 0){
        this.addMqttTab();
      }
      this.showMqttTabs = true;
    }else{
      this.showMqttTabs = false;
    }
  }

  chooseEdgex(check:any){
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 10);
    if(check.checked){
      if(this.edgexModelList.length == 0){
        this.addEdgeXTab();
      }
      this.showEdgexTabs = true;
    }else{
      this.showEdgexTabs = false;
    }
  }

  chooseLog(check:any){
    if(check.checked){
      this.chooseActionLog = true;
    }else{
      this.chooseActionLog = false;
    }
    
  }

  addRestTab() {
    let rest:any = {
      retryInterval: -1,
      sendSingle: 'true',
      method: '',
      host: '',
      port: '',
      path: '',
      dataTemplate: ''
    };
    this.templateSelectedList[this.templateSelectedList.length] = "command";
    this.restModelList.push(rest);

  }
  trackByFn(index:any) {
    return index;
  }

  addMqttTab() {
    let mqtt:any = {
      server: '',
      topic: '',
      clientId: '',
      protocolVersion: '',
      username: '',
      password: '',
      certificationPath: '',
      privateKeyPath: '',
      insecureSkipVerify: 'false',
      retained: 'false',
      qos: ''
    };
    this.mqttModelList.push(mqtt);
  }

  addEdgeXTab() {
    let edgex:any = {
      protocol: '',
      host: '',
      port: '',
      topic: '',
      contentType: '',
      metadata: '',
      deviceName: '',
      type: '',
      optional: ''
    };
    this.edgexModelList.push(edgex);
  }

  removeRestTab(index: any) {
    let arrindex = $.inArray(parseInt(index), this.restModelList);
    this.restModelList.splice(arrindex, 1);
  }

  removeMqttTab(index: any) {
    let arrindex = $.inArray(parseInt(index), this.mqttModelList);
    this.mqttModelList.splice(arrindex, 1);
  }

  removeEdgeXTab(index: any) {
    let arrindex = $.inArray(parseInt(index), this.edgexModelList);
    this.edgexModelList.splice(arrindex, 1);
  }
}
