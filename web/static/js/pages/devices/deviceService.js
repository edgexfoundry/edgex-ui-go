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
	deviceServiceModule.loadDeviceServiceList();
	deviceServiceModule.loadDeviceProfile();
	
	//global listener for hiding jsonShow section.
	document.addEventListener('click',function(event){
		//$("#device_service_json_format").animate({"right": '-400px'}, "fast");
		$("#device_service_json_format").hide('fast');
	});
	document.getElementById("device_service_json_format").addEventListener('click',function(event){
		event.stopPropagation();
	});
	
	//Hand icon circular movement animate
	var shakee = function(){
		$("#device_service_list  i").animate({"right":"0"},function(){
			$("#device_service_list  i").animate({"right":"10px"},shakee());
		});
	}
	shakee();
});

var deviceServiceModule = {
		deviceServiceListCache:{},
		selectedRow:null,
		loadDeviceServiceList:function (){
			$.ajax({
				type: 'GET',
				url: '/core-metadata/api/v1/deviceservice',
				success: function(data){
					if(data){
						deviceServiceModule.deviceServiceListCache = data;
						$("#device_service_list > table > tbody").empty();
						deviceServiceModule.renderDeviceService(data);
						$("#device_service_list tfoot").hide();
						deviceServiceModule.selectedRow = Object.assign({},data[0]);
						var inputs = $("#device_service_list table ").find("input:radio");
						$.each(inputs,function(index,ele){
							if($(ele).val() == deviceServiceModule.selectedRow.id){
								$(ele).prop('checked',true);
							}
						});
					}
				},
				error: function(){
					deviceServiceModule.renderDeviceService(testData);
				}
			});
		},
		renderDeviceService:function (data){
			$.each(data,function(index,element){
				var rowData = "<tr>";
				rowData += '<td><input type="radio" name="blankRadio" value="'+element.id+'"></td>';
				rowData += "<td>" + (index + 1) +"</td>";
				rowData += "<td>" +  element.id.substr(0,8) + "</td>";
				rowData += "<td>" +  element.name + "</td>";
				if(element.labels.length == 0){
					rowData += "<td>No Labels</td>";
				}else{
					rowData += "<td>" +  element.labels[0] + "</td>";
				}
				
				if (element.operatingState == "enabled") {
					rowData += "<td><i style='color:green;' class='fa fa-circle' aria-hidden='true'></i></td>";
				} else {
					rowData += "<td><i style='color:red;' class='fa fa-circle' aria-hidden='true'></i></td>";
				}
				
				if (element.adminState == "unlocked") {
					rowData += "<td><i class='fa fa-unlock fa-lg' aria-hidden='true'></i></td>";
				} else {
					rowData += "<td><i class='fa fa-lock fa-lg' aria-hidden='true'></i></td>";
				}
				rowData += "</tr>";
				$("#device_service_list > table > tbody").append(rowData);
			});
			$("#device_service_list input:radio").on('click',function(){
				deviceServiceModule.onSelectedRow($(this).val());
			});
		},
		loadDeviceProfile:function (){
			$.ajax({
				type: 'GET',
				url: '/core-metadata/api/v1/deviceprofile',
				success: function(data){
					if(data){
						$("#add_device_content div.related_profile select").empty();
						$.each(data,function(index,element){
							var selectList = '<option value="'+element.name+'">' + element.name + '</option>';
							$("#add_device_content div.related_profile select").append(selectList);
						});
					}
				},
				error: function(){
					
				}
			});
		},
		onSelectedRow:function(value) {
			$.each(deviceServiceModule.deviceServiceListCache,function(i,ele){
				if(ele.id == value){
					deviceServiceModule.selectedRow = ele;
					return false;
				}
			});
		}
}

var deviceServiceBtnGroup = {
		onSelectedFileCompleted:function(){
			var uploadinput = $("#add_device_content div.related_profile form input");
			
			if(uploadinput[0].value){
				$("#add_device_content div.related_profile table:first button").prop("disabled",false);
				$("#file_preview").text(uploadinput[0].files[0].name);
			}
		},
		uploadProfile:function(){
			$(".center div.device_server_shelter").show();
			
			var uploadform = $("#add_device_content div.related_profile form");
			uploadform.submit();
			var iframe = $("#add_device_content div.related_profile table iframe")[0];
			iframe.onload = function(event){
				var iframe_document = iframe.contentDocument;
				var response =  $(iframe_document).find('body').html();
				var result = response.match("code");
				if(result != null || $(iframe_document).find('body').find("h1").length != 0){
					alert("upload faild");
					$(".center div.device_server_shelter").hide();
				} else {
					//alert("upload sucess");
					window.setTimeout(function(){$(".center div.device_server_shelter").hide();},1000);
					uploadform[0].reset();
					$("#add_device_content div.related_profile table:first button").prop("disabled",true);
					deviceServiceModule.loadDeviceProfile();
					$(iframe_document).find('body').empty();
					$("#file_preview").empty();
				}
			}
			
		},
		back:function(){
			$("#device_service_list").show();
			$("#add_device_content").hide();
		},
		submit:function(){
			$("div.device_server_shelter").show();
			var deviceServiceName = $("div.related_service input[name='device_service_name']").val();
			var deviceProfileName = $("div.related_profile select[name='device_profile_name']").val();
			var addressableName = $("div.new_device_addressable input[name='name']").val();
			var newDevice = {}
			newDevice['name'] = $("div.new_device_msg input[name='device_name']").val();
			newDevice['description'] = $("div.new_device_msg input[name='device_desc']").val();
			newDevice['adminState'] = $("div.new_device_msg select[name='device_adminState']").val();
			newDevice['operatingState'] = $("div.new_device_msg select[name='device_operatingState']").val();
			newDevice['addressable'] = {"name":addressableName}
			newDevice['labels'] = [];
			newDevice['service'] = {"name":deviceServiceName}
			newDevice['profile'] = {"name":deviceProfileName}		
			var addressableFormArray = $("div.new_device_addressable form").serializeArray();
			var addressableFormJsonData = {};
			
			$.each(addressableFormArray,function(i,e){
				if(e.value){
					addressableFormJsonData[e.name] = e.value;
				}
			});
			//add a new address for new device or sensor
			$.ajax({
				url:"/core-metadata/api/v1/addressable",
				type:"POST",
				data:JSON.stringify(addressableFormJsonData),
				contentType:"application/json;charset=utf-8",
				success:function(){
					$.ajax({
						url:'/core-metadata/api/v1/device',
						type:'POST',
						contentType:'application/json',
						data:JSON.stringify(newDevice),
						success:function(){
							$("div.device_server_shelter").hide();
							alert("success !");
						},
						error:function(data){
							//delete the previous uploaded associated profile
							$.ajax({
								url:"/core-metadata/api/v1/addressable/name/"+addressableName+"",
								type:"DELETE",
								success:function(){
									console.log(data.responseText)
									$("div.device_server_shelter").hide();
									alert(" failed !");
								}
							});
						}
					});
				},
				error:function(data){
					console.log(data.responseText)
					$("div.device_server_shelter").hide();
					alert("upload addressable failed !");
				}
			});
		},
		addNewDevice:function(){
			//$("#add_device_content").show();
			if(!deviceServiceModule.selectedRow){
				$("#device_service_btn div.alert-warning").fadeIn();
				$("#device_service_btn div.alert-warning").fadeOut(2000);
				return;
			}
			$("#add_device_content div.related_service input").val(deviceServiceModule.selectedRow.name);
			$("#device_service_list").hide();
			$("#add_device_content").show();
		},
		refresh:function(){
			deviceServiceModule.loadDeviceServiceList();
		},
		showJsonFormatter:function(event){
			event.stopPropagation();
			if(!deviceServiceModule.selectedRow){
				return;
			}
			$("#device_service_json_format").empty();
			$("#device_service_json_format").append("<pre>" + JSON.stringify(deviceServiceModule.selectedRow,null,3) + "</pre>");
			$("#device_service_json_format").toggle('fast');
			//$("#device_service_json_format").animate({"right": '0'}, "fast");
		}
}


var testData = [
    {
        "id": "5a3b3035e4b0c3935374319d",
        "created": 1513828405903,
        "modified": 1513828405903,
        "origin": 1513828463478,
        "description": null,
        "name": "10.112.122.80-test",
        "lastConnected": 0,
        "lastReported": 0,
        "operatingState": "enabled",
        "labels": [
            "MQTT"
        ],
        "addressable": {
            "id": "5a3b3035e4b0c3935374319c",
            "created": 1513828405819,
            "modified": 1513828405819,
            "origin": 1513828462837,
            "name": "10.112.122.80",
            "method": "POST",
            "protocol": "HTTP",
            "address": "10.112.122.80",
            "port": 49982,
            "path": "/api/v1/callback",
            "publisher": null,
            "user": null,
            "password": null,
            "topic": null,
            "url": "HTTP://10.112.122.80:49982/api/v1/callback",
            "baseURL": "HTTP://10.112.122.80:49982"
        },
        "adminState": "unlocked"
    },
    {
        "id": "5a30ef08e4b0c39353743196",
        "created": 1513156360916,
        "modified": 1513156360916,
        "origin": 1513156360312,
        "description": null,
        "name": "edgex-support-scheduler",
        "lastConnected": 0,
        "lastReported": 0,
        "operatingState": "enabled",
        "labels": [],
        "addressable": {
            "id": "5a30ef07e4b0c39353743195",
            "created": 1513156359765,
            "modified": 1513156359765,
            "origin": 1513156357106,
            "name": "edgex-support-scheduler",
            "method": "POST",
            "protocol": "HTTP",
            "address": "edgex-support-scheduler",
            "port": 48085,
            "path": "/v1/callbacks",
            "publisher": null,
            "user": null,
            "password": null,
            "topic": null,
            "url": "HTTP://edgex-support-scheduler:48085/v1/callbacks",
            "baseURL": "HTTP://edgex-support-scheduler:48085"
        },
        "adminState": "unlocked"
    }
]