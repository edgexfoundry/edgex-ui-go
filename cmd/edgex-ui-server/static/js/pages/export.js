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
	orgEdgexFoundry.coreExport.loadExportList();
	$("#filter-device-table").bootstrapTable({
		url:'/core-metadata/api/v1/device',
		checkboxHeader:false,
		classes:'table table-hover',
		striped: true,
		columns: [
		// 	{
		// 	// formatter:function(value, row, index){
		// 	// 	return '<i class="fa fa-check fa-lg" aria-hidden="true"></i>'
		// 	// },
		// 	// width:30
		// },
		{
				checkbox: true,
				width: 30,
				valign: 'middle'
    },{
        field: 'name',
        title: 'name'
    }, {
        field: 'description',
        title: 'description'
    }],
		onCheck:function(row){
			console.log(row);
			orgEdgexFoundry.coreExport.exportFilterDevice.push(row.name);
			$("#edgx-export-filter-device-list-main input[name='deviceName']").val(orgEdgexFoundry.coreExport.exportFilterDevice.join(','));
		},
		onUncheck:function(row){
			console.log(row);
			var index = orgEdgexFoundry.coreExport.exportFilterDevice.indexOf(row.name);
			orgEdgexFoundry.coreExport.exportFilterDevice.splice(index,1);
			$("#edgx-export-filter-device-list-main input[name='deviceName']").val(orgEdgexFoundry.coreExport.exportFilterDevice.join(','));
		}
	});
	$("#edgx-export-filter-device-list-main .export-filter-device-select").on('click',function(){
		$("#edgx-export-filter-device-list-main .edgx-export-filter-device-list").toggle();
	});
});

orgEdgexFoundry.coreExport = (function(){

	function CoreExport(){
		this.exportFilterDevice = [];
		this.devicesCache = null;
		this.wsClient = null;
		this.deviceResourceToEchartMapping = new Map();
		this.deviceToValueDescriptorMapping = new Map();
	}

	CoreExport.prototype = {
		constructor: CoreExport,
		loadExportList: null,
		renderExportList: null,
		previewExportInRealtime: null,

		loadDevicesCache: null,

		refreshBtn: null,
		deleteExportBtn: null,
		editExportBtn: null,
		addExportBtn: null,

		commitExportBtn: null,
		cancelAddOrUpdateExportBtn: null,
		disableExportIconBtn: null,

		hideAdressableBtn: null,
	}

	var coreExport = new CoreExport();

	CoreExport.prototype.loadDevicesCache = function(){
		$.ajax({
			url: '/core-metadata/api/v1/device',
			type: 'GET',
			success:function(devices){
				coreExport.devicesCache = devices;
				$.each(devices,function(i,d){

					var resources = [];
					$.each(d.profile.deviceResources,function(j,r){
						//只需要只读的设备资源,只写的资源是用来设置的
						if (r.properties.value.readWrite == "R" || r.properties.value.readWrite == "RW") {
							resources.push(r.name)
						}
					});

					//缓存一个device和device resources的映射
					coreExport.deviceToValueDescriptorMapping.set(d.name,resources);
				});
			}
		});
	}
	//init load all devices and device resources(ValueDescriptor).
	coreExport.loadDevicesCache();

	CoreExport.prototype.loadExportList = function(){
		$.ajax({
			url: '/core-export/api/v1/registration',
			type: 'GET',
			success: function(data){
				if(!data || data.length == 0){
					$("edgex-foundry-core-export-list table tfoot").show();
					return;
				}
				coreExport.renderExportList(data);
			},
			statusCode: {
				404: function(){
					bootbox.alert({
						title: 'Error',
						message: "Load data error !",
						className: 'red-green-buttons'
					});
				}
			}
		});
	}
	CoreExport.prototype.renderExportList = function(data){
		$("#edgex-foundry-core-export-list table tbody").empty();
    $.each(data,function(i,v){
      var rowData = "<tr>";
			rowData += '<td>'
      rowData += '<span class="core-export-delete-icon"><input type="hidden" value="'+v.id+'"><div class="edgexIconBtn"><i style="color:red;" class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></span>';
      rowData += '<span class="core-export-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i  class="fa fa-edit fa-lg" aria-hidden="true"></i></div></span>';
			rowData += '<span class="core-export-preview-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn" data-toggle="tooltip" data-placement="top" title="Export Preview"><i class="fa fa-tv fa-lg text-danger fa-inverse" aria-hidden="true" ></i></div></span>';
			rowData += '</td>'
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
			if (v.enable) {//enable
				rowData += '<td class="core-export-enable-switch"><input type="hidden" value=\''+JSON.stringify(v)+'\'><i style="color:green;" class="fa fa-unlock fa-lg" aria-hidden="true"></i></td>';
			} else {//disable
				rowData +='<td class="core-export-enable-switch"><input type="hidden" value=\''+JSON.stringify(v)+'\'><i style="color:red;" class="fa fa-lock fa-lg" aria-hidden="true"></i></td>';
			}
      rowData += "<td>" +  v.destination + "</td>";
			rowData += '<td class="core-export-address-search-icon"><input type="hidden" value=\''+JSON.stringify(v.addressable)+'\'>' + '<i class="fa fa-search-plus fa-lg"></i>' + '</td>';
      // rowData += "<td>" +  v.encryption + "</td>";
      rowData += "<td>" +  v.compression + "</td>";
			rowData += "<td>" +  v.format + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-foundry-core-export-list table tbody").append(rowData);
    });
		//init tooltip for preview icon.
		$('[data-toggle="tooltip"]').tooltip();
		//bind click event for addressable
		$(".core-export-address-search-icon").on("click",function(){
      var v = JSON.parse($(this).children("input").val());
      var rowData = "<tr class='warning'>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
      rowData += "<td>" +  v.protocol + "</td>";
			rowData += "<td>" +  v.address + "</td>";
			rowData += "<td>" +  v.port + "</td>";
			rowData += "<td>" +  v.path + "</td>";

			rowData += "<td>" +  v.publisher + "</td>";
			rowData += "<td>" +  v.user + "</td>";
			rowData += "<td>" +  v.password + "</td>";
			rowData += "<td>" +  v.topic + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $(".core-export-address table tbody").empty();
      $(".core-export-address table tbody").append(rowData);
      $(".core-export-address").show();
    });

    //delete
    $(".core-export-delete-icon").on('click',function(){
      coreExport.deleteExportBtn($(this).children("input[type='hidden']").val());
    });
    //edit
    $(".core-export-edit-icon").on('click',function(){
      var exportData = JSON.parse($(this).children("input[type='hidden']").val());
			coreExport.editExportBtn(exportData);
    });

		//preview
    $(".core-export-preview-icon").on('click',function(){
			// debugger
      var exportData = JSON.parse($(this).children("input[type='hidden']").val());
			coreExport.previewExportInRealtime(exportData);
    });

		//export-enable-switch
		$(".core-export-enable-switch").on('click',function(){
			var exportData = JSON.parse($(this).children("input[type='hidden']").val());
			coreExport.disableExportIconBtn(exportData);
		});

	}

	CoreExport.prototype.previewExportInRealtime = function(exportData){
		if (!exportData.enable) {
			bootbox.alert({
				message: "Please enable the selected export data !",
				className: 'red-green-buttons'
			});
			return;
		}
		//Removes all key/value pairs
		coreExport.deviceResourceToEchartMapping.clear();
		//Removes all preview content
		$("#edgex-foundry-core-export-preview-main .export-preview-content").empty();
		//Removes all Echarts instance
		$("#edgex-foundry-core-export-preview-main .export-preview-echart").empty();

		//判断当前导出是否过滤指定的设备，否则使用全部设备
		var deviceAndResourcesMapping = new Map();
		if(!exportData.filter){
			deviceAndResourcesMapping = coreExport.deviceToValueDescriptorMapping;
		} else {
			$.each(exportData.filter.deviceIdentifiers,function(i,d){
				var resources = [];
				if (!exportData.filter.valueDescriptorIdentifiers || exportData.filter.valueDescriptorIdentifiers.length == 0) {
					resources = coreExport.deviceToValueDescriptorMapping.get(d);
					deviceAndResourcesMapping.set(d,resources);
				} else {
					$.each(exportData.filter.valueDescriptorIdentifiers,function(j,r){
						if(coreExport.deviceToValueDescriptorMapping.get(d).indexOf(r) !== -1){
							deviceAndResourcesMapping.set(d,resources.push(r));
						}
					});
				}
			});
		}

		//为当前导出中的每一个设备资源生产一个设备资源
		for (var [device, resources] of deviceAndResourcesMapping) {
		  console.log(device + ' = ' + resources);
			$.each(resources,function(i,r){
				var charID = '' + device + '-' + r + '';

				var newChartDiv = '<div class="chart-'+charID+'" style="height:300px;width:600px;display:inline-block;"></div>';

				$("#edgex-foundry-core-export-preview-main .export-preview-echart").append(newChartDiv);
				var newChart = echarts.init(document.querySelector('.chart-' + charID));
				//缓存echart和设备资源映射，为以后动态添加数据做准备
				coreExport.deviceResourceToEchartMapping.set(charID,newChart);

				var option = {
						tooltip: {
								show: true,
								trigger:'axis'
						},
						legend: {
								data:[]
						},
						// dateZoom: {
						// 	show: false,
						// 	start: 0,
						// 	end: 100,
						// },
						calculable: true,
						xAxis : [
								{
										type : 'category',
										boundaryGap:false,
										data : [0,0,0,0,0,0,0,0,0,0]
								}
						],
						yAxis : [
								{
										type : 'value'
								}
						],
						series : [
								{
										"name":"",
										"type":"line",
										"smooth": true,
										"itemStyle": {normal:{color:"#449d44",areaStyle:{type:"default"}}},
										"data":[0,0,0,0,0,0,0,0,0,0]
								}
						]
				};
				option.legend.data.push(charID);
				option.series[0].name = charID;
				newChart.setOption(option);
			});

		}

		if ('WebSocket' in window) {
			if (!coreExport.wsClient) {
				coreExport.wsClient = new WebSocket("ws://" + document.location.hostname + ":4000/ws?X-Session-Token=" + window.sessionStorage.getItem("X_Session_Token"));
			}
    } else {
			bootbox.alert({
				message: "your browser not support WebSocket.",
				className: 'red-green-buttons'
			});
			return;
    }

		coreExport.wsClient.onopen = function(){
			$.ajax({
				url:'/api/v1/exportshow',
				type:'POST',
				contentType:'application/json',
				data:JSON.stringify(exportData.addressable),
				success:function(){}
			});
		}

		coreExport.wsClient.onmessage = function(event){
			console.log(event.data);
			var previewData = JSON.parse(event.data);
			var device = previewData.device;
			var resource = previewData.readings[0].name;
			var readValue = previewData.readings[0].value;
			var time = new Date(previewData.readings[0].created);
			time = time.getMinutes() + ":" + time.getSeconds();
			var echartID = '' + device + '-' + resource;
			var currentEchart = coreExport.deviceResourceToEchartMapping.get(echartID);

	    var option = currentEchart.getOption();
			option.series[0].data.push(readValue);
			option.series[0].data.shift();

			option.xAxis[0].data.push(time);
			option.xAxis[0].data.shift();

			currentEchart.setOption(option)
			$("#edgex-foundry-core-export-preview-main .export-preview-content").append('<p style="color:#7CFC00">' + event.data + '</p>');
			var div = $("#edgex-foundry-core-export-preview-main .export-preview-content")[0];
			div.scrollTop = div.scrollHeight;
		}

		$("#edgex-foundry-core-export-preview-main").show();
	}

	CoreExport.prototype.addExportBtn = function(){
		$("#edgex-foundry-core-export-main").hide();
		$("#edgex-foundry-core-export-updateoradd-main").show();
		$("#edgex-foundry-core-export-updateoradd-main .add-export-section").show();
		$("#edgex-foundry-core-export-updateoradd-main .update-export-section").hide();
		$("#edgex-foundry-core-export-updateoradd-main .edgex-core-export-form")[0].reset();
	}

	CoreExport.prototype.disableExportIconBtn = function(exportData){
		if (exportData.enable) {//if enable, set disabled. then update the export data.
			exportData.enable = false;
		} else { //if disabled, set enable.
			exportData.enable = true;
		}

		$.ajax({
			url: '/core-export/api/v1/registration',
			type: 'PUT',
			data: JSON.stringify(exportData),
			success: function(){
				coreExport.loadExportList();
			}
		});
	}

	CoreExport.prototype.hideAdressableBtn = function(){
		$(".core-export-address").hide();
	}

	CoreExport.prototype.editExportBtn = function(exportData){
		//debugger
		$("#edgex-foundry-core-export-main").hide();
		$("#edgex-foundry-core-export-updateoradd-main").show();
		$("#edgex-foundry-core-export-updateoradd-main .add-export-section").hide();
		$("#edgex-foundry-core-export-updateoradd-main .update-export-section").show();
		$(".edgex-core-export-form input[name='id']").val(exportData.id);
		$(".edgex-core-export-form input[name='name']").val(exportData.name);
		$(".edgex-core-export-form select[name='destination']").val(exportData.destination);
		$(".edgex-core-export-form select[name='compression']").val(exportData.compression);
		$(".edgex-core-export-form select[name='format']").val(exportData.format);
		$(".edgex-core-export-form input[name='enable']").prop("checked",exportData.enable);
		$(".edgex-core-export-form input[name='addressName']").val(exportData.addressable.name);
		$(".edgex-core-export-form input[name='address']").val(exportData.addressable.address);
		$(".edgex-core-export-form input[name='port']").val(exportData.addressable.port);
		$(".edgex-core-export-form input[name='path']").val(exportData.addressable.path);
		$(".edgex-core-export-form input[name='publisher']").val(exportData.addressable.publisher);
		$(".edgex-core-export-form input[name='user']").val(exportData.addressable.user);
		$(".edgex-core-export-form input[name='password']").val(exportData.addressable.password);
		$(".edgex-core-export-form input[name='topic']").val(exportData.addressable.topic);

		$("#filter-device-table").bootstrapTable('load', coreExport.devicesCache);

    if (exportData.filter && exportData.filter.deviceIdentifiers) {
      $("#filter-device-table").bootstrapTable("checkBy", {field:"name", values:exportData.filter.deviceIdentifiers});
      $(".edgex-core-export-form input[name='deviceName']").val(exportData.filter.deviceIdentifiers.join(','));
    }
	}

	CoreExport.prototype.refreshBtn = function(){
		coreExport.loadExportList();
		coreExport.loadDevicesCache();
	}

	CoreExport.prototype.deleteExportBtn = function(registrationId){
		bootbox.confirm({
      title: "confirm",
      message: "Are you sure to delete ? ",
      className: 'green-red-buttons',
      callback: function (result) {
				if (result) {
					$.ajax({
						url: '/core-export/api/v1/registration/id/' + registrationId,
						type: 'DELETE',
						success: function(){
							bootbox.alert({
								message: "Delete Success!",
								className: 'red-green-buttons'
							});
							coreExport.loadExportList();
						},
						statusCode: {
							404: function(){
								bootbox.alert({
									title:'Error',
									message: "Export registration cannot be found by id !",
									className: 'red-green-buttons'
								});
							},
							503: function(){
								bootbox.alert({
									title:'Error',
									message: "Unknown or unanticipated issues!",
									className: 'red-green-buttons'
								});
							}
						}
					});
				}
			}
		});
	}

	CoreExport.prototype.commitExportBtn = function(type){
		var exportData = {
			id: $(".edgex-core-export-form input[name='id']").val(),
			name: $(".edgex-core-export-form input[name='name']").val(),
			destination: $(".edgex-core-export-form select[name='destination']").val(),
			compression: $(".edgex-core-export-form select[name='compression']").val(),
			format: $(".edgex-core-export-form select[name='format']").val(),
			enable: $(".edgex-core-export-form input[name='enable']").prop("checked"),
			addressable: {
				name: $(".edgex-core-export-form input[name='addressName']").val(),
				protocol: $(".edgex-core-export-form select[name='protocol']").val(),
				address: $(".edgex-core-export-form input[name='address']").val(),
				port: Number($(".edgex-core-export-form input[name='port']").val()),
				method: $(".edgex-core-export-form select[name='method']").val(),
				path: $(".edgex-core-export-form input[name='path']").val(),
				publisher: $(".edgex-core-export-form input[name='publisher']").val(),
				user: $(".edgex-core-export-form input[name='user']").val(),
				password: $(".edgex-core-export-form input[name='password']").val(),
				topic: $(".edgex-core-export-form input[name='topic']").val()
			},
			filter: {
				deviceIdentifiers: $(".edgex-core-export-form input[name='deviceName']").val().split(',')
			},
			encryption: {
				encryptionAlgorithm: $(".edgex-core-export-form select[name='algorithm']").val(),
				encryptionKey: $(".edgex-core-export-form input[name='key']").val(),
				initializingVector: $(".edgex-core-export-form input[name='initializationVector']").val()
			}
		}
		if(type == "new"){
			commitExport(exportData,'new');
		}else{
			commitExport(exportData,'update')
		}
	}

	function commitExport(data,type){
		var method;
		if (type == "new") {
			method = "POST";
		} else {
			method = "PUT";
		}
		$.ajax({
			url:'/core-export/api/v1/registration',
			type:method,
			data:JSON.stringify(data),
			success: function(){
				bootbox.alert({
					message: "commit success !",
					className: 'red-green-buttons'
				});
				coreExport.loadExportList();
			},
			statusCode: {
				400: function(){
					bootbox.alert({
						title:"Error",
						message: "Error reading request !",
						className: 'red-green-buttons'
					});
				},
				503: function(){
					bootbox.alert({
						title:"Error",
						message: "unknown or unanticipated issues !",
						className: 'red-green-buttons'
					});
				}
			}
		});
	}

	CoreExport.prototype.cancelAddOrUpdateExportBtn = function(){
		$("#edgex-foundry-core-export-updateoradd-main").hide();
		$("#edgex-foundry-core-export-main").show();
	}

	return coreExport;
})();

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
