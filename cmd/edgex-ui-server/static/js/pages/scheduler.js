$(document).ready(function(){
  orgEdgexFoundry.supportScheduler.loadSchedulerList();
  orgEdgexFoundry.supportScheduler.loadScheduleEventList();
});

//init scheduler object
orgEdgexFoundry.supportScheduler = (function(){
  "use strict";

  function SupportScheduler(){
    this.schedulerListCache = [];
    this.scheduleEventListCache = [];
    this.selectedSchedulerRow = null;
    this.selectedScheduleEventRow = null;
  }

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
  }

  var scheduler = new SupportScheduler();

  //===================schedule section begin===================================

  SupportScheduler.prototype.loadSchedulerList = function(){
    $.ajax({
      url:'/core-metadata/api/v1/schedule',
      type:'GET',
      success:function(data){
        if(!data || data.length == 0){
          $("#edgex-support-scheduler-list table tfoot").show();
          return
        }
        scheduler.schedulerListCache = data;
        scheduler.renderSchedulerList(data);
      },
      error:function(){

      }
    });
  }
  SupportScheduler.prototype.renderSchedulerList = function(data){
    $.each(data,function(i,v){
      var rowData = "<tr>";
      rowData += '<td class="scheduler-delete-icon"><input type="hidden" value="'+v.id+'"><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += '<td class="scheduler-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td><input type="radio" name="schedulerRadio" value="'+v.id+'"></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
      rowData += "<td>" +  v.start + "</td>";
      rowData += "<td>" +  v.end + "</td>";
      rowData += "<td>" +  v.frequency + "</td>";
      rowData += "<td>" +  v.cron + "</td>";
      rowData += "<td>" +  v.runOnce + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-support-scheduler-list table tbody").append(rowData);
    });
    $(".scheduler-delete-icon").on('click',function(){
        scheduler.deleteSchedulerBtn($(this).children("input[type='hidden']").val());

    });
    $(".scheduler-edit-icon").on('click',function(){
        scheduler.editSchedulerBtn($(this).children("input[type='hidden']").val());
    });
  }

  SupportScheduler.prototype.addSchedulerBtn = function(){
    $("#edgex-support-scheduler-add-or-update").show();
  }

  SupportScheduler.prototype.commitSchedulerBtn = function(type){
    var scheduler = {
      id: $("#edgex-support-scheduler-add-or-update form input[name='SchedulerId']").val(),
      name: $("#edgex-support-scheduler-add-or-update form input[name='SchedulerName']").val(),
      start: $("#edgex-support-scheduler-add-or-update form input[name='SchedulerStart']").val(),
      end: $("#edgex-support-scheduler-add-or-update form input[name='SchedulerEnd']").val(),
      frequency: $("#edgex-support-scheduler-add-or-update form input[name='SchedulerFrequency']").val(),
      cron: $("#edgex-support-scheduler-add-or-update form input[name='SchedulerCron']").val(),
      runOnce: false,
    }
    var runOnce = $("#edgex-support-scheduler-add-or-update form select[name='SchedulerRunOnce']").val();
    scheduler.runOnce = runOnce == "false"?false:true;
    // debugger
    if(type=="new"){
      commitScheduler(scheduler);
    }else{
      updateScheduler(scheduler);
    }
  }

  function commitScheduler(scheduler){
    $.ajax({
      url: '/core-metadata/api/v1/schedule',
      type: 'POST',
      data: JSON.stringify(scheduler),
      success: function(){
        scheduler.loadSchedulerList();
        bootbox.alert({
          message: "Add Scheduler Success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        400: function(){
          bootbox.alert({
            message: "malformed or unparsable requests !",
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
            message: "if the start, end, or frequency strings are not properly formatted or if the name is determined to not be unique with regard to others !",
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

  function updateScheduler(scheduler){
    $.ajax({
      url: '/core-metadata/api/v1/schedule',
      type: 'PUT',
      data: JSON.stringify(scheduler),
      success: function(){
        scheduler.loadSchedulerList();
        bootbox.alert({
          message: "Update Scheduler Success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        400: function(){
          bootbox.alert({
            message: "malformed or unparsable requests !",
            className: 'red-green-buttons'
          });
        },
        404: function(){
          bootbox.alert({
            message: "no schedule is found for the id !",
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
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
  }

  SupportScheduler.prototype.refreshSchedulerListBtn = function(){

  }

  SupportScheduler.prototype.editSchedulerBtn = function(scheduler){
      var schedulerItem = JSON.parse(scheduler);
      //debugger
      $("#edgex-support-scheduler-add-or-update form input[name='SchedulerId']").val(schedulerItem.id);
      $("#edgex-support-scheduler-add-or-update form input[name='SchedulerName']").val(schedulerItem.name);
      $("#edgex-support-scheduler-add-or-update form input[name='SchedulerStart']").val(schedulerItem.start);
      $("#edgex-support-scheduler-add-or-update form input[name='SchedulerEnd']").val(schedulerItem.end);
      $("#edgex-support-scheduler-add-or-update form input[name='SchedulerFrequency']").val(schedulerItem.frequency);
      $("#edgex-support-scheduler-add-or-update form input[name='SchedulerCron']").val(schedulerItem.cron);
      $("#edgex-support-scheduler-add-or-update form select[name='SchedulerRunOnce']").val(""+schedulerItem.runOnce);

      $("#edgex-support-scheduler-add-or-update .update-scheduler").show();
      $("#edgex-support-scheduler-add-or-update .add-scheduler").hide();
      $("#edgex-support-scheduler-add-or-update").show();
  }

  SupportScheduler.prototype.deleteSchedulerBtn = function(schedulerId){
    bootbox.confirm({
      title: "confirm",
      message: "Are you sure to delete ? ",
      className: 'green-red-buttons',
      callback: function (result) {
        if (result){
          $.ajax({
            url: '/core-metadata/api/v1/schedule/id/' + schedulerId,
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
                  message: "unknown or unanticipated issues",
                  className: 'red-green-buttons'
                });
              }
            }
          });
        }
      }
    });

  }

  //===================scheduler section edn===================================

  //===================schedule event section begin============================

  SupportScheduler.prototype.loadScheduleEventList = function(){
    $.ajax({
      url:'/core-metadata/api/v1/scheduleevent',
      type:'GET',
      success:function(data){
        if(!data || data.length == 0){
          $("#edgex-support-scheduleevent-list table tfoot").show();
          return
        }
        scheduler.scheduleEventListCache = data;
        scheduler.renderScheduleEventList(data);
      },
      error:function(){

      }
    });
  }

  SupportScheduler.prototype.renderScheduleEventList = function(data){
    $.each(data,function(i,v){
      var rowData = "<tr>";
      rowData += '<td class="schedule-event-delete-icon"><input type="hidden" value="'+v.id+'"><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += '<td class="schedule-event-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td><input type="radio" name="scheduleEventRadio" value="'+v.id+'"></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td><input value="+v.name+" disabled style='outline:none;border-style:none;text-align:center;background-color:transparent;'>" + "</td>";
      rowData += "<td>" +  v.schedule + "</td>";
      rowData += "<td>" +  v.parameters + "</td>";
      rowData += "<td>" +  v.service + "</td>";
      rowData += '<td class="schedule-address-search-icon"><input type="hidden" value=\''+JSON.stringify(v.addressable)+'\'>' + '<i class="fa fa-search-plus fa-lg"></i>' + '</td>';
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-support-scheduleevent-list table tbody").append(rowData);

    });
    $(".schedule-address-search-icon").on("click",function(){
      // var scheduleevent_id = $(this).children("input").val();
      var v = JSON.parse($(this).children("input").val());
      var rowData = "<tr class='warning'>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.name + "</td>";
      rowData += "<td>" +  v.url + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
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
  }

  SupportScheduler.prototype.deleteScheduleEventBtn = function(scheduleEventId){
    bootbox.confirm({
      title: "confirm",
      message: "Are you sure to delete ? ",
      className: 'green-red-buttons',
      callback: function (result) {
        if(result){
            $.ajax({
              url: '/core-metadata/api/v1/scheduleevent/id/' + scheduleEventId,
              type: 'DELETE',
              success: function(){
                bootbox.alert({
                  message: "delete success.",
                  className: 'red-green-buttons'
                });
              },
              statusCode: {
                409: function(){
                  bootbox.alert({
                    message: "attempt to delete a schedule event still being referenced by device reports",
                    className: 'red-green-buttons'
                  });
                }
              }
            });
        }
      }
    });
  }
  SupportScheduler.prototype.updateScheduleEventBtn = function(scheduleEventStr){
    var scheduleEvent = JSON.parse(scheduleEventStr);
    //scheduler
    $("input[name='SchedulerName']").val(scheduleEvent.schedule);

    //event address
    $("#edgex-support-scheduleevent-add input[name='EventAddressId']").val(scheduleEvent.addressable.id);
    $("#edgex-support-scheduleevent-add input[name='EventAddressName']").val(scheduleEvent.addressable.name);
    $("#edgex-support-scheduleevent-add input[name='EventAddressProtocol']").val(scheduleEvent.addressable.protocol);
    $("#edgex-support-scheduleevent-add input[name='EventAddressMethod']").val(scheduleEvent.addressable.method);
    $("#edgex-support-scheduleevent-add input[name='EventAddressAddress']").val(scheduleEvent.addressable.address);
    $("#edgex-support-scheduleevent-add input[name='EventAddressPort']").val(scheduleEvent.addressable.port);
    $("#edgex-support-scheduleevent-add input[name='EventAddressPath']").val(scheduleEvent.addressable.path);


    //scheduleevent
    $("#edgex-support-scheduleevent-add input[name='ScheduleEventId']").val(scheduleEvent.id);
    $("#edgex-support-scheduleevent-add input[name='ScheduleEventName']").val(scheduleEvent.name);
    $("#edgex-support-scheduleevent-add input[name='ScheduleEventParameters']").val(scheduleEvent.parameters);
    $("#edgex-support-scheduleevent-add input[name='ScheduleEventService']").val(scheduleEvent.service);


    $("#edgex-support-scheduleevent-list-main").hide();

    $("#edgex-support-scheduleevent-add").show();
    $("#edgex-support-scheduleevent-add div.add-schedule-event").hide();
    $("#edgex-support-scheduleevent-add div.update-schedule-event").show();


  }

  SupportScheduler.prototype.addScheduleEventBtn = function(){
    $("#edgex-support-scheduleevent-list-main").hide();
    $("#edgex-support-scheduleevent-add").show();
  }

  SupportScheduler.prototype.cancelAddScheduleEventBtn = function(){
    $("#edgex-support-scheduleevent-list-main").show();
    $("#edgex-support-scheduleevent-add").hide();
  }

  SupportScheduler.prototype.commitScheduleEventBtn = function(type){
    //scheduler
    var schedulerName = $("input[name='SchedulerName']").val();

    //event address
    var eventAddress = {
      id:$("input[name='EventAddressId']").val(),
      name: $("input[name='EventAddressName']").val(),
      protocol: $("input[name='EventAddressProtocol']").val(),
      method: $("input[name='EventAddressMethod']").val(),
      adress: $("input[name='EventAddressAddress']").val(),
      port: parseInt($("input[name='EventAddressPort']").val()),
      path: $("input[name='EventAddressPath']").val(),
    }

    //scheduleevent
    var scheduleEvent = {
      id: $("input[name='ScheduleEventId']").val(),
      name: $("input[name='ScheduleEventName']").val(),
      parameters: $("input[name='ScheduleEventParameters']").val(),
      service: $("input[name='ScheduleEventService']").val(),
      schedule: schedulerName,
      addressable:eventAddress,
    }
    if(type == "new"){
      commitAddressableAndScheduleEvent(eventAddress,scheduleEvent);
    }else{//update
      commitScheduleEvent(scheduleEvent,"");
    }

  }

  function commitAddressableAndScheduleEvent(addressable,scheduleEvent){
    $.ajax({
      url:'/core-metadata/api/v1/addressable',
      type:'POST',
      data:JSON.stringify(addressable),
      success:function(data){
          scheduleEvent.addressable.id = data;
          commitScheduleEvent(scheduleEvent,"new");
      },
      statusCode: {
        400: function() {
          bootbox.alert({
            message: "malformed or unparsable requests!",
            className: 'red-green-buttons'
          });
        },
        500: function(){
          bootbox.alert({
            message: "unknown or unanticipated issues or any duplicate address name (key)!",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  function commitScheduleEvent(scheduleEvent,type){
    var method ;
    if (type=="new") {
      method = "POST"
    }else{
      method = "PUT"
    }
    //debugger
    $.ajax({
      url:'/core-metadata/api/v1/scheduleevent',
      type: method,
      data:JSON.stringify(scheduleEvent),
      success:function(){
        bootbox.alert({
          message: "Commit ScheduleEvent Success!",
          className: 'red-green-buttons'
        });
      },
      statusCode: {
        404: function() {
          bootbox.alert({
            message: "the event's associated schedule is not found !",
            className: 'red-green-buttons'
          });
        },
        409: function() {
          bootbox.alert({
            message: "the schedule was not provided or if the name is determined to not be unique with regard to others !",
            className: 'red-green-buttons'
          });
        },
        500: function() {
          bootbox.alert({
            message: "unknown or unanticipated issues or scheduleevent name is a duplicate !",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  SupportScheduler.prototype.refreshScheduleEventListBtn = function(){
    ;
  }

  SupportScheduler.prototype.hidenAdressableBtn = function(){
    $("#edgex-support-scheduleevent-address").hide();
  }

  //===================schedule event section edn===============================

  return scheduler;
})();
