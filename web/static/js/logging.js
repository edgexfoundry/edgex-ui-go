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
});

var edgexLoggingBtn = {
  search: function(){
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
debugger
    $.ajax({
      url:'/support-logging/api/v1/logs/originServices/'+service+'/'+start_timestamp+'/'+end_timestamp+'/' + limit,
      type:'GET',
      success:function(data){
        $("#log-content div.log_content").empty();
        if(data.length == 0) {
            $("#log-content div.log_content").append('<span style="color:white;">No data.</span>');
            return;
        }
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
    });
  }
}
