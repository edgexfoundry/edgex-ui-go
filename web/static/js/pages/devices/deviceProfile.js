/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 * @version: 0.1.0
 ******************************************************************************/
$(document).ready(function() {
//	$('[data-toggle="tooltip"]').tooltip()
//	$('[data-toggle="popover"]').popover({delay:{"show": 800}});
	deviceProfileModule.loadProfileList();
});

var deviceProfileModule = {
	selectedRow : [],
	profileDataCache : [],
	onSelectFileCompleted : function() {
		var uploadInput = $("#add_profile_upload")
		if (uploadInput[0].value) {
			$("#add_profile_dialog button[name='upload']").prop("disabled",
					false);
			var fileSelected = uploadInput[0].files[0];
			$("#add_profile_dialog div.file_proview").append(fileSelected.name);
		}
	},
	loadProfileList : function() {
		$.ajax({
			url : '/core-metadata/api/v1/deviceprofile',
			type : 'GET',
			success : function(data) {
				$("#device_profile_list > table > tbody").empty();
				deviceProfileModule.renderDeviceProfileList(data);
				$("#device_profile_list > table > tfoot").hide();
				deviceProfileModule.profileDataCache = data;
			},
			error : function() {
				// alert("error.")
			}
		});
	},
	renderDeviceProfileList : function(data) {
		$.each(data, function(index, element) {
			var rowData = '<tr>';
			rowData += '<td><input type="checkbox" name="profileCheck" value="'
					+ element.id + '"></td>';
			rowData += '<td>' + (index + 1) + '</td>';
			rowData += '<td>' + element.id.substr(0, 8) + '</td>';
			rowData += '<td>' + element.name + '</td>';
			rowData += '<td>' + element.labels[0] + '</td>';
			rowData += '<td>' + element.description + '</td>';
			// rowData += '<td>VMware</td>';
			rowData += '<td>' + element.manufacturer + '</td>';
			rowData += '<td>' + dateToString(element.created) + '</td>';
			rowData += '<td>' + dateToString(element.modified) + '</td>';
			rowData += "</tr>";
			$("#device_profile_list > table > tbody").append(rowData);
		});
		$("#device_profile_list > table input:checkbox").on(
				'change',
				function() {
					if (this.checked) {
						deviceProfileModule.selectedRow.push(this.value);
					} else {
						deviceProfileModule.selectedRow.splice(
								deviceProfileModule.selectedRow
										.indexOf(this.value), 1);
					}
				});
	}
}

var deviceProfileModuleBtnGroup = {
	add : function() {
		$("#device_profile_shelter").show('fast');
		$('#add_profile_dialog .file_proview').empty();
		$('#add_profile_dialog').show('fast');
	},
	deleteProfile : function(confirm) {
		var del_item = deviceProfileModule.selectedRow.length;
		if (del_item == 0) {
			$('[data-toggle="popover"]').popover('show');
			return false;
		}
		$('#deleteConfirmDialog').modal('show');
		if(confirm){
			$('[data-toggle="popover"]').popover('hide');
			$('#deleteConfirmDialog').modal('hide');
			$.each(deviceProfileModule.selectedRow, function(index, ele) {
				$.ajax({
					url : '/core-metadata/api/v1/deviceprofile/id/' + ele + '',
					type : 'DELETE',
					success : function() {
						if (index == deviceProfileModule.selectedRow.length - 1) {
							deviceProfileModule.selectedRow = [];
							deviceProfileModule.loadProfileList();
						}
					},
					error : function() {

					}
				});
			});
		}
	},
	refresh : function() {
		deviceProfileModule.loadProfileList();
	},
	cancel : function() {
		$("#device_profile_shelter").hide('fast');
		$('#add_profile_dialog').hide('fast');
	},
	uploadProfile : function() {
		var form = $("#add_profile_dialog form")[0];
		form.action = "/core-metadata/api/v1/deviceprofile/uploadfile?X-Session-Token=" + window.sessionStorage.getItem('X_Session_Token');
		form.method = "POST"
		form.enctype="multipart/form-data"
		form.submit();
		var iframe = $("#add_profile_dialog iframe")[0];
		iframe.onload = function(event) {
			var doc = iframe.contentDocument;
			var response = $(doc).find('body').html();
			var result = response.match("code");
			if (result != null || $(doc).find('body').find("h1").length != 0) {
				alert("upload faild");
			} else {
				// alert("upload sucess");
				form.reset();
				$("#add_profile_dialog button[name='upload']").prop("disabled",
						true);
				deviceProfileModule.loadProfileList();
				$("#device_profile_shelter").hide('fast');
				$('#add_profile_dialog').hide('fast');
			}
		}
	},
	downloadProfileTemplate : function() {
		window.location.href="/api/v1/profile/download?X-Session-Token=" + window.sessionStorage.getItem('X_Session_Token');
	}
}
