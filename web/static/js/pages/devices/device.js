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
	deviceModule.loadDeviceData();
	deviceModule.loadServiceSelectData();
	deviceModule.loadProfileSelectData();

	//global listener for hiding jsonShow section.
	document.addEventListener('click',function(event){
		//$("#device_data_json_format").animate({"right": '-400px'}, "fast");
		$("#device_data_json_format").hide("fast");
	});
	document.getElementById("device_data_json_format").addEventListener('click',function(event){
		event.stopPropagation();
	});

	//Hand icon circular movement animate
	var shakee = function(){
		$("#device_basic_intro  i").animate({"right":"0"},function(){
			$("#device_basic_intro  i").animate({"right":"10px"},shakee());
		});
	}
	shakee();
});
var deviceModule = {
		deviceDataCache:[],
		selectedRow:null,
		loadDeviceData:function(){
			$.ajax({
				url:'/core-metadata/api/v1/device',
				type:'GET',
				success:function(data){
					if(data && data.length != 0){
						deviceModule.renderDeviceList(data);
					}
				},
				error:function(){

				}
			});
		},
		renderDeviceList:function(data){
			deviceModule.deviceDataCache = data;
			$("#device_list table tbody").empty();
			$.each(data,function(index,ele){
				var rowData = "<tr>";
				rowData += '<td><input type="radio" name="deviceRadio" value="'+ele.id+'"></td>';
				rowData += "<td>" + (index + 1) +"</td>";
				rowData += "<td>" +  ele.id.substr(0,8) + "</td>";
				rowData += "<td>" +  ele.name + "</td>";
				rowData += "<td>" +  ele.description + "</td>";
				rowData += "<td>" +  ele.labels[0] + "</td>";
//				rowData += "<td>" +  ele.addressable.address + "</td>";
				rowData += "<td>" +  ele.adminState + "</td>";
				rowData += "<td>" +  ele.operatingState + "</td>";
//				rowData += "<td>" +  ele.service.name + "</td>";
//				rowData += "<td>" +  ele.profile.name + "</td>";
				rowData += "<td>" +  dateToString(ele.created) + "</td>";
				//rowData += "<td>" +  dateToString(ele.modified) + "</td>";
				rowData += "</tr>";
				$("#device_list table tbody").append(rowData);
			});
			$("#device_list table tbody input:radio").on('click',function(){
				var checked = $(this).prop("checked");
				if(checked){
					var deviceId = $(this).val();
					$.each(deviceModule.deviceDataCache,function(index,ele){
						if(ele.id == deviceId){
							deviceModule.selectedRow = ele;
						}
					});
				}
			});
			$("#device_list table tfoot").hide();
		},
		loadServiceSelectData:function(){
			$.ajax({
				url:'/core-metadata/api/v1/deviceservice',
				type:'GET',
				success:function(data){
					$("#device_advanced_search select[name='device_service']").empty();
					var opt = '<option value="" selected>pleace select</option>';
					$("#device_advanced_search select[name='device_service']").append(opt);
					$.each(data,function(index,ele){
						var option = '<option value="' + ele.name + '">' + ele.name + '</option>';
						$("#device_advanced_search select[name='device_service']").append(option);
					});
					//bind onchange event.
					$("#device_advanced_search select[name='device_service']").on('change',function(){
						var v = $(this).val();
						if(v != '') {
							$.ajax({
								url:'/core-metadata/api/v1/device/servicename/' + v + '',
								type:'GET',
								success:function(data){
									deviceModule.renderDeviceList(data);
									if(data.length == 0){
										$("#device_list table tfoot").show()
									}
								}
							});
						}
					});
				}
			});
		},
		loadProfileSelectData:function(){
			$.ajax({
				url:'/core-metadata/api/v1/deviceprofile',
				type:'GET',
				success:function(data){
					$("#device_advanced_search select[name='device_profile']").empty();
					var opt = '<option selected value="">pleace select</option>';
					$("#device_advanced_search select[name='device_profile']").append(opt);
					$.each(data,function(index,ele){
						var option = '<option value="' + ele.name + '">' + ele.name + '</option>';
						$("#device_advanced_search select[name='device_profile']").append(option);
					});
					//bind onchange event.
					$("#device_advanced_search select[name='device_profile']").on('change',function(){
						var v = $(this).val();
						if(v != ''){
							$.ajax({
								url:'/core-metadata/api/v1/device/profilename/' + v + '',
								type:'GET',
								success:function(data){
									deviceModule.renderDeviceList(data);
									if(data.length == 0){
										$("#device_list table tfoot").show()
									}
								}
							});
						}
					});
				}
			});
		}
}

var deviceModuleBtnGroup = {
		back:function(){
			$("#device_detail").hide("fast");
			$("#device_main").show("fast");
		},
		deleteDevice:function(confirm){
			$('#deleteConfirmDialog').modal('show');
			if(confirm){
				$('#deleteConfirmDialog').modal('hide');

				$.ajax({
					url:'/core-metadata/api/v1/device/id/' + deviceModule.selectedRow.id + '',
					type:'DELETE',
					success:function(){
						deviceModule.loadDeviceData();
						$.ajax({
							url: '/core-metadata/api/v1/addressable/id/' + deviceModule.selectedRow.addressable.id + '',
							type: 'DELETE',
							error: function(err){
								alert("delete device address failed !")
							}
						});
					},
					error: function(err){
						alert(err)
					}
				});
			}
		},
		detail:function(){
			if(!deviceModule.selectedRow){
				alert("please select desired item.");
				return;
			}

			$("#device_detail div.panel-body div:first-child").empty();
			$("#device_detail div.panel-body div:first-child").append('<pre style="height:200px;overflow:auto;">' + JSON.stringify(deviceModule.selectedRow,null,4) + '</pre>')
			$("#device_detail #command_list table tbody").empty();
			$("#device_detail input[name='id']").val(deviceModule.selectedRow.id);
			$("#device_detail input[name='name']").val(deviceModule.selectedRow.name);
			$("#device_detail input[name='description']").val(deviceModule.selectedRow.description);
			$("#device_detail input[name='address']").val(deviceModule.selectedRow.addressable.address);
			$("#device_detail input[name='profile_name']").val(deviceModule.selectedRow.profile.name);
			$("#device_detail input[name='service_name']").val(deviceModule.selectedRow.service.name);

			$.ajax({
				url:'/core-command/api/v1/device/'+deviceModule.selectedRow.id+'',
				type:'GET',
				success:function(data){
					var commands = data.commands;
					$.each(commands,function(index,ele){
						var rowData = '<tr>';
						rowData += '<td>' + ele.name + '</td>';
						rowData += '<td>' + '<input type="radio"  name="commandRadio_'+ele.id+'" checked value="get" style="width:20px;">&nbsp;get'
										+ '&nbsp;<input type="radio" name="commandRadio_'+ele.id+'" value="set"  style="width:20px;">&nbsp;set'
										+ '</td>';
						rowData += '<td>' + '<input type="text" class="form-control" name="reading_value'+ele.id+'" disabled style="width:200px;display:inline;">' + '</td>'
						rowData += '<td>';
						if(ele.put != null) {
							$.each(ele.put.parameterNames,function(i,p){
								rowData += p + '&nbsp;<input type="text" class="form-control" name="' + p + ele.id + '" style="width:100px;display:inline;">&nbsp;'
							});
						}
						rowData += '</td>';
						rowData += '<td>'
							+ '<button id=\''+ele.id+'\' type=\'button\' class=\'btn btn-success\'  onclick=\'deviceModuleBtnGroup.sendCommand('+JSON.stringify(ele)+')\'>send</button>'
							+ '</td>';
						rowData += '</tr>';
						$("#device_detail #command_list table tbody").append(rowData);
					});
					$("#device_main").hide("fast");
					$("#device_detail").show("fast");
				}
			});
		},
		showJsonFormatter:function(event){
			event.stopPropagation();
			$("#device_data_json_format").empty();
			//$("#device_data_json_format").animate({"right": '0'}, "fast");
			$("#device_data_json_format").append('<pre>' + JSON.stringify(deviceModule.selectedRow,null,3) + '</pre>');
			$("#device_data_json_format").toggle("fast");
//			if($("#device_data_json_format").is(":hidden")){
//				$("#device_data_json_format").show();
//				$("#device_data_json_format").animate({"right": '0'}, "fast");
//			}else{
//				$("#device_data_json_format").animate({"right": '-400px'}, "fast");
//				$("#device_data_json_format").hide();
//			}

		},
		sendCommand: function(command){
			$('#'+command.id+'').prop('disabled',true);
			var method = $('#device_detail #command_list tbody input[name="commandRadio_'+command.id+'"]:radio:checked').val();
			if(method == 'set' && command.put != null) {
				var cmdUrl = command.put.url;
				cmdUrl = cmdUrl.replace(/(\w+):\/\/([^/:]+)(:\d*)?/,"/core-command");
				var paramBody={};
				$.each(command.put.parameterNames,function(i,param){
					//debugger
					var p = $('#device_detail #command_list table tbody input[name="' + param + command.id + '"]').val();
					paramBody[param] = p;
				});
				//console.log(JSON.stringify(paramBody))
				$.ajax({
					url:cmdUrl,
					type:'PUT',
					contentType:'application/json',
					data:JSON.stringify(paramBody),
					success:function(data){
						$('#device_detail #command_list tbody input[name="reading_value'+command.id+'"]').val("success");
						$('#'+command.id+'').prop('disabled',false);
					},
					error:function(){
						$('#device_detail #command_list tbody input[name="reading_value'+command.id+'"]').val("failed");
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
						$('#device_detail #command_list tbody input[name="reading_value'+command.id+'"]').val(JSON.stringify(data));
						$('#'+command.id+'').prop('disabled',false);
					},
					error:function(){
						$('#device_detail #command_list tbody input[name="reading_value'+command.id+'"]').val("failed");
						$('#'+command.id+'').prop('disabled',false);
					}
				});
			}
		},
}
