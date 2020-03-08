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
});

orgEdgexFoundry.appService = (function () {
    "use strict";
    function AppService() {
        this.PipelineFunctionList = null;
    }
    AppService.prototype = {
        constructor:AppService,
        dragDlg:null,
        downloadProfile:null,
        deployToConsul:null,
        initPipeline:null,
        clickParamButton:null
    };
    var appService = new AppService();
    AppService.prototype.clickParamButton = function () {
        $('#myModal').modal();
    };
    AppService.prototype.initPipeline = function initPipeline() {
        $.each(appService.PipelineFunctionList,function (key,value) {
            $.each(value,function (index,val) {
                console.log(index,val)
                $("#plus"+key).append("<div class=\"helper-dialog-wrapper drop-card\" id = \""+key+"_"+val.Name+"\" title=\""+key+"_"+val.Name+"\">\n" +
                    "                     <div class=\"description\">\n" +
                    "                         <h5 align=\"center\" class=\"transform\">"+val.Name+"</h5>\n" +
                    "                         <p>Description:"+val.Description+"</p>\n" +
                    "                     </div>\n" +
                    "                </div>");
            })

        });
        orgEdgexFoundry.appService.dragDlg();
    };
    AppService.prototype.dragDlg = function (){
        var moveDivId;
        var rightContainer = $("#right");
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
                if(leftContainer.find("div[id='"+moveDivId+"']").length == 0){
                    leftContainer.append($("#"+moveDivId));
                    if($("#"+moveDivId).find("input[type='text']").length == 0){
                        var button='<button type="button" onclick="clickParamButton()" class="btn btn-success paramButton" value="" id="'+moveDivId+'input" title="'+$("#"+moveDivId)[0].getAttribute("title")+'" placeholder="Set Params" onmouseup="event.cancelBubble = true" onmousedown="event.cancelBubble = true">' +
                            '<i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;Set Params</button>';
                        $("#"+moveDivId).append(button);
                    }
                    $("#"+moveDivId).css("left",0);
                    $("#"+moveDivId).css("top",20);
                }
                else{
                    $("#plus"+moveDivId.split("_")[0]).append($("#"+moveDivId));
                    $("#"+moveDivId).css("left",0);
                    $("#"+moveDivId).css("top",0);
                    $("#"+moveDivId)[0].removeChild($("#"+moveDivId).find("button")[0]);
                }
                isDown = false;
            }
        );
    };
    AppService.prototype.downloadProfile = function(){
        $.ajax({
            url: '/api/v1/appservice/configurable/download',
            // data: json,
            type: 'GET',
            success: function(data){
                console.log(data);
            },
            error: function(){
            }
        });
    };

    AppService.prototype.deployToConsul = function(){
        $.ajax({
            url: '/api/v1/appservice/configurable/deploy',
            type: 'POST',
            success: function(data){
                console.log(data);
            },
            error: function(){
            }
        });
    };
    appService.PipelineFunctionList = {
        'Filtering':[
            {
                'Name':'FilterByDeviceName',
                'Description': '',
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
                'Description':'',
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
                'Description':'',
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
                'Description':'',
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
                        'Hint': '',
                        'Required': false
                    },
                    {
                        'Name':'persistOnError',
                        'Default': 'false',
                        'Hint': '',
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
                        'Hint': '',
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
                        'Hint': '',
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
                        'Hint': '',
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
                        'Hint': '',
                        'Required': true
                    },
                    {
                        'Name':'retain',
                        'Default': 'false',
                        'Hint': '',
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
                        'Hint': '',
                        'Required': true
                    }
                ],
                'Addressable':[
                    {
                        'Name':'Address',
                        'Default': 'localhost',
                        'Hint': '',
                        'Required': true
                    },
                    {
                        'Name':'Port',
                        'Default': '1883',
                        'Hint': '',
                        'Required': true
                    },
                    {
                        'Name':'Protocol',
                        'Default': 'tcp',
                        'Hint': '',
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
    var json = "{\n" +
        "  \"Binding\": {\n" +
        "    \"PublishTopic\": \"example\",\n" +
        "    \"SubscribeTopic\": \"events\",\n" +
        "    \"Type\": \"messagebus\"\n" +
        "  },\n" +
        "  \"Clients\": {\n" +
        "    \"CoreData\": {\n" +
        "      \"Host\": \"localhost\",\n" +
        "      \"Port\": 48080,\n" +
        "      \"Protocol\": \"http\"\n" +
        "    },\n" +
        "    \"Logging\": {\n" +
        "      \"Host\": \"localhost\",\n" +
        "      \"Port\": 48061,\n" +
        "      \"Protocol\": \"http\"\n" +
        "    }\n" +
        "  },\n" +
        "  \"Database\": {\n" +
        "    \"Host\": \"localhost\",\n" +
        "    \"Password\": \"\",\n" +
        "    \"Port\": 27017,\n" +
        "    \"Timeout\": \"30s\",\n" +
        "    \"Type\": \"mongodb\",\n" +
        "    \"Username\": \"\"\n" +
        "  },\n" +
        "  \"Logging\": {\n" +
        "    \"EnableRemote\": false,\n" +
        "    \"File\": \"./logs/app-service-configurable.log\"\n" +
        "  },\n" +
        "  \"MessageBus\": {\n" +
        "    \"PublishHost\": {\n" +
        "      \"Host\": \"*\",\n" +
        "      \"Port\": 5565,\n" +
        "      \"Protocol\": \"tcp\"\n" +
        "    },\n" +
        "    \"SubscribeHost\": {\n" +
        "      \"Host\": \"localhost\",\n" +
        "      \"Port\": 5563,\n" +
        "      \"Protocol\": \"tcp\"\n" +
        "    },\n" +
        "    \"Type\": \"zero\"\n" +
        "  },\n" +
        "  \"Registry\": {\n" +
        "    \"Host\": \"localhost\",\n" +
        "    \"Port\": 8500,\n" +
        "    \"Type\": \"consul\"\n" +
        "  },\n" +
        "  \"SecretStore\": {\n" +
        "    \"Authentication\": {\n" +
        "      \"AuthToken\": \"edgex\",\n" +
        "      \"AuthType\": \"X-Vault-Token\"\n" +
        "    },\n" +
        "    \"Host\": \"localhost\",\n" +
        "    \"Path\": \"/v1/secret/edgex/application-service/\",\n" +
        "    \"Port\": 8200,\n" +
        "    \"Protocol\": \"https\"\n" +
        "  },\n" +
        "  \"Service\": {\n" +
        "    \"BootTimeout\": \"30s\",\n" +
        "    \"CheckInterval\": \"10s\",\n" +
        "    \"ClientMonitor\": \"15s\",\n" +
        "    \"Host\": \"localhost\",\n" +
        "    \"Port\": 48095,\n" +
        "    \"Protocol\": \"http\",\n" +
        "    \"ReadMaxLimit\": 100,\n" +
        "    \"StartupMsg\": \"Sample Configurable Application Service Started\",\n" +
        "    \"Timeout\": \"5s\"\n" +
        "  },\n" +
        "  \"Writable\": {\n" +
        "    \"LogLevel\": \"INFO\",\n" +
        "    \"Pipeline\": {\n" +
        "      \"ExecutionOrder\": \"FilterByDeviceName, TransformToXML, SetOutputData\",\n" +
        "      \"Functions\": {\n" +
        "        \"CompressWithGZIP\": {},\n" +
        "        \"CompressWithZLIB\": {},\n" +
        "        \"EncryptWithAES\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"InitVector\": \"123456789012345678901234567890\",\n" +
        "            \"Key\": \"aquqweoruqwpeoruqwpoeruqwpoierupqoweiurpoqwiuerpqowieurqpowieurpoqiweuroipwqure\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"FilterByDeviceName\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"DeviceNames\": \"Random-Float-Device,Random-Integer-Device\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"FilterByValueDescriptor\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"ValueDescriptors\": \"RandomValue_Int8, RandomValue_Int64\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"HTTPPost\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"mimeType\": \"\",\n" +
        "            \"persistOnError\": \"false\",\n" +
        "            \"url\": \"http://\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"HTTPPostJSON\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"persistOnError\": \"false\",\n" +
        "            \"url\": \"http://\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"HTTPPostXML\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"persistOnError\": \"false\",\n" +
        "            \"url\": \"http://\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"MQTTSend\": {\n" +
        "          \"Addressable\": {\n" +
        "            \"Address\": \"localhost\",\n" +
        "            \"Password\": \"\",\n" +
        "            \"Port\": 1883,\n" +
        "            \"Protocol\": \"tcp\",\n" +
        "            \"Publisher\": \"MyApp\",\n" +
        "            \"Topic\": \"sampleTopic\",\n" +
        "            \"User\": \"\"\n" +
        "          },\n" +
        "          \"Parameters\": {\n" +
        "            \"autoreconnect\": \"false\",\n" +
        "            \"cert\": \"\",\n" +
        "            \"key\": \"\",\n" +
        "            \"persistOnError\": \"false\",\n" +
        "            \"qos\": \"0\",\n" +
        "            \"retain\": \"false\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"MarkAsPushed\": {},\n" +
        "        \"PushToCore\": {\n" +
        "          \"Parameters\": {\n" +
        "            \"DeviceName\": \"\",\n" +
        "            \"ReadingName\": \"\"\n" +
        "          }\n" +
        "        },\n" +
        "        \"SetOutputData\": {},\n" +
        "        \"TransformToJSON\": {},\n" +
        "        \"TransformToXML\": {}\n" +
        "      },\n" +
        "      \"UseTargetTypeOfByteArray\": false\n" +
        "    },\n" +
        "    \"StoreAndForward\": {\n" +
        "      \"Enabled\": false,\n" +
        "      \"MaxRetryCount\": 10,\n" +
        "      \"RetryInterval\": \"5m\"\n" +
        "    }\n" +
        "  }\n" +
        "}";

    return appService;
}());
