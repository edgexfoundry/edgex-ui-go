function login() {
    var name = $("#userName").val();
    var pwd = $("#userPwd").val();
    $.ajax({
        url: '/api/v1/auth/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'name': name,
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
                    success: function(data) {
                        //alert("Already change gateway to " + gatewayManagementModule.selectedRow.name);
                    }
                });
            }
        }
    });

}

$(document).ready(function() {
    $(".login_form button").on('click', function() {
        login();
    });
    document.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
            login();
        }
    }, false);
});