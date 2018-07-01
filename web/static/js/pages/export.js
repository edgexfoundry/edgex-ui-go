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
 *******************************************************************************/
$(document).ready(function(){
	$("#export_register_data").hide();
	$("#add_new_export").hide();
	coreExportModule.loadExportData();
	coreExportModule.exportChart = echarts.init($('#export_data_charts')[0],'wonderland');//macarons
    var option = {
    	    title : {
    	        text: 'Export Data',
    	        subtext: 'total'
    	    },
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	        // data:['KMC.BAC-121036CE01','GS1-AC-Drive01']
							data:[]
    	    },
    	    toolbox: {
    	        show : true,
    	        feature : {
    	            mark : {show: true},
    	            dataView : {show: true, readOnly: false},
    	            magicType : {show: true, type: ['line', 'bar']},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            // data : ['Temperature','Humidity','OutputVoltage','RPM']
									data : []
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value',
    	            splitNumber: 6,
    	            max: 300,
    	            min: -100
    	        }
    	    ],
    	    series : [
    	        // {
    	        //     name:'KMC.BAC-121036CE01',
    	        //     type:'bar',
    	        //     data:[0,0,0,0]
    	        // },
    	        // {
    	        //     name:'GS1-AC-Drive01',
    	        //     type:'bar',
    	        //     data:[0,0,0,0]
    	        // }
    	    ]
    	};
    coreExportModule.exportChart.setOption(option);
    $("#export_data_charts").hide();

    //global listener for hiding jsonShow section.
    document.addEventListener('click',function(event){
    		$("#export_register_json_format").hide('fast');
    });

    //Hand icon circular movement animate
    var shakee = function(){
		$("#add_new_export  i").animate({"right":"0"},function(){
			$("#add_new_export  i").animate({"right":"10px"},shakee());
		});
	}
	shakee();

	//global listener for hiding device-list section.
	document.addEventListener('click',function(event){
		$("#device_filter_list table").hide();
		$("#value_desc_filter_list table").hide();
		$("#export_register_json_format").hide();
	});
	document.querySelector("#device_filter_list table").addEventListener('click',function(event){
		event.stopPropagation();
	});
	document.querySelector("#value_desc_filter_list table").addEventListener('click',function(event){
		event.stopPropagation();
	});
	document.getElementById("export_register_json_format").addEventListener('click',function(event){
		event.stopPropagation();
	});
	$("#device_filter_list .select_panle").on('click',function(event){
		event.stopPropagation();
		$("#device_filter_list table").toggle();
		$("#value_desc_filter_list table").hide();
	});

	$("#value_desc_filter_list .select_panle").on('click',function(event){
		event.stopPropagation();
		$("#value_desc_filter_list table").toggle();
		$("#device_filter_list table").hide();
	});

	//initialize loading device-ComboGrid data.
	$.ajax({
		url:'/core-metadata/api/v1/device',
		type:'GET',
		success:function(data){
			coreExportModule.deviceFilterListCache = data;
			$("#device_filter_list table > tbody").empty();
			$("#value_desc_filter_list table > tbody").empty();
			$.each(data,function(i,d){
				var rowData = "<tr>";
				rowData += "<td><input type='checkbox'  name='deviceFilterCheck' value= '" + d.id + "'></td>";
				rowData += "<td>" + (i+1) + "</td>";
				rowData += "<td>" + d.name + "</td>";
				rowData += "<td>" + d.description + "</td>";
				rowData += "</tr>";
				$("#device_filter_list table > tbody").append(rowData);
			});

			$("#device_filter_list table > tbody input:checkbox").on('click',function(){
				if($(this).prop('checked')){
					var checkbox = this;
					$.each(coreExportModule.deviceFilterListCache,function(i,d){
						if(d.id == $(checkbox).val()) {
							coreExportModule.deviceFilterSelected.push(d.name);
							$("#device_filter_list .select_panle input[name='deviceName']").val(coreExportModule.deviceFilterSelected.toString());
						}
					});
				}else{
					coreExportModule.deviceFilterSelected.splice(coreExportModule.deviceFilterSelected.indexOf($(this).val()),1);
					$("#device_filter_list .select_panle input[name='deviceName']").val(coreExportModule.deviceFilterSelected.toString());
				}

				//valueDescriptor List bind checkbox event
				$("#value_desc_filter_list table > tbody").empty();
				if(coreExportModule.deviceReadingValueSelected.length != 0 ){
					$.each(coreExportModule.deviceReadingValueSelected,function(i,name){
						$.each($("#value_desc_filter_list table > tbody input:checkbox"),function(j,c){
							if(name == $(c).val()){
								$.each($("#value_desc_filter_list table > tbody input:checkbox"),function(k,cc){
									if($(cc).val() == name){
										$(c).prop('checked',true);
										return false;
									}
								});
							}
						});
					});
				}

				$.each(coreExportModule.deviceFilterSelected,function(n,selectDevice){
					$.each(coreExportModule.deviceFilterListCache,function(m,d){
						if(selectDevice == d.name){
							$.each(d.profile.deviceResources,function(i,r){
								var rowData = "<tr>";
								rowData += "<td><input type='checkbox' name='resourceFilterCheck' value= '" + r.name + "'></td>";
								rowData += "<td>" + (i+1) + "</td>";
								rowData += "<td>" + r.name + "</td>";
								rowData += "<td>" + r.description + "</td>";
								rowData += "</tr>";
								$("#value_desc_filter_list table > tbody").append(rowData);
							});
						}
					});
				});

				if(coreExportModule.deviceReadingValueSelected.length != 0 ){
					var inputs = $("#value_desc_filter_list table > tbody input:checkbox");
					$.each(coreExportModule.deviceReadingValueSelected,function(i,name){
						$.each(inputs,function(j,input){
							if($(input).val() == name){
								$(input).prop("checked",true);
								return false;
							}
						});
					});
				}

				$("#value_desc_filter_list table > tbody input:checkbox").on('click',function(){
					if($(this).prop('checked')){
						coreExportModule.deviceReadingValueSelected.push($(this).val());
						$("#value_desc_filter_list .select_panle input[name='valueDescriptor']").val(coreExportModule.deviceReadingValueSelected.toString());
					}else{
						coreExportModule.deviceReadingValueSelected.splice(coreExportModule.deviceReadingValueSelected.indexOf($(this).val()),1);
						$("#value_desc_filter_list .select_panle input[name='valueDescriptor']").val(coreExportModule.deviceReadingValueSelected.toString());
					}
				});
			});
		}
	});
});

var coreExportModule = {
		deviceFilterListCache:[],
		deviceFilterSelected:[],
		deviceReadingValueSelected:[],
		exportChart:{},
		exportDataCache:[],
		selectedRow:{},
		loadExportData:function(){
//			coreExportModule.exportDataCache = testExportData;
//			coreExportModule.renderExportGridList(testExportData);
			$.ajax({
				url:'/core-export/api/v1/registration',
				type:'GET',
				success:function(data){
					coreExportModule.exportDataCache = data;
					coreExportModule.renderExportGridList(data);
				}
			});
		},
		renderExportGridList:function(data){
			$("#export_list > table tbody").empty();
			$.each(data,function(i,e){
				var rowData = "<tr>";
				rowData += '<td><input type="radio" name="exportRadio" value="'+e.id+'"></td>';
				rowData += "<td>" + (i + 1) +"</td>";
				rowData += "<td>" +  e.id.substr(0,8) + "</td>";
				rowData += "<td>" +  e.name + "</td>";
				rowData += "<td>" +  e.destination + "</td>";
				if(e.enable){
					rowData += '<td value=' + e.id + ' enable="true">' + '<i class="fa fa-unlock fa-lg" aria-hidden="true"></i> ' + '</td>';
				}else{
					rowData += '<td value=' + e.id + ' enable="false">' + '<i class="fa fa-lock fa-lg" aria-hidden="true"></i> ' + '</td>';
				}
				rowData += "<td>" +  dateToString(e.created) + "</td>";
				rowData += "<td>" +  dateToString(e.modified) + "</td>";
				rowData += "</tr>";
				$("#export_list > table tbody").append(rowData);
			});
			$("#export_list table tbody input:radio").on('click',function(){
				if($(this).prop("checked")){
					var checked_input = this;
					$.each(coreExportModule.exportDataCache,function(index,ele){
						if(ele.id == $(checked_input).val()){
							coreExportModule.selectedRow = Object.assign({},ele);
							return false;
						}
					});
				}
			});
			$("#export_list table tbody i").parent().on('click',function(){
				var radios = $("#export_list > table > tbody input:radio");
				var td = this;
				$.each(radios,function(i,e){
					if($(e).prop('value') == $(td).attr('value')){
						$(e).prop('checked',true);
					}
				});

				$.each(coreExportModule.exportDataCache,function(index,ele){
					if(ele.id == $(td).attr("value")){
						coreExportModule.selectedRow = Object.assign({},ele);
						return false;
					}
				});
				$(td).children('i').toggleClass(function(){
					if($(td).attr("enable") == "false"){
						coreExportBtnGroup.isEnableExport(true);
						$("#export_register_data").show();
						$("#export_data_charts").show();
						$("#websocket_msg_content table tbody").empty();
						$(this).removeClass();
						$(td).attr("enable","true") ;
						coreExportModule.webSocketMsg();
						//create mqttClient if not exist
						$.ajax({
							url:'/api/v1/exportshow',
							type:'POST',
							contentType:'application/json',
							data:JSON.stringify(coreExportModule.selectedRow.addressable),
							success:function(){}
						});
						return 'fa fa-unlock fa-lg';
					}else{
						coreExportBtnGroup.isEnableExport(false);
						$(this).removeClass();
						$(td).attr("enable","false");
						coreExportModule.disconnWebsocket();
						return 'fa fa-lock fa-lg';
					}
				});
				//$("#export_list table tbody input:radio").prop('checked',true);
			});
			if(data.length != 0){
				$("#export_list table tfoot").hide();
			}
		},
		webSocket:null,
		webSocketMsg:function(){
			if(coreExportModule.webSocket == null || coreExportModule.webSocket.readyState == "CLOSED"){
				if ('WebSocket' in window) {
					coreExportModule.webSocket = new WebSocket("ws://localhost:4000/ws?X-Session-Token=" + window.sessionStorage.getItem("X_Session_Token"));
			    } else {
			        alert("your browser not support WebSocket.");
			    }
			}
			coreExportModule.webSocket.addEventListener('open', function (event) {
				//web socket heart beat per 10 seconds.
				window.setInterval(function(){
					if(coreExportModule.webSocket) {
						coreExportModule.webSocket.send("ping")
					}
				},10000);
			});
			coreExportModule.webSocket.onmessage = function(event){
				console.log(event.data);
				 $("#websocket_msg_content table tbody").append('<tr><td>' + event.data + '</td></tr>');
				 var div = $("#websocket_msg_content")[0];
				 div.scrollTop = div.scrollHeight;
				 $("#websocket_msg_content table tbody tr:odd").css({color:'#7CFC00'});
				 var d = JSON.parse(event.data);
//				 var dataMapping = {'AnalogValue_40':"temperature",'AnalogValue_22':"humidity",
//						 'HoldingRegister_8455':"OutputVoltage",'HoldingRegister_8454':'RPM'}
				 var echartOpts = coreExportModule.exportChart.getOption();
				 //debugger
				 if(echartOpts.legend[0].data.indexOf(d.device) == -1){
					 echartOpts.legend[0].data.push(d.device);
					 echartOpts.xAxis[0].data.push(d.readings[0].name)
					 var o = {}
					 o["name"] = d.device;
					 o["type"] = "bar";
					 o["data"] = new Array(echartOpts.xAxis[0].data.length)
					 o["data"].push(d.readings[0].value)
					 echartOpts.series.push(o);
					 coreExportModule.exportChart.setOption(echartOpts);
				 }if(echartOpts.legend[0].data.indexOf(d.device) != -1 && echartOpts.xAxis[0].data.indexOf(d.readings[0].name) == -1){
					 echartOpts.xAxis[0].data.push(d.readings[0].name)
					 $.each(echartOpts.series,function(i,s){
						 if(s.name == d.device){
							 s.data.splice(echartOpts.xAxis[0].data.indexOf(d.readings[0].name),1,d.readings[0].value);

							 return false
						 }
					 });
					 coreExportModule.exportChart.setOption(echartOpts);
				 } else {
					 $.each(echartOpts.series,function(i,s){
						 if(s.name == d.device){
							 s.data.splice(echartOpts.xAxis[0].data.indexOf(d.readings[0].name),1,d.readings[0].value);
							 coreExportModule.exportChart.setOption(echartOpts);
							 return false
						 }
					 });
				 }
					//alert(d.device)
				//  if(d.device == "KMC.BAC-121036CE01"){
				// 	 if(d.readings[0].name == 'AnalogValue_40'){
				// 		 echartOpts.series[0].data.splice(0,1,d.readings[0].value);
				// 	 }else if(d.readings[0].name == 'AnalogValue_22'){
				// 		 echartOpts.series[0].data.splice(1,1,d.readings[0].value);
				// 	 }
				// 	 coreExportModule.exportChart.setOption(echartOpts);
				//  }
				//  if(d.device == 'GS1-AC-Drive01'){
				// 	 if(d.readings[0].name == 'HoldingRegister_8455'){
				// 		 echartOpts.series[1].data.splice(2,1,d.readings[0].value);
				// 	 }else if(d.readings[0].name == 'HoldingRegister_8454'){
				// 		 echartOpts.series[1].data.splice(3,1,d.readings[0].value);
				// 	 }
				// 	 coreExportModule.exportChart.setOption(echartOpts);
				//  }
			}
		},
		disconnWebsocket:function(){
			//coreExportModule.webSocket.close();
		},
		echartShow:function(data){
			//not used
		}
}
var coreExportBtnGroup = {
		add:function(){
			$("#export_list").hide();
			$("#add_new_export").show();
			$("#add_new_export > button[name='submit']").show();
			$("#add_new_export > button[name='update']").hide();
			var form = $("#add_new_export").children("form")[0];
			form.reset();
		},
		deleteExport:function(confirm){
			$('#deleteConfirmDialog').modal('show');
			if(confirm){
				$.ajax({
					url:'/core-export/api/v1/registration/id/' + coreExportModule.selectedRow.id + '',
					type:'DELETE',
					success:function(){
						$('#deleteConfirmDialog').modal('hide');
						coreExportModule.loadExportData();
					},
					error:function(){
						alert('failed.');
						$('#deleteConfirmDialog').modal('hide');
					}
				});
			}
		},
		detail:function(){
			var form = $("#add_new_export").children("form")[0];
			form.reset();
			console.dir(coreExportModule.selectedRow);
			$("#export_list").hide();
			$("#add_new_export input[name='id']").val(coreExportModule.selectedRow.id);
			$("#add_new_export input[name='name']").val(coreExportModule.selectedRow.name);
			$("#add_new_export select[name='destination']").val(coreExportModule.selectedRow.destination);
			$("#add_new_export select[name='compression']").val(coreExportModule.selectedRow.compression);
			$("#add_new_export select[name='format']").val(coreExportModule.selectedRow.format);
			$("#add_new_export input[name='enable']").prop("checked",coreExportModule.selectedRow.enable);
			$("#add_new_export input[name='addressName']").val(coreExportModule.selectedRow.addressable.name);
			$("#add_new_export input[name='address']").val(coreExportModule.selectedRow.addressable.address);
			$("#add_new_export input[name='port']").val(coreExportModule.selectedRow.addressable.port);
			$("#add_new_export input[name='path']").val(coreExportModule.selectedRow.addressable.path);
			$("#add_new_export input[name='publisher']").val(coreExportModule.selectedRow.addressable.publisher);
			$("#add_new_export input[name='user']").val(coreExportModule.selectedRow.addressable.user);
			$("#add_new_export input[name='password']").val(coreExportModule.selectedRow.addressable.password);
			$("#add_new_export input[name='topic']").val(coreExportModule.selectedRow.addressable.topic);
//			$("#add_new_export input[name='key']").val(coreExportModule.selectedRow.id);
//			$("#add_new_export input[name='id']").val(coreExportModule.selectedRow.id);
			if(coreExportModule.selectedRow.filter != null){
				coreExportModule.deviceFilterSelected = coreExportModule.selectedRow.filter['deviceIdentifiers'];
				coreExportModule.deviceReadingValueSelected = coreExportModule.selectedRow.filter['valueDescriptorIdentifiers'];
				$("#device_filter_list .select_panle input[name='deviceName']").val(coreExportModule.deviceFilterSelected.toString());
				$("#value_desc_filter_list .select_panle input[name='valueDescriptor']").val(coreExportModule.deviceReadingValueSelected.toString());
			}
			if(coreExportModule.deviceFilterSelected.length != 0 ){
				$.each(coreExportModule.deviceFilterSelected,function(i,name){
					$.each(coreExportModule.deviceFilterListCache,function(j,d){
						if(name == d.name){
							$.each($("#device_filter_list table > tbody input:checkbox"),function(k,c){
								if($(c).val() == d.id){
									$(c).prop('checked',true);
									return false;
								}
							});
						}
					});
				});
				$("#value_desc_filter_list table > tbody").empty();
				$.each(coreExportModule.deviceFilterSelected,function(n,selectDevice){
					$.each(coreExportModule.deviceFilterListCache,function(m,d){
						if(selectDevice == d.name){
							$.each(d.profile.deviceResources,function(i,r){
								var rowData = "<tr>";
								rowData += "<td><input type='checkbox' name='resourceFilterCheck' value= '" + r.name + "'></td>";
								rowData += "<td>" + (i+1) + "</td>";
								rowData += "<td>" + r.name + "</td>";
								rowData += "<td>" + r.description + "</td>";
								rowData += "</tr>";
								$("#value_desc_filter_list table > tbody").append(rowData);
							});
						}
					});
				});
			}

			if(coreExportModule.deviceReadingValueSelected.length != 0 ){
				var inputs = $("#value_desc_filter_list table > tbody input:checkbox");
				$.each(coreExportModule.deviceReadingValueSelected,function(i,name){
					$.each(inputs,function(j,input){
						if($(input).val() == name){
							$(input).prop("checked",true);
							return false;
						}
					});
				});
			}

			$("#add_new_export > button[name='submit']").hide();
			$("#add_new_export > button[name='update']").show();
			$("#add_new_export").show();
		},
		back:function(){
			$("#add_new_export").hide();
			$("#export_list").show();
		},
		submit:function(){
			$("#core_export_shelter").show();
			var exportRegister = {};
			var exportAddr = {};
			var exportFilter = {};
			exportFilter['deviceIdentifiers'] = coreExportModule.deviceFilterSelected;
			exportFilter['valueDescriptorIdentifiers'] = coreExportModule.deviceReadingValueSelected;
			//exportRegister['id'] = $("#add_new_export input[name='id']").val();
			exportRegister['name'] = $("#add_new_export input[name='name']").val();
			exportRegister['destination'] = $("#add_new_export input[name='destination']").val();
			exportRegister['compression'] = $("#add_new_export input[name='compression']").val();
			exportRegister['format'] = $("#add_new_export input[name='format']").val();
			exportRegister['enable'] = $("#add_new_export input[name='enable']").prop("checked");

			exportAddr['name'] = $("#add_new_export input[name='addressName']").val();
			exportAddr['address'] = $("#add_new_export input[name='address']").val();
			exportAddr['port'] = $("#add_new_export input[name='port']").val();
			exportAddr['path'] = $("#add_new_export input[name='path']").val();
			exportAddr['publisher'] = $("#add_new_export input[name='publisher']").val();
			exportAddr['user'] = $("#add_new_export input[name='user']").val();
			exportAddr['password'] = $("#add_new_export input[name='password']").val();
			exportAddr['topic'] = $("#add_new_export input[name='topic']").val();
			exportAddr['method'] = $("#add_new_export select[name='method']").val();;
			exportAddr['protocol'] = $("#add_new_export select[name='protocol']").val();

			exportRegister['addressable'] = exportAddr;
			exportRegister['filter'] = exportFilter;
			console.dir(exportRegister);
			$.ajax({
				url:'/core-export/api/v1/registration',
				type:'POST',
				data:JSON.stringify(exportRegister),
				contentType:'application/json',
				success:function(){
					$("div.core_export_shelter").hide('fast');
					$("#export_list").show();
					$("#add_new_export").hide();
					coreExportModule.loadExportData();
				}
			});
			if(exportRegister['enable']){
				$.ajax({
					url:'/api/v1/exportshow',
					type:'POST',
					contentType:'application/json',
					data:JSON.stringify(exportAddr),
					success:function(){}
				});
			}
//			$.ajax({
//				url:'/edgex-pulse',
//				type:'POST',
//				contentType:'application/json',
//				data:JSON.stringify(exportRegister),
//				success:function(){}
//			});
		},
		update:function(){
			$("div.core_export_shelter").show('fast');
			var exportRegister = {};
			var exportAddr = {};
			var exportFilter = {};

			exportFilter['deviceIdentifiers'] = coreExportModule.deviceFilterSelected;
			exportFilter['valueDescriptorIdentifiers'] = coreExportModule.deviceReadingValueSelected;

			exportRegister['id'] = $("#add_new_export input[name='id']").val();
			exportRegister['name'] = $("#add_new_export input[name='name']").val();
			exportRegister['destination'] = $("#add_new_export select[name='destination']").val();
			exportRegister['compression'] = $("#add_new_export select[name='compression']").val();
			exportRegister['format'] = $("#add_new_export select[name='format']").val();
			exportRegister['enable'] = $("#add_new_export input[name='enable']").prop("checked");

			exportAddr['name'] = $("#add_new_export input[name='addressName']").val();
			exportAddr['address'] = $("#add_new_export input[name='address']").val();
			exportAddr['port'] = $("#add_new_export input[name='port']").val();
			exportAddr['path'] = $("#add_new_export input[name='path']").val();
			exportAddr['publisher'] = $("#add_new_export input[name='publisher']").val();
			exportAddr['user'] = $("#add_new_export input[name='user']").val();
			exportAddr['password'] = $("#add_new_export input[name='password']").val();
			exportAddr['topic'] = $("#add_new_export input[name='topic']").val();
			exportAddr['method'] = $("#add_new_export select[name='method']").val();;
			exportAddr['protocol'] = $("#add_new_export select[name='protocol']").val();
			exportRegister['addressable'] = exportAddr;
			exportRegister['filter'] = exportFilter;
			console.dir(exportRegister);
			$.ajax({
				url:'/core-export/api/v1/registration',
				type:'PUT',
				data:JSON.stringify(exportRegister),
				contentType:'application/json',
				success:function(){
					var echartOpts = coreExportModule.exportChart.getOption();
					echartOpts.series[0].data = [0,0,0,0];
					echartOpts.series[1].data = [0,0,0,0];
					coreExportModule.exportChart.setOption(echartOpts);
					window.setTimeout(function(){
						$("div.core_export_shelter").hide('fast');
						coreExportModule.loadExportData();
						$("#export_list").show();
						$("#add_new_export").hide();
					},1000);
				}
			});
			//update MQListener Cache.
			//if(coreExportModule.selectedRow[""]
			// $.ajax({
			// 	url:'/api/v1/exportshow',
			// 	type:'PUT',
			// 	contentType:'application/json',
			// 	data:JSON.stringify(exportAddr),
			// 	success:function(){}
			// });
		},
		isEnableExport:function(enable){
			coreExportModule.selectedRow.enable =  enable;
			$.ajax({
				url:'/core-export/api/v1/registration',
				type:'PUT',
				data:JSON.stringify(coreExportModule.selectedRow),
				contentType:'application/json',
				success:function(){

				}
			});
		},
		hideWebsocketContent:function(){
			$("#export_register_data").hide();
			$("#export_data_charts").hide();
		},
		showJsonFormatter:function(event){
			event.stopPropagation();
			$("#export_register_json_format").empty();
			$("#export_register_json_format").append("<pre>" + JSON.stringify(coreExportModule.selectedRow,null,3) + "</pre>");
			$("#export_register_json_format").toggle();
		}
}

var testExportData = [
    {
        "id": "5aa89209e4b01d97205d7f4c",
        "created": 1520996873655,
        "modified": 1520996873655,
        "origin": 0,
        "name": "EdgeXRulesEngine",
        "addressable": {
            "id": null,
            "created": 0,
            "modified": 0,
            "origin": 0,
            "name": "EdgeXRulesEngineAddressable",
            "method": "POST",
            "protocol": "ZMQ",
            "address": "",
            "port": 0,
            "path": "",
            "publisher": null,
            "user": null,
            "password": null,
            "topic": null,
            "url": "ZMQ://:0",
            "baseURL": "ZMQ://:0"
        },
        "format": "SERIALIZED",
        "filter": null,
        "encryption": null,
        "compression": "NONE",
        "enable": true,
        "destination": "ZMQ_TOPIC"
    }
]
