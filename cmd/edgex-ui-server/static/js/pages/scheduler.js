$(document).ready(function(){
  orgEdgexFoundry.supportScheduler.loadSchedulerList();
  orgEdgexFoundry.supportScheduler.loadScheduleEventList();
});

//init scheduler object
orgEdgexFoundry.supportScheduler = (function(){
  "use strict";

  function SupportScheduler(){
      this.schedulerNameList = [];
      this.scheduleEventTarget = {
          'core-command' : {
              'Alias' : 'core-command'
          },
          'customized' : {
              'Alias' : 'customized'
          }
      };
      this.scheduleEventTargetHttpMethod = [
          {
              'Value' : 'GET',
              'Text' : 'GET'
          },
          {
              'Value' : 'POST',
              'Text' : 'POST'
          },
          {
              'Value' : 'PUT',
              'Text' : 'PUT'
          },
          {
              'Value' : 'DELETE',
              'Text' : 'DELETE'
          }
      ];
  };

  SupportScheduler.prototype = {
    constructor: SupportScheduler,
    loadSchedulerList: null,
    renderSchedulerList: null,

    loadScheduleEventList: null,
    renderScheduleEventList: null,

    deleteSchedulerBtn: null,
    addSchedulerBtn: null,
    cancelAddSchedulerBtn: null,
    commitSchedulerBtn: null,
    editSchedulerBtn: null,
    refreshSchedulerListBtn: null,

    deleteScheduleEventBtn: null,
    addScheduleEventBtn: null,
    updateScheduleEventBtn: null,
    commitScheduleEventBtn: null,
    cancelAddScheduleEventBtn: null,
    refreshScheduleEventListBtn: null,

    hidenAdressableBtn:null,
  };

  var scheduler = new SupportScheduler();

  //===================schedule section begin===================================

  SupportScheduler.prototype.loadSchedulerList = function(){
    $.ajax({
      url:'/support-scheduler/api/v1/interval',
      type:'GET',
      success:function(data){
        if(!data || data.length == 0){
          $("#edgex-support-scheduler-list table tfoot").show();
          return
        }
        if(data){
            scheduler.schedulerNameList = data.map(obj => {return obj.name});
        }
        scheduler.renderSchedulerList(data);
      },
      error:function(){

      }
    });
  };
  SupportScheduler.prototype.renderSchedulerList = function(data){
    $("#edgex-support-scheduler-list table tbody").empty();
    $.each(data,function(i,v){
      var rowData = "<tr>";
      rowData += '<td class="scheduler-delete-icon"><input type="hidden" value="'+v.id+'"><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += '<td class="scheduler-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td><input type="radio" name="schedulerRadio" value="'+v.id+'"></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
      rowData += "<td>" +  (v.start?v.start:"") + "</td>";
      rowData += "<td>" +  (v.end?v.end:"") + "</td>";
      rowData += "<td>" +  (v.frequency?v.frequency:"") + "</td>";
      rowData += "<td>" +  (v.cron?v.cron:"") + "</td>";
      rowData += "<td>" +  (v.runOnce?"true":"false") + "</td>";
      rowData += "<td>" +  (v.Timestamps.created?dateToString(v.Timestamps.created):"") + "</td>";
      rowData += "<td>" +  (v.Timestamps.modified?dateToString(v.Timestamps.modified):"") + "</td>";
      rowData += "</tr>";
      $("#edgex-support-scheduler-list table tbody").append(rowData);
    });
    $(".scheduler-delete-icon").on('click',function(){
        scheduler.deleteSchedulerBtn($(this).children("input[type='hidden']").val());

    });
    $(".scheduler-edit-icon").on('click',function(){
        scheduler.editSchedulerBtn($(this).children("input[type='hidden']").val());
    });
  };

    function renderSchedulerForm() {
        $("#edgex-support-scheduler-add-or-update input[name='schedulerStart']").flatpickr({
            dateFormat: "Y-m-d H:i:S",
            enableTime: true,
            enableSeconds: true,
            time_24hr: true,
            allowInput: false,
            defaultDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        });
        $("#edgex-support-scheduler-add-or-update input[name='schedulerEnd']").flatpickr({
            dateFormat: "Y-m-d H:i:S",
            enableTime: true,
            enableSeconds: true,
            time_24hr: true,
            allowInput: false
        });
        $("#edgex-support-scheduler-add-or-update select[name ='schedulerRunOnce']").on('change', function () {
            var value = $(this).val();
            if (value == 'false') {
                $(".scheduler-interval-format").show();
            } else {
                $(".scheduler-interval-format").hide();
            }
        });

        $("input[type='radio'][name='schedulerIntervalFormatRadio']").on('change', function () {
            if (this.value == 'frequency') {
                $(".scheduler-interval-format input[name='schedulerFrequencyTextInput']").prop('disabled', false);
                $(".scheduler-interval-format input[name='schedulerCronTextInput']").prop('disabled', true);
            }
            else if (this.value == 'cron') {
                $(".scheduler-interval-format input[name='schedulerFrequencyTextInput']").prop('disabled', true);
                $(".scheduler-interval-format input[name='schedulerCronTextInput']").prop('disabled', false);
            }
        });
        $("input[name=schedulerIntervalFormatRadio][value='frequency']").click();
    };


    SupportScheduler.prototype.addSchedulerBtn = function(){
        renderSchedulerForm();
        $("#edgex-support-scheduler-add-or-update .update-scheduler").hide();
        $("#edgex-support-scheduler-add-or-update .add-scheduler").show();
        $("#edgex-support-scheduler-add-or-update").show();
  };

  SupportScheduler.prototype.commitSchedulerBtn = function(type){
    var schedulerData = {
      name: $("#edgex-support-scheduler-add-or-update form input[name='schedulerName']").val(),
      start: $("#edgex-support-scheduler-add-or-update form input[name='schedulerStart']").val(),
      end: $("#edgex-support-scheduler-add-or-update form input[name='schedulerEnd']").val(),
      runOnce: false,
      frequency: "",
    };
    //NOTICE:
    // Due to time zone issue, start time and end time conditions temporarily unavailable.
    // var startTimeVal = $("#edgex-support-scheduler-add-or-update form input[name='schedulerStart']").val();
    // var endTimeVal = $("#edgex-support-scheduler-add-or-update form input[name='schedulerEnd']").val();
    var startTimeVal = "";
    var endTimeVal = "";
    if(startTimeVal != ""){
      schedulerData.start = new Date(startTimeVal).Format("yyyyMMddThhmmss");
    }else{
      schedulerData.start = "";
    }
    if(endTimeVal != ""){
      schedulerData.end = new Date(endTimeVal).Format("yyyyMMddThhmmss");
    }else{
      schedulerData.end = "";
    }
    var runOnce = $("#edgex-support-scheduler-add-or-update form select[name='schedulerRunOnce']").val();
    schedulerData.runOnce = runOnce == "false"?false:true;
    if(!schedulerData.runOnce){
        var frequencyVal = $("#edgex-support-scheduler-add-or-update form input[name='schedulerFrequencyTextInput']").val();
        var frequencyUnit = $("#edgex-support-scheduler-add-or-update form select[name='schedulerFrequencyUnitSelect']").val();
        frequencyVal = frequencyVal != "" ? frequencyVal : "1.0";
        schedulerData.frequency = frequencyVal + frequencyUnit;
        schedulerData.cron = $("#edgex-support-scheduler-add-or-update form input[name='schedulerCronTextInput']").val();
    }
    if(type=="new"){
      commitScheduler(schedulerData);
    }else{
      schedulerData.id = $("#edgex-support-scheduler-add-or-update form input[name='schedulerId']").val();
      updateScheduler(schedulerData);
    }
  };

  function resetSchedulerForm(){
      //clear data
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerId']").val("");
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerName']").val("");
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerStart']").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerEnd']").val("");
    $("#edgex-support-scheduler-add-or-update form select[name='schedulerRunOnce']").val("false");
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerIntervalFormatRadio'][value='frequency']").attr('checked','true');
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerFrequencyTextInput']").val("");
    $("#edgex-support-scheduler-add-or-update form select[name='schedulerFrequencyUnitSelect']").val("h");
    $("#edgex-support-scheduler-add-or-update form input[name='schedulerCronTextInput']").val("");
    $(".scheduler-interval-format").show();
  };

  function commitScheduler(schedulerData){
    $.ajax({
      url: '/support-scheduler/api/v1/interval',
      type: 'POST',
      data: JSON.stringify(schedulerData),
      success: function(){
        scheduler.cancelAddSchedulerBtn();
        scheduler.loadSchedulerList();
        bootbox.alert({
          message: "Add Scheduler Success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        400: function(err){
          bootbox.alert({
            title:'Error',
            message: "malformed or unparsable requests ! " + err.responseText,
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
            title:'Error',
            message: "if the start, end, or frequency strings are not properly formatted or if the name is determined to not be unique with regard to others !",
            className: 'red-green-buttons'
          });
        },
        500: function(err){
          bootbox.alert({
            title:'Error',
            message: "unknown or unanticipated issues ! " + + err.responseText,
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  function updateScheduler(schedulerData){
    $.ajax({
      url: '/support-scheduler/api/v1/interval',
      type: 'PUT',
      data: JSON.stringify(schedulerData),
      success: function(){
        scheduler.cancelAddSchedulerBtn();
        scheduler.loadSchedulerList();
        bootbox.alert({
          message: "Update Scheduler Success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        400: function(){
          bootbox.alert({
            title:'Error',
            message: "malformed or unparsable requests !",
            className: 'red-green-buttons'
          });
        },
        404: function(){
          bootbox.alert({
            title:'Error',
            message: "no schedule is found for the id !",
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
            title:'Error',
            message: "the start, end, or frequency strings are not properly formatted !",
            className: 'red-green-buttons'
          });
        },
        500: function(){
          bootbox.alert({
            message: "unknown or unanticipated issues !",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  SupportScheduler.prototype.cancelAddSchedulerBtn = function(){
      $("#edgex-support-scheduler-add-or-update").hide();
      resetSchedulerForm();
  };

  SupportScheduler.prototype.refreshSchedulerListBtn = function(){
      scheduler.loadSchedulerList();
  };

  SupportScheduler.prototype.editSchedulerBtn = function(scheduler){
      renderSchedulerForm();
      var schedulerItem = JSON.parse(scheduler);
      $("#edgex-support-scheduler-add-or-update form input[name='schedulerId']").val(schedulerItem.id?schedulerItem.id:"");
      $("#edgex-support-scheduler-add-or-update form input[name='schedulerName']").val(schedulerItem.name?schedulerItem.name:"");
      var startTime = "";
      if(schedulerItem.start != undefined && schedulerItem.start != ""){
        startTime = ISO8601FormatToDate(schedulerItem.start).Format("yyyy-MM-dd hh:mm:ss");
      }
      $("#edgex-support-scheduler-add-or-update form input[name='schedulerStart']").val(startTime);
      var endTime = "";
      if(schedulerItem.end != undefined && schedulerItem.end != ""){
          endTime = ISO8601FormatToDate(schedulerItem.end).Format("yyyy-MM-dd hh:mm:ss");
      }
      $("#edgex-support-scheduler-add-or-update form input[name='schedulerEnd']").val(endTime);
      var frequencyValue = '0.0';
      var frequencyUnit = 'h';
      if(schedulerItem.frequency != undefined && schedulerItem.frequency != ''){
        frequencyValue = schedulerItem.frequency.substring(0,schedulerItem.frequency.length-1);
        frequencyUnit = schedulerItem.frequency.substring(schedulerItem.frequency.length-1);
      }
      $("#edgex-support-scheduler-add-or-update form input[name='schedulerFrequencyTextInput']").val(frequencyValue);
      $("#edgex-support-scheduler-add-or-update form select[name='schedulerFrequencyUnitSelect']").val(frequencyUnit);
      $("#edgex-support-scheduler-add-or-update form input[name='schedulerCronTextInput']").val(schedulerItem.cron);
      $("#edgex-support-scheduler-add-or-update form select[name='schedulerRunOnce']").val(schedulerItem.runOnce?"true":"false");
      $("#edgex-support-scheduler-add-or-update form select[name='schedulerRunOnce']").change();

      $("#edgex-support-scheduler-add-or-update .update-scheduler").show();
      $("#edgex-support-scheduler-add-or-update .add-scheduler").hide();
      $("#edgex-support-scheduler-add-or-update").show();
  };

  SupportScheduler.prototype.deleteSchedulerBtn = function(schedulerId){
    bootbox.confirm({
      title: "confirm",
      message: "Are you sure to delete ? ",
      className: 'green-red-buttons',
      callback: function (result) {
        if (result){
          $.ajax({
            url: '/support-scheduler/api/v1/interval/' + schedulerId,
            type: 'DELETE',
            success: function(){
              scheduler.loadSchedulerList();
              bootbox.alert({
                message: "delete success.",
                className: 'red-green-buttons'
              });
            },
            statusCode: {
              503: function(){
                bootbox.alert({
                  title:'Error',
                  message: "unknown or unanticipated issues",
                  className: 'red-green-buttons'
                });
              }
            }
          });
        }
      }
    });

  };

  //===================scheduler section edn===================================

  //===================schedule event section begin============================

  SupportScheduler.prototype.loadScheduleEventList = function(){
    $.ajax({
      url:'/support-scheduler/api/v1/intervalaction',
      type:'GET',
      success:function(data){
        if(!data || data.length == 0){
          $("#edgex-support-scheduleevent-list table tfoot").show();
          return
        }
        scheduler.renderScheduleEventList(data);
      },
      error:function(){

      }
    });
  };

  SupportScheduler.prototype.renderScheduleEventList = function(data){
    $("#edgex-support-scheduleevent-list table tbody").empty();
    $.each(data,function(i,v){
      var addressable = {};
      addressable["protocol"] = v.protocol;
      addressable["httpMethod"] = v.httpMethod;
      addressable["address"] = v.address;
      addressable["port"] = v.port;
      addressable["path"] = v.path;
      addressable["url"] =  v.protocol + "://" + v.address + ":" + v.port +  v.path;
      v["addressable"] = addressable;
    });
    $.each(data,function(i,v){
      var rowData = "<tr>";
      rowData += '<td class="schedule-event-delete-icon"><input type="hidden" value="'+v.id+'"><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += '<td class="schedule-event-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td><input type="radio" name="scheduleEventRadio" value="'+v.id+'"></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td><input value="+v.name+" disabled style='outline:none;border-style:none;text-align:center;background-color:transparent;'>" + "</td>";
      rowData += "<td>" +  v.interval + "</td>";
      rowData += "<td>" +  (v.parameters?v.parameters:"") + "</td>";
      rowData += "<td>" +  v.target + "</td>";
      rowData += '<td class="schedule-address-search-icon"><input type="hidden" value=\''+JSON.stringify(v.addressable)+'\'>' + '<i class="fa fa-search-plus fa-lg"></i>' + '</td>';
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-support-scheduleevent-list table tbody").append(rowData);

    });
    $(".schedule-address-search-icon").on("click",function(){
      var v = JSON.parse($(this).children("input").val());
      var rowData = "<tr class='warning'>";
      rowData += "<td>" +  v.httpMethod+ "</td>";
      rowData += "<td>" +  v.url + "</td>";
      rowData += "</tr>";
      $("#edgex-support-scheduleevent-address table tbody").empty();
      $("#edgex-support-scheduleevent-address table tbody").append(rowData);
      $("#edgex-support-scheduleevent-address").show();
    });
    //delete
    $(".schedule-event-delete-icon").on('click',function(){
      scheduler.deleteScheduleEventBtn($(this).children("input[type='hidden']").val());
    });
    //edit
    $(".schedule-event-edit-icon").on('click',function(){
      scheduler.updateScheduleEventBtn($(this).children("input[type='hidden']").val());
    });
  };

  SupportScheduler.prototype.deleteScheduleEventBtn = function(scheduleEventId){
    bootbox.confirm({
      title: "confirm",
      message: "Are you sure to delete ? ",
      className: 'green-red-buttons',
      callback: function (result) {
        if(result){
            $.ajax({
              url: '/support-scheduler/api/v1/intervalaction/' + scheduleEventId,
              type: 'DELETE',
              success: function(){
                scheduler.loadScheduleEventList();
                bootbox.alert({
                  message: "delete success.",
                  className: 'red-green-buttons'
                });
              },
              statusCode: {
                409: function(){
                  bootbox.alert({
                    title:'Error',
                    message: "attempt to delete a schedule event still being referenced by device reports",
                    className: 'red-green-buttons'
                  });
                },
                500:function () {
                    bootbox.alert({
                        title:'Error',
                        message: "delete failure",
                        className: 'red-green-buttons'
                    });
                }
              }
            });
        }
      }
    });
  };
  SupportScheduler.prototype.updateScheduleEventBtn = function(scheduleEventStr){
      var scheduleEvent = JSON.parse(scheduleEventStr);
      var updateConfig = {
          'Id' : scheduleEvent.id,
          'Name' : scheduleEvent.name,
          'Interval' : scheduleEvent.interval,
          'Target' : scheduleEvent.target,
          'Protocol' : scheduleEvent.protocol.toUpperCase(),
          'Method' : scheduleEvent.httpMethod,
          'Address' : scheduleEvent.address,
          'Port' : scheduleEvent.port,
          'Path' : scheduleEvent.path,
          'Paramters' : scheduleEvent.parameters
      };
      updateConfig['MethodCheck'] = true;
      updateConfig['AddressCheck'] = true;
      updateConfig['PortCheck'] = true;
      updateConfig['PathCheck'] = true;
      renderScheduleEventUpdate(updateConfig);

    $("#edgex-support-scheduleevent-list-main").hide();

    $("#edgex-support-scheduleevent-add").show();
    $("#edgex-support-scheduleevent-add div.add-schedule-event").hide();
    $("#edgex-support-scheduleevent-add div.update-schedule-event").show();


  };

  SupportScheduler.prototype.addScheduleEventBtn = function(){
    renderScheduleEventAdd();
    $("#edgex-support-scheduleevent-list-main").hide();
    $("#edgex-support-scheduleevent-add").show();
    $("#edgex-support-scheduleevent-add div.add-schedule-event").show();
    $("#edgex-support-scheduleevent-add div.update-schedule-event").hide();
  };

    function resetScheduleEventAddOrUpdateForm() {
        $(".edgex-support-scheduleevent-form input[name = 'ScheduleEventId']").val("");
        $(".edgex-support-scheduleevent-form input[name = 'ScheduleEventName']").val("");
        $(".edgex-support-scheduleevent-form select[name = 'SchedulerName']").empty();
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").empty();
        resetTargetActionConfigForm();
    }

    function resetTargetActionConfigForm() {
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").empty();
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressProtocol']").val("");
        $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").empty();
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressMethodCheck']").prop('disabled', false);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddress']").val("");
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressCheck']").prop('disabled', false);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPort']").val("");
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPortCheck']").prop('disabled', false);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPath']").val("");
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPathCheck']").prop('disabled', false);
        $(".edgex-support-scheduleevent-form textarea[name = 'EventAddressParameters']").val("");
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").prop('disabled',false);
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").prop('disabled',false);
    }

    function renderScheduleEventUpdate(updateConfig) {
        $.each(scheduler.schedulerNameList, function (k, v) {
            $(".edgex-support-scheduleevent-form select[name = 'SchedulerName']").append($('<option>', {
                value: v,
                text: v,
            }));
        });

        $("#edgex-support-scheduleevent-add input[name='ScheduleEventId']").val(updateConfig['Id']);
        $("#edgex-support-scheduleevent-add input[name='ScheduleEventName']").val(updateConfig['Name']);
        $("#edgex-support-scheduleevent-add select[name='SchedulerName']").val(updateConfig['Interval']);
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").append($('<option>', {
            value: updateConfig['Target'],
            text:  updateConfig['Target'],
        }));
        //when target equals core-command,need render target action name for front end
        if(updateConfig['Target'] == 'core-command'){
            //path:/api/v1/device/a5002e47-5832-4253-bb12-78604a929189/command/0e92d7d9-e945-4cec-baaf-ef174e1353d3
            var deviceID = updateConfig['Path'].substring(1).split('/')[3];
            $.ajax({
                url: '/core-command/api/v1/device/' + deviceID,
                type: 'GET',
            }).done(function (device) {
                var ScheduleEventServiceActionValue = queryTargetActionName(device,updateConfig);
                $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").append($('<option>', {
                    value: ScheduleEventServiceActionValue,
                    text:  ScheduleEventServiceActionValue,
                }));
            });
        }

        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").prop('disabled',true);
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").prop('disabled',true);
        renderTargetActionConfigs(updateConfig);
    }
    
    function queryTargetActionName(device,scheduleEventUpdateConfig) {
        var deviceName = device['name'];
        var commandName = "";
        if(!device['commands']){
            return "";
        }
        for(var command of device['commands']){
            if(new URL(command['get']['url']).pathname == scheduleEventUpdateConfig['Path']){
                commandName = command.name;
                break;
            }
        }
        return getTargetActionName(deviceName,commandName,scheduleEventUpdateConfig['Method']);
    }
    
    function renderScheduleEventAdd() {
        $.each(scheduler.schedulerNameList, function (k, v) {
            $(".edgex-support-scheduleevent-form select[name = 'SchedulerName']").append($('<option>', {
                value: v,
                text: v,
            }));
        });
        $.each(scheduler.scheduleEventTarget, function (k, v) {
            $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").append($('<option>', {
                value: k,
                text: v.Alias,
            }));
        });

        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").off('change');
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").on('change', function () {
            resetTargetActionConfigForm();
            var targetServiceName = $(this).val();
            if (targetServiceName == 'core-command') {
                renderCoreCommandTargetActionConfigs();
            } else if (targetServiceName == 'customized') {
                renderCustomizedTargetActionConfigs();
            }
        });
        $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventService']").change();
    };

    function renderCustomizedTargetActionConfigs() {
        var config = {};
        config['Method'] = 'PUT';
        config['Address'] = '';
        config['Port'] = '';
        config['Path'] = '';
        config['Parameters'] = '';
        config['MethodCheck'] = true;
        config['AddressCheck'] = true;
        config['PortCheck'] = true;
        config['PathCheck'] = true;
        renderTargetActionConfigs(config);
    }

    function renderCoreCommandTargetActionConfigs() {
        $.ajax({
            url: '/core-command/api/v1/device',
            type: 'GET',
        }).done(function (devices) {
            if (!devices || devices.length == 0) {
                return;
            }
            var targetActionConfigs = {};
            if (devices) {
                for (var device of devices) {
                    if (device['commands']) {
                        for (var command of device['commands']) {
                            if (command['get']) {
                                var result = makeCoreCommandTargetActionConfigParams(device.name, command, "GET");
                                targetActionConfigs[result[0]] = result[1];
                            }
                            if (command['put'] && command['put']['parameterNames']) {
                                var result = makeCoreCommandTargetActionConfigParams(device.name, command, "PUT");
                                targetActionConfigs[result[0]] = result[1];
                            }
                        }
                    }
                }
            }

            $.each(targetActionConfigs, function (k, v) {
                $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").append($('<option>', {
                    value: k,
                    text: k,
                }));
            });
            $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").off('change');
            $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").on('change', function () {
                var targetActionName = $(this).val();
                renderTargetActionConfigs(targetActionConfigs[targetActionName]);
            });
            $(".edgex-support-scheduleevent-form select[name = 'ScheduleEventServiceAction']").change();
        });
    }

    function makeCoreCommandTargetActionConfigParams(deviceName, command, httpMethod) {
        var urlObj = new URL(command['get']['url']);
        var methodType = '';
        var config = {};
        if (httpMethod == 'PUT' && command['put']['parameterNames']) {
            var paramsObj = {};
            for (var paramName of command['put']['parameterNames']){
                paramsObj[paramName] = '';
            }
            config['Parameters'] = paramsObj;
        }
        config['Method'] = httpMethod;
        config['Address'] = urlObj.hostname;
        config['Port'] = urlObj.port;
        config['Path'] = urlObj.pathname;
        config['MethodCheck'] = false;
        config['AddressCheck'] = false;
        config['PortCheck'] = false;
        config['PathCheck'] = false;
        var configKey = getTargetActionName(deviceName, command['name'], httpMethod);
        return [configKey, config];
    }

    function renderTargetActionConfigs(config) {
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressMethodCheck'][type='checkbox']").off('change');
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressMethodCheck'][type='checkbox']").on('change', function () {
            if ($(this).is(':checked')) {
                $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").prop('disabled', false);
            } else {
                $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").prop('disabled', 'disabled');
            }
        });
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddressCheck'][type='checkbox']").off('change');
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddressCheck'][type='checkbox']").on('change', function () {
            if ($(this).is(':checked')) {
                $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddress']").prop('disabled', false);
            } else {
                $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddress']").prop('disabled', 'disabled');
            }
        });
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPortCheck'][type='checkbox']").off('change');
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPortCheck'][type='checkbox']").on('change', function () {
            if ($(this).is(':checked')) {
                $(".edgex-support-scheduleevent-form input[name = 'EventAddressPort']").prop('disabled', false);
            } else {
                $(".edgex-support-scheduleevent-form input[name = 'EventAddressPort']").prop('disabled', 'disabled');
            }
        });
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPathCheck'][type='checkbox']").off('change');
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPathCheck'][type='checkbox']").on('change', function () {
            if ($(this).is(':checked')) {
                $(".edgex-support-scheduleevent-form input[name = 'EventAddressPath']").prop('disabled', false);
            } else {
                $(".edgex-support-scheduleevent-form input[name = 'EventAddressPath']").prop('disabled', 'disabled');
            }
        });

        $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").empty();
        $.each(scheduler.scheduleEventTargetHttpMethod, function (i, v) {
            $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").append($('<option>', {
                value: v.Value,
                text: v.Text,
            }));
        });
        $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").off('change');
        $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").on('change',function () {
            if($(this).val() == 'GET'){
                $(".edgex-support-scheduleevent-parameters").hide();
            }else{
                $(".edgex-support-scheduleevent-parameters").show();
            }
        });

        $(".edgex-support-scheduleevent-form input[name = 'EventAddressProtocol']").val('HTTP');
        $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").val(config['Method']);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddress']").val(config['Address']);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPort']").val(config['Port']);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPath']").val(config['Path']);
        if(config['Parameters'] && config['Parameters'] != ''){
            var formattedJSONParams = JSON.stringify(config['Parameters'], null, 4);
            $(".edgex-support-scheduleevent-form textarea[name = 'EventAddressParameters']").val(formattedJSONParams);
        }
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressMethodCheck'][type = 'checkbox']").prop('checked',config['MethodCheck']);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddressCheck'][type = 'checkbox']").prop('checked',config['AddressCheck']);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPortCheck'][type = 'checkbox']").prop('checked',config['PortCheck']);
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPathCheck'][type = 'checkbox']").prop('checked',config['PathCheck']);

        $(".edgex-support-scheduleevent-form input[name = 'EventAddressMethodCheck'][type='checkbox']").change();
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressAddressCheck'][type='checkbox']").change();
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPortCheck'][type='checkbox']").change();
        $(".edgex-support-scheduleevent-form input[name = 'EventAddressPathCheck'][type='checkbox']").change();

        $(".edgex-support-scheduleevent-form select[name = 'EventAddressMethod']").change();
    }

    function getTargetActionName(deviceName, commandName, httpMethod) {
        if(httpMethod.toUpperCase() == 'GET'){
            return deviceName + " " + commandName + "(get)";
        }else{
            return deviceName + " " + commandName + "(set)";
        }
    }

  SupportScheduler.prototype.cancelAddScheduleEventBtn = function(){
      resetScheduleEventAddOrUpdateForm();
      $("#edgex-support-scheduleevent-list-main").show();
      $("#edgex-support-scheduleevent-add").hide();
  };

  SupportScheduler.prototype.commitScheduleEventBtn = function(type){
    var scheduleEvent = {
      name: $(".edgex-support-scheduleevent-form input[name='ScheduleEventName']").val().trim(),
      parameters: $(".edgex-support-scheduleevent-form textarea[name='EventAddressParameters']").val().trim(),
      target: $(".edgex-support-scheduleevent-form select[name='ScheduleEventService']").val().trim(),
      interval: $(".edgex-support-scheduleevent-form select[name='SchedulerName']").val().trim(),
      protocol: $(".edgex-support-scheduleevent-form input[name='EventAddressProtocol']").val().trim().toLowerCase(),
      httpMethod: $(".edgex-support-scheduleevent-form select[name='EventAddressMethod']").val().trim(),
      address: $(".edgex-support-scheduleevent-form input[name='EventAddressAddress']").val().trim(),
      port: parseInt($(".edgex-support-scheduleevent-form input[name='EventAddressPort']").val().trim()),
      path: $(".edgex-support-scheduleevent-form input[name='EventAddressPath']").val().trim(),
    };
    if(type == "new"){
      commitScheduleEvent(scheduleEvent,"new");
    }else{//update
      scheduleEvent['id'] = $(".edgex-support-scheduleevent-form input[name='ScheduleEventId']").val().trim();
      commitScheduleEvent(scheduleEvent,"");
    }
  };

  function commitScheduleEvent(scheduleEvent,type){
    var method ;
    if (type=="new") {
      method = "POST"
    }else{
      method = "PUT"
    }
    //debugger
    $.ajax({
      url:'/support-scheduler/api/v1/intervalaction',
      type: method,
      data:JSON.stringify(scheduleEvent),
      success:function(){
        scheduler.cancelAddScheduleEventBtn();
        scheduler.loadScheduleEventList();
        bootbox.alert({
          message: "Commit ScheduleEvent Success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        400: function(err) {
          //debugger
          bootbox.alert({
            title:'Error',
            message: err.responseText,
            className: 'red-green-buttons'
          });
        },
        404: function() {
          bootbox.alert({
            title:'Error',
            message: "the event's associated schedule is not found !",
            className: 'red-green-buttons'
          });
        },
        409: function() {
          bootbox.alert({
            title:'Error',
            message: "the schedule was not provided or if the name is determined to not be unique with regard to others !",
            className: 'red-green-buttons'
          });
        },
        500: function() {
          bootbox.alert({
            title:'Error',
            message: "unknown or unanticipated issues or scheduleevent name is a duplicate !",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  SupportScheduler.prototype.refreshScheduleEventListBtn = function(){
    scheduler.loadScheduleEventList();
  };

  SupportScheduler.prototype.hidenAdressableBtn = function(){
    $("#edgex-support-scheduleevent-address").hide();
  };

  //===================schedule event section edn===============================

  return scheduler;
})();
