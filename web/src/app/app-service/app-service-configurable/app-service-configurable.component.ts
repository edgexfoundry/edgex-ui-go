import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/contracts/v2/device';
import { DeviceProfile } from 'src/app/contracts/v2/device-profile';
import { DeviceResource } from 'src/app/contracts/v2/device-resource';
import { MultiDeviceProfileResponse } from 'src/app/contracts/v2/responses/device-profile-response';
import { MultiDeviceResponse } from 'src/app/contracts/v2/responses/device-response';
import { AppServiceService } from 'src/app/services/app-service.service';
import { MessageService } from '../../message/message.service';
import { MetadataService } from '../../services/metadata.service';

@Component({
    selector: 'app-app-service-configurable',
    templateUrl: './app-service-configurable.component.html',
    styleUrls: ['./app-service-configurable.component.css']
})
export class AppServiceConfigurableComponent implements OnInit {
    appServiceList: any[] = [
        'app-rules-engine'
    ];
    serviceKey: string = "app-rules-engine";
    deployData: any = {
        Writable: {
            LogLevel: "INFO",
            Pipeline: {
                ExecutionOrder: "SetResponseData",
                UseTargetTypeOfByteArray: false,
                Functions: {}
            }
        }
    };
    pipelineFunctionList: any = {
        'Triggers': [
            {
                'Name': 'EdgexMessageBus',
                'Description': 'Trigger by Edgex MessageBus.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'PublishHost.Host',
                        'Default': 'edgex-redis',
                        'Hint': 'edgex-redis',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'PublishHost.Port',
                        'Default': '6379',
                        'Hint': '6379',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'PublishHost.Protocol',
                        'Default': 'redis',
                        'Hint': 'redis',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'SubscribeHost.Host',
                        'Default': 'edgex-redis',
                        'Hint': 'edgex-redis',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'SubscribeHost.Port',
                        'Default': '6379',
                        'Hint': '6379',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'SubscribeHost.Protocol',
                        'Default': 'redis',
                        'Hint': 'redis',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Type',
                        'Default': 'redis',
                        'Hint': 'redis',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'AutoReconnect',
                        'Default': true,
                        'Hint': true,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'ClientId',
                        'Default': 'core-data',
                        'Hint': 'core-data',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'ConnectTimeout',
                        'Default': '5',
                        'Hint': '5',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'KeepAlive',
                        'Default': '10',
                        'Hint': '10',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Password',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Qos',
                        'Default': '0',
                        'Hint': '0',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Retained',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'SkipCertVerify',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'Username',
                        'Default': 'redis5',
                        'Hint': 'redis5',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'authmode',
                        'Default': 'usernamepassword',
                        'Hint': 'usernamepassword',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'secretname',
                        'Default': 'redisdb',
                        'Hint': 'redisdb',
                        'Required': true,
                        'type': 'string'
                    }
                ]
            },
            {
                'Name': 'ExternalMqtt',
                'Description': 'Trigger by Edgex MessageBus.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'Url',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'ClientId',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'ConnectTimeout',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'AutoReconnect',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'KeepAlive',
                        'Default': '0',
                        'Hint': '0',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'QoS',
                        'Default': '0',
                        'Hint': '0',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Retain',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'SkipCertVerify',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'SecretPath',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'AuthMode',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    }
                ]
            }
        ],
        'Filtering': [
            {
                'Name': 'FilterByDeviceName',
                'Description': 'To filter events for a specific device.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'DeviceNames',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    }
                ],
                'Addressable': null
            },
            {
                'Name': 'FilterByValueDescriptor',
                'Description': 'To filter events by value descriptor.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'ValueDescriptors',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    }
                ],
                'Addressable': null
            }
        ],
        'Encryption': [
            {
                'Name': 'EncryptWithAES',
                'Description': 'Encrypt with AES',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'Key',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'InitVector',
                        'Default': '',
                        'Hint': '1234567890',
                        'Required': true,
                        'type': 'string'
                    }
                ],
                'Addressable': null
            }
        ],
        'Conversion': [
            {
                'Name': 'TransformToXML',
                'Description': 'To transform the data to XML.',
                'IsNeedParam': 'No need to set Parameters',
                'Parameters': null,
                'Addressable': null
            },
            {
                'Name': 'TransformToJSON',
                'Description': '',
                'Parameters': null,
                'Addressable': null
            }
        ],
        'Compression': [
            {
                'Name': 'CompressWithGZIP',
                'Description': 'Compress with GZIP',
                'IsNeedParam': 'No need to set Parameters',
                'Parameters': null,
                'Addressable': null
            },
            {
                'Name': 'CompressWithZLIB',
                'Description': 'Compress with ZLIB',
                'IsNeedParam': 'No need to set Parameters',
                'Parameters': null,
                'Addressable': null
            }
        ],
        'CoreData': [
            {
                'Name': 'MarkAsPushed',
                'Description': 'To call Core Data API to mark the event as having been pushed.',
                'IsNeedParam': 'No need to set Parameters',
                'Parameters': null,
                'Addressable': null
            },
            {
                'Name': 'PushToCore',
                'Description': 'Push Data To Core Database.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'DeviceName',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'ReadingName',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                ],
                'Addressable': null
            }
        ],
        'Export': [
            {
                'Name': 'HTTPPost',
                'Description': 'To send the data to an HTTP endpoint that takes our data.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'url',
                        'Default': '',
                        'Hint': 'http://localhost:4000/api/v1/appservice/receiveDataPostJSON',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'mimeType',
                        'Default': 'application/json',
                        'Hint': 'application/json',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                ],
                'Addressable': null
            },
            {
                'Name': 'HTTPPostJSON',
                'Description': 'To send the data to an HTTP endpoint that takes our JSON data.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'url',
                        'Default': '',
                        'Hint': 'http://localhost:4000/api/v1/appservice/receiveDataPostJSON',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                ],
                'Addressable': null
            },
            {
                'Name': 'HTTPPostXML',
                'Description': 'To send the data to an HTTP endpoint that takes our XML data.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'url',
                        'Default': '',
                        'Hint': 'http://localhost:4000/api/v1/appservice/receiveDataPostXML',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                ],
                'Addressable': null
            },
            {
                'Name': 'SetResponseData',
                'Description': '',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'responsecontenttype',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    }
                ],
                'Addressable': null
            },
            {
                'Name': 'MQTTSend',
                'Description': 'To send the data to an MQTT endpoint.',
                'IsNeedParam': 'Set Parameters',
                'Parameters': [
                    {
                        'Name': 'qos',
                        'Default': '0',
                        'Hint': '0',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'key',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'autoreconnect',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'retain',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    },
                    {
                        'Name': 'cert',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'persistOnError',
                        'Default': false,
                        'Hint': false,
                        'Required': true,
                        'type': 'boolean'
                    }, {
                        'Name': 'Address',
                        'Default': 'localhost',
                        'Hint': 'localhost',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Port',
                        'Default': '1883',
                        'Hint': '1883',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Protocol',
                        'Default': 'http',
                        'Hint': 'http',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Publisher',
                        'Default': '',
                        'Hint': 'MyApp',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'User',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Password',
                        'Default': '',
                        'Hint': '',
                        'Required': true,
                        'type': 'string'
                    },
                    {
                        'Name': 'Topic',
                        'Default': '',
                        'Hint': 'sampleTopic',
                        'Required': true,
                        'type': 'string'
                    }
                ],
                'Addressable': null
            }
        ]
    };

    pipelineFunctionMap: Map<string, any> = new Map();
    triggerFunctionMap: Map<string, any> = new Map();
    appConfigurableMap: Map<string, any> = new Map();
    settingFunctionType: string = '';
    settingFunctionName: string = '';
    constructor(private http: HttpClient,private appSvc: AppServiceService, private msgSvc: MessageService, private metaSvc: MetadataService,
        private el: ElementRef) { }
    @ViewChild('appservice_Transforms_Btn') appservice_Transforms_Btn!: ElementRef;

    dropdownDeviceList: any[] = [];
    dropdownValueDescriptorsList: any[] = [];
    selectedDeviceItems: any[] = [];
    selectedValueDescriptorsItems: any[] = [];
    dropdownSettings = {
        singleSelection: false,
        text: "Select Items",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: "myclass custom-class"
    };

    ngOnInit(): void {
        setTimeout(() => {
            this.appservice_Transforms_Btn.nativeElement.click();
        }, 10);

        Object.keys(this.pipelineFunctionList).forEach((key: any) => {
            if (key === 'Triggers') {
                this.triggerFunctionMap.set(key, this.pipelineFunctionList[key]);
            } else {
                this.pipelineFunctionMap.set(key, this.pipelineFunctionList[key]);
            }
        });
        this.getDeviceList();
        this.getValueDescriptorList();
    }

    getDeviceList() {
        this.metaSvc.allDevices().subscribe((data: MultiDeviceResponse) => {
            data.devices.forEach((device: Device) => {
                this.dropdownDeviceList.push({ "id": device.name, "itemName": device.name });
            });
        });
    }

    getValueDescriptorList() {
        this.metaSvc.allDeviceProfoles().subscribe((data: MultiDeviceProfileResponse) => {
            data.profiles.forEach((profile: DeviceProfile) => {
                profile.deviceResources.forEach((resource: DeviceResource) => {
                    if (resource.properties.readWrite == "R" || resource.properties.readWrite == "RW") {
                        this.metaSvc.findDevicesByProfileName(0,9999,profile.name).subscribe((data: MultiDeviceResponse) => {
                            data.devices.forEach((device: Device) => {
                                this.dropdownValueDescriptorsList.push({ "id": resource.name, "itemName": device.name + "------" + resource.name, "valueDescriptor": resource.name });
                            });
                        });
                    }
                });
            });
        });
    }

    refreshConsul() {
        // devicename and valuedescriptors set to function parameters.
        this.appConfigurableMap.forEach((value, key) => {
            if (key === "Filtering") {
                value.forEach((element: any) => {
                    if (element.Name === "FilterByDeviceName") {
                        let deviceNamesStr: string = "";
                        this.selectedDeviceItems.forEach((item) => {
                            deviceNamesStr += item.itemName + ","
                        });
                        element.Parameters[0].Default = deviceNamesStr.substring(0, deviceNamesStr.length - 1);
                    } else if (element.Name === "FilterByValueDescriptor") {
                        let valueDescriptorsStr: string = "";
                        this.selectedValueDescriptorsItems.forEach((item) => {
                            valueDescriptorsStr += item.valueDescriptor + ","
                        });
                        element.Parameters[0].Default = valueDescriptorsStr.substring(0, valueDescriptorsStr.length - 1);
                    }
                });
            }
        });
        //to build appconfigurablemap to deployData.
        var executionOrderArr: string[] = this.deployData.Writable.Pipeline.ExecutionOrder.split(",");
        this.appConfigurableMap.forEach((value, key) => {
            value.forEach((element: any) => {
                executionOrderArr.push(element.Name);
                this.deployData.Writable.Pipeline.Functions[element.Name] = {};
                this.deployData.Writable.Pipeline.Functions[element.Name]['Parameters'] = {};
                if (element.Parameters != null) {
                    element.Parameters.forEach((param: any) => {
                        if (param.Default == "true" || param.Default == "false") {
                            param.Default = JSON.parse(param.Default);
                        }
                        this.deployData.Writable.Pipeline.Functions[element.Name]['Parameters'][param.Name] = param.Default;
                    });
                } else {
                    this.deployData.Writable.Pipeline.Functions[element.Name]['Parameters'] = {
                        "p" : "",
                    };
                }
            });
        });
        this.deployData.Writable.Pipeline.ExecutionOrder = executionOrderArr.join(",");
        if ($.isEmptyObject(this.deployData.Writable.Pipeline.Functions)) {
            this.msgSvc.errors("The deploy must contain functions.");
            return;
        }

        var newExectionArr: string[] = [];
        executionOrderArr.forEach(function (value, index) {
            if (value != "FilterByDeviceName" && value != "FilterByValueDescriptor" && value != "HTTPPost" && value != "HTTPPostJSON" && value != "HTTPPostXML" && value != "MQTTSend") {
                newExectionArr.push(executionOrderArr[index]);
                
            }
        });
        executionOrderArr.forEach(function (value, index) {
            if (value == "FilterByDeviceName" || value == "FilterByValueDescriptor") {
                newExectionArr.unshift(executionOrderArr[index]);
            } else if (value == "HTTPPost" || value == "HTTPPostJSON" || value == "HTTPPostXML" || value == "MQTTSend") {
                newExectionArr.push(executionOrderArr[index]);
            }
        });
        this.deployData.Writable.Pipeline.ExecutionOrder = newExectionArr.join(",");
        this.appSvc.deployToConsul(this.deployData, this.serviceKey).subscribe((resp: any) => {
            this.msgSvc.success('deploy to consul ');
        })
    }

    downloadConfiguration() {
        this.appSvc.downloadAppServiceConfig(this.serviceKey).subscribe((resp: any) => {
            this.downloadFile(resp);
          });
    }
    
    downloadFile(data:any) {
        const blob = new Blob([data.body], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fileName = data.headers.get('content-disposition').split(';')[1].split('=')[1].split('"')[1];
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    onDragRightToLeftEnd(event: any) {
        let pipeType = event.id.split("_")[0];
        let pipeName = event.id.split("_")[1];
        let eventIndex = '';
        let dragEvent = '';
        if (pipeType === 'Triggers') {
            eventIndex = this.triggerFunctionMap.get(pipeType).findIndex((myObj: { Name: string; }) => myObj.Name == pipeName);
            dragEvent = this.triggerFunctionMap.get(pipeType).find((myObj: { Name: string; }) => myObj.Name == pipeName);
        } else {
            eventIndex = this.pipelineFunctionMap.get(pipeType).findIndex((myObj: { Name: string; }) => myObj.Name == pipeName);
            dragEvent = this.pipelineFunctionMap.get(pipeType).find((myObj: { Name: string; }) => myObj.Name == pipeName);
        }

        let eventTempList = [];
        if (this.appConfigurableMap.get(pipeType) == undefined) {
            eventTempList.push(dragEvent);
            this.appConfigurableMap.set(pipeType, eventTempList);
        } else {
            eventTempList = this.appConfigurableMap.get(pipeType);
            eventTempList.push(dragEvent);
            this.appConfigurableMap.set(pipeType, eventTempList);
        }
        if (pipeType === 'Triggers') {
            this.triggerFunctionMap.get(pipeType).splice(eventIndex, 1);
        } else {
            this.pipelineFunctionMap.get(pipeType).splice(eventIndex, 1);
        }
    }

    onDragLeftToRightEnd(event: any) {
        let pipeType = event.id.split("_")[0];
        let pipeName = event.id.split("_")[1];

        let eventIndex = this.appConfigurableMap.get(pipeType).findIndex((myObj: { Name: string; }) => myObj.Name == pipeName);
        let dragEvent = this.appConfigurableMap.get(pipeType).find((myObj: { Name: string; }) => myObj.Name == pipeName);

        let eventTempList = [];

        if (pipeType === 'Triggers') {
            if (this.triggerFunctionMap.get(pipeType) == undefined) {
                eventTempList.push(dragEvent);
                this.triggerFunctionMap.set(pipeType, eventTempList);
            } else {
                eventTempList = this.triggerFunctionMap.get(pipeType);
                eventTempList.push(dragEvent);
                this.triggerFunctionMap.set(pipeType, eventTempList);
            }
        } else {
            if (this.pipelineFunctionMap.get(pipeType) == undefined) {
                eventTempList.push(dragEvent);
                this.pipelineFunctionMap.set(pipeType, eventTempList);
            } else {
                eventTempList = this.pipelineFunctionMap.get(pipeType);
                eventTempList.push(dragEvent);
                this.pipelineFunctionMap.set(pipeType, eventTempList);
            }
        }
        this.appConfigurableMap.get(pipeType).splice(eventIndex, 1);
    }

    IsHaveParams(type: string, functionName: string) {
        let filterFunction = this.appConfigurableMap.get(type).find((myObj: { Name: string; }) => myObj.Name == functionName);
        let params = filterFunction.Parameters;
        if (params == null) {
            return false;
        } else {
            return true;
        }
    }

    setParams(event: any) {
        var type = event.title.split("_", 2)[0];
        var functionName = event.title.split("_", 2)[1];
        if (!this.IsHaveParams(type, functionName)) {
            return;
        }
        this.settingFunctionType = type;
        this.settingFunctionName = functionName;
        $("#appservice_model").modal('show');
    }
}
