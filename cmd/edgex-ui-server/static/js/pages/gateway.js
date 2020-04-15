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

$(document).ready(function () {
    gatewayManagementModule.loadGatewayList();
});

var gatewayManagementModule = {
    selectedRow: null,
    gatewayDataCache: [],
    heartBeat: function () {
        if (!gatewayManagementModule.gatewayDataCache) {
            return
        }
        $.each(gatewayManagementModule.gatewayDataCache, function (i, g) {
            $.ajax({
                url: '/api/v1/gateway/heartbeat/' + g.id,
                type: 'GET',
                success: function (r) {
                    var target = $("#gateway_list > table").find("#" + g.id);
                    target.empty();
                    if (r == "0") {
                        target.append('<div class="edgexIconBtn"><i class="fa fa-times fa-lg" aria-hidden="true" style="color:red;"></i></div>');
                    } else {
                        target.append('<div class="edgexIconBtn"><i class="fa fa-check fa-lg" aria-hidden="true"></i></div>');
                    }

                },
                error: function () {
                    var target = $("#gateway_list > table").find("#" + g.id);
                    target.empty();
                    target.append('<div class="edgexIconBtn"><i class="fa fa-times fa-lg" aria-hidden="true" style="color:red;"></i></div>');
                }
            });
        });

    },
    loadGatewayList: function () {
        $.ajax({
            url: '/api/v1/gateway',
            type: 'GET',
            success: function (data) {
                gatewayManagementModule.gatewayDataCache = data;
                gatewayManagementModule.renderGatewayList(data);
                gatewayManagementModule.heartBeat();
            },
            error: function () {
            }
        });
    },
    renderGatewayList: function (data) {
        $("#gateway_list > table > tbody").empty();
        if (data && data.length != 0) {
            $("#gateway_list > table > tfoot").hide();
        }
        var eachCount = 0;
        $.each(data, function (index, element) {
            eachCount++;
            var rowData = '<tr>';
            if (window.sessionStorage.getItem('selectedGateway')) {
                var selectedGateway = JSON.parse(window.sessionStorage.getItem('selectedGateway'));
                if (selectedGateway.id == element.id) {
                    rowData += '<td><input type="radio" name="gatewayRadio" checked value="' + element.id + '"></td>';
                    gatewayManagementModule.selectedRow = element;
                } else {
                    rowData += '<td><input type="radio" name="gatewayRadio" value="' + element.id + '"></td>';
                }
            } else {
                rowData += '<td><input type="radio" name="gatewayRadio" value="' + element.id + '"></td>';
            }
            rowData += '<td>' + (index + 1) + '</td>';
            rowData += '<td>' + element.id + '</td>';
            rowData += '<td>' + element.name + '</td>';
            if (element.health) {
                rowData += '<td id="' + element.id + '"><div class="edgexIconBtn"><i class="fa fa-check fa-lg" aria-hidden="true"></i></div></td>';
            } else {
                rowData += '<td id="' + element.id + '"><div class="edgexIconBtn"><i class="fa fa-times fa-lg" aria-hidden="true" style="color:red;"></i></div></td>';
            }

            rowData += '<td>' + element.description + '</td>';
            rowData += '<td>' + element.address + '</td>';
            rowData += '<td>' + dateToString(element.created) + '</td>';
            rowData += "</tr>";
            $("#gateway_list > table > tbody").append(rowData);

            if (eachCount >= data.length) {
                gatewayManagementModule.addRowOnClicked();
            }
        });
    },
    resetGatewayConfigForm() {
        $("#add_new_gateway input[id ='name']").val("");
        $("#add_new_gateway input[id ='description']").val("");
        $("#add_new_gateway input[id ='address']").val("");
    },
    addRowOnClicked() {
        $('#gateway_list').off('click', 'tbody tr');
        $('#gateway_list').on('click', 'tbody tr', function (event) {
            var selectedRow = this;
            var selectedRadio = $(selectedRow).find("input:radio")[0];
            $(selectedRadio).prop('checked', true);
            var selectedGatewayID = $(selectedRadio).val();
            $.each(gatewayManagementModule.gatewayDataCache, function (index, ele) {
                if (ele.id == selectedGatewayID) {
                    gatewayManagementModule.selectedRow = Object.assign({}, ele);
                    window.sessionStorage.setItem('selectedGateway', JSON.stringify(Object.assign({}, gatewayManagementModule.selectedRow)));
                    var param = { "hostIP": gatewayManagementModule.selectedRow.address };
                    $.ajax({
                        url: '/api/v1/gateway/proxy',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(param),
                        success: function (data) {
                            //alert("Already change gateway to " + gatewayManagementModule.selectedRow.name);
                        }
                    });
                }
            });
        });
        //Auto click radio checked row
        $('#gateway_list').find("tbody tr").each(function (rowIndex, r) {
            var checkedValue = $(r).find("input[name='gatewayRadio']").prop('checked');
            if (checkedValue) {
                $(r).click();
            }
        });
    }
};

var gatewayManagementModuleBtnGroup = {
    add: function () {
        $("#gateway_content_main").hide();
        $("#add_new_gateway").show("fast");
    },
    deleteOne: function () {
        if (gatewayManagementModule.selectedRow) {
            var deletedGatewayId = gatewayManagementModule.selectedRow['id'];
            if (deletedGatewayId) {
                $.ajax({
                    url: '/api/v1/gateway/' + deletedGatewayId + '',
                    type: 'DELETE',
                    success: function () {
                        gatewayManagementModule.selectedRow = null;
                        window.sessionStorage.removeItem('selectedGateway');
                        gatewayManagementModule.loadGatewayList();
                    }
                });
            }
        }
    },
    refresh: function () {
        gatewayManagementModule.loadGatewayList();
    },
    addNewGateway: function () {
        var gateway_new = {};
        gateway_new["name"] = $("#name").val();
        gateway_new["description"] = $("#description").val();
        gateway_new["address"] = $("#address").val().replace(/\s/g, "");

        $.ajax({
            url: '/api/v1/gateway',
            type: 'POST',
            data: JSON.stringify(gateway_new),
            contentType: 'application/json',
            complete: function (jqXHR, textStatus) {
                if (jqXHR.status == 200) {
                    gateway_new['id'] = jqXHR.responseText;
                    window.sessionStorage.setItem('selectedGateway', JSON.stringify(Object.assign({}, gateway_new)));
                    gatewayManagementModuleBtnGroup.back();
                } else {
                    bootbox.alert({
                        title: "Error",
                        message: jqXHR.responseText,
                        className: 'red-green-buttons'
                    });
                }
            },
        });
    },
    back: function () {
        $("#add_new_gateway").hide("fast");
        $("#gateway_content_main").show();
        gatewayManagementModule.resetGatewayConfigForm();
        gatewayManagementModule.loadGatewayList();
    }
};