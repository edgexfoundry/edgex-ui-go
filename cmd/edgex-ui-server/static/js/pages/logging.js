$(document).ready(function(){

  $("#log_start_time").flatpickr({
    dateFormat:"Y-m-d H:i:S",
    enableTime:true,
    enableSeconds:true,
    time_24hr:true,
    allowInput:false
  });
  $("#log_end_time").flatpickr({
    dateFormat:"Y-m-d H:i:S",
    enableTime:true,
    enableSeconds:true,
    time_24hr:true,
    allowInput:false
  });
  $('[data-toggle="log-tooltip"]').tooltip();
  //init select panel
  orgEdgexFoundry.supportLogging.loadAllDeviceServices();
});

orgEdgexFoundry.supportLogging = (function(){
  "use strict";

  function SupportLogging(){
    this.monitorTimer = null;
    this.monitorStartTime = null;
    this.monitorStopTime = null;

    this.allMicrosevices = ['edgex-core-metadata','edgex-core-data','edgex-core-command','edgex-export-client','edgex-export-distro','edgex-support-logging'];
  }

  SupportLogging.prototype = {
    constructor:SupportLogging,
    loadLoggingInRealtime: null,
    renderLoggingInRealtime: null,
    startLoggingMonitor: null,
    stopLoggingMonitor: null,
    outputLoggingInRealtime: null,

    loadLoggingBySearch: null,
    renderLoggingBySearch: null,
    searchBtn: null,
    eraseScreenBtn: null,

    loadAllDeviceServices: null,
    initLogMiscroseviceSelectPanel: null,
  }

  var logging = new SupportLogging();

  SupportLogging.prototype.initLogMiscroseviceSelectPanel = function(allMicrosevices){
    $("#edgex-support-logging-tab-main select[name='log_service']").empty();
    var row = '';
    $.each(allMicrosevices,function(i,s){
       row += '<option value="' + s + '">' + s + '</option>';
    });
    $("#edgex-support-logging-tab-main select[name='log_service']").append(row);
  }

  SupportLogging.prototype.loadAllDeviceServices = function(){
    $.ajax({
      url:'/core-metadata/api/v1/deviceservice',
      type:'GET',
      success:function(data){
        $.each(data,function(i,s){
          logging.allMicrosevices.push(s.name);
          logging.initLogMiscroseviceSelectPanel(logging.allMicrosevices);
        });
      }
    });
  }

  SupportLogging.prototype.eraseScreenBtn = function(){
      $("#log-content div.log_content").empty();
  }

  SupportLogging.prototype.searchBtn = function(){
    var service = $("select[name='log_service']").val();

    var start_str = document.getElementById("log_start_time").value;
    var end_str = document.getElementById("log_end_time").value;
    var limit = $("select[name='log_limit']").val();
    start_str = start_str.replace(/-/g,'/');
    end_str = end_str.replace(/-/g,'/');
    var start = new Date(start_str);
    var end = new Date(end_str);

    var start_timestamp = start.getTime();
    var end_timestamp = end.getTime();
    logging.loadLoggingBySearch(service,start_timestamp,end_timestamp,limit);
  }

  SupportLogging.prototype.loadLoggingBySearch = function(service,start_timestamp,end_timestamp,limit){
    $.ajax({
      url:'/support-logging/api/v1/logs/originServices/'+service+'/'+start_timestamp+'/'+end_timestamp+'/' + limit,
      type:'GET',
      success:function(data){
        $("#log-content div.log_content").empty();
        if(data.length == 0) {
            $("#log-content div.log_content").append('<span style="color:white;">No data.</span>');
            return;
        }
        logging.renderLoggingBySearch(data);
      }
    });
  }

  SupportLogging.prototype.renderLoggingBySearch = function(data){
    $.each(data,function(i,v){
      var show_log = '<p>';
      if (v.logLevel == "ERROR") {
        show_log += '<span style="color:red;">'+v.logLevel+'</span>&nbsp;&nbsp;&nbsp;';
        show_log += '<span style="color:red;">'+ dateToString(v.created) + '</span>&nbsp;&nbsp;&nbsp;';
      } else {
        show_log += '<span style="color:green;">'+v.logLevel+'</span>&nbsp;&nbsp;&nbsp;';
        show_log += '<span style="color:green;">'+ dateToString(v.created) + '</span>&nbsp;&nbsp;&nbsp;';
      }
      show_log += '<span style="color:white;">'+ v.message + '</span>';
      show_log += '</p>'
      $("#log-content div.log_content").append(show_log);
    });
  }

  SupportLogging.prototype.outputLoggingInRealtime = function(){
    if (!logging.monitorStartTime) {
      var now1 =  new Date();
      now1.setMinutes(now1.getMinutes() - 1);
      logging.monitorStartTime =  now1.getTime();

      var now2 =  new Date();
      now2.setMinutes(now2.getMinutes() + 1);
      logging.monitorStopTime = now2.getTime()
    }
    orgEdgexFoundry.supportLogging.loadLoggingInRealtime(logging.monitorStartTime,logging.monitorStopTime);
  }

  SupportLogging.prototype.startLoggingMonitor = function(){
    //debugger
    $("#support-logging-search").hide();
    $("#support-logging-start-monitor").hide();
    $("#support-logging-stop-monitor").show();
    logging.monitorTimer = window.setInterval("orgEdgexFoundry.supportLogging.outputLoggingInRealtime()",2000);
  }

  SupportLogging.prototype.stopLoggingMonitor = function(){
    window.clearInterval(orgEdgexFoundry.supportLogging.monitorTimer);
    $("#support-logging-search").show();
    $("#support-logging-start-monitor").show();
    $("#support-logging-stop-monitor").hide();
  }

  SupportLogging.prototype.loadLoggingInRealtime = function(start,end){
    var service = $("select[name='log_service']").val();
    console.log("selected service===:" + service);
    $.ajax({
      url:'/support-logging/api/v1/logs/originServices/'+service+'/'+start +'/'+end+'/100',
      type:'GET',
      success:function(data){
        //debugger
        if(data.length == 0) {
          return;
        }
        logging.renderLoggingInRealtime(data);
      }
    });
  }

  SupportLogging.prototype.renderLoggingInRealtime = function(data){

    $.each(data,function(i,v){
      console.log(data.length);
      if (i == data.length - 1) {
        logging.monitorStartTime = v.created
        var end = new Date(logging.monitorStartTime)

        end.setMinutes(end.getMinutes() + 1)
        logging.monitorStopTime = end.getTime();
      }
      var show_log = '<p>';
      if (v.logLevel == "ERROR") {
        show_log += '<span style="color:red;">'+v.logLevel+'</span>&nbsp;&nbsp;&nbsp;';
        show_log += '<span style="color:red;">'+ dateToString(v.created) + '</span>&nbsp;&nbsp;&nbsp;';
      } else {
        show_log += '<span style="color:green;">'+v.logLevel+'</span>&nbsp;&nbsp;&nbsp;';
        show_log += '<span style="color:green;">'+ dateToString(v.created) + '</span>&nbsp;&nbsp;&nbsp;';
      }
      if(i%2 == 0){
        show_log += '<span class="text-warning">'+ v.message + '</span>';
      }else{
        show_log += '<span style="color:white;">'+ v.message + '</span>';
      }

      show_log += '</p>'
      var log_content = $("#log-content div.log_content")[0];
      $("#log-content div.log_content").append(show_log);
      log_content.scrollTop = log_content.scrollHeight;
    });
  }
  return logging;
})();
