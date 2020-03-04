$(document).ready(function(){
    DragDlg();
});

function DragDlg(){
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
    }

    $(".helper-dialog-wrapper").bind("mouseup",function() {
        if(leftContainer.find("div[id='"+moveDivId+"']").length == 0){
            leftContainer.append($("#"+moveDivId));
            if($("#"+moveDivId).find("input[type='text']").length == 0){
                var input='<input type="text" value="" id="input" placeholder="Value" onmouseup="event.cancelBubble = true" onmousedown="event.cancelBubble = true">';
                $("#"+moveDivId).append(input);
            }
            $("#"+moveDivId).css("left",0);
            $("#"+moveDivId).css("top",20);
        }
        else{
            rightContainer.append($("#"+moveDivId));
            $("#"+moveDivId).css("left",0);
            $("#"+moveDivId).css("top",20);
            $("#"+moveDivId)[0].removeChild($("#"+moveDivId).find("input")[0]);
        }
            isDown = false;
        }
    );
}

function downloadProlile() {
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
}

function deployToConsul() {
    $.ajax({
        url: '/api/v1/appservice/configurable/deploy',
        type: 'POST',
        success: function(data){
            console.log(data);
        },
        error: function(){
        }
    });
}

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