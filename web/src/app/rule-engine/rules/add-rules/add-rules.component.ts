import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Rule } from 'src/app/contracts/kuiper/rule';
import { CommandService } from 'src/app/services/command.service';
import { RuleEngineService } from 'src/app/services/rule-engine.service';

import { MessageService } from '../../../message/message.service';

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
		for(var i=0;i<this.restTabArr.length;i++){
			this.resetTargetActionConfigForm(this.restTabArr[i]);
		}
		this.restTabNum = 0;
		this.restTabArr = [];
		this.mqttTabNum = 0;
		this.mqttTabArr = [];
		this.edgexTabNum = 0;
		this.edgexTabArr = [];
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
        this.restTabArr.forEach((event) => {
          var rest:any = {};
					var protocol = $("#EventAddressProtocol_"+event).val().toLowerCase();
					var address = $("#EventAddressAddress_"+event).val();
					var port = $("#EventAddressPort_"+event).val();
					var path = $("#EventAddressPath_"+event).val();
					var method = $("#EventAddressMethod_"+event).val();
					var retryInterval = $("#RetryInterval_"+event).val();
					var sendSingle = $("#SendSingle_"+event).val();
					if(retryInterval != null && retryInterval != ""){
						rest.retryInterval = retryInterval;
					}
					if(sendSingle != null && sendSingle != ""){
						rest.sendSingle = eval(sendSingle.toLowerCase());
					}
					if(protocol != null && protocol != "" && address != null && address != "" && port != null && port != "" && path != null && path != ""){
						rest.url= protocol + "://"+ address + ":" + port + path;
					}else{
						this.msgSvc.errors("Url cannot be empty.");
						return;
					}
					if(method != null && method != ""){
						rest.method = method;
					}
					if(method == "PUT"){
						var param = $("#EventAddressParameters_"+event).val();
						if(param != null && param != ""){
							param = param.replace(/\"/g, '\\\"');
							rest.dataTemplate = param;
						}
					}
          this.ruleAction.push({rest})
        });
			}

			if(this.el.nativeElement.querySelector("#mqttCheckbox").checked){
				this.mqttTabArr.forEach((event) => {
					var mqtt:any = {};
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
						mqtt.server = server;
					}
					if(mqtttopic != null && mqtttopic != ""){
						mqtt.topic = mqtttopic;
					}
					if(clientId != null && clientId != ""){
						mqtt.clientId = clientId;
					}
					if(protocolVersion != null && protocolVersion != ""){
						mqtt.protocolVersion = protocolVersion;
					}
					if(username != null && username != ""){
						mqtt.username = username;
					}
					if(password != null && password != ""){
						mqtt.password = password;
					}
					if(certificationPath != null && certificationPath != ""){
						mqtt.certificationPath = certificationPath;
					}
					if(privateKeyPath != null && privateKeyPath != ""){
						mqtt.privateKeyPath = privateKeyPath;
					}
					if(insecureSkipVerify != null && insecureSkipVerify != ""){
						mqtt.insecureSkipVerify = insecureSkipVerify;
					}
					if(retained != null && retained != ""){
						mqtt.retained = retained;
					}
					if(qos != null && qos != ""){
						mqtt.qos = qos;
					}
					this.ruleAction.push({mqtt})
				});
			}

			if(this.el.nativeElement.querySelector("#edgexCheckbox").checked){
				this.edgexTabArr.forEach((event) => {
					var edgex:any = {};
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
						edgex.protocol = protocol;
					}
					if(host != null && host != ""){
						edgex.host = host;
					}
					if(port != null && port != ""){
						edgex.port = port;
					}
					if(edgextopic != null && edgextopic != ""){
						edgex.topic = edgextopic;
					}
					if(contentType != null && contentType != ""){
						edgex.contentType = contentType;
					}
					if(metadata != null && metadata != ""){
						edgex.metadata = metadata;
					}
					if(deviceName != null && deviceName != ""){
						edgex.deviceName = deviceName;
					}
					if(edgextype != null && edgextype != ""){
						edgex.type = edgextype;
					}
					if(edgexParameters != null && edgexParameters != ""){
						edgex.optional = edgexParameters;
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

    this.ruleSvc.addRule(rule).subscribe(() => {
      this.msgSvc.success('Add rule success');
      this.router.navigate(['../rules-list'], { relativeTo: this.route })
    })
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
						for (var command of device['commands']) {
							if (command['get']) {
								var result = this.makeCoreCommandTargetActionConfigParams(device.name, command, "GET");
								this.targetActionConfigs[result[0]] = result[1];
							}
							if (command['put'] && command['put']['parameterNames']) {
								var result = this.makeCoreCommandTargetActionConfigParams(device.name, command, "PUT");
								this.targetActionConfigs[result[0]] = result[1];
							}
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
  }

  addMqttTab() {
    this.mqttTabArr.push(this.mqttTabNum);
    this.mqttTabNum++;
  }

  addEdgeXTab() {
    this.edgexTabArr.push(this.edgexTabNum);
    this.edgexTabNum++;
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
