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
var lineChartStartFlag = true;
var lineChartCateNum = 6;
$(document).ready(function(){
    $("#device-event-list-realtimedata").hide();
    $("#device-valuedesc-list-realtimedata").hide();
    orgEdgexFoundry.realTimeDataView.loadLineChart()
    var interval = setInterval(function(){
        if(lineChartStartFlag){
            orgEdgexFoundry.realTimeDataView.loadLineChart()
        }
    }, 2000);
});

orgEdgexFoundry.realTimeDataView = (function () {
    "use strict";
    function RealTimeDataView() {
        this.firstDevice = null;
        this.deviceList = [];
        this.lineCategoryTemplate = [];
        this.lineLegend = [];
        this.lineSeries = [];
        this.lineReadingDataTemplate = [];
        this.lineEventDataTemplate = [];
        this.valueDescriptorCategory = [];
        this.valueDescriptorSeriesData = [];
    }

    RealTimeDataView.prototype = {
        constructor:RealTimeDataView,
        findDeviceEventCountByDeviceId: null,
        findDeviceValueDescriptorByDeviceName: null,
        loadAllDevices: null,
        loadLineChart: null,
        writeLineChart: null,
        loadValueDescriptorChart: null,
        writeValueDescriptorChart: null,
        displayDeviceEventData: null,
        displayDeviceValueDescData: null,
        toSetCateNum: null,
        setCateNum: null
    };

    var realTimeDataView = new RealTimeDataView();

    RealTimeDataView.prototype.loadAllDevices = function(callback){
        $.ajax({
            url: '/core-metadata/api/v1/device',
            type: 'GET',
            success: function(data){
                callback(data);
            }
        });
    }

    RealTimeDataView.prototype.findDeviceEventByDeviceId = function(deviceId,callback){
        $.ajax({
            url: '/core-data/api/v1/event/device/'+deviceId+'/9999',
            type: 'GET',
            async: false,
            success: function(events){
                callback(events);
            }
        })
    }

    RealTimeDataView.prototype.findDeviceEventCountByDeviceId = function(deviceId,callback){
        $.ajax({
            url: '/core-data/api/v1/event/count/'+deviceId,
            type: 'GET',
            async: false,
            success: function(events){
                callback(events);
            }
        })
    }

    RealTimeDataView.prototype.findDeviceValueDescriptorByDeviceName = function(deviceName,callback){
        $.ajax({
            url: '/core-data/api/v1/valuedescriptor/devicename/'+deviceName,
            type: 'GET',
            async: false,
            success: function(valueDescriptor){
                callback(valueDescriptor);
            }
        })
    }

    RealTimeDataView.prototype.toSetCateNum = function(){
        $('#category_number').val(lineChartCateNum +1);
        $('#realTimeDataView_line_num_model').modal({
            backdrop: "static"
        });
    }

    RealTimeDataView.prototype.setCateNum = function(){
        lineChartCateNum = $('#category_number').val() -1 ;

    }

    RealTimeDataView.prototype.loadLineChart = function(){
        if(realTimeDataView.lineCategoryTemplate.length>lineChartCateNum){
            for(var i =0;i<=realTimeDataView.lineCategoryTemplate.length - lineChartCateNum; i++ ){
                realTimeDataView.lineCategoryTemplate.shift();
            }
        }
        realTimeDataView.lineCategoryTemplate.push(dateToString(new Date().getTime()).substr(10,20))
        $.when(realTimeDataView.loadAllDevices(function (devices) {
                realTimeDataView.deviceList = devices;
            realTimeDataView.lineLegend = [];
                $.each(realTimeDataView.deviceList,function (index,device) {
                    realTimeDataView.lineLegend.push(device.name)

                    realTimeDataView.findDeviceEventCountByDeviceId(device.id,function (eventCount) {
                        if(realTimeDataView.lineSeries.find(function(x) {
                            return x.name == device.name;
                        }) === undefined) {
                            realTimeDataView.lineSeries.push({
                                name: device.name,
                                type: 'line',
                                areaStyle: {},
                                data: [eventCount]
                            })
                        }else{
                            var dataTemp = realTimeDataView.lineSeries.filter(function(item){
                                return item.name == device.name;
                            })
                            var dataTempIndex = realTimeDataView.lineSeries.findIndex((item) => item.name === dataTemp[0].name);
                            if(dataTemp[0].data.length>lineChartCateNum){
                                for(var i =0;i<=dataTemp[0].data.length - lineChartCateNum; i++ ){
                                    dataTemp[0].data.shift();
                                }
                            }
                            dataTemp[0].data.push(eventCount);
                            realTimeDataView.lineSeries[dataTempIndex] = dataTemp[0];
                        }
                    });
                });
            })
        ).then(function () {
            realTimeDataView.writeLineChart();
        });
    }

    RealTimeDataView.prototype.writeLineChart = function(){
        document.getElementById('realTimeDataView_lineChart')
        var LineChart = echarts.init(document.getElementById('realTimeDataView_lineChart'));
        LineChart.clear();
        var LineChartOption = {
            title: {
                text: 'Events'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: realTimeDataView.lineLegend,
                top:35
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        title: 'data view',
                        readOnly: false,
                        show: true,
                        lang: ['data view', 'close', 'refresh']
                    },
                    magicType : {title: 'data view',show: true, type: ['line', 'bar']},
                    restore: {
                        title: 'restore',
                        show: true,
                    },
                    saveAsImage: {
                        title: 'save as image',
                        show: true,
                    },
                    myStartButton: {
                        show: true,
                        title: 'start or stop',
                        icon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                        onclick: (e) => {
                            if(lineChartStartFlag){
                                lineChartStartFlag = false;
                            }else {
                                lineChartStartFlag = true;
                            }
                        },
                    },
                    mySetCategoryButton: {
                        show: true,
                        title: 'set X number',
                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick: (e) => {
                            realTimeDataView.toSetCateNum();
                        },
                    }
                }
            },
            grid: {
                top:'20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: realTimeDataView.lineCategoryTemplate
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: realTimeDataView.lineSeries
        };
        LineChart.setOption(LineChartOption);
        LineChart.off('click');
        LineChart.on('click',  function(param) {
            $("#device-valuedesc-list-realtimedata").hide();
            var deviceName = param.seriesName;
            var deviceTemp = realTimeDataView.deviceList.filter(function(item){
                return item.name == deviceName;
            })
            realTimeDataView.findDeviceEventByDeviceId(deviceTemp[0].id, function (events) {
                realTimeDataView.displayDeviceEventData(events);
            });
            realTimeDataView.valueDescriptorCategory = [];
            for(var i=6; i>=0;i--){
                realTimeDataView.valueDescriptorCategory.push(dateToString(new Date().getTime()-24*60*60*1000*i).substr(0,10))
                if(i==0){
                    realTimeDataView.loadValueDescriptorChart(deviceName)
                }
            }
        });
    }

    RealTimeDataView.prototype.loadValueDescriptorChart = function(deviceName){
        $.when(realTimeDataView.findDeviceValueDescriptorByDeviceName(deviceName,function (valueDescriptors) {
            if(valueDescriptors != null && valueDescriptors.length >0){
                (function loopCategory(indexCategory) {
                    var valueDescCount = 0;
                    var date = new Date(new Date(realTimeDataView.valueDescriptorCategory[indexCategory]).toLocaleDateString()).getTime()
                    var tomorrowTimestamp = date+24*60*60*1000;

                    (function loopValueDescriptors(index) {
                        if(date<=valueDescriptors[index].created && valueDescriptors[index].created<tomorrowTimestamp){
                            valueDescCount++;
                        }
                        if (++index<valueDescriptors.length) {
                            loopValueDescriptors(index);
                        }
                    })(0);

                    if (++indexCategory<realTimeDataView.valueDescriptorCategory.length) {
                        realTimeDataView.valueDescriptorSeriesData.push(valueDescCount);
                        loopCategory(indexCategory);
                    }else {
                        realTimeDataView.valueDescriptorSeriesData.push(valueDescCount);
                    }
                })(0);
            }
            })
        ).then(function () {
            realTimeDataView.writeValueDescriptorChart(deviceName);
        });
    }

    RealTimeDataView.prototype.writeValueDescriptorChart = function (deviceName) {
        var valueDescriptorChart = echarts.init(document.getElementById('main5'));
        valueDescriptorChart.clear();
        var valueDescriptorChartOption = {
            title: {
                text: 'Readings for value descriptors'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: [deviceName],
                top:35
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        title: 'data view',
                        readOnly: false,
                        show: true,
                        lang: ['data view', 'close', 'refresh']
                    },
                    magicType : {title: 'data view',show: true, type: ['line', 'bar']},
                    restore: {
                        title: 'restore',
                        show: true,
                    },
                    saveAsImage: {
                        title: 'save as image',
                        show: true,
                    }
                }
            },
            grid: {
                top:'20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: realTimeDataView.valueDescriptorCategory
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [{
                name: deviceName,
                type: 'line',
                areaStyle: {},
                data: realTimeDataView.valueDescriptorSeriesData
            }]
        };
        valueDescriptorChart.setOption(valueDescriptorChartOption);
        valueDescriptorChart.off('click');
        valueDescriptorChart.on('click',  function(param) {
            var deviceName = param.seriesName;
            realTimeDataView.findDeviceValueDescriptorByDeviceName(deviceName, function (valueDesc) {
                realTimeDataView.displayDeviceValueDescData(valueDesc);
            });
        });
    }

    RealTimeDataView.prototype.displayDeviceEventData = function(events){
        $("#device-event-list-realtimedata table tbody").empty();
        $("#device-event-list-realtimedata table tfoot").hide();
        if (!events || events.length == 0) {
            $("#device-event-list-realtimedata table tfoot").show();
            return;
        }
        $.each(events,function(index,value){
            var rowData = "<tr>";
            rowData += "<td>" + (index + 1) +"</td>";
            rowData += "<td>" +  value.id + "</td>";
            rowData += "<td>" +  value.device + "</td>";
            rowData += "<td>" +  value.tags['Gateway-id'] + "</td>";
            rowData += "<td>" +  value.tags.Latitude + "</td>";
            rowData += "<td>" +  value.tags.Longitude + "</td>";
            rowData += "<td>" +  dateToString(value.created) + "</td>";
            rowData += "</tr>";
            $("#device-event-list-realtimedata table tbody").append(rowData);
        });
        $("#device-event-list-realtimedata").show();

    }

    RealTimeDataView.prototype.displayDeviceValueDescData = function(valueDesc){
        $("#device-valuedesc-list-realtimedata table tbody").empty();
        $("#device-valuedesc-list-realtimedata table tfoot").hide();
        if (!valueDesc || valueDesc.length == 0) {
            $("#device-valuedesc-list-realtimedata table tfoot").show();
            return;
        }
        $.each(valueDesc,function(index,value){
            var rowData = "<tr>";
            rowData += "<td>" + (index + 1) +"</td>";
            rowData += "<td>" +  value.id + "</td>";
            rowData += "<td>" +  dateToString(value.created) + "</td>";
            rowData += "<td>" +  value.description + "</td>";
            rowData += "<td>" +  value.name + "</td>";
            rowData += "<td>" +  value.min + "</td>";
            rowData += "<td>" +  value.max + "</td>";
            rowData += "<td>" +  value.defaultValue + "</td>";
            rowData += "<td>" +  value.type + "</td>";
            rowData += "<td>" +  value.uomLabel + "</td>";
            rowData += "<td>" +  value.formatting + "</td>";
            rowData += "</tr>";
            $("#device-valuedesc-list-realtimedata table tbody").append(rowData);
        });
        $("#device-valuedesc-list-realtimedata").show();

    }

    return realTimeDataView;
}());
