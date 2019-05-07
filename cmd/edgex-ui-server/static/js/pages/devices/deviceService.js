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
 * @version: 0.1.0
 *******************************************************************************/
$(document).ready(function(){
	//init loading data.
	orgEdgexFoundry.deviceService.loadDeviceService();
	orgEdgexFoundry.deviceService.loadDeviceProfile();

});

orgEdgexFoundry.deviceService = (function(){
	"use strict";
	function DeviceService() {
		this.deviceServiceListCache = [];
		this.selectedRow = null;
    this.deviceProtocols = null;

	}

	DeviceService.prototype = {
		constructor: DeviceService,
		loadDeviceService: null,
		renderDeviceService: null,
		renderServiceAddressable: null,
		refreshDeviceService: null,
		hideServiceAddressablePanel: null,

		loadDevice: null,
		renderDevice: null,
		addDevice: null,
		editDevice:null,
		uploadDevice: null,
		cancelAddOrUpdateDevice: null,
		deleteDevice: null,
		hideDevicePanel: null,
		renderCommandList: null,
    addProtocol: null,
    addProtocolField: null,
    resetProtocol: null,
    setProtocol: null,
    getProtocolFormValue: null,

		loadDeviceProfile: null,
		renderDeviceProfile: null,
		showUploadFilePanel: null,
		uploadProfile: null,
		deleteProfile: null,
		refreshProfile: null,
		cancelAddDeviceProfile: null,
		onSelectFileCompleted: null,
	}

	var deviceService = new DeviceService();

  DeviceService.prototype.removeProtocolField = function(deviceProtocolFieldKey) {
    delete deviceService.deviceProtocols.deviceProtocolScheme[deviceProtocolFieldKey];
    $(".edgexfoundry-device-protocols input[name=\'" + deviceProtocolFieldKey+ "\']").parent(".protocol-field").remove();
  }

  DeviceService.prototype.getProtocolFormValue = function() {
    var protocolFields = Object.entries(deviceService.deviceProtocols.deviceProtocolScheme);
    var protocols = {};
    var protocolScheme =  $(".edgexfoundry-device-protocols input[name='deviceProtocolScheme']").val().trim();
    protocols[protocolScheme] = {};
    for (var i = 0; i < protocolFields.length; i++) {
      var fieldKey =  $(".edgexfoundry-device-protocols input[name=\'" + protocolFields[i][0]+ "\']").val().trim();
      var fieldValue =  $(".edgexfoundry-device-protocols input[name=\'" + protocolFields[i][1]+ "\']").val().trim();
      protocols[protocolScheme][fieldKey] = fieldValue;
    }

    return protocols;
  }

  DeviceService.prototype.setProtocol = function(protocols){
    var deviceProtocolScheme = Object.keys(protocols)[0];
    var protocolFields = Object.entries(protocols[deviceProtocolScheme]);

    for (var i = 1; i < protocolFields.length; i++) {
      deviceService.addProtocolField();
    }

    $(".edgexfoundry-device-protocols input[name='deviceProtocolScheme']").val(deviceProtocolScheme);

    for (var i = 0; i < protocolFields.length; i++) {
      $(".edgexfoundry-device-protocols  input[name='deviceProtocolFieldKey-"+i+"']").val(protocolFields[i][0]);
      $(".edgexfoundry-device-protocols  input[name='deviceProtocolFieldValue-"+i+"']").val(protocolFields[i][1]);
    }
  }

  DeviceService.prototype.resetProtocol = function(){
    if (deviceService.deviceProtocols == null) {
      return;
    }
    $(".edgexfoundry-device-protocols .protocol-field-collection").empty();

    deviceService.deviceProtocols = null;
  }

  DeviceService.prototype.addProtocol = function(){
    deviceService.deviceProtocols = {};
    deviceService.deviceProtocols["deviceProtocolScheme"] = {};
    var deviceProtocolFieldKey = "deviceProtocolFieldKey-0";
    var deviceProtocolFieldValue = "deviceProtocolFieldValue-0";

    deviceService.deviceProtocols.deviceProtocolScheme[deviceProtocolFieldKey] = deviceProtocolFieldValue;

    var field = '<div class="protocol-field" style="margin-bottom:5px;">';
    field += '<input type="text" class="form-control" style="display:inline!important;" name="' + deviceProtocolFieldKey + '">&nbsp;:&nbsp;';
    field += '<input type="text" class="form-control" style="display:inline!important;" name="'+ deviceProtocolFieldValue +'">';
    field += '<div class="edgexIconBtn" onclick="orgEdgexFoundry.deviceService.removeProtocolField(\''+deviceProtocolFieldKey+'\');">';
    field += '<i class="fa fa-minus-circle fa-lg" aria-hidden="true"></i>';
    field += '</div>';
    field += '</div>';

    $(".device-protocol .protocol-body .protocol-field-collection").append(field);

  }

  DeviceService.prototype.addProtocolField = function(){

    var fieldKeysArray;
    if (deviceService.deviceProtocols == null){
      deviceService.addProtocol();
      fieldKeysArray = Object.keys(deviceService.deviceProtocols["deviceProtocolScheme"]);
    } else {
      fieldKeysArray = Object.keys(deviceService.deviceProtocols["deviceProtocolScheme"]);
    }

    var deviceProtocolFieldKey = "deviceProtocolFieldKey-" + fieldKeysArray.length;
    var deviceProtocolFieldValue = "deviceProtocolFieldValue-" + fieldKeysArray.length;

    deviceService.deviceProtocols.deviceProtocolScheme[deviceProtocolFieldKey] = deviceProtocolFieldValue;

    var field = '<div class="protocol-field" style="margin-bottom:5px;">';
    field += '<input type="text" class="form-control" style="display:inline!important;" name="' + deviceProtocolFieldKey + '">&nbsp;:&nbsp;';
    field += '<input type="text" class="form-control" style="display:inline!important;" name="'+ deviceProtocolFieldValue +'">';
    field += '<div class="edgexIconBtn" onclick="orgEdgexFoundry.deviceService.removeProtocolField(\''+deviceProtocolFieldKey+'\');">';
    field += '<i class="fa fa-minus-circle fa-lg" aria-hidden="true"></i>';
    field += '</div>';
    field += '</div>';

    $(".device-protocol .protocol-body .protocol-field-collection").append(field);

  }

	// =======device service start
	DeviceService.prototype.loadDeviceService = function(){
		$.ajax({
			url: '/core-metadata/api/v1/deviceservice',
			type: 'GET',
			success: function(data){
				if (!data || data.length == 0) {
					$("#edgexfoundry-device-service-list table tfoot").show();
					return;
				}
				deviceService.renderDeviceService(data);
			},
			statusCode: {

			}
		});
	}

	DeviceService.prototype.renderDeviceService = function(deviceServices){
		$("#edgexfoundry-device-service-list table tbody").empty();
		$.each(deviceServices,function(i,v){
      var rowData = "<tr>";
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
			rowData += "<td>" +  v.description + "</td>";
      rowData += "<td>" +  v.labels.join(',') + "</td>";
			rowData += '<td class="device-service-addressable-search-icon"><input type="hidden" value=\''+JSON.stringify(v.addressable)+'\'>' + '<i class="fa fa-search-plus fa-lg"></i>' + '</td>';
      rowData += "<td>" +  v.operatingState + "</td>";
      rowData += "<td>" +  v.adminState + "</td>";
			rowData += '<td class="device-service-devices-inlcuded-icon"><input type="hidden" value=\''+v.name+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgexfoundry-device-service-list table tbody").append(rowData);
    });
		$(".device-service-addressable-search-icon").on('click',function(){
			var addressable = JSON.parse($(this).children('input[type="hidden"]').val());
			deviceService.renderServiceAddressable(addressable);
			$(".device-service-addressable").show();
		});

		$(".device-service-devices-inlcuded-icon").on('click',function(){
			var serviceName = $(this).children('input[type="hidden"]').val();
			deviceService.loadDevice(serviceName);
			$("#edgexfoundry-device-main").show();
		});
	}

	DeviceService.prototype.renderServiceAddressable = function(addr){
		$(".device-service-addressable table tbody").empty();
		var rowData = "<tr class='warning'>";
		rowData += "<td>" +  addr.id + "</td>";
		rowData += "<td>" +  addr.name + "</td>";
		rowData += "<td>" +  addr.protocol + "</td>";
		rowData += "<td>" +  addr.address + "</td>";
		rowData += "<td>" +  addr.port + "</td>";
		rowData += "<td>" +  addr.path + "</td>";
		rowData += "<td>" +  dateToString(addr.created) + "</td>";
		rowData += "<td>" +  dateToString(addr.modified) + "</td>";
		rowData += "</tr>";
		$(".device-service-addressable table tbody").append(rowData);
	}

	DeviceService.prototype.hideServiceAddressablePanel = function(){
		$(".device-service-addressable").hide();
	}

	DeviceService.prototype.refreshDeviceService = function(){
		deviceService.loadDeviceService();
	}
	// =======device service end

	//========device start
	DeviceService.prototype.hideDevicePanel = function(){
		$("#edgexfoundry-device-main").hide();
	}
	DeviceService.prototype.loadDevice = function(serviceName){
		$.ajax({
			url: '/core-metadata/api/v1/device/servicename/' + serviceName,
			type: 'GET',
			success: function(data){
				deviceService.renderDevice(data);
			},
			statusCode: {

			}
		});
	}

	DeviceService.prototype.renderDevice = function(devices){
		$(".edgexfoundry-device-list-table table tbody").empty();
		$("#edgexfoundry-device-list table tfoot").hide();
		if (!devices || devices.length == 0) {
			debugger
			$("#edgexfoundry-device-list table tfoot").show();
			return;
		}
		$.each(devices,function(i,v){
      var rowData = "<tr>";
			rowData += '<td class="device-delete-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += '<td class="device-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
			rowData += "<td>" +  v.description + "</td>";
      if (v.labels) {
        rowData += "<td>" + v.labels.join(',') + "</td>";
      } else {
        rowData += "<td>" + "</td>";
      }

			// rowData += '<td class="device-addressable-icon"><input type="hidden" value=\''+JSON.stringify(v.addressable)+'\'>' + '<i class="fa fa-eye fa-lg"></i>' + '</td>';

			rowData += '<td class="device-command-icon"><input type="hidden" value=\''+v.id+'\'>' + '<i class="fa fa-terminal fa-lg"></i>' + '</td>';
			rowData += "<td>" +  v.profile.name + "</td>";
			rowData += "<td>" +  v.operatingState + "</td>";
			rowData += "<td>" +  v.adminState + "</td>";
			rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $(".edgexfoundry-device-list-table table tbody").append(rowData);
    });

		$("#edgexfoundry-device-list .device-delete-icon").on('click',function(){
			var device = JSON.parse($(this).children('input').val());
			deviceService.deleteDevice(device);
		});

		$("#edgexfoundry-device-list .device-edit-icon").on('click',function(){
			var device = JSON.parse($(this).children('input').val());
			deviceService.editDevice(device);
		});

		$("#edgexfoundry-device-list .device-command-icon").on('click',function(){
			var deviceId = $(this).children('input').val();
			$.ajax({
				url:'/core-command/api/v1/device/' + deviceId,
				type: 'GET',
				success:function(data){
					deviceService.renderCommandList(data.commands);
					$(".edgexfoundry-device-command").show();
				}
			});
		});
	}

	DeviceService.prototype.editDevice = function(device){
    deviceService.resetProtocol();
    deviceService.setProtocol(device.protocols);

		$(".edgexfoundry-device-update-or-add .add-device").hide();
		$(".edgexfoundry-device-update-or-add .update-device").show();

		$(".edgexfoundry-device-form input[name='deviceServiceName']").val(device.service.name);
		$(".edgexfoundry-device-form input[name='deviceID']").val(device.id);
		$(".edgexfoundry-device-form input[name='deviceName']").val(device.name);
		$(".edgexfoundry-device-form input[name='deviceDescription']").val(device.description);
		$(".edgexfoundry-device-form input[name='deviceLabels']").val(device.service.labels.join(','));
		$(".edgexfoundry-device-form input[name='deviceAdminState']").val(device.adminState);
		$(".edgexfoundry-device-form input[name='deviceOperatingState']").val(device.operatingState);
		$(".edgexfoundry-device-form input[name='deviceProfile']").val(device.profile.name);

		// $(".edgexfoundry-device-form input[name='deviceAddressName']").val(device.addressable.name);
		// $(".edgexfoundry-device-form input[name='deviceAddressMethod']").val(device.addressable.method);
		// $(".edgexfoundry-device-form input[name='deviceAddressProtocol']").val(device.addressable.protocol);
		// $(".edgexfoundry-device-form input[name='deviceAddress']").val(device.addressable.address);
		// $(".edgexfoundry-device-form input[name='deviceAddressPort']").val(device.addressable.port);
		// $(".edgexfoundry-device-form input[name='deviceAddressPath']").val(device.addressable.path);
    //
		// $(".edgexfoundry-device-form input[name='deviceAddressPublisher']").val(device.addressable.publisher);
		// $(".edgexfoundry-device-form input[name='deviceAddresUser']").val(device.addressable.user);
		// $(".edgexfoundry-device-form input[name='deviceAddressPassword']").val(device.addressable.password);
		// $(".edgexfoundry-device-form input[name='deviceAddressTopic']").val(device.addressable.topic);

		$("#edgexfoundry-device-list").hide();
		$("#edgexfoundry-device-main .edgexfoundry-device-update-or-add").show();
	}

	DeviceService.prototype.addDevice = function(){
    deviceService.resetProtocol();
    deviceService.addProtocol();
		$("#edgexfoundry-device-list").hide();
		$("#edgexfoundry-device-main .edgexfoundry-device-update-or-add").show();
		$(".edgexfoundry-device-update-or-add .update-device").hide();
		$(".edgexfoundry-device-update-or-add .add-device").show();
		$(".edgexfoundry-device-form")[0].reset();
	}

	DeviceService.prototype.cancelAddOrUpdateDevice = function(){
		$("#edgexfoundry-device-list").show();
		$("#edgexfoundry-device-main .edgexfoundry-device-update-or-add").hide();
	}

	DeviceService.prototype.uploadDevice = function(type){
		var method;
		if(type=="new"){
			method = "POST"
		}else{
			method = "PUT"
		}
		debugger
		var device = {
			service: {
				name: $(".edgexfoundry-device-form input[name='deviceServiceName']").val().trim(),
			},
			id: $(".edgexfoundry-device-form input[name='deviceID']").val(),
			name: $(".edgexfoundry-device-form input[name='deviceName']").val().trim(),
			description: $(".edgexfoundry-device-form input[name='deviceDescription']").val(),
			labels: $(".edgexfoundry-device-form input[name='deviceLabels']").val().split(','),
			adminState: $(".edgexfoundry-device-form select[name='deviceAdminState']").val(),
			operatingState: $(".edgexfoundry-device-form select[name='deviceOperatingState']").val(),
			profile: {
				name: $(".edgexfoundry-device-form input[name='deviceProfile']").val().trim(),
			}
		}

		// var addressable = {
		// 	name: $(".edgexfoundry-device-form input[name='deviceAddressName']").val(),
		// 	method:$(".edgexfoundry-device-form select[name='deviceAddressMethod']").val(),
		// 	protocol: $(".edgexfoundry-device-form select[name='deviceAddressProtocol']").val(),
		// 	address: $(".edgexfoundry-device-form input[name='deviceAddress']").val(),
		// 	port: Number($(".edgexfoundry-device-form input[name='deviceAddressPort']").val()),
		// 	path: $(".edgexfoundry-device-form input[name='deviceAddressPath']").val(),
    //
		// 	publisher: $(".edgexfoundry-device-form input[name='deviceAddressPublisher']").val(),
		// 	user: $(".edgexfoundry-device-form input[name='deviceAddresUser']").val(),
		// 	password: $(".edgexfoundry-device-form input[name='deviceAddressPassword']").val(),
		// 	topic: $(".edgexfoundry-device-form input[name='deviceAddressTopic']").val()
		// }

    device['protocols'] = deviceService.getProtocolFormValue();
    debugger
    return
    $.ajax({
      url: '/core-metadata/api/v1/device',
      type: method,
      data:JSON.stringify(device),
      success: function(){
        bootbox.alert({
          message: "commit success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        400: function(){
          bootbox.alert({
            title: "Error",
            message: "the request is malformed or unparsable or if an associated object (Addressable, Profile, Service) cannot be found with the id or name provided !",
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
            title: "Error",
            message: "the name is determined to not be unique with regard to others !",
            className: 'red-green-buttons'
          });
        },
        500: function(){
          bootbox.alert({
            title: "Error",
            message: "unknown or unanticipated issues !",
            className: 'red-green-buttons'
          });
        }
      }
    });

		// $.ajax({
		// 	url: '/core-metadata/api/v1/addressable',
		// 	type: method,
		// 	data: JSON.stringify(addressable),
		// 	success: function(data){
		// 		device.addressable.id = data;
    //
		// 	},
		// 	statusCode: {
		// 		400: function(){
		// 			bootbox.alert({
		// 				title: "Error",
		// 				message: "commit addressable for malformed or unparsable requests !",
		// 				className: 'red-green-buttons'
		// 			});
		// 		},
		// 		409: function(){
		// 			bootbox.alert({
		// 				title: "Error",
		// 				message: "there is addressable with duplicate name !",
		// 				className: 'red-green-buttons'
		// 			});
		// 		},
		// 		500: function(){
		// 			bootbox.alert({
		// 				title: "Error",
		// 				message: "addressable for unknown or unanticipated issues or for any duplicate name (key) error!",
		// 				className: 'red-green-buttons'
		// 			});
		// 		}
		// 	}
		// });
	}

	DeviceService.prototype.deleteDevice = function(device){
		bootbox.confirm({
			title: "confirm",
			message: "Are you sure to remove device? ",
			className: 'green-red-buttons',
			callback: function (result) {
				if (result) {
					$.ajax({
						url: '/core-metadata/api/v1/device/id/' + device.id,
						type: 'DELETE',
						success: function(){
							$.ajax({
								url: '/core-metadata/api/v1/addressable/name/' + device.addressable.name,
								type: 'DELETE',
								success: function(){
									bootbox.alert({
										message: "remove device success !",
										className: 'red-green-buttons'
									});
									deviceService.loadDevice(device.service.name);
								}
							})
						},
						statusCode: {
							400: function(){
								bootbox.alert({
									title: "Error",
									message: " incorrect or unparsable requests !",
									className: 'red-green-buttons'
								});
							},
							404: function(){
								bootbox.alert({
									title: "Error",
									message: " the device cannot be found by the id provided !",
									className: 'red-green-buttons'
								});
							},
						}
					});
				}
			}
		});
	}

	DeviceService.prototype.renderCommandList = function(commands){
		$(".edgexfoundry-device-command table tbody").empty();
		$.each(commands,function(i,v){
			var rowData = '<tr>';
					rowData += '<td>' + v.name + '</td>';

					rowData += '<td>'
					if(v.get) {
						rowData += '<input type="radio"  name="commandRadio_'+v.id+'" checked value="get" style="width:20px;">&nbsp;get'
					}
					if(v.put) {
						rowData	+= '&nbsp;<input type="radio" name="commandRadio_'+v.id+'" value="set"  style="width:20px;">&nbsp;set'
					}
					rowData	+= '</td>';

					rowData += '<td>' + '<input type="text" class="form-control" name="reading_value'+v.id+'" disabled style="width:200px;display:inline;">' + '</td>'
					rowData += '<td>';
					if(v.put != null) {
						$.each(v.put.parameterNames,function(i,p){
							rowData += p + '&nbsp;<input type="text" class="form-control" name="' + p +v.id + '" style="width:100px;display:inline;">&nbsp;'
						});
					}
					rowData += '</td>';
					rowData += '<td>'
						+ '<button id=\''+v.id+'\' type=\'button\' class=\'btn btn-success\'  onclick=\'orgEdgexFoundry.deviceService.sendCommand('+JSON.stringify(v)+')\'>send</button>'
						+ '</td>';
					rowData += '</tr>';
      $(".edgexfoundry-device-command table tbody").append(rowData);
    });
	}

	DeviceService.prototype.sendCommand = function(command){
		$('#'+command.id+'').prop('disabled',true);
		var method = $('.edgexfoundry-device-command tbody input[name="commandRadio_'+command.id+'"]:radio:checked').val();
		if(method == 'set' && command.put != null) {
			var cmdUrl = command.put.url;
			cmdUrl = cmdUrl.replace(/(\w+):\/\/([^/:]+)(:\d*)?/,"/core-command");
			var paramBody={};
			$.each(command.put.parameterNames,function(i,param){
				//debugger
				var p = $('.edgexfoundry-device-command table tbody input[name="' + param + command.id + '"]').val();
				paramBody[param] = p;
			});
			console.log(JSON.stringify(paramBody))
			$.ajax({
				url:cmdUrl,
				type:'PUT',
				contentType:'application/json',
				data:JSON.stringify(paramBody),
				success:function(data){
					$('.edgexfoundry-device-command tbody input[name="reading_value'+command.id+'"]').val("success");
					$('#'+command.id+'').prop('disabled',false);
				},
				error:function(){
					$('.edgexfoundry-device-command tbody input[name="reading_value'+command.id+'"]').val("failed");
					$('#'+command.id+'').prop('disabled',false);
				}
			});
		} else {
			var cmdUrl = command.get.url;
		    cmdUrl = cmdUrl.replace(/(\w+):\/\/([^/:]+)(:\d*)?/,"/core-command");
			$.ajax({
				url:cmdUrl,
				type:'GET',
				success:function(data){
					$('.edgexfoundry-device-command tbody input[name="reading_value'+command.id+'"]').val(JSON.stringify(data));
					$('#'+command.id+'').prop('disabled',false);
				},
				error:function(){
					$('.edgexfoundry-device-command tbody input[name="reading_value'+command.id+'"]').val("failed");
					$('#'+command.id+'').prop('disabled',false);
				}
			});
		}
	}
	//========device end

	//========device profile start
	DeviceService.prototype.loadDeviceProfile = function(){
		$.ajax({
			url: '/core-metadata/api/v1/deviceprofile',
			type: 'GET',
			success: function(data){
				if (!data || data.length == 0) {
					$(".edgexfoundry-device-profile-main table tfoot").show();
					return;
				}
				deviceService.renderDeviceProfile(data);
			},
			statusCode: {

			}
		});
	}

	DeviceService.prototype.renderDeviceProfile = function(deviceprofiles){
		$(".edgexfoundry-device-profile-main table tbody").empty();
		$.each(deviceprofiles,function(i,v){
			var rowData = "<tr>";
			rowData += '<td class="deviceprofile-delete-icon"><input type="hidden" value=\''+v.id+'\'><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
			rowData += "<td>" + (i + 1) +"</td>";
			rowData += "<td>" +  v.id + "</td>";
			rowData += "<td>" +  v.name + "</td>";
			rowData += "<td>" +  v.description + "</td>";
			rowData += "<td>" +  v.labels.join(',') + "</td>";
			rowData += "<td>" +  dateToString(v.created) + "</td>";
			rowData += "<td>" +  dateToString(v.modified) + "</td>";
			rowData += "</tr>";
			$(".edgexfoundry-device-profile-main table tbody").append(rowData);
		});
		$(".deviceprofile-delete-icon").on('click',function(){
			var profileId = $(this).children("input[type='hidden']").val();
			deviceService.deleteProfile(profileId);
		});
	}

	DeviceService.prototype.deleteProfile = function(profileId){
		//debugger
		bootbox.confirm({
			title: "confirm",
      message: "Are you sure to remove ? ",
      className: 'green-red-buttons',
      callback: function (result) {
				if (result) {
					$.ajax({
						url: '/core-metadata/api/v1/deviceprofile/id/' + profileId,
						method: 'DELETE',
						success: function(){
							bootbox.alert({
								message: "Remove Success !",
								className: 'red-green-buttons'
							});
							deviceService.loadDeviceProfile();
						},
						statusCode: {
							404: function(){
								bootbox.alert({
									title: "Error",
									message: "device profile cannot be found with the identifier provided !",
									className: 'red-green-buttons'
								});
							},
							409: function(){
								bootbox.alert({
									title: "Error",
									message: "Can't delete device profile, the profile is still in use by a device !",
									className: 'red-green-buttons'
								});
							},
							500: function(){
								bootbox.alert({
									title: "Error",
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

	DeviceService.prototype.refreshProfile = function(){
		deviceService.loadDeviceProfile();
	}

	DeviceService.prototype.showUploadFilePanel = function(){
		$("#add-profile-panel").show();
	}

	DeviceService.prototype.cancelAddDeviceProfile = function(){
		$("#add-profile-panel").hide();
	}

	DeviceService.prototype.uploadProfile = function(){
		$("#add-profile-panel").hide();

		var form = $("#add-profile-panel form")[0];
		form.action = "/core-metadata/api/v1/deviceprofile/uploadfile?X-Session-Token=" + window.sessionStorage.getItem('X_Session_Token');
		form.method = "POST"
		form.enctype="multipart/form-data"
		form.submit();
		var iframe = $("#add-profile-panel iframe")[0];
		iframe.onload = function(event) {
			var doc = iframe.contentDocument;
			var response = $(doc).find('body').html();
			var result = response.match("code");
			if (result != null || $(doc).find('body').find("h1").length != 0) {
				bootbox.alert({
					title: "Error",
					message: "upload profile failed !",
					className: 'red-green-buttons'
				});
			} else {
				form.reset();
				bootbox.alert({
					message: "upload success !",
					className: 'red-green-buttons'
				});
				orgEdgexFoundry.deviceService.loadDeviceProfile();
			}
		}
	}

	DeviceService.prototype.onSelectFileCompleted = function() {
		var uploadInput = $("#add-profile-action")
		if (uploadInput[0].value) {

			var fileSelected = uploadInput[0].files[0];
			$("#add-profile-panel .new-file-proview").val(fileSelected.name);
		}
	}

	//========device profile end

	return deviceService;
})();
