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
	gatewayManagementModule.loadGatewayList();
});

var gatewayManagementModule = {
	selectedRow:null,
	gatewayDataCache:[],
	loadGatewayList:function(){
//		gatewayManagementModule.renderGatewayList(gatewayListDataTest);
//		gatewayManagementModule.gatewayDataCache = gatewayListDataTest;
//		gatewayManagementModule.selectedRow = Object.assign({},gatewayListDataTest[0]);
		$.ajax({
			url: '/api/v1/gateway',
			type: 'GET',
			success: function(data){
				debugger
				gatewayManagementModule.gatewayDataCache = data;
				$("#gateway_list > table > tbody").empty();
				gatewayManagementModule.renderGatewayList(data);
				if(window.sessionStorage.getItem('selectedGateway') != null ){
					var selectedGateway = JSON.parse(window.sessionStorage.getItem('selectedGateway'));
					gatewayManagementModule.selectedRow = selectedGateway;
					var inputs = $("#gateway_list > table > tbody").find("input:radio");
					$.each(inputs,function(index,ele){
						if($(ele).prop('value') == selectedGateway.id ){
							$(ele).prop('checked',true);
						}
					});
				}

				if(data.length != 0){
					$("#gateway_list > table > tfoot").hide();
				}

			},
			error: function(){
			}
		});
	},
	renderGatewayList:function(data){
		$.each(data,function(index,element){
			var rowData = '<tr>';
			rowData += '<td><input type="radio" name="gatewayRadio" value="'+element.id+'"></td>';
			rowData += '<td>' + (index + 1) +'</td>';
			rowData += '<td>' + element.id + '</td>';
			rowData += '<td>' + element.name + '</td>';
			rowData += '<td>' + element.description + '</td>';
			rowData += '<td>' + element.address + '</td>';
			rowData += '<td>' + dateToString(element.created) + '</td>';
			rowData += "</tr>";
			$("#gateway_list > table > tbody").append(rowData);
		});
		$("#gateway_list > table input:radio").on('click',function(){
			var currentRowID =  $(this).val();
			$.each(gatewayManagementModule.gatewayDataCache,function(index,ele){
				if(ele.id == currentRowID){
					gatewayManagementModule.selectedRow = Object.assign({},ele);
					window.sessionStorage.setItem('selectedGateway',JSON.stringify(Object.assign({},gatewayManagementModule.selectedRow)));
				}
			});
			var param = {"hostIP":gatewayManagementModule.selectedRow.address};
			$.ajax({
				url: '/api/v1/gateway/proxy',
				type: 'POST',
				contentType:'application/json',
				data:JSON.stringify(param),
				success:function(data){
					//alert("Already change gateway to " + gatewayManagementModule.selectedRow.name);
				}
			});
		});
	}
}

var gatewayManagementModuleBtnGroup = {
	add:function(){
		$("#gateway_content_main").hide();
		$("#add_new_gateway").show("fast");
	},
	deleteOne:function(){
		var ro = gatewayManagementModule.selectedRow;
		$.ajax({
			url:'/api/v1/gateway/' + gatewayManagementModule.selectedRow['id'] + '',
			type:'DELETE',
			success:function(){
				gatewayManagementModule.selectedRow = null;
				window.sessionStorage.removeItem('selectedGateway');
				gatewayManagementModule.loadGatewayList();
			}
		});
	},
	refresh:function(){
		gatewayManagementModule.loadGatewayList();
	},
	addNewGateway: function(){
		var gateway_new = {}
		gateway_new["name"] = $("#name").val();
		gateway_new["description"] = $("#description").val();
		gateway_new["address"] = $("#address").val();

		$.ajax({
			url:'/api/v1/gateway',
			type:'POST',
			data:JSON.stringify(gateway_new),
			contentType:'application/json',
			success:function(){
				gatewayManagementModuleBtnGroup.back();
			}
		});
	},
	back:function(){
		$("#add_new_gateway").hide("fast");
		$("#gateway_content_main").show();
		gatewayManagementModule.loadGatewayList();
	}
}


var gatewayListDataTest = [
	{
		'id':'1234567890',
		'name':'test-gateway-01',
		'description':'this just test-01',
		'address':'10.112.122.222',
		'created':1513156359765
	},{
		'id':'0987654321',
		'name':'test-gateway-02',
		'description':'this just test-02',
		'address':'10.211.55.9',
		'created':1513156359765
	}
]
