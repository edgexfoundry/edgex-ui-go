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

$(document).ready(function(){

	//global ajax setting to redirect to login when session timeout (but user stay in old page) or user logout
	//don't worry about user bypassing it,the back-end has set permission to pass if user logout or session timeout.
	//here just improve user experience.
	$.ajaxSetup({
		cache:false,//prevent browser cache result to redirect  failed.
		headers:{"X-Session-Token":window.sessionStorage.getItem("X_Session_Token")},
		statusCode: {
			302: function() {
				window.location.href='/login.html?ran='+Math.random(); //prevent browser cache result to redirect  failed.
			}
		}
	});

	//get menu data dynamically.
	$.ajax({
		url:"/data/menu.json",
		type:"GET",
		success:function(data){
			var menu = eval(data);
			menuRender(menu);
			$(".center").load("/pages/gateway.html");
			// $(".sidebar li[url='/pages/gateway.html']").css({color:'#339933',borderBottom: '2px solid',borderBottomColor:'#339933'});
			$(".sidebar li[url='/pages/gateway.html']").css({color:'#339933',borderBottom: '',backgroundColor:'rgba(51, 153, 51, 0.2)'});
		}
	});

	//logout control
	$(".headbar li.logout").on("click",function(){
		$.ajax({
			url:'/api/v1/auth/logout?ran='+Math.random(),
			type:'GET',
			success:function(){
				window.location.href='/login.html?ran='+Math.random();
			}
		});
	});

	//user information control
	$(".headbar li.user").on("click",function(){
		$(".main_msgbox").load("/pages/userInfo.html")
		$(".main_msgbox").animate({"right":"0"},"fast");
		$(".main_shelter").show("fast");
	});

	//notification control
	$(".headbar li.notification").on("click",function(){
		$(".main_msgbox").load("/pages/notification.html")
		$(".main_msgbox").animate({"right":"0"},"fast");
		$(".main_shelter").show("fast");
	});

	//globe shelter control
	$(".main_shelter").on("click",function(){
		$(".main_shelter").hide("fast");
		$(".main_msgbox").animate({"right":"-400px"},"fast");
	});

	//render side_bar menu dynamically when load index page.
	function menuRender(data){
		for(var i=0; i<data.length;i++){
			var menu = data[i];
			var subMenu = menu.children;
			var str = '<li url="' + menu.url + '"><i class="fa fa-caret-right" style="visibility:hidden"></i><i class="'+menu.icon+'"></i><span>'+menu.title+'</span></li>';
			if( subMenu != null && subMenu.length != 0 ){
				var second_level_menu = "";
				for(var j = 0; j < subMenu.length; j++){
					second_level_menu += '<li url="' + subMenu[j].url + '"><span></span><i class="'+subMenu[j].icon+'"></i><span>'+subMenu[j].title+'<span></li>';
				}
				str = '<li children="true"><i class="fa fa-caret-right"></i><i class="' + menu.icon + '"></i><span>'+menu.title+'</span></li><div class="second_level" style="display:none"><ul>'+second_level_menu+'</ul></div>';
				$(".sidebar ul:first").append(str);
				continue;
			}
			$(".sidebar ul:first").append(str);
		}

		//bind menu event of click
		$(".sidebar li").on('click',function(event){
			event.stopPropagation();//prevent event propagate to parent node when click on current node
			//if not leaf node,expand current node.
			if($(this).attr("children") == "true"){
				//toggle menu icon when expand current node.
				$(this).find("i:first").toggleClass(function() {
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

			//if no select one gateway instance,not load other resource.
			if( window.sessionStorage.getItem('selectedGateway') == null ){
				//alert('please select a gateway instance firstly!');
				$("#addGatewayInstanceDialog").modal('show');
				return;
			};
			// $(".sidebar li").not($(this)).css({color:'',borderBottom: '',borderBottomColor:''});
			// $(this).css({color:'#339933',borderBottom: '2px solid',borderBottomColor:'#339933'});
			$(".sidebar li").not($(this)).css({color:'',borderBottom: '',borderBottomColor:'',backgroundColor:''});
			$(this).css({color:'#339933',borderBottom: '',backgroundColor:'rgba(51, 153, 51, 0.2)'});
			//if current node is leaf node，load html resource.
			$(".center").load($(this).attr("url"));
		});
	}
});
