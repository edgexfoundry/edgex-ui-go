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
  currentStep = 0;
  ruleName: string = '';
  ruleSql: string = '';
  ruleAction: any[] = [];
  ruleActionTemp: any[] = [];
  editRule!: Rule;

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
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.ruleName = params['id'];
        this.toEditRule();
      }
    });
  }

  ngAfterViewInit(){
    // $timeout(function(){
    //   $scope.apply();
    // })
  }

  toEditRule() {
    this.ruleSvc.findRuleById(this.ruleName).subscribe((rule: Rule) => {
      this.ruleSql = rule.sql;
      this.editRule = rule;
      if(rule.actions != null && rule.actions.length>0){
        this.ruleActionTemp = rule.actions;
      }
    });
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
    this.ruleActionTemp.forEach((event)=>{
      if(Object.keys(event)[0] == 'rest'){
        if(!this.showRestTabs){
          setTimeout(() => {this.el.nativeElement.querySelector("#restCheckbox").click();},10);
          this.showRestTabs = true;
        }
        this.renderRestDataPromise(event);
      }else if(Object.keys(event)[0] == 'mqtt'){
        if(!this.showMqttTabs){
          setTimeout(() => {this.el.nativeElement.querySelector("#mqttCheckbox").click();},10);
          this.showMqttTabs = true;
        }
        this.renderMqttDataPromise(event);
      }else if(Object.keys(event)[0] == 'edgex'){
        if(!this.showEdgexTabs){
          setTimeout(() => {this.el.nativeElement.querySelector("#edgexCheckbox").click();},10);
          this.showEdgexTabs = true;
        }
        this.renderEdgexDataPromise(event);
      }else if(Object.keys(event)[0] == 'log'){
        if(!this.chooseActionLog){
          setTimeout(() => {this.el.nativeElement.querySelector("#logCheckbox").click();},1);
          this.chooseActionLog = true;
        }
      }
    });
  }

  renderRestDataPromise(event:any): Promise<any> {
    return new Promise(resolve => {
      let rest:any = {
        retryInterval: '',
        sendSingle: 'true',
        method: '',
        host: '',
        port: '',
        path: '',
        dataTemplate: ''
      };
      rest.retryInterval = event.rest['retryInterval'];
      rest.sendSingle = event.rest['sendSingle'];
      rest.method = event.rest['method'];
      rest.host = event.rest['url'].split("://")[1].split(":")[0];
      let port = event.rest['url'].split("://")[1].split(":")[1].split("/")[0];
      let path = event.rest['url'].split(port)[1];
      rest.port = port;
      rest.path = path;
      if(event.rest['dataTemplate'] != undefined ){
        rest.dataTemplate = event.rest['dataTemplate'].replace(/\\/g,"");
      }
      this.addRestTab(rest);
   });
  }

  renderMqttDataPromise(event:any): Promise<any> {
    return new Promise(resolve => {
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
      mqtt.server = event.mqtt['server'];
      mqtt.topic = event.mqtt['topic'];
      mqtt.clientId = event.mqtt['clientId'];
      mqtt.protocolVersion = event.mqtt['protocolVersion'];
      mqtt.username = event.mqtt['username'];
      mqtt.password = event.mqtt['password'];
      mqtt.certificationPath = event.mqtt['certificationPath'];
      mqtt.privateKeyPath = event.mqtt['privateKeyPath'];
      mqtt.insecureSkipVerify = event.mqtt['insecureSkipVerify'];
      mqtt.retained = event.mqtt['retained'];
      mqtt.qos = event.mqtt['qos'];
      this.addMqttTab(mqtt);
   });
  }

  renderEdgexDataPromise(event:any): Promise<any> {
    return new Promise(resolve => {
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
      edgex.protocol = event.edgex['protocol'];
      edgex.host = event.edgex['host'];
      edgex.port = event.edgex['port'];
      edgex.topic = event.edgex['topic'];
      edgex.contentType = event.edgex['contentType'];
      edgex.metadata = event.edgex['metadata'];
      edgex.deviceName = event.edgex['deviceName'];
      edgex.type = event.edgex['type'];
      edgex.optional = event.edgex['optional'];
      this.addEdgeXTab(edgex);
   });
  }

  previous() {
    this.showRestTabs = false;
    this.showMqttTabs = false;
    this.showEdgexTabs = false;
    this.restModelList = [];
    this.mqttModelList = [];
    this.edgexModelList = [];
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
    this.editRule.id = this.ruleName;
    this.editRule.sql = this.ruleSql;
    this.editRule.actions = this.ruleAction;
    this.ruleSvc.updateRule(this.editRule).subscribe(() => {
      this.msgSvc.success('Update rule success');
      this.router.navigate(['../rules-list'], { relativeTo: this.route })
    })
  }

  chooseRest(check:any){
    setTimeout(() => {
      this.renderPopoverComponent();
    }, 10);
    if(check.checked){
      if(this.restModelList.length == 0){
        this.addRestTab('');
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
        this.addMqttTab('');
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
        this.addEdgeXTab('');
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

  addRestTab(rest:any) {
    if(rest == ''){
      rest = {
        retryInterval: '',
        sendSingle: 'true',
        method: '',
        host: '',
        port: '',
        path: '',
        dataTemplate: ''
      };
    }
    this.templateSelectedList[this.templateSelectedList.length] = "command";
    this.restModelList.push(rest);
  }

  addMqttTab(mqtt:any) {
    if(mqtt == ''){
      mqtt= {
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
    }
    this.mqttModelList.push(mqtt);
  }

  addEdgeXTab(edgex:any) {
    if(edgex == ''){
      edgex = {
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
    }
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
