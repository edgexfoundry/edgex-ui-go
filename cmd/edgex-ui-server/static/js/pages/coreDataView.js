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

$(document).ready(function () {
    orgEdgexFoundry.coreDataView.loadSankeyChart();
    $("#device-list").hide();
    $("#device-service-list").hide();
    $("#device-profile-list").hide();
    $("#device-service-addressable").hide();
    $("#device-event-list").hide();
    $("#device-reading-list").hide();
});

orgEdgexFoundry.coreDataView = (function () {
    "use strict";
    function CoreDataView() {
        this.firstDevice = null;
        this.deviceList = [];
        this.serviceName = '';
        this.profileName = '';
        this.sankeyDataTemplate = [];
        this.sankeyLineTemplate = [];
        this.lineCategoryTemplate = [];
        this.lineReadingDataTemplate = [];
        this.lineEventDataTemplate = [];
        this.pieLegendData = [];
        this.pieReadingData = [];
        this.pieValueDescriptorData = [];

    }
    CoreDataView.prototype = {
        constructor:CoreDataView,
        loadSankeyChart: null,
        writeSankeyChart: null,
        loadLineChart: null,
        writeLineChart: null,
        loadPieChart: null,
        writePieChart: null,
        loadDeviceService: null,
        loadDeviceByServiceName: null,
        loadDeviceByProfileName: null,
        loadDeviceProfile: null,
        getDeviceByName: null,
        getDeviceProfileByName: null,
        getDeviceServiceByName: null,
        getEventById: null,
        findDeviceEventByDeviceId: null,
        findDeviceReadingByDeviceId: null,
        findDeviceValueDescriptorByDeviceId: null,
        displayDeviceData: null,
        displayDeviceProfileData: null,
        displayDeviceServiceData: null,
        displayDeviceEventData: null,
        displayDeviceReadingData: null,
        hideServiceAddressablePanel: null,
        renderDeviceList: null
    };

    var coreDataView = new CoreDataView();

    CoreDataView.prototype.findDeviceEventByDeviceId = function(deviceId,callback){
        $.ajax({
            url: '/core-data/api/v1/event/device/'+deviceId+'/9999',
            type: 'GET',
            async: false,
            success: function(events){
                callback(events);
            }
        })
    }

    CoreDataView.prototype.getEventById = function(id,callback){
        $.ajax({
            url: '/core-data/api/v1/event/'+id,
            type: 'GET',
            async: false,
            success: function(event){
                callback(event);
            }
        })
    }

    CoreDataView.prototype.findDeviceReadingByDeviceId = function(deviceId,callback){
        $.ajax({
            url: '/core-data/api/v1/reading/device/'+deviceId+'/9999',
            type: 'GET',
            async: false,
            success: function(readings){
                callback(readings);
            }
        })
    }

    CoreDataView.prototype.findDeviceValueDescriptorByDeviceId = function(deviceId,callback){
        $.ajax({
            url: '/core-data/api/v1/valuedescriptor/deviceid/'+deviceId,
            type: 'GET',
            async: false,
            success: function(valueDescriptor){
                callback(valueDescriptor);
            }
        })
    }

    CoreDataView.prototype.loadDeviceService = function(callback){
        $.ajax({
            url: '/core-metadata/api/v1/deviceservice',
            type: 'GET',
            success: function(data){
                coreDataView.deviceServiceData = data;
                callback(data);
            }
        });
    }

    CoreDataView.prototype.loadDeviceByServiceName = function(callback){
        $.ajax({
            url: '/core-metadata/api/v1/device/servicename/' + coreDataView.serviceName,
            type: 'GET',
            success: function(data){
                coreDataView.deviceData = data;
                callback(data);
            }
        });
    }

    CoreDataView.prototype.loadDeviceByProfileName = function(callback){
        $.ajax({
            url: '/core-metadata/api/v1/device/profilename/' + coreDataView.profileName,
            type: 'GET',
            success: function(data){
                coreDataView.deviceData = data;
                callback(data);
            }
        });
    }

    CoreDataView.prototype.loadDeviceProfile = function(callback){
        $.ajax({
            url: '/core-metadata/api/v1/deviceprofile',
            type: 'GET',
            success: function(data){
                coreDataView.deviceprofileData = data;
                callback(data);
            }
        });
    }

    CoreDataView.prototype.getDeviceByName = function(deviceName,callback){
        $.ajax({
            url: '/core-metadata/api/v1/device/name/' + deviceName,
            type: 'GET',
            success: function(data){
                callback(data);
            }
        });
    }

    CoreDataView.prototype.getDeviceProfileByName = function(profileName,callback){
        $.ajax({
            url: '/core-metadata/api/v1/deviceprofile/name/' + profileName,
            type: 'GET',
            success: function(data){
                callback(data);
            }
        });
    }

    CoreDataView.prototype.getDeviceServiceByName = function(serviceName,callback){
        $.ajax({
            url: '/core-metadata/api/v1/deviceservice/name/' + serviceName,
            type: 'GET',
            success: function(data){
                callback(data);
            }
        });
    }

    CoreDataView.prototype.loadSankeyChart = function(){
        var readyState = 0;
        CoreDataView.prototype.loadDeviceService(function (deviceServiceData) {
            deviceServiceData.forEach(function(deviceService) {
                coreDataView.serviceName = deviceService.name;
                coreDataView.sankeyDataTemplate.push({
                    "name": 'service:' + deviceService.name,
                    "itemStyle": {
                        "normal": {
                            "color": "#F89746",
                            "borderColor": "#F89746"
                        }
                    }
                });
                CoreDataView.prototype.loadDeviceByServiceName(function (deviceData) {
                    if(deviceData.length >0 && coreDataView.firstDevice == null){
                        coreDataView.firstDevice = deviceData[0];
                        CoreDataView.prototype.loadLineChart();
                        CoreDataView.prototype.displayDeviceData();
                    }

                    (function loop(index) {
                        coreDataView.deviceList.push(deviceData[index]);
                        coreDataView.sankeyDataTemplate.push({
                            "name": 'device:' + deviceData[index].name,
                            "itemStyle": {
                                "normal": {
                                    "color": "#009DD9",
                                    "borderColor": "#009DD9"
                                }
                            }
                        });
                        coreDataView.sankeyDataTemplate.push({
                            "name": 'profile:' + deviceData[index].profile.name,
                            "itemStyle": {
                                "normal": {
                                    "color": "#956251",
                                    "borderColor": "#956251"
                                }
                            }
                        });
                        coreDataView.sankeyLineTemplate.push({
                            "source": 'service:' + deviceService.name,
                            "target": 'device:' + deviceData[index].name,
                            "value": 99
                        });
                        coreDataView.sankeyLineTemplate.push({
                            "source": 'device:' + deviceData[index].name,
                            "target": 'profile:' + deviceData[index].profile.name,
                            "value": 99
                        });
                        if (++index<deviceData.length) {
                            loop(index);
                        } else {
                            readyState += 1;
                        }
                    })(0);
                });
            });

            var interval = setInterval(function(){
                if(readyState == deviceServiceData.length){
                    clearInterval(interval);
                    coreDataView.sankeyDataTemplate = UniqueArr(coreDataView.sankeyDataTemplate);
                    coreDataView.sankeyLineTemplate = UniqueArr(coreDataView.sankeyLineTemplate);
                    CoreDataView.prototype.writeSankeyChart();
                    CoreDataView.prototype.loadPieChart();
                }
            }, 1000);
        });
    }

    CoreDataView.prototype.writeSankeyChart = function(){
        var sankChart = echarts.init(document.getElementById('sankChart'));
        var sankChartOption ={
            series: {
                type: 'sankey',
                layout: 'none',
                focusNodeAdjacency: 'allEdges',
                data:coreDataView.sankeyDataTemplate,
                links:coreDataView.sankeyLineTemplate
            }
        };
        sankChart.setOption(sankChartOption);
        sankChart.on('click', function (param) {
            if(param.dataType == "node"){
                var type = param.name.split(":")[0];
                if(type == "device"){
                    CoreDataView.prototype.getDeviceByName(param.name.split(":")[1],function (deviceData) {
                        coreDataView.firstDevice = deviceData;
                        CoreDataView.prototype.loadLineChart();
                        CoreDataView.prototype.displayDeviceData();
                    });
                }else if(type == "service"){
                    CoreDataView.prototype.getDeviceServiceByName(param.name.split(":")[1],function (serviceData) {
                        CoreDataView.prototype.displayDeviceServiceData(serviceData);
                    });
                }else if(type == "profile"){
                    CoreDataView.prototype.getDeviceProfileByName(param.name.split(":")[1],function (profileData) {
                        CoreDataView.prototype.displayDeviceProfileData(profileData);
                    });
                }
            }else if(param.dataType == "edge"){

            }
        });
    }

    CoreDataView.prototype.loadLineChart = function(){
        coreDataView.lineCategoryTemplate = [];
        $.when(coreDataView.findDeviceEventByDeviceId(coreDataView.firstDevice.id,function (events) {
                coreDataView.lineEventDataTemplate = events;
            }),
            coreDataView.findDeviceReadingByDeviceId(coreDataView.firstDevice.id,function (readings) {
                coreDataView.lineReadingDataTemplate = readings;
            })
        ).done(function () {// Determine category data array
            $.each(coreDataView.lineEventDataTemplate,function (index,value) {
                coreDataView.lineCategoryTemplate.push(getDayFormTimestamp(value.created))
            });
            $.each(coreDataView.lineReadingDataTemplate,function (index,value) {
                coreDataView.lineCategoryTemplate.push(getDayFormTimestamp(value.created))
            });
        }).done(function () {// Group event and reading's count by date
            coreDataView.lineCategoryTemplate = UniqueArr(coreDataView.lineCategoryTemplate).sort();
            var eventCountArr = [];
            var readingCountArr = [];
            if(coreDataView.lineCategoryTemplate != null && coreDataView.lineCategoryTemplate.length >0){
                (function loopCategory(indexCategory) {
                    var date = new Date(Date.parse(coreDataView.lineCategoryTemplate[indexCategory].replace(/-/g, "/")));
                    date = date.getTime();
                    var tomorrowTimestamp = date+24*60*60*1000;

                    var eventCount = 0;
                    var readingCount = 0;
                    (function loopEvent(index) {
                        if(date<=coreDataView.lineEventDataTemplate[index].created && coreDataView.lineEventDataTemplate[index].created<tomorrowTimestamp){
                            eventCount++;
                        }
                        if (++index<coreDataView.lineEventDataTemplate.length) {
                            loopEvent(index);
                        } else {
                            eventCountArr.push(eventCount);
                        }
                    })(0);

                    (function loopReading(index) {
                        if(date<=coreDataView.lineReadingDataTemplate[index].created && coreDataView.lineReadingDataTemplate[index].created<tomorrowTimestamp){
                            readingCount++;
                        }
                        if (++index<coreDataView.lineReadingDataTemplate.length) {
                            loopReading(index);
                        } else {
                            readingCountArr.push(readingCount)
                        }
                    })(0);

                    if (++indexCategory<coreDataView.lineCategoryTemplate.length) {
                        loopCategory(indexCategory);
                    } else {
                        coreDataView.lineEventDataTemplate = eventCountArr;
                        coreDataView.lineReadingDataTemplate = readingCountArr;
                    }
                })(0);
            }
        }).then(function () {
            CoreDataView.prototype.writeLineChart();
        });
    }

    function getDayFormTimestamp(da){
        da = new Date(da);
        return [da.getFullYear(),da.getMonth()+1,da.getDate()].join('-');
    }

    CoreDataView.prototype.writeLineChart = function(){
        var lineChart = echarts.init(document.getElementById('lineChart'));
        var lineChartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['event', 'reading']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: coreDataView.lineCategoryTemplate
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'event',
                    type: 'bar',
                    stack: 'core data',
                    data: coreDataView.lineEventDataTemplate
                },
                {
                    name: 'reading',
                    type: 'bar',
                    stack: 'core data',
                    data: coreDataView.lineReadingDataTemplate
                }
            ]
        };
        lineChart.setOption(lineChartOption);
    }

    CoreDataView.prototype.loadPieChart = function(){
        var promises = $.each(coreDataView.deviceList,function(i, elem) {
            var deviceName = elem.name;
            coreDataView.pieLegendData.push(deviceName);
            coreDataView.findDeviceReadingByDeviceId(elem.id,function (readings) {
                coreDataView.pieReadingData.push({value: readings.length, name: deviceName});
            });
            coreDataView.findDeviceValueDescriptorByDeviceId(elem.id,function (valueDescriptor) {
                coreDataView.pieValueDescriptorData.push({value: valueDescriptor.length, name: deviceName});
            });
        });

        $.when.apply($, promises).done(function() {
            CoreDataView.prototype.writePieChart();
        });
    }

    CoreDataView.prototype.writePieChart = function(){

        var myChart2 = echarts.init(document.getElementById('main2'));

        var option2 = {
            title: {
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: coreDataView.pieLegendData
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: 'readings',
                    type: 'pie',
                    radius: [20, 110],
                    center: ['25%', '50%'],
                    roseType: 'area',
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: coreDataView.pieReadingData
                },
                {
                    name: 'readings per name',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['75%', '50%'],
                    roseType: 'area',
                    data: coreDataView.pieValueDescriptorData
                }
            ]
        };

        myChart2.setOption(option2);
    }

    CoreDataView.prototype.displayDeviceData = function(){
        $("#device-service-list").hide();
        $("#device-profile-list").hide();
        $("#device-service-addressable").hide();
        $("#device-event-list").hide();
        $("#device-reading-list").hide();
        $("#device-list").show();
        $("#device-list table tbody").empty();
        $("#device-list table tfoot").hide();
        if(coreDataView.firstDevice == null){
            $("#device-list table tfoot").show();
            return;
        }
        var rowData = "<tr>";
        rowData += "<td>" + 1 +"</td>";
        rowData += "<td>" +  coreDataView.firstDevice.id + "</td>";
        rowData += "<td>" +  coreDataView.firstDevice.name + "</td>";
        rowData += "<td>" +  coreDataView.firstDevice.description + "</td>";
        if (coreDataView.firstDevice.labels) {
            rowData += "<td>" + coreDataView.firstDevice.labels.join(',') + "</td>";
        } else {
            rowData += "<td>" + "</td>";
        }
        rowData += "<td>" +  coreDataView.firstDevice.profile.name + "</td>";
        rowData += "<td>" +  coreDataView.firstDevice.operatingState + "</td>";
        rowData += "<td>" +  coreDataView.firstDevice.adminState + "</td>";
        rowData += '<td class="device-event-icon"><input type="hidden" value=\''+coreDataView.firstDevice.id+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
        rowData += '<td class="device-reading-icon"><input type="hidden" value=\''+coreDataView.firstDevice.id+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
        rowData += "<td>" +  dateToString(coreDataView.firstDevice.created) + "</td>";
        rowData += "<td>" +  dateToString(coreDataView.firstDevice.modified) + "</td>";
        rowData += "</tr>";
        $("#device-list table tbody").append(rowData);

        $(".device-event-icon").on('click',function(){
            coreDataView.findDeviceEventByDeviceId($(this).children('input[type="hidden"]').val(), function (devices) {
                CoreDataView.prototype.displayDeviceEventData(devices);
            });
        });

        $(".device-reading-icon").on('click',function(){
            coreDataView.findDeviceReadingByDeviceId($(this).children('input[type="hidden"]').val(), function (devices) {
                CoreDataView.prototype.displayDeviceReadingData(devices);
            });
        });
    }

    CoreDataView.prototype.displayDeviceServiceData = function(deviceService){
        $("#device-list").hide();
        $("#device-profile-list").hide();
        $("#device-service-addressable").hide();
        $("#device-event-list").hide();
        $("#device-reading-list").hide();
        $("#device-service-list").show();
        $("#device-service-list table tbody").empty();
        $("#device-service-list table tfoot").hide();
        if(coreDataView.firstDevice == null){
            $("#device-service-list table tfoot").show();
            return;
        }

        var rowData = "<tr>";
        rowData += "<td>" + 1 +"</td>";
        rowData += "<td>" +  deviceService.id + "</td>";
        rowData += "<td>" +  deviceService.name + "</td>";
        rowData += "<td>" +  (deviceService.description?deviceService.description:"") + "</td>";
        rowData += "<td>" +  (deviceService.labels?deviceService.labels.join(','):"") + "</td>";
        rowData += '<td class="addressable-search-icon"><input type="hidden" value=\''+JSON.stringify(deviceService.addressable)+'\'>' + '<i class="fa fa-search-plus fa-lg"></i>' + '</td>';
        rowData += "<td>" +  deviceService.operatingState + "</td>";
        rowData += "<td>" +  deviceService.adminState + "</td>";
        rowData += '<td class="service-included-icon"><input type="hidden" value=\''+deviceService.name+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
        rowData += "<td>" +  dateToString(deviceService.created) + "</td>";
        rowData += "<td>" +  dateToString(deviceService.modified) + "</td>";
        rowData += "</tr>";
        $("#device-service-list table tbody").append(rowData);

        $(".addressable-search-icon").on('click',function(){
            var addressable = JSON.parse($(this).children('input[type="hidden"]').val());
            $("#device-service-addressable table tbody").empty();
            var rowData = "<tr class='warning'>";
            rowData += "<td>" +  addressable.id + "</td>";
            rowData += "<td>" +  addressable.name + "</td>";
            rowData += "<td>" +  addressable.protocol + "</td>";
            rowData += "<td>" +  addressable.address + "</td>";
            rowData += "<td>" +  addressable.port + "</td>";
            rowData += "<td>" +  addressable.path + "</td>";
            rowData += "<td>" +  dateToString(addressable.created) + "</td>";
            rowData += "<td>" +  dateToString(addressable.modified) + "</td>";
            rowData += "</tr>";
            $("#device-service-addressable table tbody").append(rowData);
            $("#device-service-addressable").show();
        });

        $(".service-included-icon").on('click',function(){
            coreDataView.serviceName = $(this).children('input[type="hidden"]').val();
            coreDataView.loadDeviceByServiceName(function (devices) {
                CoreDataView.prototype.renderDeviceList(devices);
            });
        });

    }

    CoreDataView.prototype.renderDeviceList = function(devices){
        $("#device-list table tbody").empty();
        $("#device-list table tfoot").hide();
        $("#device-event-list").hide();
        $("#device-reading-list").hide();
        if (!devices || devices.length == 0) {
            $("#device-list table tfoot").show();
            return;
        }
        $.each(devices,function(index,value){
            var rowData = "<tr>";
            rowData += "<td>" + (index + 1) +"</td>";
            rowData += "<td>" +  value.id + "</td>";
            rowData += "<td>" +  value.name + "</td>";
            rowData += "<td>" +  value.description + "</td>";
            if (value.labels) {
                rowData += "<td>" + value.labels.join(',') + "</td>";
            } else {
                rowData += "<td>" + "</td>";
            }
            rowData += "<td>" +  value.profile.name + "</td>";
            rowData += "<td>" +  value.operatingState + "</td>";
            rowData += "<td>" +  value.adminState + "</td>";
            rowData += '<td class="device-event-icon"><input type="hidden" value=\''+value.id+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
            rowData += '<td class="device-reading-icon"><input type="hidden" value=\''+value.id+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
            rowData += "<td>" +  dateToString(value.created) + "</td>";
            rowData += "<td>" +  dateToString(value.modified) + "</td>";
            rowData += "</tr>";
            $("#device-list table tbody").append(rowData);
        });
        $("#device-list").show();

        $(".device-event-icon").on('click',function(){
            coreDataView.findDeviceEventByDeviceId($(this).children('input[type="hidden"]').val(), function (devices) {
                CoreDataView.prototype.displayDeviceEventData(devices);
            });
        });

        $(".device-reading-icon").on('click',function(){
            coreDataView.findDeviceReadingByDeviceId($(this).children('input[type="hidden"]').val(), function (devices) {
                CoreDataView.prototype.displayDeviceReadingData(devices);
            });
        });
    }

    CoreDataView.prototype.displayDeviceEventData = function(events){
        $("#device-event-list table tbody").empty();
        $("#device-event-list table tfoot").hide();
        if (!events || events.length == 0) {
            $("#device-event-list table tfoot").show();
            return;
        }
        $.each(events,function(index,value){
            var rowData = "<tr>";
            rowData += "<td>" + (index + 1) +"</td>";
            rowData += "<td>" +  value.id + "</td>";
            rowData += "<td>" +  value.device + "</td>";
            rowData += '<td class="device-reading-one-icon"><input type="hidden" value=\''+value.id+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
            rowData += "<td>" +  value.tags['Gateway-id'] + "</td>";
            rowData += "<td>" +  value.tags.Latitude + "</td>";
            rowData += "<td>" +  value.tags.Longitude + "</td>";
            rowData += "<td>" +  dateToString(value.created) + "</td>";
            rowData += "</tr>";
            $("#device-event-list table tbody").append(rowData);
        });
        $("#device-event-list").show();

        $(".device-reading-one-icon").on('click',function(){
            coreDataView.getEventById($(this).children('input[type="hidden"]').val(), function (event) {
                CoreDataView.prototype.displayDeviceReadingData(event.readings);
            });
        });
    }

    CoreDataView.prototype.displayDeviceReadingData = function(readings){
        $("#device-reading-list table tbody").empty();
        $("#device-reading-list table tfoot").hide();
        if (!readings || readings.length == 0) {
            $("#device-reading-list table tfoot").show();
            return;
        }
        $.each(readings,function(index,value){
            var rowData = "<tr>";
            rowData += "<td>" + (index + 1) +"</td>";
            rowData += "<td>" +  value.id + "</td>";
            rowData += "<td>" +  value.device + "</td>";
            rowData += "<td>" +  value.name + "</td>";
            rowData += "<td>" +  value.value + "</td>";
            rowData += "<td>" +  dateToString(value.created) + "</td>";
            rowData += "</tr>";
            $("#device-reading-list table tbody").append(rowData);
        });
        $("#device-reading-list").show();
    }

    CoreDataView.prototype.hideServiceAddressablePanel = function(){
        $("#device-service-addressable").hide();
    }

    CoreDataView.prototype.displayDeviceProfileData = function(deviceProfile){
        $("#device-list").hide();
        $("#device-service-list").hide();
        $("#device-service-addressable").hide();
        $("#device-event-list").hide();
        $("#device-reading-list").hide();
        $("#device-profile-list").show();
        $("#device-profile-list table tbody").empty();
        $("#device-profile-list table tfoot").hide();
        if(coreDataView.firstDevice == null){
            $("#device-profile-list table tfoot").show();
            return;
        }
        var rowData = "<tr>";
        rowData += "<td>" + 1 +"</td>";
        rowData += "<td>" +  deviceProfile.id + "</td>";
        rowData += "<td>" +  deviceProfile.name + "</td>";
        rowData += "<td>" +  deviceProfile.description + "</td>";
        rowData += "<td>" +  deviceProfile.labels.join(',') + "</td>";
        rowData += '<td class="profile-included-icon"><input type="hidden" value=\''+deviceProfile.name+'\'>' + '<i class="fa fa-sitemap fa-lg"></i>' + '</td>';
        rowData += "<td>" +  dateToString(deviceProfile.created) + "</td>";
        rowData += "<td>" +  dateToString(deviceProfile.modified) + "</td>";
        rowData += "</tr>";
        $("#device-profile-list table tbody").append(rowData);

        $(".profile-included-icon").on('click',function(){
            coreDataView.profileName = $(this).children('input[type="hidden"]').val();
            coreDataView.loadDeviceByProfileName(function (devices) {
                CoreDataView.prototype.renderDeviceList(devices);
            });
        });

    }

    return coreDataView;
}());