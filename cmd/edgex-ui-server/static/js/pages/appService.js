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
    orgEdgexFoundry.appService.initServices();
    orgEdgexFoundry.appService.initPipeline();
    orgEdgexFoundry.appService.dragDlg();
    orgEdgexFoundry.appService.loadAllDeviceAndValueDescriptor();
});

orgEdgexFoundry.appService = (function () {
    "use strict";
    function AppService() {
        this.PipelineFunctionList = null;
        this.deployData = null;
        this.devicesCache = null;
        this.valueDescriptorsCache = [];
        this.servicekey = null;
        this.appServices = null;
    }
    AppService.prototype = {
        constructor:AppService,
        loadAllDeviceAndValueDescriptor:null,
        dragDlg:null,
        downloadProfile:null,
        deployToConsul:null,
        initServices:null,
        initPipeline:null,
        clickParamButton:null,
        saveParams:null,
        changeServiceSelect:null
    };

    var appService = new AppService();

    AppService.prototype.clickParamButton = function (e) {
        $("#appservice_paramsBox").empty();
        var type = e.id.split("_")[1];
        var functionName = e.id.split("_")[2];
        var params;
        var filterFunction = eval(appService.PipelineFunctionList[type]).filter(function (e) { return e.Name == functionName; });
        params = filterFunction[0].Parameters;
        if(params != null){
            if(functionName == "MQTTSend"){
                var addressable = filterFunction[0].Addressable;
                $.each(addressable, function (index,val) {
                    var addressVal = '';
                    if(!$.isEmptyObject(appService.deployData.Writable.Pipeline.Functions[functionName].Addressable)){
                        addressVal = appService.deployData.Writable.Pipeline.Functions[functionName].Addressable[val.Name];
                    }
                    if(val.Name == "Protocol"){
                        $("#appservice_paramsBox").append("<div class='form-group'>\n" +
                            "<label for='"+type+"_"+functionName+"_"+val.Name+"'>"+val.Name+"</label>\n" +
                            "<select id='"+type+"_"+functionName+"_"+val.Name+"' name='input_"+val.Name+"' class='form-control params'>\n" +
                            "<option value='tcp'>tcp</option>\n" +
                            "<option value='http'>http</option>\n" +
                            "<option value='zmq'>zmq</option>\n" +
                            "<option value='mac'>mac</option>\n" +
                            "<option value='other'>other</option>\n" +
                            "</select>"+
                            "</div>");
                    }else{
                        $("#appservice_paramsBox").append("<div class='form-group'>\n" +
                            "<label for='"+type+"_"+functionName+"_"+val.Name+"'>"+val.Name+"</label>\n" +
                            "<input type='text' name='input_"+val.Name+"' class='form-control params' id='"+type+"_"+functionName+"_"+val.Name+"' placeholder='"+val.Hint+"'>\n" +
                            "</div>");
                    }
                    if(addressVal != null && addressVal != ''){
                        $("#"+type+"_"+functionName+"_"+val.Name).val(addressVal);
                    }
                });
            }
            $.each(params, function (index,val) {
                var inputVal = '';
                if(!$.isEmptyObject(appService.deployData.Writable.Pipeline.Functions[functionName].Parameters)){
                    inputVal = appService.deployData.Writable.Pipeline.Functions[functionName].Parameters[val.Name];
                }
                if(val.Name == "DeviceNames"){
                    var deviceNameStr = "<div class=\"form-group\">\n" +
                        "<label for='"+type+"_"+functionName+"_"+val.Name+"'>"+val.Name+"</label>\n" +
                        "<select title='All devices' id='"+type+"_"+functionName+"_"+val.Name+"' name='input_"+val.Name+"' class='selectpicker params show-tick form-control' multiple data-live-search='false'>";
                    $.each(appService.devicesCache,function (index,val) {
                        deviceNameStr += "<option value="+val.name+">"+val.name+"</option>\n";
                    });
                    deviceNameStr += "</select></div>";
                    $("#appservice_paramsBox").append(deviceNameStr);
                }else if(val.Name == "ValueDescriptors"){
                    var valueDescriptorNameStr = "<div class='form-group'>\n" +
                        "<label for='"+type+"_"+functionName+"_"+val.Name+"'>"+val.Name+"</label>\n" +
                        "<select title='All Value Descriptors' id='"+type+"_"+functionName+"_"+val.Name+"' name='input_"+val.Name+"' class='selectpicker params show-tick form-control' multiple data-live-search='false'>";
                    $.each(appService.valueDescriptorsCache,function (index,val) {
                        valueDescriptorNameStr += "<option value="+val.split("------")[1]+">"+val+"</option>\n";
                    });
                    valueDescriptorNameStr += "</select></div>";
                    $("#appservice_paramsBox").append(valueDescriptorNameStr);
                }else if(val.Name == "persistOnError" || val.Name == "autoreconnect" || val.Name == "retain"){
                    $("#appservice_paramsBox").append("<div class='form-group'>\n" +
                        "<label for='"+type+"_"+functionName+"_"+val.Name+"'>"+val.Name+"</label>\n" +
                        "<select id='"+type+"_"+functionName+"_"+val.Name+"' name='input_"+val.Name+"' class='form-control params'>\n" +
                        "<option value=false>false</option>\n" +
                        "<option value=true>true</option>\n" +
                        "</select>"+
                        "</div>");
                }else{
                    $("#appservice_paramsBox").append("<div class='form-group'>\n" +
                        "<label for=\""+type+"_"+functionName+"_"+val.Name+"\">"+val.Name+"</label>\n" +
                        "<input type='text' name='input_"+val.Name+"' class='form-control params' id='"+type+"_"+functionName+"_"+val.Name+"' placeholder='"+val.Hint+"'>\n" +
                        "</div>");
                }
                if(inputVal != null && inputVal != ''){
                    if(val.Name == "DeviceNames" || val.Name == "ValueDescriptors"){
                        $(".selectpicker").val(inputVal.split(','));
                    }else{
                        $("#"+type+"_"+functionName+"_"+val.Name).val(inputVal);
                    }
                }
            });
            $('#appservice_model').modal({
                backdrop: "static"
            });
            $('.selectpicker').selectpicker();
        }
    };

    AppService.prototype.saveParams = function(){
        var paramElementArr = $("#appservice_paramsBox").find("input");
        $.each($("#appservice_paramsBox").find("select"),function (index,val) {
            paramElementArr.push(val);
        });
        var type = paramElementArr[0].id.split("_")[0];
        var functionName = paramElementArr[0].id.split("_")[1];
        var filterFunction = eval(appService.PipelineFunctionList[type]).filter(function (e) { return e.Name == functionName; });
        $.each(paramElementArr, function (index,val) {
            var paramName = val.id.split("_")[2];
            var paramValue = '';
            if(val.value ==null || val.value == ''){
                var filterParam = '';
                if(paramName == "Address" || paramName == "Port" || paramName == "Protocol" || paramName == "Publisher" || paramName == "User" || paramName == "Password" || paramName == "Topic"){
                    filterParam = eval(filterFunction[0].Addressable).filter(function (e) { return e.Name == paramName; });
                }else{
                    filterParam = eval(filterFunction[0].Parameters).filter(function (e) { return e.Name == paramName; });
                }
                paramValue = filterParam[0].Hint;
            }else if(paramName == "DeviceNames" || paramName == "ValueDescriptors"){
                paramValue = $("#"+type+"_"+functionName+"_"+paramName).val().join(',');
            }else{
                paramValue = val.value;
            }
            if(paramName == "Address" || paramName == "Port" || paramName == "Protocol" || paramName == "Publisher" || paramName == "User" || paramName == "Password" || paramName == "Topic"){
                appService.deployData.Writable.Pipeline.Functions[functionName].Addressable[paramName]=paramValue;
            }else{
                appService.deployData.Writable.Pipeline.Functions[functionName].Parameters[paramName]=paramValue;
            }
        });
    };

    AppService.prototype.initServices = function initServices() {
        $.ajax({
            url: '/api/v1/appservice/list',
            type: 'GET',
            success:function(services){
                appService.appServices = services;
                $.each(services,function (key,value) {
                    $("#appservice_service_select").append("<option value="+key+">"+key+"</option>");
                });
            }
        });
    };

    AppService.prototype.changeServiceSelect = function(){
        var chooseValue = $("#appservice_service_select").val();
        if(chooseValue != null && chooseValue != ""){
            appService.servicekey = chooseValue;
            appService.deployData.Writable = appService.appServices[chooseValue].Writable;
            var dropcardArr = $("#appservice_left").find(".appservice_drop_card");
            if(dropcardArr.length != 0){
                $.each(dropcardArr,function (index,val) {
                    if(!appService.deployData.Writable.Pipeline.Functions.hasOwnProperty(dropcardArr[index].id.split("_")[1])){
                        $("#"+dropcardArr[index].id).trigger("mousedown");
                        $("#"+dropcardArr[index].id).trigger("mouseup");
                    }
                });
            }
            $.each(appService.deployData.Writable.Pipeline.Functions,function (key,value) {
                if(appService.deployData.Writable.Pipeline.Functions.hasOwnProperty(key) && appService.deployData.Writable.Pipeline.ExecutionOrder.indexOf(key) != -1){
                    $("[title='"+key+"']").trigger("mousedown");
                    $("[title='"+key+"']").trigger("mouseup");
                }else if(appService.deployData.Writable.Pipeline.ExecutionOrder.indexOf(key) == -1){
                    $("#appservice_left").find("[id$='"+key+"']").trigger("mousedown")
                    $("#appservice_left").find("[id$='"+key+"']").trigger("mouseup")
                }
            });
        }
    };

    AppService.prototype.initPipeline = function initPipeline() {
        $.each(appService.PipelineFunctionList,function (key,value) {
            $("#appservice_accordion").append("<div class='panel panel-default'>\n" +
                "<div class='panel-heading'>\n" +
                "<h4 class='panel-title'>\n" +
                "<a data-toggle='collapse' data-parent='#appservice_accordion'\n" +
                "href='#"+key+"'>\n" +
                ""+key+"\n" +
                "</a>\n" +
                "</h4>\n" +
                "</div>\n" +
                "<div id='"+key+"' class='panel-collapse collapse'>\n" +
                "<div class='panel-body' id='appservice_plus"+key+"'>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>");
            $.each(value,function (index,val) {
                $("#appservice_plus"+key).append("<div class='helper-dialog-wrapper appservice_drop_card' id = '"+key+"_"+val.Name+"' title='"+val.Name+"'>\n" +
                    "<div class='appservice_description'>\n" +
                    "<h5 align='left' class='appservice_transform'>"+val.Name+"</h5>\n" +
                    "</div>\n" +
                    "</div>");
            })

        });
    };

    AppService.prototype.dragDlg = function (){
        var moveDivId;
        var leftContainer = $("#appservice_left");
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;
        var isDown = false;

        $(".helper-dialog-wrapper").bind("mousedown",function(e) {
            moveDivId = e.currentTarget.id;
            x = e.clientX;
            y = e.clientY;
            l = $("#"+moveDivId).offset().left;
            t = $("#"+moveDivId).offset().top;
            isDown = true;
        });

        window.onmousemove = function(e) {
            if (isDown == false) {
                return;
            }
            var nx = e.clientX;
            var ny = e.clientY;

            var nl = parseInt(l)+(parseInt(nx) -parseInt(x));
            var nt = parseInt(t)+(parseInt(ny) -parseInt(y));

            $("#"+moveDivId).offset({top:nt,left:nl});
        };

        $(".helper-dialog-wrapper").bind("mouseup",function() {
            var type = moveDivId.split("_")[0];
            var functionName = moveDivId.split("_")[1];
            var params;
                if(leftContainer.find("div[id='"+moveDivId+"']").length == 0){
                    $("#"+moveDivId)[0].removeAttribute("title");
                    leftContainer.append($("#"+moveDivId));
                    var filterFunction = eval(appService.PipelineFunctionList[type]).filter(function (e) { return e.Name == functionName; });
                    params = filterFunction[0].Parameters;
                    var button ;
                    if(params != null){
                        button ='<button type="button" onclick="orgEdgexFoundry.appService.clickParamButton(this)" class="btn btn-success appservice_paramButton" value="" id="button_'+moveDivId+'" placeholder="Set Params" onmouseup="event.cancelBubble = true" onmousedown="event.cancelBubble = true">' +
                            '<i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;Set Params</button>';
                    }else {
                        button ='<button type="button" disabled="disabled" class="btn btn-success appservice_paramButton" value="" id="button_'+moveDivId+'" onmouseup="event.cancelBubble = true" onmousedown="event.cancelBubble = true">' +
                            '&nbsp;No parameters required.</button>';
                    }
                    $("#"+moveDivId).append(button);
                    var desc = '';
                    var filterFunction = eval(appService.PipelineFunctionList[type]).filter(function (e) { return e.Name == functionName; });
                    desc = filterFunction[0].Description;
                    var descElement=document.createElement("p");
                    descElement.innerHTML= desc;
                    $("#"+moveDivId).find("div[class='appservice_description']")[0].append(descElement);
                    $("#"+moveDivId).css("left",0);
                    $("#"+moveDivId).css("top",20);
                    $("#"+moveDivId).css("position","relative");
                    if(appService.deployData.Writable.Pipeline.Functions[functionName] == null){
                        if(functionName == "MQTTSend"){
                            appService.deployData.Writable.Pipeline.Functions[functionName]={"Addressable": {},"Parameters":{}};
                        }else{
                            appService.deployData.Writable.Pipeline.Functions[functionName]={"Parameters":{}};
                        }
                    }
                    if(appService.deployData.Writable.Pipeline.ExecutionOrder == ""){
                        appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder + functionName;
                    }else {
                        if(appService.deployData.Writable.Pipeline.ExecutionOrder.indexOf(functionName) == -1){
                            appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder + "," + functionName;
                        }
                    }
                }else{
                    $("#"+moveDivId)[0].setAttribute("title",moveDivId.split("_")[1]);
                    $("#appservice_plus"+moveDivId.split("_")[0]).append($("#"+moveDivId));
                    $("#"+moveDivId)[0].removeChild($("#"+moveDivId).find("button")[0]);
                    $("#"+moveDivId).find("div[class='appservice_description']")[0].removeChild($("#"+moveDivId).find("p")[0]);
                    $("#"+moveDivId).css("left",0);
                    $("#"+moveDivId).css("top",0);
                    delete appService.deployData.Writable.Pipeline.Functions[functionName];
                    var executionOrderArr = appService.deployData.Writable.Pipeline.ExecutionOrder.split(",");
                    if(executionOrderArr.length > 1 && functionName != executionOrderArr[0]){
                        appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder.replace(","+functionName,"");
                    }else if(executionOrderArr.length > 1 && functionName == executionOrderArr[0]){
                        appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder.replace(functionName+",","");
                    }else{
                        appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder.replace(functionName,"");
                    }
                }
                isDown = false;
            }
        );
    };

    AppService.prototype.loadAllDeviceAndValueDescriptor = function(){
        $.ajax({
            url: '/core-metadata/api/v1/device',
            type: 'GET',
            success:function(devices){
                appService.devicesCache = devices;
                $.each(devices,function(index,device){
                    $.each(device.profile.deviceResources,function(index,resource){
                        if (resource.properties.value.readWrite == "R" || resource.properties.value.readWrite == "RW") {
                            appService.valueDescriptorsCache.push(device.name+"------"+resource.name);
                        }
                    });
                });
            }
        });
    };

    AppService.prototype.downloadProfile = function(){
        if(appService.servicekey == null || appService.servicekey == ""){
            bootbox.alert({
                title:"Alert",
                message: "Please choose an app service.",
                className: 'red-green-buttons'
            });
            return;
        }
        var link = document.createElement("a");
        link.href = '/api/v1/appservice/download/servicekey/'+appService.servicekey+'?X-Session-Token='+window.sessionStorage.getItem("X_Session_Token");
        link.click();
    };

    AppService.prototype.deployToConsul = function(){
        if(appService.servicekey == null || appService.servicekey == ""){
            bootbox.alert({
                title:"Alert",
                message: "Please choose an app service.",
                className: 'red-green-buttons'
            });
            return;
        }
        if($.isEmptyObject(appService.deployData.Writable.Pipeline.Functions)){
            bootbox.alert({
                title:"Alert",
                message: "The deploy must contain functions.",
                className: 'red-green-buttons'
            });
            return;
        }
        $.each(appService.deployData.Writable.Pipeline.Functions,function (k, v) {
            if(!v.hasOwnProperty("Parameters")){
                appService.deployData.Writable.Pipeline.Functions[k].Parameters = {
                    "p" : "",
                }
            }else if (Object.keys(v.Parameters).length == 0){
                appService.deployData.Writable.Pipeline.Functions[k].Parameters = {
                    "p" : "",
                }
            }
            if(appService.deployData.Writable.Pipeline.Functions[k].Parameters != null){
                $.each(appService.deployData.Writable.Pipeline.Functions[k].Parameters,function (key,val) {
                    if(val == "true" || val == "false"){
                        appService.deployData.Writable.Pipeline.Functions[k].Parameters[key] = JSON.parse(val);
                    }
                });
            }
        });
        var executionOrderArr = appService.deployData.Writable.Pipeline.ExecutionOrder.split(",");
        var newExectionArr = [];
        executionOrderArr.forEach(function (value,index) {
            if(value  != "FilterByDeviceName" && value != "FilterByValueDescriptor" && value  != "HTTPPost" && value != "HTTPPostJSON" && value  != "HTTPPostXML" && value != "MQTTSend"){
                newExectionArr.push(executionOrderArr[index]);
            }
        });
        executionOrderArr.forEach(function (value,index) {
            if(value  == "FilterByDeviceName" || value == "FilterByValueDescriptor"){
                newExectionArr.unshift(executionOrderArr[index]);
            }else if(value  == "HTTPPost" || value == "HTTPPostJSON" || value  == "HTTPPostXML" || value == "MQTTSend"){
                newExectionArr.push(executionOrderArr[index]);
            }
        });
        appService.deployData.Writable.Pipeline.ExecutionOrder = newExectionArr.join(",");
        $.ajax({
            url: '/api/v1/appservice/deploy/servicekey/'+appService.servicekey,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(appService.deployData),
            success: function(){
                bootbox.alert({
                    title:"Alert",
                    message: "deploy success!",
                    className: 'red-green-buttons'
                });
            },
            error: function(){
                bootbox.alert({
                    title : "Error",
                    message: "deploy failure!",
                    className: 'red-green-buttons'
                });
            }
        });
    };

    appService.deployData = {
        "Writable": {
            "LogLevel": "INFO",
            "Pipeline": {
                "ExecutionOrder": "",
                "UseTargetTypeOfByteArray":false,
                "Functions": {
                }
            }
        }
    };

    appService.PipelineFunctionList = {
        'Filtering':[
            {
                'Name':'FilterByDeviceName',
                'Description': 'To filter events for a specific device.',
                'Parameters': [
                    {
                        'Name':'DeviceNames',
                        'Default': '',
                        'Hint':'',
                        'Required': true
                    }
                ],
                'Addressable': null
            },
            {
                'Name':'FilterByValueDescriptor',
                'Description':'',
                'Parameters': [
                    {
                        'Name':'ValueDescriptors',
                        'Default': '',
                        'Hint': '',
                        'Required': true
                    }
                ],
                'Addressable': null
            }
        ],
        'Encryption':[
            {
                'Name':'EncryptWithAES',
                'Description':'',
                'Parameters': [
                    {
                        'Name':'Key',
                        'Default': '',
                        'Hint': 'aquqweoruqwpeoruqwpoeruqwpoierupqoweiurpoqwiuerpqowieurqpowieurpoqiweuroipwqure',
                        'Required': true
                    },
                    {
                        'Name':'InitVector',
                        'Default': '',
                        'Hint': '123456789012345678901234567890',
                        'Required': true
                    }
                ],
                'Addressable': null
            }
        ],
        'Conversion':[
            {
                'Name':'TransformToXML',
                'Description':'To transform the data to XML.',
                'Parameters':null,
                'Addressable': null
            },
            {
                'Name':'TransformToJSON',
                'Description':'',
                'Parameters':null,
                'Addressable': null
            }
        ],
        'Compression':[
            {
                'Name':'CompressWithGZIP',
                'Description':'',
                'Parameters':null,
                'Addressable': null
            },
            {
                'Name':'CompressWithZLIB',
                'Description':'',
                'Parameters':null,
                'Addressable': null
            }
        ],
        'CoreData':[
            {
                'Name':'MarkAsPushed',
                'Description':'To call Core Data API to mark the event as having been pushed.',
                'Parameters':null,
                'Addressable': null
            },
            {
                'Name':'PushToCore',
                'Description':'',
                'Parameters': [
                    {
                        'Name':'DeviceName',
                        'Default': '',
                        'Hint': '',
                        'Required': true
                    },
                    {
                        'Name':'ReadingName',
                        'Default': '',
                        'Hint': '',
                        'Required': true
                    },
                ],
                'Addressable': null
            }
        ],
        'Export':[
            {
                'Name':'HTTPPost',
                'Description':'To send the data to an HTTP endpoint that takes our XML data.',
                'Parameters': [
                    {
                        'Name':'url',
                        'Default': '',
                        'Hint': 'http://',
                        'Required': true
                    },
                    {
                        'Name':'mimeType',
                        'Default': 'application/json',
                        'Hint': 'application/json',
                        'Required': false
                    },
                    {
                        'Name':'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': false
                    },
                ],
                'Addressable': null
            },
            {
                'Name':'HTTPPostJSON',
                'Description':'',
                'Parameters': [
                    {
                        'Name':'url',
                        'Default': '',
                        'Hint': 'http://',
                        'Required': true
                    },
                    {
                        'Name':'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': false
                    },
                ],
                'Addressable': null
            },
            {
                'Name':'HTTPPostXML',
                'Description':'',
                'Parameters': [
                    {
                        'Name':'url',
                        'Default': '',
                        'Hint': 'http://',
                        'Required': true
                    },
                    {
                        'Name':'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': false
                    },
                ],
                'Addressable': null
            },
            {
                'Name':'SetOutputData',
                'Description':'',
                'Parameters': null,
                'Addressable': null
            },
            {
                'Name':'MQTTSend',
                'Description':'',
                'Parameters': [
                    {
                        'Name':'qos',
                        'Default': '0',
                        'Hint': '0',
                        'Required': true
                    },
                    {
                        'Name':'key',
                        'Default': '',
                        'Hint': '',
                        'Required': false
                    },
                    {
                        'Name':'autoreconnect',
                        'Default': false,
                        'Hint': false,
                        'Required': true
                    },
                    {
                        'Name':'retain',
                        'Default': false,
                        'Hint': false,
                        'Required': true
                    },
                    {
                        'Name':'cert',
                        'Default': '',
                        'Hint': '',
                        'Required': false
                    },
                    {
                        'Name':'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': true
                    }
                ],
                'Addressable':[
                    {
                        'Name':'Address',
                        'Default': 'localhost',
                        'Hint': 'localhost',
                        'Required': true
                    },
                    {
                        'Name':'Port',
                        'Default': '1883',
                        'Hint': '1883',
                        'Required': true
                    },
                    {
                        'Name':'Protocol',
                        'Default': 'tcp',
                        'Hint': 'tcp',
                        'Required': true
                    },
                    {
                        'Name':'Publisher',
                        'Default': '',
                        'Hint': 'MyApp',
                        'Required': true
                    },
                    {
                        'Name':'User',
                        'Default': '',
                        'Hint': '',
                        'Required': false
                    },
                    {
                        'Name':'Password',
                        'Default': '',
                        'Hint': '',
                        'Required': false
                    },
                    {
                        'Name':'Topic',
                        'Default': '',
                        'Hint': 'sampleTopic',
                        'Required': true
                    }
                ]

            },
        ]
    };
    return appService;
}());
