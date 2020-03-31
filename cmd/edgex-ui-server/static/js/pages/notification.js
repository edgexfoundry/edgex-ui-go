/*
* Copyright © 2018-2019 All Rights Reserved.
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
*
* @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
*/

$(document).ready(function(){
  $("#edgex-foundry-support-notification input[name='notification_start_time']").flatpickr({
    dateFormat:"Y-m-d H:i:S",
    enableTime:true,
    enableSeconds:true,
    time_24hr:true,
    allowInput:false,
  });
  $("#edgex-foundry-support-notification input[name='notification_end_time']").flatpickr({
    dateFormat:"Y-m-d H:i:S",
    enableTime:true,
    enableSeconds:true,
    time_24hr:true,
    allowInput:false,
    defaultDate: new Date().Format("yyyy-MM-dd hh:mm:ss")
  });
  $("#edgex-foundry-support-transmission input[name='transmission_start_time']").flatpickr({
    dateFormat:"Y-m-d H:i:S",
    enableTime:true,
    enableSeconds:true,
    time_24hr:true,
    allowInput:false
  });
  $("#edgex-foundry-support-transmission input[name='transmission_end_time']").flatpickr({
    dateFormat:"Y-m-d H:i:S",
    enableTime:true,
    enableSeconds:true,
    time_24hr:true,
    allowInput:false
  });
  orgEdgexFoundry.supportNotification.loadNotificationList();
  orgEdgexFoundry.supportNotification.loadSubscriptionList();
});

orgEdgexFoundry.supportNotification = (function(){

  "use strict";

  function SupportNotification(){

  }

  SupportNotification.prototype = {
    constructor: SupportNotification,
    loadNotificationList: null,
    renderNotificationList: null,
    addNotificationBtn: null,
    searchNotificationBtn: null,

    loadSubscriptionList: null,
    renderSubscriptionList: null,
    addSubscriptionBtn: null,
    deleteSubscriptionBtn: null,
    commitSubscriptionBtn: null,
    updateSubscriptionBtn: null,
    refreshSubscriptionBtn: null,

    cancelAddOrUpdateBtn: null,

    loadTransmissionList: null,
    renderTransmissionList: null,
    seacrchTransmissionBtn: null,

    hidenChannelsBtn: null,
  }

  var notification = new SupportNotification();

  //===============notification section begin=========================

  SupportNotification.prototype.loadNotificationList = function(){
    var end = (new Date()).valueOf();
    //debugger
    $.ajax({
      url:'/support-notification/api/v1/notification/end/' + end + '/' + 20,
      type:'GET',
      success:function(data){
        if (!data || data.length == 0) {
          $("#edgex-support-notification-list table tfoot").show();
        }
        notification.renderNotificationList(data);
      },
      complete: function (jqXHR, textStatus) {
            if (jqXHR.status != 200) {
                resetNotificationFormList();
                if (jqXHR.status == 404) {
                    bootbox.alert({
                        title: "Error",
                        message: jqXHR.responseText,
                        className: 'red-green-buttons'
                    });
                } else if (jqXHR.status == 413) {
                    bootbox.alert({
                        title: "Error",
                        message: "assigned limit perameter exceeds the current max limit !",
                        className: 'red-green-buttons'
                    });
                }else if(jqXHR.status == 502){
                    bootbox.alert({
                        title: "Error",
                        message: "Bad Gateway !",
                        className: 'red-green-buttons'
                    });
                } else {
                    bootbox.alert({
                        title: "Error",
                        message: "Unknown Error!",
                        className: 'red-green-buttons'
                    });
                }
            }
        }
    });
  };

  SupportNotification.prototype.renderNotificationList = function(data){
    $("#edgex-support-notification-list table tbody").empty();
    $.each(data,function(i,v){
      var rowData = "<tr>";
      // rowData += '<td class="scheduler-delete-icon"><input type="hidden" value="'+v.id+'"><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td class="scheduler-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td><input type="radio" name="notificationRowRadio" value="'+v.id+'"></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.slug + "</td>";
      rowData += "<td>" +  v.sender + "</td>";
      rowData += "<td>" +  v.category + "</td>";
      rowData += "<td>" +  v.severity + "</td>";
      rowData += "<td>" +  v.content + "</td>";
      rowData += "<td>" +  v.status + "</td>";
      rowData += "<td>" +  v.labels.join(',') + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-support-notification-list table tbody").append(rowData);
    });
  }

    SupportNotification.prototype.searchNotificationBtn = function () {
        var start = $("#edgex-foundry-support-notification input[name='notification_start_time']").val();
        var end = $("#edgex-foundry-support-notification input[name='notification_end_time']").val();
        var limit = $("#edgex-foundry-support-notification select[name='notification_limit']").val();
        if (!start) {
            start = new Date().valueOf()
        } else {
            start = new Date(start).valueOf();
        }
        if (!end) {
            end = new Date().valueOf();
        } else {
            end = new Date(end).valueOf();
        }
        $.ajax({
            url: '/support-notification/api/v1/notification/start/' + start + "/end/" + end + "/" + limit,
            type: 'GET',
            success: function (data) {
                if (!data || data.length == 0) {
                    $("#edgex-support-notification-list table tfoot").show();
                }
                notification.renderNotificationList(data);
            },
            complete: function (jqXHR, textStatus) {
                if (jqXHR.status != 200) {
                    resetNotificationFormList();
                    if (jqXHR.status == 404) {
                        bootbox.alert({
                            title: "Error",
                            message: jqXHR.responseText,
                            className: 'red-green-buttons'
                        });
                    } else if (jqXHR.status == 413) {
                        bootbox.alert({
                            title: "Error",
                            message: "assigned limit perameter exceeds the current max limit !",
                            className: 'red-green-buttons'
                        });
                    }else if(jqXHR.status == 502){
                        bootbox.alert({
                            title: "Error",
                            message: "Bad Gateway !",
                            className: 'red-green-buttons'
                        });
                    } else {
                        bootbox.alert({
                            title: "Error",
                            message: "Unknown Error!",
                            className: 'red-green-buttons'
                        });
                    }
                }
            }
        });
    };

    function resetNotificationFormList() {
        $("#edgex-support-notification-list table tbody").empty();
        $("#edgex-support-notification-list table tfoot").show();
    }

  //===============notification section end=========================

  //===============subscription section begin=========================
  SupportNotification.prototype.refreshSubscriptionBtn = function(){
    notification.loadSubscriptionList();
  }

  SupportNotification.prototype.loadSubscriptionList = function(){
    $.ajax({
      url: '/support-notification/api/v1/subscription',
      type: 'GET',
      success: function(data){
        $("#edgex-support-subscription-list table tfoot").hide();
        notification.renderSubscriptionList(data);
      },
      statusCode: {
        503: function(){
          bootbox.alert({
            title:"Error",
            message:"unanticipated or unknown issues encountered  !",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  SupportNotification.prototype.renderSubscriptionList = function(data){
    //debugger
    $("#edgex-support-subscription-list table tbody").empty();
    if(!data || data.length == 0){
      $("#edgex-support-subscription-list table tfoot").show();
      return;
    }
    $.each(data,function(i,v){
      var rowData = "<tr>";
      rowData += '<td class="notification-delete-icon"><input type="hidden" value="'+v.slug+'"><div class="edgexIconBtn"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += '<td class="notification-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      // rowData += '<td><input type="radio" name="notificationRowRadio" value="'+v.id+'"></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.slug + "</td>";
      rowData += "<td>" +  v.receiver + "</td>";
      rowData += "<td>" +  v.description + "</td>";
      rowData += "<td>" +  v.subscribedCategories.join(',') + "</td>";
      rowData += "<td>" +  v.subscribedLabels.join(',') + "</td>";
      rowData += "<td class='subscription-channel-icon'>" + "<input type='hidden' value=\'"+JSON.stringify(v.channels)+"\'>" + "<i class='fa fa-search-plus fa-lg'></i>" + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-support-subscription-list table tbody").append(rowData);
    });

    $("#edgex-support-subscription-list .notification-delete-icon").on('click',function(){
      var slug = $(this).children('input[type="hidden"]').val();
      notification.deleteSubscriptionBtn(slug);
    });

    $("#edgex-support-subscription-list .notification-edit-icon").on('click',function(){
      var notification = JSON.parse($(this).children('input[type="hidden"]').val());
      $("#edgex-foundry-support-subscription-list-main").hide();
      $(".edgex-support-subscription-edit").show();
      $(".edgex-support-subscription-edit .add-subscription").hide();
      $(".edgex-support-subscription-edit .update-subscription").show();
      $(".edgex-support-subscription-edit input[name='id']").val(notification.id);
      $(".edgex-support-subscription-edit input[name='slug']").val(notification.slug);
      $(".edgex-support-subscription-edit input[name='receiver']").val(notification.receiver);
      $(".edgex-support-subscription-edit input[name='description']").val(notification.description);
      $(".edgex-support-subscription-edit input[name='subscribedLabels']").val(notification.subscribedLabels.join(','));
      $(".edgex-support-subscription-edit input[name='subscribedCategories']").val(notification.subscribedCategories.join(','));
      if(notification.channels[0].type == "EMAIL"){
        $(".edgex-support-subscription-edit input[name='channels']").val(notification.channels[0].mailAddresses.join(','));
      }

    });

    $("#edgex-support-subscription-list .subscription-channel-icon").on('click',function(){
      $("#edgex-foundry-support-subscription-main .edgex-support-subscription-channels-panel").show();
      var channels = JSON.parse($(this).children('input[type="hidden"]').val());
      //debugger
      $.each(channels,function(i,v){
        var rowData = "<tr>";
        rowData += "<td>" +  v.type + "</td>";
        if(v.type == "EMAIL") {
          rowData += "<td>" +  v.mailAddresses.join(',') + "</td>";
          rowData += "<td>" +  " " + "</td>";
          rowData += "<td>" + " " + "</td>";
        }else{
          rowData += "<td>" +  " " + "</td>";
          rowData += "<td>" +  v.url + "</td>";
          rowData += "<td>" +  v.httpMethod + "</td>";
        }
        rowData += "</tr>";
        $("#edgex-foundry-support-subscription-main .edgex-support-subscription-channels-list table tbody").append(rowData);
      });
    });
  }

  SupportNotification.prototype.deleteSubscriptionBtn = function(slug){
    bootbox.confirm({
      title: "confirm",
      message: "Are you sure to delete ? ",
      className: 'green-red-buttons',
      callback: function (result) {
        if(result){
            $.ajax({
              url: '/support-notification/api/v1/subscription/slug/' + slug,
              type: 'DELETE',
              success: function(){
                notification.refreshSubscriptionBtn();
                bootbox.alert({
                  message: "delete success.",
                  className: 'red-green-buttons'
                });
              },
              statusCode: {
                503:function(){
                  bootbox.alert({
                    message: "For unanticipated or unknown issues encountered.",
                    className: 'red-green-buttons'
                  });
                }
              }
            });
        }
      }
    });
  }

  SupportNotification.prototype.cancelAddOrUpdateBtn = function(){
    $(".edgex-support-subscription-edit").hide();
    $("#edgex-foundry-support-subscription-list-main").show();
  }

  SupportNotification.prototype.addSubscriptionBtn = function(){
    $("#edgex-foundry-support-subscription-list-main").hide();
    $(".edgex-support-subscription-edit").show();
    $(".edgex-support-subscription-edit form")[0].reset();
    $(".edgex-support-subscription-edit .update-subscription").hide();
    $(".edgex-support-subscription-edit .add-subscription").show();
  }

  SupportNotification.prototype.commitSubscriptionBtn = function(type){

    var subscription = {
      id: $(".edgex-support-subscription-edit input[name='id']").val(),
      slug: $(".edgex-support-subscription-edit input[name='slug']").val(),
      receiver: $(".edgex-support-subscription-edit input[name='receiver']").val(),
      description: $(".edgex-support-subscription-edit input[name='description']").val(),
      subscribedLabels: $(".edgex-support-subscription-edit input[name='subscribedLabels']").val().split(','),
      subscribedCategories: $(".edgex-support-subscription-edit input[name='subscribedCategories']").val().replace(new RegExp(' ', 'ig'),'').split(','),
      channels:[
        {
          "type":"EMAIL",
          "mailAddresses": $(".edgex-support-subscription-edit input[name='channels']").val().replace(new RegExp(' ', 'ig'),'').split(',')
        }
      ]
    }

    //debugger
    if (type == "new") {
      commitNewSubscription(subscription)
    }else{
      updateSubscription(subscription)
    }
  }

  function commitNewSubscription(subscription){
    $.ajax({
      url:'/support-notification/api/v1/subscription',
      type:'POST',
      data:JSON.stringify(subscription),
      success:function(){
        bootbox.alert({
          message: "Add subscription success!",
          className: 'red-green-buttons'
        });
        orgEdgexFoundry.supportNotification.loadSubscriptionList();
      },
      statusCode: {
        400: function(event){
          bootbox.alert({
            title:'Error',
            message: "Bad request!",
            className: 'red-green-buttons'
          });
        },
        404: function(){
          bootbox.alert({
            title:'Error',
            message: "unknown or unanticipated issues !",
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
            title:'Error',
            message: "The slug is duplicate. Please try another one.",
            className: 'red-green-buttons'
          });
        },
        503: function(){
          bootbox.alert({
            title:'Error',
            message: "For unanticipated or unknown issues encountered.",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  function updateSubscription(subscription){
    $.ajax({
      url:'/support-notification/api/v1/subscription',
      type:'PUT',
      data:JSON.stringify(subscription),
      success:function(){
        bootbox.alert({
          message: "Update subscription success!",
          className: 'red-green-buttons'
        });
        orgEdgexFoundry.supportNotification.loadSubscriptionList();
      },
      statusCode: {
        400: function(event){
          debugger
          bootbox.alert({
            title:'Error',
            message: "Bad request!",
            className: 'red-green-buttons'
          });
        },
        404: function(){
          bootbox.alert({
            title:'Error',
            message: "unknown or unanticipated issues !",
            className: 'red-green-buttons'
          });
        },
        409: function(){
          bootbox.alert({
            title:'Error',
            message: "The slug is duplicate. Please try another one.",
            className: 'red-green-buttons'
          });
        },
        503: function(){
          bootbox.alert({
            title:'Error',
            message: "For unanticipated or unknown issues encountered.",
            className: 'red-green-buttons'
          });s
        }
      }
    });
  }

  SupportNotification.prototype.updateSubscriptionBtn = function(){

  }
  SupportNotification.prototype.hidenChannelsBtn = function(){
    $(".edgex-support-subscription-channels-panel").hide();
  }
  //===============subscription section end=========================


  //===============transmission section begin=========================

  SupportNotification.prototype.seacrchTransmissionBtn = function(){
    var start = $("#edgex-foundry-support-transmission input[name='transmission_start_time']").val();
    var end =   $("#edgex-foundry-support-transmission input[name='transmission_end_time']").val();
    var limit = $("#edgex-foundry-support-transmissions select[name='transmission_limit']").val();
    start = new Date(start).valueOf();
    end = new Date(end).valueOf();
    $.ajax({
      url:'/support-notification/api/v1/transmission/start/' + start + "/end/" + end + "/" + limit,
      type:'GET',
      success:function(data){
        if (!data || data.length == 0){
            $("#edgex-foundry-support-transmission table tfoot").show();
            return;
        }
        notification.renderTransmissionList(data);
      },
      statusCode: {
        404: function(){
          bootbox.alert({
            title:"Error",
            message:"malformed or unparsable requests !",
            className: 'red-green-buttons'
          });
        },
        413: function(){
          bootbox.alert({
            title:"Error",
            message:"assigned limit perameter exceeds the current max limit !",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  SupportNotification.prototype.loadTransmissionList = function(){
    var end = (new Date()).valueOf();
    //debugger
    $.ajax({
      url:'/support-notification/api/v1/transmission/end/' + end + '/' + 20,
      type:'GET',
      success:function(data){
        if (!data || data.length == 0){
            $("#edgex-foundry-support-transmission table tfoot").show();
            return;
        }
        notification.renderTransmissionList(data);
      },
      statusCode: {
        404: function(){
          bootbox.alert({
            title:"Error",
            message:"malformed or unparsable requests !",
            className: 'red-green-buttons'
          });
        },
        413: function(){
          bootbox.alert({
            title:"Error",
            message:"assigned limit perameter exceeds the current max limit !",
            className: 'red-green-buttons'
          });
        }
      }
    });
  }

  SupportNotification.prototype.renderTransmissionList = function(data){
    $("#edgex-support-transmission-list table tbody").empty();
    $.each(data,function(i,v){
      var rowData = "<tr>";
      rowData += '<td class="scheduler-edit-icon"><input type="hidden" value=\''+JSON.stringify(v)+'\'><div class="edgexIconBtn"><i class="fa fa-edit fa-lg" aria-hidden="true"></i> </div></td>';
      rowData += "<td>" + (i + 1) +"</td>";
      rowData += "<td>" +  v.id + "</td>";
      rowData += "<td>" +  v.notification.slug + "</td>";
      rowData += "<td>" +  v.status + "</td>";
      rowData += "<td>" +  v.resendCount + "</td>";
      rowData += "<td>" +  v.records + "</td>";
      rowData += "<td>" +  dateToString(v.created) + "</td>";
      rowData += "<td>" +  dateToString(v.modified) + "</td>";
      rowData += "</tr>";
      $("#edgex-support-transmission-list table tbody").append(rowData);
    });
  }
  //===============transmission section end=========================
  return notification;
})();
