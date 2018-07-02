(function() {
    var X_Session_Token = window.sessionStorage.getItem("X_Session_Token")
    if (X_Session_Token == "" || X_Session_Token == "undefined") {
        window.location.href = '/login.html?ran=' + Math.random();
    }
})();

//locked browser url unchanged
(function() {
    window.history.pushState(null, null, "/");
})();

//Disable page forward and backward
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function() {
    history.pushState(null, null, document.URL);
});