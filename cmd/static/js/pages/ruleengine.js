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
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/
$(document).ready(function(){
	$("#rule-add-new").hide();
	$("#condition_device_list table").hide();
	$("#action_device_list table").hide();
	$("#device_command_list table").hide();
	orgEdgexFoundry.supportRuleEngine.loadRuleData();

	//global listener for hiding device-list section.
	document.addEventListener('click',function(event){
		$("#action_device_list table").hide();
		$("#condition_device_list table").hide();
	});
	document.querySelector("#condition_device_list table").addEventListener('click',function(event){
		event.stopPropagation();
	});
	document.querySelector("#action_device_list table").addEventListener('click',function(event){
		event.stopPropagation();
	});

	//bind click event listener for device-ComboGrid-list
	$("#condition_device_list  .select_panle").on('click',function(event){
		event.stopPropagation();
		$("#condition_device_list table").toggle();
		$("#action_device_list table").hide();
	});

	$("#action_device_list .select_panle").on('click',function(event){
		event.stopPropagation();
		$("#action_device_list table").toggle();
		$("#condition_device_list table").hide();
	});

	//initialize loading device-ComboGrid data.
	$.ajax({
		url:'/core-metadata/api/v1/device',
		type:'GET',
		success:function(data){
			orgEdgexFoundry.supportRuleEngine.deviceDataCache = data;
			$("#action_device_list table tbody").empty();
			$("#condition_device_list table tbody").empty();
			$.each(data,function(i,d){
				var rowData = "<tr>";
				rowData += "<td><input type='radio' name='condition' value= '" + d.id + "'></td>";
				rowData += "<td>" + (i+1) + "</td>";
				rowData += "<td>" + d.id.substr(0,8) + "</td>";
				rowData += "<td>" + d.name + "</td>";
				rowData += "</tr>";
				$("#action_device_list table  tbody").append(rowData);
				$("#condition_device_list table  tbody").append(rowData);
			});
			$("#condition_device_list table  tbody input:radio").on('click',function(){
				if($(this).prop('checked')){
					var radio = this;
					$.each(orgEdgexFoundry.supportRuleEngine.deviceDataCache,function(i,d){
						if(d.id == $(radio).val()) {
							//$("#condition_device_list input").val();
							$("#condition_device_list div.select_panle input[name='condition_device_name']").val(d.name);
							$("select[name='parameter']").empty();
							$.each(d.profile.deviceResources,function(j,resource){
								var opts = "<option>" + resource.name + "</option>";
								$(".condition_device_list select[name='parameter']").append(opts);
							});
						}
					});
				}
			});

			$("#action_device_list table > tbody input:radio").on('click',function(){
				if($(this).prop('checked')){
					var radio = this;
					$.each(orgEdgexFoundry.supportRuleEngine.deviceDataCache,function(i,d){
						if(d.id == $(radio).val()) {
							$("#action_device_list div.select_panle input[name='action_device_name']").val(d.name);
							$(".action_device_list select[name='commandName']").empty();
							$.each(d.profile.commands,function(j,cmd){
								var opts = "<option value='"+cmd.id+"'>" + cmd.name + "</option>";
								$(".action_device_list select[name='commandName']").append(opts);
							});

							//trigger command select change event manually to render command's parameters.
							$(".action_device_list select[name='commandName']").change();
							return false;
						}
					});
				}
			});

			$(".action_device_list select[name='commandName']").on('change',function(){
				$("#action_device_param").empty();
				var cmdId = $(this).val();
				var flag = true;
				$.each(orgEdgexFoundry.supportRuleEngine.deviceDataCache,function(i,d){
					$.each(d.profile.commands,function(k,cmd){
						if(cmd.id == cmdId){
							if(cmd.put == null){
								return false;
							}
							var parmArr = cmd.put.parameterNames;
							$.each(parmArr,function(n,p){
								var ele = p + "&nbsp;&nbsp;" + "<input class='form-control' style='width:150px;display: inline;' name='"+p+"'>";
								$("#action_device_param").append(ele);
							});
							flag = false
							return false;
						}
					});
					return flag;
				});
			});
		}
	});
});

orgEdgexFoundry.supportRuleEngine = (function(){
	"use strict";

	function SupportRuleEngine() {
		this.selectRule = null;
		this.ruleEngineDataCache = [];
		this.deviceDataCache = [];
	}

	SupportRuleEngine.prototype = {
		loadRuleData: null,
		renderRuleList: null,

		addRule: null,
		cancelAdd: null,
		commitRule: null,
		deleteRule: null,
	}

	var ruleEngine = new SupportRuleEngine();

	SupportRuleEngine.prototype.loadRuleData = function(){
		$.ajax({
			url:'/rule-engine/api/v1/rule',
			type:'GET',
			success:function(data){
				if(data != null && data.length != 0){
					$("#rule-engine-list table tfoot").hide();
				}
				ruleEngine.renderRuleList(data);
			}
		});
	}

	SupportRuleEngine.prototype.renderRuleList = function(data){
		$("#rule-engine-list table tbody").empty();
		$.each(data,function(i,rule){
			var rowData = "<tr>";
			rowData += "<td><input type='radio' name='ruleRadio' value='"+rule+"'></td>";
			rowData += "<td>" + (i+1) + "</td>";
			rowData += "<td>" + "--" + "</td>";
			rowData += "<td>" + rule + "</td>";
			rowData += "<td>" + "--" + "</td>";
			rowData += "<td>" + "--" + "</td>";
			$("#rule-engine-list table tbody").append(rowData);
		});
		$("#rule-engine-list table tbody input:radio").on('click',function(){
			if($(this).prop('checked')){
				ruleEngine.selectRule = $(this).val();
			}
		});
	}

	SupportRuleEngine.prototype.addRule = function(){
		$("#rule-engine-list").hide();
		$("#rule-add-new").show();
	}

	SupportRuleEngine.prototype.cancelAdd = function(){
		$("#rule-engine-list").show();
		$("#rule-add-new").hide();
	}

	SupportRuleEngine.prototype.commitRule = function(){
		var newRule = {};
		var condition = {};
		var checks = [];
		var action = {};
		var name = $("#rule-add-new input[name='name']").val();
		var condition_device_name = $("#rule-add-new input[name='condition_device_name']").val();
		var parameter = $("#rule-add-new select[name='parameter']").val();
		//var operand1 =
		var operation =  $("#rule-add-new select[name='operation']").val();
		var operand2 =  $("#rule-add-new input[name='operand2']").val();

		var action_device_name = $("#action_device_list input[name='action_device_name']").val();
		var command = $("#rule-add-new  select[name='commandName']").val();
		var body = '{\\\"';
		var param_inputs = $("table.action_device_list td").last().find('input');
		$.each(param_inputs,function(i,input){
			body += $(input).prop('name')+'\\\":\\\"' + $(input).val() + '\\\"';
			if(i == (param_inputs.length - 1)){
				body += '}';
				return false;
			}
			body += ',\\\"';
		});

		condition['device'] = condition_device_name;
		checks.push({"parameter":parameter,
					"operand1":"Float.parseFloat(value)",
					"operation":operation,"operand2":operand2});
		condition['checks'] = checks;
		$.each(ruleEngineModule.deviceDataCache,function(i,d){
			if(d.name == action_device_name){
				action['device'] = d.id;
			}
		});
		action['command'] = command;
		action['body'] = body;
		newRule['name'] = name;
		newRule['condition'] = condition;
		newRule['action'] = action;
		newRule['log'] = "";
		console.log(JSON.stringify(newRule));
		$.ajax({
			url:'/rule-engine/api/v1/rule',
			type:'POST',
			data:JSON.stringify(newRule),
			contentType:'application/json',
			success:function(){
				$("#rule-add-new").hide();
				$("#rule-engine-list").show();
				ruleEngine.loadRuleData();
			}
		});
	}

	SupportRuleEngine.prototype.deleteRule = function(){
		if (!ruleEngine.selectRule) {
			bootbox.alert({
				message: "Please select one item !",
				className: 'red-green-buttons'
			});
			return;
		}
		bootbox.confirm({
			title: "confirm",
			message: "Are you sure to delete ? ",
			className: 'green-red-buttons',
			callback: function (result) {
				if (result) {
					$.ajax({
						url:'/rule-engine/api/v1/rule/name/'+ruleEngineModule.selectRule+'',
						type: 'DELETE',
						success: function(){
							bootbox.alert({
								message: "Delete Success!",
								className: 'red-green-buttons'
							});
							ruleEngineModule.loadRuleEngineData();
						},
						statusCode: {
							404: function(){
								bootbox.alert({
									title:'Error',
									message: "unknown or unanticipated issues !",
									className: 'red-green-buttons'
								});
							},
							503: function(){
								bootbox.alert({
									title:'Error',
									message: "unknown or unanticipated issues !",
									className: 'red-green-buttons'
								});
							}
						}
					});
				}
			}
		});
	}

	return ruleEngine;
})();

var ruleEngineModule = {
		selectRule:"",
		ruleEngineDataCache:[],
		deviceDataCache:[],
		loadRuleEngineData:function(){

		},
		renderList:function(data){

		}
}
var ruleEngineModuleBtnGroup = {
		add:function(){

		},
		deleteRule:function(confirm){


		},
		detail:function(){},
		back:function(){

		},
		submit:function(){

		},
		update:function(){}
}

var testRuleData = {
		"name": "test-ruleengine-01",
		"condition": {
			"device": "KMC.BAC-121036CE01",
			"checks": [{
				"parameter": "AnalogValue_40",
				"operand1": "Float.parseFloat(value)",
				"operation": ">",
				"operand2": "50"
			}]
		},
		"action": {
			"device": "5aa89264e4b0c39331221ea7",
			"command": "5aa89260e4b0c39331221ea2",
			"body": "{\\\"enableRandomization\\\":\\\"false\\\",\\\"collectionFrequency\\\":\\\"15\\\"}"
		},
		"log": "disabled random."
	}
