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
      this.subscriptionChannelListCache = [];
      this.editedSubscriptionChannelIndex = -1;
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

    hiddenChannelsBtn: null,

    addNewSubscriptionChannelBtn: null,
    commitSubscriptionChannelBtn: null,
    cancelAddOrUpdateSubscriptionChannelBtn:null,
  };

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
    $("#edgex-support-notification-list table tfoot").hide();
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
      rowData += "<td>" +  (v.id ? v.id : "") + "</td>";
      rowData += "<td>" +  (v.slug ? v.slug : "") + "</td>";
      rowData += "<td>" +  (v.receiver ? v.receiver : "")  + "</td>";
      rowData += "<td>" +  (v.description ? v.description : "") + "</td>";
      rowData += "<td>" +  (v.subscribedCategories ? v.subscribedCategories.join(',') : "") + "</td>";
      rowData += "<td>" +  (v.subscribedLabels ? v.subscribedLabels.join(',') : "") + "</td>";
      rowData += "<td class='subscription-channel-icon'>" + "<input type='hidden' value=\'"+JSON.stringify(v.channels)+"\'>" + "<i class='fa fa-search-plus fa-lg'></i>" + "</td>";
      rowData += "<td>" +  (v.created ? dateToString(v.created) : "") + "</td>";
      rowData += "<td>" +  (v.modified ? dateToString(v.modified): "") + "</td>";
      rowData += "</tr>";
      $("#edgex-support-subscription-list table tbody").append(rowData);
    });

    $("#edgex-support-subscription-list .notification-delete-icon").on('click',function(){
      var slug = $(this).children('input[type="hidden"]').val();
      notification.deleteSubscriptionBtn(slug);
    });

    $("#edgex-support-subscription-list .notification-edit-icon").on('click',function(){
      var subscriptionConfig = JSON.parse($(this).children('input[type="hidden"]').val());
      $("#edgex-foundry-support-subscription-list-main").hide();
      $(".edgex-support-subscription-edit").show();
      $(".edgex-support-subscription-edit .add-subscription").hide();
      $(".edgex-support-subscription-edit .update-subscription").show();
      renderSubscriptionConfig(subscriptionConfig,'update');
    });

    $("#edgex-support-subscription-list .subscription-channel-icon").on('click',function(){
      $("#edgex-foundry-support-subscription-main .edgex-support-subscription-channels-panel").show();
      var channels = JSON.parse($(this).children('input[type="hidden"]').val());
      //debugger
      $.each(channels,function(i,v){
        var rowData = "<tr>";
        rowData += "<td>" + (v.type ? v.type : "") + "</td>";
        if(v.type == "EMAIL") {
          rowData += "<td>" + (v.mailAddresses ? v.mailAddresses.join(',') : "") + "</td>";
          rowData += "<td></td>";
          rowData += "<td></td>";
        }else{
          rowData += "<td></td>";
          rowData += "<td>" + (v.url ? v.url : "") + "</td>";
          rowData += "<td>" +  "POST" + "</td>";
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
      resetSubscriptionConfig();
      $(".edgex-support-subscription-edit").hide();
      $("#edgex-foundry-support-subscription-list-main").show();
  }

  SupportNotification.prototype.addSubscriptionBtn = function(){
    $("#edgex-foundry-support-subscription-list-main").hide();
    $(".edgex-support-subscription-edit .update-subscription").hide();
    $(".edgex-support-subscription-edit .add-subscription").show();
    var addSubscriptionConfig = {
      "slug" : "client-subscription-" + new Date().getTime(),
    };
    renderSubscriptionConfig(addSubscriptionConfig,"add");
    $(".edgex-support-subscription-edit").show();
  };

  SupportNotification.prototype.commitSubscriptionBtn = function(operateType){
      var subscription = {
          slug: $(".edgex-support-subscription-edit input[name='slug']").val(),
          receiver: $(".edgex-support-subscription-edit input[name='receiver']").val(),
          description: $(".edgex-support-subscription-edit input[name='description']").val(),
          subscribedLabels: $(".edgex-support-subscription-edit select[name='subscribedLabels']").val(),
          subscribedCategories: $(".edgex-support-subscription-edit select[name='subscribedCategories']").val(),
          channels: notification.subscriptionChannelListCache,
      };
      //debugger
      if (operateType == "add") {
          commitSubscription("POST",subscription);
      }else{
          subscription['id'] = $(".edgex-support-subscription-edit input[name='id']").val();
          commitSubscription("PUT",subscription);
      }
  };

  function commitSubscription(methodType,subscription){
    $.ajax({
      url:'/support-notification/api/v1/subscription',
      type:methodType,
      data:JSON.stringify(subscription),
      success:function(){
          var successMsg = "";
          if (methodType == "POST"){
              successMsg = "Add subscription success!";
          }else{
              successMsg = "Update subscription success!";
          }
          notification.cancelAddOrUpdateBtn();
          orgEdgexFoundry.supportNotification.loadSubscriptionList();
        bootbox.alert({
          message: successMsg,
          className: 'red-green-buttons'
        });
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
  };

  SupportNotification.prototype.updateSubscriptionBtn = function(){

  };
  SupportNotification.prototype.hiddenChannelsBtn = function(){
      $("#edgex-foundry-support-subscription-main .edgex-support-subscription-channels-list table tbody").empty();
      $(".edgex-support-subscription-channels-panel").hide();
  };

  SupportNotification.prototype.addNewSubscriptionChannelBtn = function () {
      switchChannelCommitToAddMode();
      renderSubscriptionChannelConfig();
  };

  SupportNotification.prototype.commitSubscriptionChannelBtn = function (operateType) {
      var channelConfig = {};
      channelConfig['type'] = $(".edgex-support-subscription-edit select[name='channelType']").val();
      if (channelConfig['type'] == "EMAIL"){
          channelConfig['mailAddresses'] = $(".edgex-support-subscription-edit input[name='channelEmail']").val().split(",");
      }else if(channelConfig['type'] == "REST"){
          channelConfig['url'] = $(".edgex-support-subscription-edit input[name='channelRestUrl']").val();
      }
      if(operateType == "add"){
          //add
          notification.subscriptionChannelListCache.push(channelConfig);
      }else if(operateType == "update"){
          //update
          if(notification.editedSubscriptionChannelIndex >= 0){
              notification.subscriptionChannelListCache[notification.editedSubscriptionChannelIndex] = channelConfig;
              notification.editedSubscriptionChannelIndex = -1;
          }
      }else if((operateType == "delete")){
          //delete
      }
      renderSubscriptionChannelTable(notification.subscriptionChannelListCache);
      notification.cancelAddOrUpdateSubscriptionChannelBtn();
  };

  SupportNotification.prototype.cancelAddOrUpdateSubscriptionChannelBtn = function () {
      $(".edgex-support-subscription-edit .btn-channel-add").show();
      $(".edgex-support-subscription-edit .btn-channel-commit-add").hide();
      $(".edgex-support-subscription-edit .btn-channel-commit-update").hide();
      $(".edgex-support-subscription-edit .btn-channel-commit-delete").hide();
      $(".edgex-support-subscription-edit .btn-channel-cancel").hide();
      $(".edgex-support-subscription-channel-config").hide();
  };

  function switchChannelCommitToAddMode() {
      $(".edgex-support-subscription-edit .btn-channel-add").hide();
      $(".edgex-support-subscription-edit .btn-channel-commit-add").show();
      $(".edgex-support-subscription-edit .btn-channel-cancel").show();
  }

  function switchChannelCommitToUpdateMode() {
        $(".edgex-support-subscription-edit .btn-channel-add").hide();
        $(".edgex-support-subscription-edit .btn-channel-commit-update").show();
        $(".edgex-support-subscription-edit .btn-channel-cancel").show();
    }

  function switchChannelCommitToDeleteMode() {
        $(".edgex-support-subscription-edit .btn-channel-add").hide();
        $(".edgex-support-subscription-edit .btn-channel-commit-delete").show();
        $(".edgex-support-subscription-edit .btn-channel-cancel").show();
    }

  function renderSubscriptionConfig(config,addOrUpdate){
      //{
      //   "created": 1586425389320,
      //   "modified": 1585800017388,
      //   "id": "075a21be-0d7f-403c-8790-afdb8df2ca94",
      //   "slug": "s1",
      //   "receiver": "sub-test-name",
      //   "description": "test",
      //   "subscribedCategories": [
      //     "SW_HEALTH"
      //   ],
      //   "subscribedLabels": [
      //     "metadata"
      //   ],
      //   "channels": [
      //     {
      //       "type": "EMAIL",
      //       "mailAddresses": [
      //         "test@test.com"
      //       ],
      //       "url":""
      //     }
      //   ]
      // }
      if(!config){
          return;
      }
      if(config['id']){
          $(".edgex-support-subscription-edit input[name='id']").val(config['id']);
      }
      if(config['slug']){
          $(".edgex-support-subscription-edit input[name='slug']").val(config['slug']);
      }
      if(config['receiver']){
          $(".edgex-support-subscription-edit input[name='receiver']").val(config['receiver']);
      }
      if(config['description']){
          $(".edgex-support-subscription-edit input[name='description']").val(config['description']);
      }
      if(config['subscribedLabels']){
          $(".edgex-support-subscription-edit select[name='subscribedLabels']").selectpicker('val', config['subscribedLabels']);
      }
      if(config['subscribedCategories']){
          $(".edgex-support-subscription-edit select[name='subscribedCategories']").selectpicker('val', config['subscribedCategories']);
      }
      if(config['channels']){
          renderSubscriptionChannelTable(config['channels']);
      }
  }

    function renderSubscriptionChannelTable(channels) {
        $("#edgex-support-subscription-channel-tabel table tbody").empty();
        notification.subscriptionChannelListCache = channels;
        $.each(channels, function (i, v) {
            appendSubscriptionChannelRow(i,v);
        });
        $("#edgex-support-subscription-channel-tabel .channel-edit").off('click');
        $("#edgex-support-subscription-channel-tabel .channel-edit").on('click',function () {
            switchChannelCommitToUpdateMode();
            var updateIndex = Number($(this).children('input').val());
            notification.editedSubscriptionChannelIndex = updateIndex;
            renderSubscriptionChannelConfig(notification.subscriptionChannelListCache[updateIndex],"update");
        });
        $("#edgex-support-subscription-channel-tabel .channel-delete").off('click');
        $("#edgex-support-subscription-channel-tabel .channel-delete").on('click',function () {
            switchChannelCommitToDeleteMode();
            var deleteIndex = Number($(this).children('input').val());
            notification.subscriptionChannelListCache.splice(deleteIndex,1);
            renderSubscriptionChannelTable(notification.subscriptionChannelListCache);
        });
    }

    function appendSubscriptionChannelRow(index,channelConfig) {
        var rowData = "<tr>";
        rowData += "<td>" + channelConfig['type'] + "</td>";
        if (channelConfig['type'] == "EMAIL") {
            rowData += "<td>" + channelConfig['mailAddresses'].join(',') + "</td>";
            rowData += "<td></td>";
        }else if(channelConfig['type'] == "REST") {
            rowData += "<td></td>";
            rowData += "<td>" + channelConfig['url'] + "</td>";
        }else{
            rowData += "<td></td>";
            rowData += "<td></td>";
        }
        rowData += "<td>\n" +
            "<i class=\"fa fa-lg fa-edit edit channel-edit\" title=\"Edit\"><input type=\"hidden\" value='"+ index +"'></i>\n" +
            "<i class=\"fa fa-trash-o fa-lg delete channel-delete\" title=\"Delete\"><input type=\"hidden\" value='"+ index +"'></i>\n" +
            "</td>";
        $("#edgex-support-subscription-channel-tabel table tbody").append(rowData);
    };

  function renderSubscriptionChannelConfig(channelConfig,addOrUpdate) {
      resetSubscriptionChannelConfig();
      if(addOrUpdate == 'add'){
          $(".edgex-support-subscription-edit select[name='channelType']").prop('disabled',false);
      }else if(addOrUpdate == 'update'){
          $(".edgex-support-subscription-edit select[name='channelType']").prop('disabled',true);
      }else{
          $(".edgex-support-subscription-edit select[name='channelType']").prop('disabled',false);
      }
      if(channelConfig && channelConfig['type']){
          $(".edgex-support-subscription-edit select[name='channelType']").val(channelConfig['type']);
      }else{
          $(".edgex-support-subscription-edit select[name='channelType']").val("EMAIL");
      }
      $(".edgex-support-subscription-edit select[name='channelType']").off('change');
      $(".edgex-support-subscription-edit select[name='channelType']").on('change', function () {
          var selectedValue = $(this).val();
          if (selectedValue == 'REST') {
              if(channelConfig && channelConfig['url']){
                  $(".edgex-support-subscription-edit input[name='channelRestUrl']").val(channelConfig['url']);
              }
              $(".edgex-support-subscription-rest").show();
              $(".edgex-support-subscription-email").hide();
          } else if(selectedValue == 'EMAIL') {
              if(channelConfig && channelConfig['mailAddresses']){
                  $(".edgex-support-subscription-edit input[name='channelEmail']").val(channelConfig['mailAddresses']);
              }
              $(".edgex-support-subscription-rest").hide();
              $(".edgex-support-subscription-email").show();
          }else{
              $(".edgex-support-subscription-rest").hide();
              $(".edgex-support-subscription-email").show();
          }
      });
      $(".edgex-support-subscription-edit select[name='channelType']").change();
      $(".edgex-support-subscription-channel-config").show();
  };

  function resetSubscriptionConfig() {
      $(".edgex-support-subscription-edit input[name='id']").val("");
      $(".edgex-support-subscription-edit input[name='slug']").val("");
      $(".edgex-support-subscription-edit input[name='receiver']").val("");
      $(".edgex-support-subscription-edit input[name='description']").val("");
      $(".edgex-support-subscription-edit select[name='subscribedLabels']").selectpicker('val', []);
      $(".edgex-support-subscription-edit select[name='subscribedCategories']").selectpicker('val',[]);
      notification.cancelAddOrUpdateSubscriptionChannelBtn();
      notification.subscriptionChannelListCache = [];
      $("#edgex-support-subscription-channel-tabel table tbody").empty();
      resetSubscriptionChannelConfig();
  }

  function resetSubscriptionChannelConfig(){
      $(".edgex-support-subscription-edit select[name='channelType']").val("EMAIL");
      $(".edgex-support-subscription-edit input[name='channelEmail']").val("");
      $(".edgex-support-subscription-edit input[name='channelRestUrl']").val("");
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
