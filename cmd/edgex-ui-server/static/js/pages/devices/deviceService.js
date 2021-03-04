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
$(document).ready(function () {
    //init loading data.
    orgEdgexFoundry.deviceService.loadDeviceService();
    orgEdgexFoundry.deviceService.loadDeviceProfile();
});

orgEdgexFoundry.deviceService = (function(){
    "use strict";

    function DeviceService() {
        this.deviceProtocols = null;
        this.schedulerTabNum = 0;
        this.schedulerTabArr = [];
        this.selectedDeviceServiceName = null;
        this.deviceServiceList = null;
        this.allDeviceServiceNameList = null;
        this.deviceProfileList = null;
        this.allDeviceProfileNameList = null;
        this.deviceProtocolsPropertiesTemplate = [
            {
                'Protocol': 'mqtt',
                'Alias': 'mqtt',
                'Properties': [
                    {
                        'Key': 'Schema',
                        'Value': 'tcp',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'Host',
                        'Value': 'localhost',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'Port',
                        'Value': '1883',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'User',
                        'Value': '',
                        'Hint': '(optional)'
                    },
                    {
                        'Key': 'Password',
                        'Value': '',
                        'Hint': '(optional)'
                    },
                    {
                        'Key': 'ClientId',
                        'Value': 'clientid',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'Topic',
                        'Value': 'topic',
                        'Hint': '(required)'
                    }
                ],
            },
            {
                'Protocol': 'modbus-tcp',
                'Alias': 'modbus-tcp',
                'Properties': [
                    {
                        'Key': 'Address',
                        'Value': '/tmp/slave',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'Port',
                        'Value': '1502',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'UnitID',
                        'Value': '1',
                        'Hint': '(required)'
                    }
                ]
            },
            {
                'Protocol': 'modbus-rtu',
                'Alias': 'modbus-rtu',
                'Properties': [
                    {
                        'Key': 'Address',
                        'Value': '/tmp/slave',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'BaudRate',
                        'Value': '19200',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'DataBits',
                        'Value': '8',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'StopBits',
                        'Value': '1',
                        'Hint': '(required)'
                    },
                    {
                        'Key': 'Parity',
                        'Value': 'N',
                        'Hint': '(required,N - None, O - Odd, E - Even)'
                    },
                    {
                        'Key': 'UnitID',
                        'Value': '1',
                        'Hint': '(required)'
                    }
                ]
            },
            {
                'Protocol': 'HTTP',
                'Alias': 'HTTP',
                'Properties': [
                    {
                        'Key': 'Address',
                        'Value': '192.168.1.1',
                        'Hint': '(required)'
                    }
                ]
            },
            {
                'Protocol': 'other',
                'Alias': 'others',
                'Properties': [
                    {
                        'Key': '',
                        'Value': '',
                        'Hint': ''
                    }
                ]
            }
        ];
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
        refreshDevice: null,
        addDevice: null,
        editDevice: null,
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
        removeProtocolField: null,
        fillProtocolFields: null,
        setProtocolSelectEvent: null,

        loadDeviceProfile: null,
        renderDeviceProfile: null,
        showUploadFilePanel: null,
        uploadProfile: null,
        deleteProfile: null,
        refreshProfile: null,
        cancelAddDeviceProfile: null,
        onSelectFileCompleted: null,

        openDeviceWizard: null,
        showUploadFileWizard: null,
        cancelAddDeviceProfileWizard: null,
        uploadProfileWizard: null,
        onSelectFileCompletedWizard: null,
        loadSchedulerForSelectWizard:null,
        uploadDeviceWizard: null,
        plusSchedulerSelect: null,
        reduceSchedulerSelect: null

    };

    var deviceService = new DeviceService();

    DeviceService.prototype.openDeviceWizard = function(){
        $('#device_wizard_model').show();
        loadDeviceProfileForSelectWizard();
        loadSchedulerForSelectWizard();
        loadDeviceServiceForSelectWizard();
        $(".wizard").bootstrapWizard({
            height: 650,
            width: 800
        });
        $('#device_wizard_model').modal({
            backdrop: "static"
        });
        $('#device_wizard_model').on('shown.bs.modal', function (e) {
            deviceService.resetProtocol();
            deviceService.addProtocol();
        });
        $('#device_wizard_model').on('hidden.bs.modal', function (e) {
            $('#device_wizard_model').off('shown.bs.modal');
            $('#device_wizard_model').off('hidden.bs.modal');
            $('#device_wizard_model').off('submit.bw');
        })
        $('#device_wizard_model').on('submit.bw', function (e) {
            var device = {
                name: $(".edgex-support-device-wizard-step2-form input[name='deviceName']").val().trim(),
                description: $(".edgex-support-device-wizard-step2-form input[name='deviceDescription']").val(),
                labels: $(".edgex-support-device-wizard-step2-form input[name='deviceLabels']").val().split(','),
                adminState: $(".edgex-support-device-wizard-step2-form select[name='deviceAdminState']").val(),
                operatingState: $(".edgex-support-device-wizard-step2-form select[name='deviceOperatingState']").val(),
            };
            device['service'] = eval(deviceService.deviceServiceList).filter(function (e) { return e.name == $("#reference_service_select").val(); })[0];
            device['profile'] = eval(deviceService.deviceProfileList).filter(function (e) { return e.name == $("#reference_profile_select").val(); })[0];
            device['protocols'] = deviceService.getProtocolFormValue();
            if(deviceService.schedulerTabNum!=0){
                var autoEventArr = [];
                $.each(deviceService.schedulerTabArr,function (key,val) {
                    var frequency = $("#reference_scheduler_frequency_"+val).val();
                    var resource = $("#reference_scheduler_select_"+val).val();
                    autoEventArr[key] = {
                        "frequency": frequency,
                        "onChange": true,
                        "resource": resource
                    }
                });
                device['autoEvents'] = autoEventArr;
            }
            $.ajax({
                url: '/core-metadata/api/v1/device',
                type: 'POST',
                data:JSON.stringify(device),
                success: function(){
                    deviceService.cancelAddOrUpdateDevice();
                    deviceService.refreshDevice();
                    $('#device_wizard_model').hide();
                    $('#device_wizard_model').off('shown.bs.modal');
                    $('#device_wizard_model').off('hidden.bs.modal');
                    $('#device_wizard_model').off('submit.bw');
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
        })
    }

    function loadDeviceProfileForSelectWizard(){
        $('#reference_profile_select').empty();
        $.each(deviceService.allDeviceProfileNameList, function (i, item) {
            $('#reference_profile_select').append($('<option>', {
                value: item,
                text : item
            }));
        });
    }

    function loadDeviceServiceForSelectWizard(){
        $('#reference_service_select').empty();
        $.each(deviceService.allDeviceServiceNameList, function (i, item) {
            $('#reference_service_select').append($('<option>', {
                value: item,
                text : item
            }));
        });
    }

    function loadSchedulerForSelectWizard(index){
        if($("#reference_profile_select").val() != ''){
            var selectedProfile = eval(deviceService.deviceProfileList).filter(function (e) { return e.name == $("#reference_profile_select").val(); })[0];
            var deviceSources = selectedProfile['deviceCommands']

            $.each(deviceSources, function (i, item) {
                $('#reference_scheduler_select_'+index).append($('<option>', {
                    value: item.name,
                    text : item.name
                }));
            });
        }
    }

    DeviceService.prototype.plusSchedulerSelect = function(){
        $("#scheduler-plus-div").append("<div style='display:table;margin-top: 2%' id='schduler_"+deviceService.schedulerTabNum+"'>\n" +
            "<label class=\"col-md-2 control-label\">Event:</label>" +
            "<div class=\"col-md-3\">" +
            "<select class=\"form-control\" id='reference_scheduler_select_"+deviceService.schedulerTabNum+"'></select>" +
            "</div>" +
            "<label class=\"col-md-2 control-label\">Frequency:</label>" +
            "<div class=\"col-md-3\">" +
            "<input class=\"form-control\" placeholder='10s 10m 10h' id='reference_scheduler_frequency_"+deviceService.schedulerTabNum+"'>" +
            "</div>" +
            "<div style=\"margin-top: 1%\" class=\"col-md-1 edgexIconBtn\" id='reduce_"+deviceService.schedulerTabNum+"' onclick=\"orgEdgexFoundry.deviceService.reduceSchedulerSelect(this.id)\">" +
            "<i class=\"fa fa-minus fa-lg fa-fw\" aria-hidden=\"true\"></i>" +
            "</div>" +
            "</div>");
        loadSchedulerForSelectWizard(deviceService.schedulerTabNum);
        deviceService.schedulerTabArr.push(deviceService.schedulerTabNum);
        deviceService.schedulerTabNum++;
    }

    DeviceService.prototype.reduceSchedulerSelect = function(btnId){
        var index = btnId.split("_")[1];
        $("#schduler_"+index).remove();
        var arrindex = $.inArray(parseInt(index), deviceService.schedulerTabArr);
        deviceService.schedulerTabArr.splice(arrindex,1);
    }

    DeviceService.prototype.showUploadFileWizard = function(){
        $("#add-profile-wizard").show();
    }
    DeviceService.prototype.cancelAddDeviceProfileWizard = function(){
        $("#add-profile-wizard").hide();
    }

    DeviceService.prototype.uploadProfileWizard = function () {
        $("#add-profile-wizard").hide();
        var formData = new FormData($("#add-profile-wizard form")[0]);
        var reqUrl = "/core-metadata/api/v1/deviceprofile/uploadfile";
        $.ajax({
            url: reqUrl,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            complete: function (jqXHR, textStatus) {
                if (jqXHR.status == 200) {
                    bootbox.alert({
                        message: "Upload device profile success !",
                        className: 'red-green-buttons'
                    });
                    orgEdgexFoundry.deviceService.loadDeviceProfile();
                } else if (jqXHR.status == 409) {
                    bootbox.alert({
                        title: "Error",
                        message: "Duplicate profile name !",
                        className: 'red-green-buttons'
                    });
                } else {
                    bootbox.alert({
                        title: "Error",
                        message: "Upload failure !",
                        className: 'red-green-buttons'
                    });
                }
            }
        });
    };

    DeviceService.prototype.onSelectFileCompletedWizard = function() {
        var uploadInput = $("#add-profile-action-wizard")
        if (uploadInput[0].value) {
            var fileSelected = uploadInput[0].files[0];
            $("#add-profile-wizard .new-file-proview").val(fileSelected.name);
        }
    }

  DeviceService.prototype.removeProtocolField = function(deviceProtocolFieldKey) {
    delete deviceService.deviceProtocols[deviceProtocolFieldKey];
      if($("#device_wizard_model").hasClass("in")){
          $(".edgexfoundry-device-protocols-wizard input[name=\'" + deviceProtocolFieldKey+ "\']").parent(".protocol-field").remove();
      }else{
          $(".edgexfoundry-device-protocols input[name=\'" + deviceProtocolFieldKey+ "\']").parent(".protocol-field").remove();
      }

  };

  DeviceService.prototype.getProtocolFormValue = function() {
    var protocolFields = Object.entries(deviceService.deviceProtocols);
    var protocols = {};
      if($("#device_wizard_model").hasClass("in")){
          var protocolName =  $("#deviceProtocolNameSelectWizard").val().trim();
      }else{
          var protocolName =  $("#deviceProtocolNameSelect").val().trim();
      }
    protocols[protocolName] = {};
    for (var i = 0; i < protocolFields.length; i++) {
        if($("#device_wizard_model").hasClass("in")){
            var fieldKey =  $(".edgexfoundry-device-protocols-wizard input[name=\'" + protocolFields[i][0]+ "\']").val().trim();
            var fieldValue =  $(".edgexfoundry-device-protocols-wizard input[name=\'" + protocolFields[i][1]+ "\']").val().trim();
        }else{
            var fieldKey =  $(".edgexfoundry-device-protocols input[name=\'" + protocolFields[i][0]+ "\']").val().trim();
            var fieldValue =  $(".edgexfoundry-device-protocols input[name=\'" + protocolFields[i][1]+ "\']").val().trim();
        }
      if(fieldKey != ""){
          protocols[protocolName][fieldKey] = fieldValue;
      }
    }
    return protocols;
  };

    DeviceService.prototype.setProtocol = function (protocols) {
        var deviceProtocolName = Object.keys(protocols)[0];
        var protocolFields = Object.entries(protocols[deviceProtocolName]);
        if($("#device_wizard_model").hasClass("in")){
            $('#deviceProtocolNameSelectWizard').empty();
        }else{
            $('#deviceProtocolNameSelect').empty();
        }
        $.each(deviceService.deviceProtocolsPropertiesTemplate, function (k, v) {
            if($("#device_wizard_model").hasClass("in")){
                $('#deviceProtocolNameSelectWizard').append($('<option>', {
                    value: v['Protocol'],
                    text: v['Alias'],
                }));
                if (v['Protocol'] == deviceProtocolName) {
                    $('#deviceProtocolNameSelectWizard').val(deviceProtocolName);
                }
            }else{
                $('#deviceProtocolNameSelect').append($('<option>', {
                    value: v['Protocol'],
                    text: v['Alias'],
                }));
                if (v['Protocol'] == deviceProtocolName) {
                    $('#deviceProtocolNameSelect').val(deviceProtocolName);
                }
            }
        });
        deviceService.setProtocolSelectEvent();
        var protocolProperties = [];
        for (var i = 0; i < protocolFields.length; i++) {
            protocolProperties.push({
                'Key': protocolFields[i][0],
                'Value': protocolFields[i][1],
                'Hint': '',
            })
        }
        deviceService.fillProtocolFields(protocolProperties);
    };

  DeviceService.prototype.resetProtocol = function(){
    if (deviceService.deviceProtocols == null) {
      return;
    }
      if($("#device_wizard_model").hasClass("in")){
          $(".protocol-field-collection-wizard").empty();
      }else{
          $(".edgexfoundry-device-protocols .protocol-field-collection").empty();
      }
    deviceService.deviceProtocols = null;
  };

    DeviceService.prototype.addProtocol = function () {
        if($("#device_wizard_model").hasClass("in")){
            $('#deviceProtocolNameSelectWizard').empty();
            $.each(deviceService.deviceProtocolsPropertiesTemplate, function (k, v) {
                $('#deviceProtocolNameSelectWizard').append($('<option>', {
                    value: v['Protocol'],
                    text: v['Alias'],
                }));
            });
            deviceService.setProtocolSelectEvent();
            $('#deviceProtocolNameSelectWizard').change();
        }else{
            $('#deviceProtocolNameSelect').empty();
            $.each(deviceService.deviceProtocolsPropertiesTemplate, function (k, v) {
                $('#deviceProtocolNameSelect').append($('<option>', {
                    value: v['Protocol'],
                    text: v['Alias'],
                }));
            });
            deviceService.setProtocolSelectEvent();
            $('#deviceProtocolNameSelect').change();
        }

    };

    DeviceService.prototype.setProtocolSelectEvent = function () {
        if($("#device_wizard_model").hasClass("in")){
            $('#deviceProtocolNameSelectWizard').on('change', function () {
                var value = $(this).val();
                $.each(deviceService.deviceProtocolsPropertiesTemplate, function (i, v) {
                    if (v['Protocol'] == value) {
                        deviceService.fillProtocolFields(v['Properties']);
                        return false;
                    }
                });
            });
        }else{
            $('#deviceProtocolNameSelect').on('change', function () {
                var value = $(this).val();
                $.each(deviceService.deviceProtocolsPropertiesTemplate, function (i, v) {
                    if (v['Protocol'] == value) {
                        deviceService.fillProtocolFields(v['Properties']);
                        return false;
                    }
                });
            });
        }
    };

    DeviceService.prototype.fillProtocolFields = function (protocolProperties) {
        deviceService.resetProtocol();
        for (var i = 0; i < protocolProperties.length; i++) {
            deviceService.addProtocolField({
                'Key': protocolProperties[i]['Key'],
                'Value': protocolProperties[i]['Value'],
                'Hint': protocolProperties[i]['Hint'],
            });
        }
    };

    DeviceService.prototype.addProtocolField = function () {
        if (deviceService.deviceProtocols == null) {
            deviceService.deviceProtocols = {};
        }
        var fieldKeysArray = Object.keys(deviceService.deviceProtocols);
        var deviceProtocolFieldKey = "deviceProtocolFieldKey-" + fieldKeysArray.length;
        var deviceProtocolFieldValue = "deviceProtocolFieldValue-" + fieldKeysArray.length;
        var deviceProtocolFieldHint = "deviceProtocolFieldHint-" + fieldKeysArray.length;
        deviceService.deviceProtocols[deviceProtocolFieldKey] = deviceProtocolFieldValue;
        if (arguments.length > 0) {
            var field = '<div class="protocol-field" style="margin-bottom:2px;">';
            field += '<input type="text" class="form-control" style="width:35%;display:inline!important;" value="' + arguments[0]['Key'] + '" name="' + deviceProtocolFieldKey + '">&nbsp;:&nbsp;';
            field += '<input type="text" class="form-control" style="width:35%;display:inline!important;" value="' + arguments[0]['Value'] + '" name="' + deviceProtocolFieldValue + '">';
            field += '<label class="form-control" style="display:inline!important;border:none;" name="' + deviceProtocolFieldHint + '">' + arguments[0]['Hint'] + '</label>';
            field += '<div class="edgexIconBtn" onclick="orgEdgexFoundry.deviceService.removeProtocolField(\'' + deviceProtocolFieldKey + '\');">';
            field += '<i class="fa fa-minus-circle fa-lg" aria-hidden="true"></i>';
            field += '</div>';
            field += '</div>';
        } else {
            var field = '<div class="protocol-field" style="margin-bottom:2px;">';
            field += '<input type="text" class="form-control" style="width:35%;display:inline!important;" name="' + deviceProtocolFieldKey + '">&nbsp;:&nbsp;';
            field += '<input type="text" class="form-control" style="width:35%;display:inline!important;" name="' + deviceProtocolFieldValue + '">';
            field += '<label class="form-control" style="display:inline!important;border:none;" name="' + deviceProtocolFieldHint + '"></label>';
            field += '<div class="edgexIconBtn" onclick="orgEdgexFoundry.deviceService.removeProtocolField(\'' + deviceProtocolFieldKey + '\');">';
            field += '<i class="fa fa-minus-circle fa-lg" aria-hidden="true"></i>';
            field += '</div>';
            field += '</div>';
        }
        if($("#device_wizard_model").hasClass("in")){
            $(".protocol-field-collection-wizard").append(field);
        }else{
            $(".device-protocol .protocol-body .protocol-field-collection").append(field);
        }
    };

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
				deviceService.deviceServiceList = data;
				deviceService.renderDeviceService(data);
			},
			statusCode: {

			}
		});
	}

	DeviceService.prototype.renderDeviceService = function(deviceServices){
		$("#edgexfoundry-device-service-list table tbody").empty();
        deviceService.allDeviceServiceNameList = deviceServices.map(obj=>{return obj.name});
		$.each(deviceServices,function(i,v){
      var rowData = "<tr>";
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
			rowData += "<td>" +  (v.description?v.description:"") + "</td>";
      rowData += "<td>" +  (v.labels?v.labels.join(','):"") + "</td>";
			rowData += '<td class="device-service-addressable-search-icon"><input type="hidden" value=\''+JSON.stringify(v.addressable)+'\'>' + '<i class="fa fa-search-plus fa-lg"></i>' + '</td>';
      rowData += "<td>" +  v.operatingState + "</td>";
      rowData += "<td>" +  v.adminState + "</td>";
			rowData += '<td class="device-service-devices-included-icon"><input type="hidden" value=\''+v.name+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
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

		$(".device-service-devices-included-icon").on('click',function(){
			var serviceName = $(this).children('input[type="hidden"]').val();
      		deviceService.selectedDeviceServiceName = serviceName;
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

  DeviceService.prototype.refreshDevice = function(){
    deviceService.loadDevice(deviceService.selectedDeviceServiceName);
  }

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
		$('#deviceServiceNameSelect').empty();
		//deviceService select
		$.each(deviceService.allDeviceServiceNameList, function (i, item) {
			$('#deviceServiceNameSelect').append($('<option>', {
				value: item,
				text : item
			}));
			if(item == device.service.name){
            	$("#deviceServiceNameSelect").val(item);
			}
		});
		//deviceProfile select
		$('#deviceProfileNameSelect').empty();
		$.each(deviceService.allDeviceProfileNameList, function (i, item) {
			$('#deviceProfileNameSelect').append($('<option>', {
				value: item,
				text : item
			}));
			if(item == device.profile.name){
				$("#deviceProfileNameSelect").val(item);
			}
		});
		$(".edgexfoundry-device-form input[name='deviceID']").val(device.id);
		$(".edgexfoundry-device-form input[name='deviceName']").val(device.name);
		$(".edgexfoundry-device-form input[name='deviceDescription']").val(device.description);
		$(".edgexfoundry-device-form input[name='deviceLabels']").val(device.labels?device.labels.join(','):"");
		$(".edgexfoundry-device-form input[name='deviceAdminState']").val(device.adminState);
		$(".edgexfoundry-device-form input[name='deviceOperatingState']").val(device.operatingState);

		$("#edgexfoundry-device-list").hide();
		$("#edgexfoundry-device-main .edgexfoundry-device-update-or-add").show();
	};

	DeviceService.prototype.addDevice = function(){
		deviceService.resetProtocol();
		deviceService.addProtocol();
		$('#deviceServiceNameSelect').empty();
		$.each(deviceService.allDeviceServiceNameList, function (i, item) {
			$('#deviceServiceNameSelect').append($('<option>', {
				value: item,
				text : item
			}));
		});
		$('#deviceProfileNameSelect').empty();
		$.each(deviceService.allDeviceProfileNameList, function (i, item) {
			$('#deviceProfileNameSelect').append($('<option>', {
				value: item,
				text : item
			}));
		});
		$("#edgexfoundry-device-list").hide();
		$("#edgexfoundry-device-main .edgexfoundry-device-update-or-add").show();
		$(".edgexfoundry-device-update-or-add .update-device").hide();
		$(".edgexfoundry-device-update-or-add .add-device").show();
		$(".edgexfoundry-device-form")[0].reset();
	};

	DeviceService.prototype.cancelAddOrUpdateDevice = function(){
		$("#edgexfoundry-device-list").show();
		$("#edgexfoundry-device-main .edgexfoundry-device-update-or-add").hide();
	};

	DeviceService.prototype.uploadDevice = function(type){
		var method;
		if(type=="new"){
			method = "POST"
		}else{
			method = "PUT"
		}
		//debugger
		var device = {
			service: {
				name: $("#deviceServiceNameSelect").val(),
			},
			id: $(".edgexfoundry-device-form input[name='deviceID']").val(),
			name: $(".edgexfoundry-device-form input[name='deviceName']").val().trim(),
			description: $(".edgexfoundry-device-form input[name='deviceDescription']").val(),
			labels: $(".edgexfoundry-device-form input[name='deviceLabels']").val().split(','),
			adminState: $(".edgexfoundry-device-form select[name='deviceAdminState']").val(),
			operatingState: $(".edgexfoundry-device-form select[name='deviceOperatingState']").val(),
			profile: {
				name: $("#deviceProfileNameSelect").val(),
			}
		};

    device['protocols'] = deviceService.getProtocolFormValue();
    $.ajax({
      url: '/core-metadata/api/v1/device',
      type: method,
      data:JSON.stringify(device),
      success: function(){
          deviceService.cancelAddOrUpdateDevice();
          deviceService.refreshDevice();
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
              bootbox.alert({
                message: "remove device success !",
                className: 'red-green-buttons'
              });
              deviceService.loadDevice(device.service.name);
              $(".edgexfoundry-device-command").hide();
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
					if(v.put && v.put.parameterNames) {
						rowData	+= '&nbsp;<input type="radio" name="commandRadio_'+v.id+'" value="set"  style="width:20px;">&nbsp;set'
					}else{
            rowData	+= '<span style="visibility:hidden;">&nbsp;<input type="radio" name="commandRadio_'+v.id+'" value="set"  style="width:20px;">&nbsp;set</span>'
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
				deviceService.deviceProfileList = data;
				deviceService.renderDeviceProfile(data);
				$(".edgexfoundry-device-profile-main table tfoot").hide();
			},
			statusCode: {

			}
		});
	}

	DeviceService.prototype.renderDeviceProfile = function(deviceprofiles){
		$(".edgexfoundry-device-profile-main table tbody").empty();
        deviceService.allDeviceProfileNameList = deviceprofiles.map(obj=>{return obj.name});
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
        loadDeviceProfileForSelectWizard();
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

    DeviceService.prototype.uploadProfile = function () {
        $("#add-profile-panel").hide();
        var formData = new FormData($("#add-profile-panel form")[0]);
        var reqUrl = "/core-metadata/api/v1/deviceprofile/uploadfile?X-Session-Token=" + window.sessionStorage.getItem('X_Session_Token');
        $.ajax({
            url: reqUrl,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            complete: function (jqXHR, textStatus) {
                if (jqXHR.status == 200) {
                    bootbox.alert({
                        message: "Upload device profile success !",
                        className: 'red-green-buttons'
                    });
                    orgEdgexFoundry.deviceService.loadDeviceProfile();
                } else if (jqXHR.status == 409) {
                    bootbox.alert({
                        title: "Error",
                        message: "Duplicate profile name !",
                        className: 'red-green-buttons'
                    });
                } else {
                    bootbox.alert({
                        title: "Error",
                        message: "Upload failure !",
                        className: 'red-green-buttons'
                    });
                }
            }
        });
    };

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
