/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
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
 * @author: Shengqi Wang, <wshengqi@vmware.com>
 *******************************************************************************/
$(document).ready(function(){
	orgEdgexFoundry.supportRuleEngine.loadStreamData();
	orgEdgexFoundry.supportRuleEngine.loadRuleData();
});

orgEdgexFoundry.supportRuleEngine = (function(){
	"use strict";

	function SupportRuleEngine() {
		this.selectStream = null;
		this.selectRule = null;
		this.scheduleEventTarget = {
			'core-command' : {
				'Alias' : 'core-command'
			},
			'customized' : {
				'Alias' : 'customized'
			}
		};
		this.scheduleEventTargetHttpMethod = [
			{
				'Value' : 'GET',
				'Text' : 'GET'
			},
			{
				'Value' : 'POST',
				'Text' : 'POST'
			},
			{
				'Value' : 'PUT',
				'Text' : 'PUT'
			},
			{
				'Value' : 'DELETE',
				'Text' : 'DELETE'
			}
		];
		this.restTabNum = 0;
		this.restTabArr = [];
		this.mqttTabNum = 0;
		this.mqttTabArr = [];
		this.edgexTabNum = 0;
		this.edgexTabArr = [];
	}

	SupportRuleEngine.prototype = {
		loadStreamData: null,
		renderStreamList: null,

		details: null,
		deleteStreamAndRule: null,
		toAddStream: null,
		addStream: null,

		loadRuleData: null,
		renderRuleList: null,
		toAddRule: null,
		addRules: null,
		ruleOperation: null,
		renderCommandEventAdd: null,

		addRestTab: null,
		addMqttTab: null,
		addEdgeXTab: null,

		removeRestTab: null,
		removeMqttTab: null,
		removeEdgeXTab: null
	}

	var ruleEngine = new SupportRuleEngine();

	SupportRuleEngine.prototype.loadStreamData = function(){
		$.ajax({
			url:'/rule-engine/streams',
			type:'GET',
			success:function(data){
				if(data != null && data.length != 0){
					$("#manage-stream-list table tfoot").hide();
				}
				ruleEngine.renderStreamList(data);
			}
		});
	}

	SupportRuleEngine.prototype.renderStreamList = function(data){
		$("#manage-stream-list table tbody").empty();
		$.each(data,function(i,stream){
			var rowData = "<tr>";
			rowData += "<td align='center'><input type='radio' name='streamRadio' value='"+stream+"'></td>";
			rowData += "<td>" + (i+1) + "</td>";
			rowData += "<td>" + stream + "</td>";
			rowData += "<td>" + "<button id='stream-detail-"+(i+1)+"' type='button' class='btn btn-success'  onclick='orgEdgexFoundry.supportRuleEngine.details(\"stream\", \""+stream+"\")'>details</button>" + "</td>";
			$("#manage-stream-list table tbody").append(rowData);
		});
		$("#manage-stream-list table tbody input:radio").on('click',function(){
			if($(this).prop('checked')){
				ruleEngine.selectStream = $(this).val();
			}
		});
	}

	SupportRuleEngine.prototype.toAddStream = function(){
		$('#ruleengine_model').find('.modal-title').text('Create a Stream');
		$('#ruleengine_model').find('.btn-success').show();
		$('#ruleengine_model').find('.sqlinput').remove();
		$("#json-renderer").hide();
		$('#ruleengine_paramsBox').append("<textarea class='form-control sqlinput' id='sqlinput' rows='15' >" +
			"{\n" +
			"\"sql\":\"create stream demo () WITH ( FORMAT = \\\"json\\\", TYPE=\\\"edgex\\\")\"\n" +
			"}"+
			"</textarea>");
		$('#ruleengine_model').modal({
			backdrop: "static"
		});
	}

	SupportRuleEngine.prototype.addStream = function(){
		$.ajax({
			url:'/rule-engine/streams',
			type:'POST',
			contentType: "application/json",
			data: $('#sqlinput').val(),
			success: function(){
				bootbox.alert({
					title:"Alert",
					message: "Operation succeeded!",
					className: 'red-green-buttons'
				});
					SupportRuleEngine.prototype.loadStreamData();
			},
			error: function(){
				bootbox.alert({
					title : "Error",
					message: "Operation failure!",
					className: 'red-green-buttons'
				});
			}
		});
	}

	SupportRuleEngine.prototype.details = function(type,value){
		var url;
		if(type == "stream"){
			url='/rule-engine/streams/'+value;
		}else if(type == "rule"){
			url='/rule-engine/rules/'+value;
		}else if(type == "rule-status"){
			url='/rule-engine/rules/'+value+'/status';
		}
		$.ajax({
			url:url,
			type:'GET',
			success:function(data){
				if(data != null){
					if(type == "stream"){
						$('#ruleengine_model').find('.modal-title').text('Stream Details');
					}else if(type == "rule"){
						$('#ruleengine_model').find('.modal-title').text('Rule Details');
					}else if(type == "rule-status"){
						$('#ruleengine_model').find('.modal-title').text('Rule Status Details');
					}
					$('#ruleengine_model').find('.btn-success').hide();
					$('#ruleengine_model').find('.sqlinput').remove();
					$("#json-renderer").empty();
					$("#json-renderer").show();
					try {
						var input = eval('(' + JSON.stringify(data) + ')');
					}catch (error) {
						return alert("Cannot eval JSON: " + error);
					}
					var options = {
						collapsed: false,
						withQuotes: false
					};
					$('#json-renderer').jsonViewer(input, options);
					$('#ruleengine_model').modal({
						backdrop: "static"
					});
				}
			}
		});
	}

	SupportRuleEngine.prototype.deleteStreamAndRule = function(type){
		var url;
		if(type == "stream"){
			if (!ruleEngine.selectStream) {
				bootbox.alert({
					message: "Please select one item !",
					className: 'red-green-buttons'
				});
				return;
			}
			url = '/rule-engine/streams/'+ruleEngine.selectStream;
		}else if(type == "rule"){
			if (!ruleEngine.selectRule) {
				bootbox.alert({
					message: "Please select one item !",
					className: 'red-green-buttons'
				});
				return;
			}
			url = '/rule-engine/rules/'+ruleEngine.selectRule;
		}

		bootbox.confirm({
			buttons: {
				confirm: {
					label: 'delete',
					className: 'btn-success'
				},
				cancel: {
					label: 'cancel',
					className: 'btn-default'
				}
			},
			title: "Warning",
			message: 'Are you sure to delete this data? The operation is not recoverable!',
			callback: function(result) {
				if(result) {
					$.ajax({
						url:url,
						type:'DELETE',
						success: function(){
							bootbox.alert({
								title:"Alert",
								message: "Operation succeeded!",
								className: 'red-green-buttons'
							});
							if(type == "stream"){
								SupportRuleEngine.prototype.loadStreamData();
							}else if(type == "rule"){
								SupportRuleEngine.prototype.loadRuleData();
							}
						},
						error: function(){
							bootbox.alert({
								title : "Error",
								message: "Operation failure!",
								className: 'red-green-buttons'
							});
						}
					});
				} else {
					return;
				}
			},
		});
	}

	SupportRuleEngine.prototype.loadRuleData = function(){
		$.ajax({
			url:'/rule-engine/rules',
			type:'GET',
			success:function(data){
				if(data != null && data.length != 0){
					$("#manage-rules-list table tfoot").hide();
				}
				ruleEngine.renderRuleList(data);
			}
		});
	}

	SupportRuleEngine.prototype.renderRuleList = function(data){
		$("#manage-rules-list table tbody").empty();
		$.each(data,function(i,rule){
			var rowData = "<tr>";
			rowData += "<td align='center'><input type='radio' name='ruleRadio' value='"+rule.id+"'></td>";
			rowData += "<td>" + (i+1) + "</td>";
			rowData += "<td>" + rule.id + "</td>";
			rowData += "<td>" + rule.status + "</td>";
			rowData += "<td>" + "<button id='rule-detail-"+(i+1)+"' type='button' class='btn btn-success'  onclick='orgEdgexFoundry.supportRuleEngine.details(\"rule\", \""+rule.id+"\")'>rule details</button>" + "</td>";
			rowData += "<td>" + "<button id='status-detail-"+(i+1)+"' type='button' class='btn btn-success'  onclick='orgEdgexFoundry.supportRuleEngine.details(\"rule-status\", \""+rule.id+"\")'>status details</button>" + "</td>";
			$("#manage-rules-list table tbody").append(rowData);
		});
		$("#manage-rules-list table tbody input:radio").on('click',function(){
			if($(this).prop('checked')){
				ruleEngine.selectRule = $(this).val();
			}
		});
	}

	SupportRuleEngine.prototype.toAddRule = function(){
		$("#rest_action_tab").hide();
		$("#mqtt_action_tab").hide();
		$("#edgex_action_tab").hide();
		$("#rest_tabs").empty();
		$("#mqtt_tabs").empty();
		$("#edgex_tabs").empty();
		for(var i=0;i<ruleEngine.restTabArr.length;i++){
			resetTargetActionConfigForm(ruleEngine.restTabArr[i]);
		}
		ruleEngine.restTabNum = 0;
		ruleEngine.restTabArr = [];
		ruleEngine.mqttTabNum = 0;
		ruleEngine.mqttTabArr = [];
		ruleEngine.edgexTabNum = 0;
		ruleEngine.edgexTabArr = [];
		$('#ruleengine_addrules_model').modal({
			backdrop: "static"
		});
		$('.selectpicker').selectpicker('deselectAll');
		$('#actions').change(function () {
			if($('#actions').val().indexOf("rest") !=-1){
				if($("#rest_action_tab").is(":hidden")){
					if($("#rest_tabs").html() == null || $("#rest_tabs").html().length == 0){
						ruleEngine.addRestTab();
					}
					$("#rest_action_tab").show();
				}
			}else{
				$("#rest_action_tab").hide();
			}

			if($('#actions').val().indexOf("mqtt") !=-1){
				if($("#mqtt_action_tab").is(":hidden")){
					if($("#mqtt_tabs").html() == null || $("#mqtt_tabs").html().length == 0){
						ruleEngine.addMqttTab();
					}
					$("#mqtt_action_tab").show();
				}
			}else{
				$("#mqtt_action_tab").hide();
			}

			if($('#actions').val().indexOf("edgex") !=-1){
				if($("#edgex_action_tab").is(":hidden")){
					if($("#edgex_tabs").html() == null || $("#edgex_tabs").html().length == 0){
						ruleEngine.addEdgeXTab();
					}
					$("#edgex_action_tab").show();
				}
			}else{
				$("#edgex_action_tab").hide();
			}

		});
	}

	SupportRuleEngine.prototype.addRules = function(){
		var ruleid = $("#ruleid").val();
		var rule_sqlinput = $("#rule_sqlinput").val();
		if(ruleid == "" || ruleid == null || rule_sqlinput == "" || rule_sqlinput == null){
			bootbox.alert({
				title:"Alert",
				message: "ID and Sql cannot be empty.",
				className: 'red-green-buttons'
			});
			return;
		}
		var sendData = {
			"id": ruleid,
			"sql": rule_sqlinput,
			"actions": []
		}
		var actionSelect = $("#actions").val();
		if(actionSelect != null && actionSelect != ""){
			if(actionSelect.indexOf("rest") !=-1){
				$.each(ruleEngine.restTabArr,function (key,val) {
					var rest = {rest:{}};
					var protocol = $("#EventAddressProtocol_"+val).val().toLowerCase();
					var address = $("#EventAddressAddress_"+val).val();
					var port = $("#EventAddressPort_"+val).val();
					var path = $("#EventAddressPath_"+val).val();
					var method = $("#EventAddressMethod_"+val).val();
					var retryInterval = $("#RetryInterval_"+val).val();
					var sendSingle = $("#SendSingle_"+val).val();
					if(retryInterval != null && retryInterval != ""){
						rest.rest.retryInterval = retryInterval;
					}
					if(sendSingle != null && sendSingle != ""){
						rest.rest.sendSingle = eval(sendSingle.toLowerCase());
					}
					if(protocol != null && protocol != "" && address != null && address != "" && port != null && port != "" && path != null && path != ""){
						rest.rest.url= protocol + "://"+ address + ":" + port + path;
					}else{
						bootbox.alert({
							title:"Alert",
							message: "Url cannot be empty.",
							className: 'red-green-buttons'
						});
						return;
					}
					if(method != null && method != ""){
						rest.rest.method = method;
					}
					if(method == "PUT"){
						var param = $("#EventAddressParameters_"+(ruleEngine.restTabNum-1)).val();
						if(param != null && param != ""){
							param = param.replace(/\"/g, '\\\"');
							rest.rest.dataTemplate = param;
						}
					}
					sendData.actions.push(rest);
				});
			}

			if(actionSelect.indexOf("mqtt") !=-1){
				$.each(ruleEngine.mqttTabArr,function (key,val) {
					var mqtt = {mqtt:{}};
					var server = $("#server_"+val).val();
					var mqtttopic = $("#mqtttopic_"+val).val();
					var clientId = $("#clientId_"+val).val();
					var protocolVersion = $("#protocolVersion_"+val).val();
					var username = $("#username_"+val).val();
					var password = $("#password_"+val).val();
					var certificationPath = $("#certificationPath_"+val).val();
					var privateKeyPath = $("#privateKeyPath_"+val).val();
					var insecureSkipVerify = $("#insecureSkipVerify_"+val).val();
					var retained = $("#retained_"+val).val();
					var qos = $("#qos_"+val).val();
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
					sendData.actions.push(mqtt);
				});
			}

			if(actionSelect.indexOf("edgex") !=-1){
				$.each(ruleEngine.edgexTabArr,function (key,val) {
					var edgex = {edgex:{}};
					var protocol = $("#protocol_"+val).val();
					var host = $("#host_"+val).val();
					var port = $("#port_"+val).val();
					var edgextopic = $("#edgextopic_"+val).val();
					var contentType = $("#contentType_"+val).val();
					var metadata = $("#metadata_"+val).val();
					var deviceName = $("#deviceName_"+val).val();
					var edgextype = $("#edgextype_"+val).val();
					var edgexParameters = $("#edgexParameters_"+val).val();
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
					sendData.actions.push(edgex);
				});
			}
			if(actionSelect.indexOf("log") !=-1){
				var log = {log:{}};
				sendData.actions.push(log);
			}
		}
		$.ajax({
			url:'/rule-engine/rules',
			type:'POST',
			contentType: "application/json",
			data: JSON.stringify(sendData),
			success: function(){
				$('#ruleengine_addrules_model').modal('hide');
				bootbox.alert({
					title:"Alert",
					message: "Operation succeeded!",
					className: 'red-green-buttons'
				});
				SupportRuleEngine.prototype.loadRuleData();
			},
			error: function(){
				bootbox.alert({
					title : "Error",
					message: "Operation failure!",
					className: 'red-green-buttons'
				});
			}
		});
	}

	SupportRuleEngine.prototype.renderCommandEventAdd = function (index) {
		$.each(ruleEngine.scheduleEventTarget, function (k, v) {
			$("#EventService_"+index).append($('<option>', {
				value: k,
				text: v.Alias,
			}));
		});
		$("#EventService_"+index).off('change');
		$("#EventService_"+index).on('change', function () {
			//resetTargetActionConfigForm(index);
			var targetServiceName = $(this).val();
			var id = $(this)[0].getAttribute("id");
			if (targetServiceName == 'core-command') {
				renderCoreCommandTargetActionConfigs(id.split("_")[1]);
			} else if (targetServiceName == 'customized') {
				renderCustomizedTargetActionConfigs(id.split("_")[1]);
			}
		});
		$("#EventService_"+index).trigger("change");
	};

	function resetTargetActionConfigForm(i) {
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

	function renderCoreCommandTargetActionConfigs(index) {
		$.ajax({
			url: '/core-command/api/v1/device',
			type: 'GET',
		}).done(function (devices) {
			if (!devices || devices.length == 0) {
				return;
			}
			var targetActionConfigs = {};
			if (devices) {
				for (var device of devices) {
					if (device['commands']) {
						for (var command of device['commands']) {
							if (command['get']) {
								var result = makeCoreCommandTargetActionConfigParams(device.name, command, "GET");
								targetActionConfigs[result[0]] = result[1];
							}
							if (command['put'] && command['put']['parameterNames']) {
								var result = makeCoreCommandTargetActionConfigParams(device.name, command, "PUT");
								targetActionConfigs[result[0]] = result[1];
							}
						}
					}
				}
			}

			$.each(targetActionConfigs, function (k, v) {
				$("#ScheduleEventServiceAction_"+index).append($('<option>', {
					value: k,
					text: k,
				}));
			});
			$("#ScheduleEventServiceAction_"+index).off('change');
			$("#ScheduleEventServiceAction_"+index).on('change', function () {
				var targetActionName = $(this).val();
				renderTargetActionConfigs(targetActionConfigs[targetActionName],index);
			});
			$("#ScheduleEventServiceAction_"+index).change();
		});
	}

	function makeCoreCommandTargetActionConfigParams(deviceName, command, httpMethod) {
		var urlObj = new URL(command['get']['url']);
		var config = {};
		if (httpMethod == 'PUT' && command['put']['parameterNames']) {
			var paramsObj = {};
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
		var configKey = getTargetActionName(deviceName, command['name'], httpMethod);
		return [configKey, config];
	}
	
	function getTargetActionName(deviceName, commandName, httpMethod) {
		if(httpMethod.toUpperCase() == 'GET'){
			return deviceName + " " + commandName + "(get)";
		}else{
			return deviceName + " " + commandName + "(set)";
		}
	}

	function renderTargetActionConfigs(config,index) {
		$("#EventAddressMethodCheck_"+index).off('change');
		$("#EventAddressMethodCheck_"+index).on('change', function () {
			if ($(this).is(':checked')) {
				$("#EventAddressMethod_"+index).prop('disabled', false);
			} else {
				$("#EventAddressMethod_"+index).prop('disabled', 'disabled');
			}
		});
		$("#EventAddressAddressCheck_"+index).off('change');
		$("#EventAddressAddressCheck_"+index).on('change', function () {
			if ($(this).is(':checked')) {
				$("#EventAddressAddress_"+index).prop('disabled', false);
			} else {
				$("#EventAddressAddress_"+index).prop('disabled', 'disabled');
			}
		});
		$("#EventAddressPortCheck_"+index).off('change');
		$("#EventAddressPortCheck_"+index).on('change', function () {
			if ($(this).is(':checked')) {
				$("#EventAddressPort_"+index).prop('disabled', false);
			} else {
				$("#EventAddressPort_"+index).prop('disabled', 'disabled');
			}
		});
		$("#EventAddressPathCheck_"+index).off('change');
		$("#EventAddressPathCheck_"+index).on('change', function () {
			if ($(this).is(':checked')) {
				$("#EventAddressPath_"+index).prop('disabled', false);
			} else {
				$("#EventAddressPath_"+index).prop('disabled', 'disabled');
			}
		});

		$("#EventAddressMethod_"+index).empty();
		$.each(ruleEngine.scheduleEventTargetHttpMethod, function (i, v) {
			$("#EventAddressMethod_"+index).append($('<option>', {
				value: v.Value,
				text: v.Text,
			}));
		});
		$("#EventAddressMethod_"+index).off('change');
		$("#EventAddressMethod_"+index).on('change',function () {
			if($(this).val() == 'GET'){
				$("#rest_parameters_"+index).hide();
			}else{
				$("#rest_parameters_"+index).show();
			}
		});

		$("#EventAddressProtocol_"+index).val('HTTP');
		$("#EventAddressMethod_"+index).val(config['Method']);
		$("#EventAddressAddress_"+index).val(config['Address']);
		$("#EventAddressPort_"+index).val(config['Port']);
		$("#EventAddressPath_"+index).val(config['Path']);
		if(config['Parameters'] && config['Parameters'] != ''){
			var formattedJSONParams = JSON.stringify(config['Parameters'], null, 4);
			$("#EventAddressParameters_"+index).val(formattedJSONParams);
		}
		$("#EventAddressMethodCheck_"+index).prop('checked',config['MethodCheck']);
		$("#EventAddressAddressCheck_"+index).prop('checked',config['AddressCheck']);
		$("#EventAddressPortCheck_"+index).prop('checked',config['PortCheck']);
		$("#EventAddressPathCheck_"+index).prop('checked',config['PathCheck']);

		$("#EventAddressMethodCheck_"+index).change();
		$("#EventAddressAddressCheck_"+index).change();
		$("#EventAddressPortCheck_"+index).change();
		$("#EventAddressPathCheck_"+index).change();

		$("#EventAddressMethod_"+index).change();
	}

	function renderCustomizedTargetActionConfigs(index) {
		var config = {};
		config['Method'] = 'PUT';
		config['Address'] = '';
		config['Port'] = '';
		config['Path'] = '';
		config['Parameters'] = '';
		config['MethodCheck'] = true;
		config['AddressCheck'] = true;
		config['PortCheck'] = true;
		config['PathCheck'] = true;
		renderTargetActionConfigs(config,index);
	}

	SupportRuleEngine.prototype.ruleOperation = function(type){
		if (!ruleEngine.selectRule) {
			bootbox.alert({
				message: "Please select one item !",
				className: 'red-green-buttons'
			});
			return;
		}
		var url;
		if(type == "start"){
			url = '/rule-engine/rules/'+ruleEngine.selectRule+'/start';
		}else if(type == "stop"){
			url = '/rule-engine/rules/'+ruleEngine.selectRule+'/stop';
		}else if(type == "restart"){
			url = '/rule-engine/rules/'+ruleEngine.selectRule+'/restart';
		}
		$.ajax({
			url:url,
			type:'POST',
			success: function(){
				bootbox.alert({
					title:"Alert",
					message: "Operation succeeded!",
					className: 'red-green-buttons'
				});
					SupportRuleEngine.prototype.loadRuleData();
			},
			error: function(){
				bootbox.alert({
					title : "Error",
					message: "Operation failure!",
					className: 'red-green-buttons'
				});
			}
		});
	}

	SupportRuleEngine.prototype.addRestTab = function(){
		$("#rest_tabs").append("<div id='rest_"+ruleEngine.restTabNum+"'>\n" +
			"<legend>\n" +
			"<h4>Rest HTTP Server "+(ruleEngine.restTabNum+1)+
			"<button type='button' class='btn btn-danger'id='restdelbutton_"+ruleEngine.restTabNum+"' style='margin-left: 2%;' onclick='orgEdgexFoundry.supportRuleEngine.removeRestTab(this.id);'><i class='fa fa-trash-o' aria-hidden='true'></i>&nbsp;Delete</button>" +
			"</h4>\n" +
			"</legend>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Target</label>\n" +
			"<div class='col-md-3'>\n" +
			"<select class='form-control' id='EventService_"+ruleEngine.restTabNum+"' name='EventService'></select>\n" +
			"</div>\n" +
			"<label class='col-md-1 control-label'>Action</label>\n" +
			"<div class='col-md-4'>\n" +
			"<select class='form-control' id='ScheduleEventServiceAction_"+ruleEngine.restTabNum+"' name='ScheduleEventServiceAction'></select>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Protocol</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='EventAddressProtocol_"+ruleEngine.restTabNum+"' name='EventAddressProtocol' disabled>\n" +
			"</div>\n" +
			"<div class='col-md-1'>\n" +
			"\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Method</label>\n" +
			"<div class='col-md-2'>\n" +
			"<select class='form-control' id='EventAddressMethod_"+ruleEngine.restTabNum+"' name='EventAddressMethod'></select>\n" +
			"</div>\n" +
			"<div class='col-md-2'>\n" +
			"<div class='checkbox'>\n" +
			"<label>\n" +
			"<input type='checkbox' id='EventAddressMethodCheck_"+ruleEngine.restTabNum+"' name='EventAddressMethodCheck'> Enabled\n" +
			"</label>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Address</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='EventAddressAddress_"+ruleEngine.restTabNum+"' name='EventAddressAddress' placeholder='edgex-core-command'>\n" +
			"</div>\n" +
			"<div class='col-md-1'>\n" +
			"<div class='checkbox'>\n" +
			"<label>\n" +
			"<input type='checkbox' id='EventAddressAddressCheck_"+ruleEngine.restTabNum+"' name='EventAddressAddressCheck'> Enabled\n" +
			"</label>\n" +
			"</div>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Port</label>\n" +
			"<div class='col-md-2'>\n" +
			"<input type='text' class='form-control' id='EventAddressPort_"+ruleEngine.restTabNum+"' name='EventAddressPort' placeholder='48082'>\n" +
			"</div>\n" +
			"<div class='col-md-2'>\n" +
			"<div class='checkbox'>\n" +
			"<label>\n" +
			"<input type='checkbox' id='EventAddressPortCheck_"+ruleEngine.restTabNum+"' name='EventAddressPortCheck'> Enabled\n" +
			"</label>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Path</label>\n" +
			"<div class='col-md-8'>\n" +
			"<input type='text' class='form-control' id='EventAddressPath_"+ruleEngine.restTabNum+"' name='EventAddressPath' placeholder='/v1/device/{id}/command/{commandid}'>\n" +
			"</div>\n" +
			"<div class='col-md-2'>\n" +
			"<div class='checkbox'>\n" +
			"<label>\n" +
			"<input type='checkbox' id='EventAddressPathCheck_"+ruleEngine.restTabNum+"' name='EventAddressPathCheck'> Enabled\n" +
			"</label>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>RetryInterval</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='RetryInterval_"+ruleEngine.restTabNum+"' name='RetryInterval' value='-1' placeholder='-1'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>SendSingle</label>\n" +
			"<div class='col-md-3'>\n" +
			"<select class='form-control' id='SendSingle_"+ruleEngine.restTabNum+"' name='SendSingle'>\n" +
			"<option value='true' selected>true</option>\n" +
			"<option value='false'>false</option>\n" +
			"</select>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group edgex-support-scheduleevent-parameters' id='rest_parameters_"+ruleEngine.restTabNum+"'>\n" +
			"<label for='EventAddressParameters' class='col-md-2 control-label'>Parameter</label>\n" +
			"<div class='col-md-8'>\n" +
			"<textarea class='form-control' rows='4' id='EventAddressParameters_"+ruleEngine.restTabNum+"' name='EventAddressParameters' placeholder='JSON Parameters'></textarea>\n" +
			"</div>\n" +
			"</div>\n" +
			"<h5 class='page-header'></h5>\n" +
			"</div>");

		ruleEngine.renderCommandEventAdd(ruleEngine.restTabNum);
		ruleEngine.restTabArr.push(ruleEngine.restTabNum);
		ruleEngine.restTabNum++;
	}

	SupportRuleEngine.prototype.addMqttTab = function(){
		$("#mqtt_tabs").append("<div id='mqtt_"+ruleEngine.mqttTabNum+"'>\n" +
			"<legend>\n" +
			"<h4>MQTT broker " +(ruleEngine.mqttTabNum+1)+
			"<button type='button' class='btn btn-danger'id='mqttdelbutton_"+ruleEngine.mqttTabNum+"' style='margin-left: 2%;' onclick='orgEdgexFoundry.supportRuleEngine.removeMqttTab(this.id);'><i class='fa fa-trash-o' aria-hidden='true'></i>&nbsp;Delete</button>" +
			"</h4>\n" +
			"</legend>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Server</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='server_"+ruleEngine.mqttTabNum+"' name='server' placeholder='tcp://127.0.0.1:1883'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Topic</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='mqtttopic_"+ruleEngine.mqttTabNum+"' name='mqtt_topic' placeholder='analysis/result'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>ClientId</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='clientId_"+ruleEngine.mqttTabNum+"' name='clientId' placeholder='The clientId for mqtt. '>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Protocol Version</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='protocolVersion_"+ruleEngine.mqttTabNum+"' name='protocolVersion' placeholder='Default value is 3.1.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Username</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='username_"+ruleEngine.mqttTabNum+"' name='username' placeholder='User name for the mqtt.'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Password</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='password_"+ruleEngine.mqttTabNum+"' name='password' placeholder='Password for the mqtt.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Certification Path</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='certificationPath_"+ruleEngine.mqttTabNum+"' name='certificationPath' placeholder='keys/***.pem'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>private Key Path</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='privateKeyPath_"+ruleEngine.mqttTabNum+"' name='privateKeyPath' placeholder='keys/***.pem.key'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>InsecureSkipVerify</label>\n" +
			"<div class='col-md-3'>\n" +
			"<select class='form-control' id='insecureSkipVerify_"+ruleEngine.mqttTabNum+"' name='insecureSkipVerify'>\n" +
			"<option value='true'>true</option>\n" +
			"<option value='false' selected>false</option>\n" +
			"</select>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>retained</label>\n" +
			"<div class='col-md-3'>\n" +
			"<select class='form-control' id='retained_"+ruleEngine.mqttTabNum+"' name='retained'>\n" +
			"<option value='true'>true</option>\n" +
			"<option value='false' selected>false</option>\n" +
			"</select>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Qos</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='qos_"+ruleEngine.mqttTabNum+"' name='qos' placeholder='QoS for message delivery.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<h5 class='page-header'></h5>\n" +
			"</div>");

		ruleEngine.mqttTabArr.push(ruleEngine.mqttTabNum);
		ruleEngine.mqttTabNum++;
	}

	SupportRuleEngine.prototype.addEdgeXTab = function(){
		$("#edgex_tabs").append("<div id='edgex_"+ruleEngine.edgexTabNum+"'>\n" +
			"<legend>\n" +
			"<h4>EdgeX message bus" +(ruleEngine.edgexTabNum+1)+
			"<button type='button' class='btn btn-danger'id='edgexdelbutton_"+ruleEngine.edgexTabNum+"' style='margin-left: 2%;' onclick='orgEdgexFoundry.supportRuleEngine.removeEdgeXTab(this.id);'><i class='fa fa-trash-o' aria-hidden='true'></i>&nbsp;Delete</button>" +
			"</h4>\n" +
			"</legend>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Protocol</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='protocol_"+ruleEngine.edgexTabNum+"' name='protocol' placeholder='Default value tcp.'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Host</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='host_"+ruleEngine.edgexTabNum+"' name='host' placeholder='Default value *.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Port</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='port_"+ruleEngine.edgexTabNum+"' name='port' placeholder='Default value 5563.'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Topic</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='edgextopic_"+ruleEngine.edgexTabNum+"' name='edgex_topic' placeholder='Default value events.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Content Type</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='contentType_"+ruleEngine.edgexTabNum+"' name='contentType' placeholder='Default value application/json.'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Metadata</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='metadata_"+ruleEngine.edgexTabNum+"' name='metadata' placeholder='A field name that allows user to specify a field name of SQL select clause.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Device Name</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='deviceName_"+ruleEngine.edgexTabNum+"' name='deviceName' placeholder='To specify the device name in the event structure that are sent from Kuiper.'>\n" +
			"</div>\n" +
			"<label class='col-md-2 control-label'>Type</label>\n" +
			"<div class='col-md-3'>\n" +
			"<input type='text' class='form-control' id='edgextype_"+ruleEngine.edgexTabNum+"' name='edgex_type' placeholder='zero or mqtt, and zero is the default value.'>\n" +
			"</div>\n" +
			"</div>\n" +
			"<div class='form-group'>\n" +
			"<label class='col-md-2 control-label'>Optional</label>\n" +
			"<div class='col-md-8'>\n" +
			"<textarea class='form-control' rows='4' id='edgexParameters_"+ruleEngine.edgexTabNum+"' name='edgexParameters' placeholder='If mqtt message bus type is specified, then some optional values can be specified. '></textarea>\n" +
			"</div>\n" +
			"</div>\n" +
			"<h5 class='page-header'></h5>\n" +
			"</div>");

		ruleEngine.edgexTabArr.push(ruleEngine.edgexTabNum);
		ruleEngine.edgexTabNum++;
	}

	SupportRuleEngine.prototype.removeRestTab = function(btnId){
		var index = btnId.split("_")[1];
		$("#rest_"+index).remove();
		var arrindex = $.inArray(parseInt(index), ruleEngine.restTabArr);
		ruleEngine.restTabArr.splice(arrindex,1);
	}

	SupportRuleEngine.prototype.removeMqttTab = function(btnId){
		var index = btnId.split("_")[1];
		$("#mqtt_"+index).remove();
		var arrindex = $.inArray(parseInt(index), ruleEngine.mqttTabArr);
		ruleEngine.mqttTabArr.splice(arrindex,1);
	}

	SupportRuleEngine.prototype.removeEdgeXTab = function(btnId){
		var index = btnId.split("_")[1];
		$("#edgex_"+index).remove();
		var arrindex = $.inArray(parseInt(index), ruleEngine.edgexTabArr);
		ruleEngine.edgexTabArr.splice(arrindex,1);
	}

	return ruleEngine;
})();