import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rule } from 'src/app/contracts/kuiper/rule';
import { MessageService } from 'src/app/message/message.service';
import { CommandService } from 'src/app/services/command.service';
import { RuleEngineService } from 'src/app/services/rule-engine.service';

@Component({
  selector: 'app-edit-rules',
  templateUrl: './edit-rules.component.html',
  styleUrls: ['./edit-rules.component.css']
})
export class EditRulesComponent implements OnInit {

  currentStep = 0;
  ruleName: string = '';
  ruleActionTemp: any[] = [];
  ruleSql: string = '';
  ruleAction: any[] = [];
  restTabNum: number = 0;
  restTabArr: number[] = [];
  mqttTabNum: number = 0;
  mqttTabArr: number[] = [];
  edgexTabNum: number = 0;
  edgexTabArr: number[] = [];
  showRestTabs:boolean = false;
  showMqttTabs:boolean = false;
  showEdgexTabs:boolean = false;
  chooseActionLog:boolean = false;
  targetActionConfigs: any[] = [];
  targetActionNum:number = 0;
  retrieveDataResolver: any;
  scheduleEventTarget = [
    {
      'Value': 'core-command',
      'Text': 'core-command'
    },
    {
      'Value': 'customized',
      'Text': 'customized'
    }
  ];
  
  scheduleEventTargetHttpMethod = [
    {
      'Value': 'GET',
      'Text': 'GET'
    },
    {
      'Value': 'POST',
      'Text': 'POST'
    },
    {
      'Value': 'PUT',
      'Text': 'PUT'
    },
    {
      'Value': 'DELETE',
      'Text': 'DELETE'
    }
  ];
  selectedClass = "text-white rounded px-2 bg-success  font-weight-bold";
  noSelectedClass = "text-white rounded px-2 bg-secondary  font-weight-bold";

  constructor(private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private cmdSvc: CommandService,
    private router: Router,
    private route: ActivatedRoute,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.ruleName = params['id'];
        this.toEditRule();
      }
    });
  }
  toEditRule() {
    this.ruleSvc.findRuleById(this.ruleName).subscribe((rule: Rule) => {
      this.ruleSql = rule.sql;
      if(rule.actions != null && rule.actions.length>0){
        this.ruleActionTemp = rule.actions;
      }
    });
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
          setTimeout(() => {this.el.nativeElement.querySelector("#restCheckbox").click();},1);
          this.showRestTabs = true;
        }
        this.renderRestDataPromise(event);
      }else if(Object.keys(event)[0] == 'mqtt'){
        if(!this.showMqttTabs){
          setTimeout(() => {this.el.nativeElement.querySelector("#mqttCheckbox").click();},1);
          this.showMqttTabs = true;
        }
        this.renderMqttDataPromise(event);
      }else if(Object.keys(event)[0] == 'edgex'){
        if(!this.showEdgexTabs){
          setTimeout(() => {this.el.nativeElement.querySelector("#edgexCheckbox").click();},1);
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
      let resultNum = this.addRestTab();
      setTimeout(() => {
        this.el.nativeElement.querySelector("#EventAddressMethod_"+(resultNum-1)).value = event.rest['method'];
        this.el.nativeElement.querySelector("#RetryInterval_"+(resultNum-1)).value = event.rest['retryInterval'];
        this.el.nativeElement.querySelector("#SendSingle_"+(resultNum-1)).value = event.rest['sendSingle'];
        this.el.nativeElement.querySelector("#EventAddressProtocol_"+(resultNum-1)).value = event.rest['url'].split("://")[0];
        this.el.nativeElement.querySelector("#EventAddressAddress_"+(resultNum-1)).value = event.rest['url'].split("://")[1].split(":")[0];
        let port = event.rest['url'].split("://")[1].split(":")[1].split("/")[0];
        let path = event.rest['url'].split(port)[1];
        this.el.nativeElement.querySelector("#EventAddressPort_"+(resultNum-1)).value = port
        this.el.nativeElement.querySelector("#EventAddressPath_"+(resultNum-1)).value = path;
        if(event.rest['dataTemplate'] != undefined ){
          $("#rest_parameters_"+(resultNum-1)).show();
          $("#EventAddressParameters_"+(resultNum-1)).prop('disabled', false);
          this.el.nativeElement.querySelector("#EventAddressParameters_"+(resultNum-1)).value = event.rest['dataTemplate'].replace(/\\/g,"");;
        }
      },500);
   });
  }

  renderMqttDataPromise(event:any): Promise<any> {
    return new Promise(resolve => {
      let resultNum = this.addMqttTab();
      setTimeout(() => {
        if(event.mqtt['server'] != undefined){
          this.el.nativeElement.querySelector("#server_"+(resultNum-1)).value = event.mqtt['server'];
        }
        if(event.mqtt['topic'] != undefined){
          this.el.nativeElement.querySelector("#mqtttopic_"+(resultNum-1)).value = event.mqtt['topic'];
        }
        if(event.mqtt['clientId'] != undefined){
          this.el.nativeElement.querySelector("#clientId_"+(resultNum-1)).value = event.mqtt['clientId'];
        }
        if(event.mqtt['protocolVersion'] != undefined){
          this.el.nativeElement.querySelector("#protocolVersion_"+(resultNum-1)).value = event.mqtt['protocolVersion'];
        }
        if(event.mqtt['username'] != undefined){
          this.el.nativeElement.querySelector("#username_"+(resultNum-1)).value = event.mqtt['username'];
        }
        if(event.mqtt['password'] != undefined){
          this.el.nativeElement.querySelector("#password_"+(resultNum-1)).value = event.mqtt['password'];
        }
        if(event.mqtt['certificationPath'] != undefined){
          this.el.nativeElement.querySelector("#certificationPath_"+(resultNum-1)).value = event.mqtt['certificationPath'];
        }
        if(event.mqtt['privateKeyPath'] != undefined){
          this.el.nativeElement.querySelector("#privateKeyPath_"+(resultNum-1)).value = event.mqtt['privateKeyPath'];
        }
        if(event.mqtt['insecureSkipVerify'] != undefined){
          this.el.nativeElement.querySelector("#insecureSkipVerify_"+(resultNum-1)).value = event.mqtt['insecureSkipVerify'];
        }
        if(event.mqtt['retained'] != undefined){
          this.el.nativeElement.querySelector("#retained_"+(resultNum-1)).value = event.mqtt['retained'];
        }
        if(event.mqtt['qos'] != undefined){
          this.el.nativeElement.querySelector("#qos_"+(resultNum-1)).value = event.mqtt['qos'];
        }
      },1);
   });
  }

  renderEdgexDataPromise(event:any): Promise<any> {
    return new Promise(resolve => {
      let resultNum = this.addEdgeXTab();
      setTimeout(() => {
        if(event.edgex['protocol'] != undefined){
          this.el.nativeElement.querySelector("#protocol_"+(resultNum-1)).value = event.edgex['protocol'];
        }
        if(event.edgex['host'] != undefined){
          this.el.nativeElement.querySelector("#host_"+(resultNum-1)).value = event.edgex['host'];
        }
        if(event.edgex['port'] != undefined){
          this.el.nativeElement.querySelector("#port_"+(resultNum-1)).value = event.edgex['port'];
        }
        if(event.edgex['topic'] != undefined){
          this.el.nativeElement.querySelector("#edgextopic_"+(resultNum-1)).value = event.edgex['topic'];
        }
        if(event.edgex['contentType'] != undefined){
          this.el.nativeElement.querySelector("#contentType_"+(resultNum-1)).value = event.edgex['contentType'];
        }
        if(event.edgex['metadata'] != undefined){
          this.el.nativeElement.querySelector("#metadata_"+(resultNum-1)).value = event.edgex['metadata'];
        }
        if(event.edgex['deviceName'] != undefined){
          this.el.nativeElement.querySelector("#deviceName_"+(resultNum-1)).value = event.edgex['deviceName'];
        }
        if(event.edgex['type'] != undefined){
          this.el.nativeElement.querySelector("#edgextype_"+(resultNum-1)).value = event.edgex['type'];
        }
        if(event.edgex['optional'] != undefined){
          this.el.nativeElement.querySelector("#edgexParameters_"+(resultNum-1)).value = event.edgex['optional'];
        }
      },1);
   });
  }

  previous() {
    this.currentStep = this.currentStep - 1;
  }

  changeStep() {
    this.currentStep += 1;
  }

  done() {
			if(this.el.nativeElement.querySelector("#restCheckbox").checked){
        this.restTabArr.forEach((event) => {
          var rest:any = {rest:{}};
					var protocol = $("#EventAddressProtocol_"+event).val().toLowerCase();
					var address = $("#EventAddressAddress_"+event).val();
					var port = $("#EventAddressPort_"+event).val();
					var path = $("#EventAddressPath_"+event).val();
					var method = $("#EventAddressMethod_"+event).val();
					var retryInterval = $("#RetryInterval_"+event).val();
					var sendSingle = $("#SendSingle_"+event).val();
					if(retryInterval != null && retryInterval != ""){
						rest.rest.retryInterval = retryInterval;
					}
					if(sendSingle != null && sendSingle != ""){
						rest.rest.sendSingle = eval(sendSingle.toLowerCase());
					}
					if(protocol != null && protocol != "" && address != null && address != "" && port != null && port != "" && path != null && path != ""){
						rest.rest.url= protocol + "://"+ address + ":" + port + path;
					}else{
						this.msgSvc.errors("Url cannot be empty.");
						return;
					}
					if(method != null && method != ""){
						rest.rest.method = method;
					}
					if(method == "PUT"){
						var param = $("#EventAddressParameters_"+event).val();
						if(param != null && param != ""){
							param = param.replace(/\"/g, '\\\"');
							rest.rest.dataTemplate = param;
						}
					}
          this.ruleAction.push({rest})
        });
			}

			if(this.el.nativeElement.querySelector("#mqttCheckbox").checked){
				this.mqttTabArr.forEach((event) => {
					var mqtt:any = {mqtt:{}};
					var server = $("#server_"+event).val();
					var mqtttopic = $("#mqtttopic_"+event).val();
					var clientId = $("#clientId_"+event).val();
					var protocolVersion = $("#protocolVersion_"+event).val();
					var username = $("#username_"+event).val();
					var password = $("#password_"+event).val();
					var certificationPath = $("#certificationPath_"+event).val();
					var privateKeyPath = $("#privateKeyPath_"+event).val();
					var insecureSkipVerify = $("#insecureSkipVerify_"+event).val();
					var retained = $("#retained_"+event).val();
					var qos = $("#qos_"+event).val();
					if(server != null && server != ""){
						mqtt.mqtt.server = server;
					}
					if(mqtttopic != null && mqtttopic != ""){
						mqtt.mqtt.topic = mqtttopic;
					}
					if(clientId != null && clientId != ""){
						mqtt.mqtt.clientId = clientId;
					}
					if(protocolVersion != null && protocolVersion != ""){
						mqtt.mqtt.protocolVersion = protocolVersion;
					}
					if(username != null && username != ""){
						mqtt.mqtt.username = username;
					}
					if(password != null && password != ""){
						mqtt.mqtt.password = password;
					}
					if(certificationPath != null && certificationPath != ""){
						mqtt.mqtt.certificationPath = certificationPath;
					}
					if(privateKeyPath != null && privateKeyPath != ""){
						mqtt.mqtt.privateKeyPath = privateKeyPath;
					}
					if(insecureSkipVerify != null && insecureSkipVerify != ""){
						mqtt.mqtt.insecureSkipVerify = insecureSkipVerify;
					}
					if(retained != null && retained != ""){
						mqtt.mqtt.retained = retained;
					}
					if(qos != null && qos != ""){
						mqtt.mqtt.qos = qos;
					}
					this.ruleAction.push({mqtt})
				});
			}

			if(this.el.nativeElement.querySelector("#edgexCheckbox").checked){
				this.edgexTabArr.forEach((event) => {
					var edgex:any = {edgex:{}};
					var protocol = $("#protocol_"+event).val();
					var host = $("#host_"+event).val();
					var port = $("#port_"+event).val();
					var edgextopic = $("#edgextopic_"+event).val();
					var contentType = $("#contentType_"+event).val();
					var metadata = $("#metadata_"+event).val();
					var deviceName = $("#deviceName_"+event).val();
					var edgextype = $("#edgextype_"+event).val();
					var edgexParameters = $("#edgexParameters_"+event).val();
					if(protocol != null && protocol != ""){
						edgex.edgex.protocol = protocol;
					}
					if(host != null && host != ""){
						edgex.edgex.host = host;
					}
					if(port != null && port != ""){
						edgex.edgex.port = port;
					}
					if(edgextopic != null && edgextopic != ""){
						edgex.edgex.topic = edgextopic;
					}
					if(contentType != null && contentType != ""){
						edgex.edgex.contentType = contentType;
					}
					if(metadata != null && metadata != ""){
						edgex.edgex.metadata = metadata;
					}
					if(deviceName != null && deviceName != ""){
						edgex.edgex.deviceName = deviceName;
					}
					if(edgextype != null && edgextype != ""){
						edgex.edgex.type = edgextype;
					}
					if(edgexParameters != null && edgexParameters != ""){
						edgex.edgex.optional = edgexParameters;
					}
					this.ruleAction.push({edgex})
				});
			}
			if(this.el.nativeElement.querySelector("#logCheckbox").checked){
				var log = {log:{}};
				this.ruleAction.push({log})
			}
    let rule: Rule = {
      id:this.ruleName,
      sql:this.ruleSql,
      actions:this.ruleAction
    } as Rule

    this.ruleSvc.updateRule(rule).subscribe(() => {
      this.msgSvc.success('Update Rule Success!');
      this.router.navigate(['../rule-list'], { relativeTo: this.route })
    });
  }
  EventAddressMethodCheckChange(target:any,index:any){
    if (target.checked) {
      $("#EventAddressMethod_"+index).prop('disabled', false);
    } else {
      $("#EventAddressMethod_"+index).prop('disabled', 'disabled');
    }
  }

  EventAddressAddressCheckChange(target:any,index:any){
    if (target.checked) {
      $("#EventAddressAddress_"+index).prop('disabled', false);
    } else {
      $("#EventAddressAddress_"+index).prop('disabled', 'disabled');
    }
  }

  EventAddressPortCheckChange(target:any,index:any){
    if (target.checked) {
      $("#EventAddressPort_"+index).prop('disabled', false);
    } else {
      $("#EventAddressPort_"+index).prop('disabled', 'disabled');
    }
  }

  EventAddressPathCheckChange(target:any,index:any){
    if (target.checked) {
      $("#EventAddressPath_"+index).prop('disabled', false);
    } else {
      $("#EventAddressPath_"+index).prop('disabled', 'disabled');
    }
  }

  EventAddressMethodChange(target:any,index:any){
    if(target.value == 'GET'){
      $("#rest_parameters_"+index).hide();
      $("#EventAddressParameters_"+index).prop('disabled', 'disabled');
    }else{
      $("#rest_parameters_"+index).show();
      $("#EventAddressParameters_"+index).prop('disabled', false);
    }
  }

  renderTargetActionConfigs(config: any, index: number) {
    $("#EventAddressProtocol_"+index).val('HTTP');
    $("#EventAddressMethod_"+index).val(config['Method']);
    $("#EventAddressAddress_"+index).val(config['Address']);
    $("#EventAddressPort_"+index).val(config['Port']);
    $("#EventAddressPath_"+index).val(config['Path']);
    if(config['Parameters'] && config['Parameters'] != ''){
    	var formattedJSONParams = JSON.stringify(config['Parameters'], null, 4);
    	$("#EventAddressParameters_"+index).val(formattedJSONParams);
      $("#EventAddressParameters_"+index).prop('disabled', false);
    }else{
      $("#EventAddressParameters_"+index).val('');
      $("#EventAddressParameters_"+index).prop('disabled', 'disabled');
    }
    $("#EventAddressMethodCheck_"+index).prop('checked',config['MethodCheck']);
    $("#EventAddressAddressCheck_"+index).prop('checked',config['AddressCheck']);
    $("#EventAddressPortCheck_"+index).prop('checked',config['PortCheck']);
    $("#EventAddressPathCheck_"+index).prop('checked',config['PathCheck']);

    this.EventAddressMethodCheckChange(this.el.nativeElement.querySelector("#EventAddressMethodCheck_"+index),index);
    this.EventAddressAddressCheckChange(this.el.nativeElement.querySelector("#EventAddressAddressCheck_"+index),index);
    this.EventAddressPortCheckChange(this.el.nativeElement.querySelector("#EventAddressPortCheck_"+index),index);
    this.EventAddressPathCheckChange(this.el.nativeElement.querySelector("#EventAddressPathCheck_"+index),index);
    this.EventAddressMethodChange(this.el.nativeElement.querySelector("#EventAddressMethod_"+index),index);
  }

  ScheduleEventServiceActionChange(target:any,index:any) {
    var targetActionName = target.value;
    this.renderTargetActionConfigs(this.targetActionConfigs[targetActionName], index);
  }

  chooseRest(check:any){
    if(check.checked){
      if(this.restTabArr.length == 0){
        this.addRestTab();
      }
      this.showRestTabs = true;
    }else{
      this.showRestTabs = false;
    }
  }

  chooseMqtt(check:any){
    if(check.checked){
      if(this.mqttTabArr.length == 0){
        this.addMqttTab();
      }
      this.showMqttTabs = true;
    }else{
      this.showMqttTabs = false;
    }
  }

  chooseEdgex(check:any){
    if(check.checked){
      if(this.edgexTabArr.length == 0){
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

  restTargetChange(event:any){
    let val = event.value;
    let id = event.id;
    if (val == 'core-command') {
      this.renderCoreCommandTargetActionConfigs(id.split("_")[1]);
    } else if (val == 'customized') {
      this.renderCustomizedTargetActionConfigs(id.split("_")[1]);
    }
  }

  resetTargetActionConfigForm(i:any) {
		$("#EventService_"+i).empty();
		$("#ScheduleEventServiceAction_"+i).empty();
		$("#EventAddressProtocol_"+i).val("");
		$("#EventAddressMethod_"+i).empty();
		$("#EventAddressMethodCheck_"+i).prop('disabled', false);
		$("#EventAddressAddress_"+i).val("");
		$("#EventAddressCheck_"+i).prop('disabled', false);
		$("#EventAddressPort_"+i).val("");
		$("#EventAddressPortCheck_"+i).prop('disabled', false);
		$("#EventAddressPath_"+i).val("");
		$("#EventAddressPathCheck_"+i).prop('disabled', false);
		$("#EventAddressParameters_"+i).val("");
		$("#EventService_"+i).prop('disabled',false);
		$("#ScheduleEventServiceAction_"+i).prop('disabled',false);
	}

  
	renderCustomizedTargetActionConfigs(index:any) {
		var config:any = {};
		config['Method'] = 'PUT';
		config['Address'] = '';
		config['Port'] = '';
		config['Path'] = '';
		config['Parameters'] = '';
		config['MethodCheck'] = true;
		config['AddressCheck'] = true;
		config['PortCheck'] = true;
		config['PathCheck'] = true;
		this.renderTargetActionConfigs(config,index);
	}

	renderCoreCommandTargetActionConfigs(index:any) {
    this.cmdSvc.findAllDeviceCommnads().subscribe((devices) => {
      if (!devices || devices.length == 0) {
				return;
			}
			if (devices) {
				for (var device of devices) {
					if (device['commands']) {
            this.targetActionNum  = 0;
						for (var command of device['commands']) {
							if (command['get']) {
								var result = this.makeCoreCommandTargetActionConfigParams(device.name, command, "GET");
								this.targetActionConfigs[result[0]] = result[1];
							}
							if (command['put'] && command['put']['parameterNames']) {
								var result = this.makeCoreCommandTargetActionConfigParams(device.name, command, "PUT");
								this.targetActionConfigs[result[0]] = result[1];
							}
              this.targetActionNum ++ ;
						}
					}
				}
			}
      let itemId = "#ScheduleEventServiceAction_"+index;
      setTimeout(() => {this.ScheduleEventServiceActionChange(this.el.nativeElement.querySelector(itemId),index);},1);
    })
	}

  restEventServiceActionChange(event:any,restindex:any){
    var targetActionName = event.value;
		this.renderTargetActionConfigs(this.targetActionConfigs[targetActionName],restindex);
  }

  makeCoreCommandTargetActionConfigParams(deviceName:string, command:any, httpMethod:string) {
		var urlObj = new URL(command['get']['url']);
		var config:any = {};
		if (httpMethod == 'PUT' && command['put']['parameterNames']) {
			var paramsObj:any = {};
			for (var paramName of command['put']['parameterNames']){
				paramsObj[paramName] = '';
			}
			config['Parameters'] = paramsObj;
		}
		config['Method'] = httpMethod;
		config['Address'] = urlObj.hostname;
		config['Port'] = urlObj.port;
		config['Path'] = urlObj.pathname;
		config['MethodCheck'] = false;
		config['AddressCheck'] = false;
		config['PortCheck'] = false;
		config['PathCheck'] = false;
		var configKey = this.getTargetActionName(deviceName, command['name'], httpMethod);
		return [configKey, config];
	}

  getTargetActionName(deviceName:string, commandName:string, httpMethod:string) {
		if(httpMethod.toUpperCase() == 'GET'){
			return deviceName + " " + commandName + "(get)";
		}else{
			return deviceName + " " + commandName + "(set)";
		}
	}

  addRestTab() {
    let itemId = '#EventService_'+this.restTabNum;
    setTimeout(() => {this.restTargetChange(this.el.nativeElement.querySelector(itemId));},1);
    this.restTabArr.push(this.restTabNum);
    this.restTabNum++;
    return this.restTabNum;
  }

  addMqttTab() {
    this.mqttTabArr.push(this.mqttTabNum);
    this.mqttTabNum++;
    return this.mqttTabNum;
  }

  addEdgeXTab() {
    this.edgexTabArr.push(this.edgexTabNum);
    this.edgexTabNum++;
    return this.edgexTabNum;
  }

  removeRestTab(index: any) {
    $("#rest_" + index).remove();
    var arrindex = $.inArray(parseInt(index), this.restTabArr);
    this.restTabArr.splice(arrindex, 1);
  }

  removeMqttTab(index: any) {
    $("#mqtt_" + index).remove();
    var arrindex = $.inArray(parseInt(index), this.mqttTabArr);
    this.mqttTabArr.splice(arrindex, 1);
  }

  removeEdgeXTab(index: any) {
    $("#edgex_" + index).remove();
    var arrindex = $.inArray(parseInt(index), this.edgexTabArr);
    this.edgexTabArr.splice(arrindex, 1);
  }

}
