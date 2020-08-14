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
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

$(document).ready(function () {

	//global ajax setting to redirect to login when session timeout (but user stay in old page) or user logout
	//don't worry about user bypassing it,the back-end has set permission to pass if user logout or session timeout.
	//here just improve user experience.
	$.ajaxSetup({
		cache: false,//prevent browser cache result to redirect  failed.
		headers: { "X-Session-Token": window.sessionStorage.getItem("X_Session_Token") },
		statusCode: {
			302: function () {
				window.location.href = '/login.html?ran=' + Math.random(); //prevent browser cache result to redirect  failed.
			}
		}
	});

	var edgexFoundryCreatedTabs = [];

	//get menu data dynamically.
	$.ajax({
		url: "/data/menu.json",
		type: "GET",
		success: function (data) {
			var menu = eval(data);
			menuRender(menu);
			bindCloseTab();
            $('.sidebar ul li:first').click()
		}
	});

	//logout control
	$(".headbar li.logout").on("click", function () {
		$.ajax({
			url: '/api/v1/auth/logout?ran=' + Math.random(),
			type: 'GET',
			success: function () {
				window.location.href = '/login.html?ran=' + Math.random();
			}
		});
	});

	//user information control
	$(".headbar li.user").on("click", function () {
		$(".main_msgbox").load("/pages/userInfo.html")
		$(".main_msgbox").animate({ "right": "0" }, "fast");
		$(".main_shelter").show("fast");
	});

	//notification control
	$(".headbar li.notification").on("click", function () {
		// $(".main_msgbox").load("")
		// $(".main_msgbox").animate({"right":"0"},"fast");
		// $(".main_shelter").show("fast");
	});

	//globe shelter control
	$(".main_shelter").on("click", function () {
		$(".main_shelter").hide("fast");
		$(".main_msgbox").animate({ "right": "-400px" }, "fast");
	});

	//render side_bar menu dynamically when load index page.
	function menuRender(data) {
		for (var i = 0; i < data.length; i++) {
			var menu = data[i];
			var subMenu = menu.children;
			var str = '<li url="' + menu.url + '" tabindex=' + menu.title + ' ><i class="fa fa-caret-right" style="visibility:hidden"></i><i class="fa fa-circle" style="color: green"></i><i class="' + menu.icon + '"></i><span>' + menu.title + '</span></li>';
			if (subMenu != null && subMenu.length != 0) {
				var second_level_menu = "";
				for (var j = 0; j < subMenu.length; j++) {
					second_level_menu += '<li url="' + subMenu[j].url + '" tabindex=' + subMenu[j].title + '><span></span><i class="' + subMenu[j].icon + '"></i><span>' + subMenu[j].title + '<span></li>';
				}
				str = '<li children="true"><i class="fa fa-caret-right"></i><i class="' + menu.icon + '"></i><span>' + menu.title + '</span></li><div class="second_level" style="display:none"><ul>' + second_level_menu + '</ul></div>';
				$(".sidebar ul:first").append(str);
				continue;
			}
			$(".sidebar ul:first").append(str);
		}

		//bind menu event of click
		$(".sidebar li").on('click', function (event) {
			event.stopPropagation();//prevent event propagate to parent node when click on current node
			//if not leaf node,expand current node.
			if ($(this).attr("children") == "true") {
				//toggle menu icon when expand current node.
				$(this).find("i:first").toggleClass(function () {
					if ($(this).hasClass("fa fa-caret-right")) {
						$(this).removeClass();
						return 'fa fa-caret-down';
					} else {
						$(this).removeClass();
						return 'fa fa-caret-right';
					}
				});
				$(this).next("div.second_level").slideToggle("normal");
				return;
			}
			// $(".sidebar li").not($(this)).css({color:'',borderBottom: '',borderBottomColor:''});
			// $(this).css({color:'#339933',borderBottom: '2px solid',borderBottomColor:'#339933'});
			$(".sidebar li").not($(this)).css({ color: '', borderBottom: '', borderBottomColor: '', backgroundColor: '' });
			$(this).css({ color: '#339933', borderBottom: '', backgroundColor: 'rgba(51, 153, 51, 0.5)' });
			//if current node is leaf node，load html resource.
			var tabindex = $(this).attr("tabindex");
			var url = $(this).attr("url");
			createTabByTitle(tabindex, url);
			checkServicesHealthy(this,tabindex);
		});
	}

    function checkServicesHealthy(thisTab, tabIndex) {
        switch (tabIndex) {
            case 'DeviceService':
                $.when($.ajax({
                    url: '/core-metadata/api/v1/ping',
                    type: 'GET',
                }), $.ajax({
                    url: '/core-command/api/v1/ping',
                    type: 'GET',
                })).done(function (coreMetadataResult, coreCommandResult) {
                    if (coreMetadataResult.indexOf('pong') > -1 && coreCommandResult.indexOf('pong') > -1) {
                        renderByCheckResult(thisTab, "healthy");
                    } else {
                        renderByCheckResult(thisTab, "unhealthy");
                    }
                }).fail(function (error) {
                    renderByCheckResult(thisTab, "unhealthy");
                });
                break;
            case 'Scheduler':
                $.ajax({
                    url: '/support-scheduler/api/v1/ping',
                    type: 'GET',
                    success: function (data) {
                        if (data == "pong") {
                            renderByCheckResult(thisTab, "healthy");
                        } else {
                            renderByCheckResult(thisTab, "unhealthy");
                        }
                    },
                    error: function () {
                        renderByCheckResult(thisTab, "unhealthy");
                    },
                });
                break;
            case 'Notification':
                $.ajax({
                    url: '/support-notification/api/v1/ping',
                    type: 'GET',
                    success: function (data) {
                        if (data == "pong") {
                            renderByCheckResult(thisTab, "healthy");
                        } else {
                            renderByCheckResult(thisTab, "unhealthy");
                        }
                    },
                    error: function () {
                        renderByCheckResult(thisTab, "unhealthy");
                    },
                });
                break;
            case 'Multimedia':
                renderByCheckResult(thisTab, "unhealthy");
                break;
            case 'Export':
                $.ajax({
                    url: '/core-export/api/v1/ping',
                    type: 'GET',
                    success: function (data) {
                        if (data == "pong") {
                            renderByCheckResult(thisTab, "healthy");
                        } else {
                            renderByCheckResult(thisTab, "unhealthy");
                        }
                    },
                    error: function () {
                        renderByCheckResult(thisTab, "unhealthy");
                    },
                });
                break;
            case 'RuleEngine':
                $.ajax({
                    url: '/rule-engine',
                    type: 'GET',
                    success: function (data) {
                        if (data.trim() == "OK") {
                            renderByCheckResult(thisTab, "healthy");
                        } else {
                            renderByCheckResult(thisTab, "unhealthy");
                        }
                    },
                    error: function () {
                        renderByCheckResult(thisTab, "unhealthy");
                    },
                });
                break;
            case 'AppServices':
                $.ajax({
                    url: '/api/v1/appservice/heartbeat',
                    type: 'GET',
                    success: function (data) {
                        if (data == "pong") {
                            renderByCheckResult(thisTab, "healthy");
                        } else {
                            renderByCheckResult(thisTab, "unhealthy");
                        }
                    },
                    error: function () {
                        renderByCheckResult(thisTab, "unhealthy");
                    },
                });
                break;
        }

        function renderByCheckResult(thisTab, result) {
            var target = $(thisTab).find("i.fa.fa-circle");
            if (result == 'healthy') {
                $(target).css("color", "green");
            } else {
                $(target).css("color", "red");
            }
        }
    }

	function bindCloseTab() {
		$("#edgex-foundry-tabs-index-main .edgex-tab button").off('click').on('click', function () {
			event.stopPropagation();
			var btn = this;
			bootbox.confirm({
				title: "confirm",
				message: "Are you sure to remove it ? ",
				className: 'green-red-buttons',
				callback: function (result) {
					if (result) {
						//debugger
						var tabindex = $(btn).parent().attr("tabindex");
						var nexttab = $(btn).parent().next();
						if (nexttab.length == 0) {
							nexttab = $(btn).parent().prev();
						}
						var nexttabindex = nexttab.attr("tabindex");
						$("a[href='#" + nexttabindex + "']").tab('show');
						$("#" + tabindex + "").remove();
						$(btn).parent().remove();
						edgexFoundryCreatedTabs.splice(edgexFoundryCreatedTabs.indexOf(tabindex), 1);

					}
				}
			});
		});
	}


	function createTabByTitle(title, url) {
		//debugger
		if (edgexFoundryCreatedTabs.indexOf("edgex-foundry-tab-" + title) != -1) {
			$("a[href='#edgex-foundry-tab-" + title + "']").tab('show');
			return;
		}
		var tabTitle = '<li role="presentation" tabindex="edgex-foundry-tab-' + title + '" class="edgex-tab" style="position:relative!important;">';
		tabTitle += '<button type="button" value="edgex-foundry-tab-' + title + '" class="close" style="position:absolute!important;top:-2px;;right:4px;z-index:10;display:none;" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		tabTitle += '<a href="#edgex-foundry-tab-' + title + '" aria-controls="edgex-foundry-tab-' + title + '" role="tab" data-toggle="tab">'
		tabTitle += '<span class="text-success" style="font-weight:bold;">' + title + '</span>'
		tabTitle += '</a>'
		tabTitle += '</li>'
		$("#edgex-foundry-tabs-index-main").append(tabTitle);

		var tabContent = '<div role="tabpanel" class="tab-pane" id="edgex-foundry-tab-' + title + '">';
		tabContent += '</div>';

		$("#edgex-foundry-tabs-content").append(tabContent);
		$("#edgex-foundry-tabs-content #edgex-foundry-tab-" + title).load(url);

		$("a[href='#edgex-foundry-tab-" + title + "']").tab('show');
		bindCloseTab();
		edgexFoundryCreatedTabs.push("edgex-foundry-tab-" + title);
	}

});
