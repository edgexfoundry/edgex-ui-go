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

function login() {
    var name = $("#Username").val().trim();
    var pwd = $("#Userpassword").val().trim();
    debugger
    $.ajax({
        url: '/api/v1/auth/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'username': name,
            'password': pwd
        }),
        success: function(data) {
            window.sessionStorage.setItem("X_Session_Token", data)
            window.location.href = '/?X-Session-Token=' + data;
            var selectedGateway = JSON.parse(window.sessionStorage.getItem('selectedGateway'))
            if (selectedGateway) {
                var addr = {
                    "hostIP": selectedGateway.address
                };
                $.ajax({
                    url: '/api/v1/proxy',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(addr),
                    headers: {
                        "X-Session-Token": window.sessionStorage.getItem("X_Session_Token")
                    },
                    success: function(data) {}
                });
            }
        },
        error: function(result) {
            bootbox.alert({
                title: 'Error',
                message: result.responseText,
                className: 'red-green-buttons'
            });
        }
    });

}

$(document).ready(function() {
    $(".login_form button").on('click', function() {
        if ($("#Username").val().trim() == "") {
            $("#Username").focus();
            return
        }
        if ($("#Userpassword").val().trim() == "") {
            $("#Userpassword").focus();
            return
        }
        login();
    });
    document.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
            login();
        }
    }, false);
});