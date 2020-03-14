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
    orgEdgexFoundry.appService.initPipeline();
    orgEdgexFoundry.appService.dragDlg();
});

orgEdgexFoundry.appService = (function () {
    "use strict";
    function AppService() {
        this.PipelineFunctionList = null;
        this.deployData = null;
    }
    AppService.prototype = {
        constructor:AppService,
        dragDlg:null,
        downloadProfile:null,
        deployToConsul:null,
        initPipeline:null,
        clickParamButton:null,
        saveParams:null
    };

    var appService = new AppService();

    AppService.prototype.clickParamButton = function (e) {
        $("#paramsBox").empty();
        var type = e.id.split("_")[1];
        var functionName = e.id.split("_")[2];
        var params;
        $.each(appService.PipelineFunctionList[type], function (index,val) {
            if(val.Name == functionName){
                params = val.Parameters;
                return false;
            }
        });
        if(params != null){
            $.each(params, function (index,val) {
                $("#paramsBox").append("<div class=\"form-group\">\n" +
                    "                    <label for=\""+type+"_"+functionName+"_"+val.Name+"\">"+val.Name+"</label>\n" +
                    "                    <input type=\"text\" name=\"input_"+val.Name+"\"\" class=\"form-control\" id=\""+type+"_"+functionName+"_"+val.Name+"\" placeholder=\""+val.Hint+"\">\n" +
                    "                </div>");
            });
            $('#myModal').modal();
        }
    };

    AppService.prototype.saveParams = function(){
        var type = $("#paramsBox").find("input")[0].id.split("_")[0];
        var functionName = $("#paramsBox").find("input")[0].id.split("_")[1];
        $.each($("#paramsBox").find("input"), function (index,val) {
            var paramName = val.id.split("_")[2];
            var paramValue = val.value;
            appService.deployData.Writable.Pipeline.Functions[functionName].Parameters[paramName]=paramValue;
        });
    };

    AppService.prototype.initPipeline = function initPipeline() {
        $.each(appService.PipelineFunctionList,function (key,value) {
            $("#accordion").append("<div class=\"panel panel-default\">\n" +
                "                                <div class=\"panel-heading\">\n" +
                "                                    <h4 class=\"panel-title\">\n" +
                "                                        <a data-toggle=\"collapse\" data-parent=\"#accordion\"\n" +
                "                                           href=\"#"+key+"\">\n" +
                "                                            "+key+"\n" +
                "                                        </a>\n" +
                "                                    </h4>\n" +
                "                                </div>\n" +
                "                                <div id=\""+key+"\" class=\"panel-collapse collapse\">\n" +
                "                                    <div class=\"panel-body\" id=\"plus"+key+"\">\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>");
            $.each(value,function (index,val) {
                $("#plus"+key).append("<div class=\"helper-dialog-wrapper drop-card\" id = \""+key+"_"+val.Name+"\" title=\""+key+"_"+val.Name+"\">\n" +
                    "                     <div class=\"description\">\n" +
                    "                         <h5 align=\"center\" class=\"transform\">"+val.Name+"</h5>\n" +
                    "                     </div>\n" +
                    "                </div>");
            })

        });
    };

    AppService.prototype.dragDlg = function (){
        var moveDivId;
        var leftContainer = $("#left");
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
                    leftContainer.append($("#"+moveDivId));
                    $.each(appService.PipelineFunctionList[type], function (index,val) {
                        if(val.Name == functionName){
                            params = val.Parameters;
                            return false;
                        }
                    });
                    var button ;
                    if(params != null){
                        button ='<button type="button" onclick="orgEdgexFoundry.appService.clickParamButton(this)" class="btn btn-success paramButton" value="" id="button_'+moveDivId+'" title="'+$("#"+moveDivId)[0].getAttribute("title")+'" placeholder="Set Params" onmouseup="event.cancelBubble = true" onmousedown="event.cancelBubble = true">' +
                            '<i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;Set Params</button>';
                    }else {
                        button ='<button type="button" disabled="disabled" class="btn btn-success paramButton" value="" id="button_'+moveDivId+'" title="'+$("#"+moveDivId)[0].getAttribute("title")+'" onmouseup="event.cancelBubble = true" onmousedown="event.cancelBubble = true">' +
                            '&nbsp;No parameters required.</button>';
                    }
                    $("#"+moveDivId).append(button);
                    var desc = '';
                    $.each(appService.PipelineFunctionList[type], function (index,val) {
                        if(val.Name == functionName){
                            desc = val.Description;
                        }
                    });
                    var descElement=document.createElement("p");
                    descElement.innerHTML= desc;
                    $("#"+moveDivId).find("div[class='description']")[0].append(descElement);
                    $("#"+moveDivId).css("left",0);
                    $("#"+moveDivId).css("top",20);
                    $("#"+moveDivId).css("position","relative");
                    appService.deployData.Writable.Pipeline.Functions[functionName]={"Parameters":{}};
                    if(appService.deployData.Writable.Pipeline.ExecutionOrder == ""){
                        appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder + functionName;
                    }else {
                        appService.deployData.Writable.Pipeline.ExecutionOrder = appService.deployData.Writable.Pipeline.ExecutionOrder + "," + functionName;
                    }
                }else{
                    $("#plus"+moveDivId.split("_")[0]).append($("#"+moveDivId));
                    $("#"+moveDivId)[0].removeChild($("#"+moveDivId).find("button")[0]);
                    $("#"+moveDivId).find("div[class='description']")[0].removeChild($("#"+moveDivId).find("p")[0]);
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

    AppService.prototype.downloadProfile = function(){
        var link = document.createElement("a");
        link.href = '/api/v1/appservice/configurable/download?X-Session-Token='+window.sessionStorage.getItem("X_Session_Token");
        link.click();
    };

    AppService.prototype.deployToConsul = function(){
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
        });
        $.ajax({
            url: '/api/v1/appservice/configurable/deploy',
            type: 'POST',
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(appService.deployData),
            statusCode: {
                200: function(){
                    bootbox.alert({
                        message: "deploy success!",
                        className: 'red-green-buttons'
                    });
                }
            },
            error: function(error){
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
                "UseTargetTypeOfByteArray":'false',
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
                        'Hint':'Random-Float-Device,Random-Integer-Device',
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
                        'Hint': 'RandomValue_Int8, RandomValue_Int64',
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
                        'Default': 'false',
                        'Hint': 'false',
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
                        'Default': 'false',
                        'Hint': 'false',
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
                        'Default': 'false',
                        'Hint': 'false',
                        'Required': false
                    },
                ],
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
                        'Default': 'false',
                        'Hint': 'false',
                        'Required': true
                    },
                    {
                        'Name':'retain',
                        'Default': 'false',
                        'Hint': 'false',
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
                        'Default': 'false',
                        'Hint': 'false',
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
