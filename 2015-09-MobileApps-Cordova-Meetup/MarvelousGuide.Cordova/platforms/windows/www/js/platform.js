(function () {
    // Append the safeHTML polyfill
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', 'js/winstore-jscompat.js');
    if (document.body) {
        document.body.appendChild(scriptElem);
    } else {
        document.head.appendChild(scriptElem);
    }
}());


//back button fixes
if (Windows && Windows.Phone) {
    var hardwareButtons = Windows.Phone.UI.Input.HardwareButtons;
    hardwareButtons.addEventListener("backpressed", function (e) {
        if (window.history.length == 1) {
            e.handled = false;
        }
        else {
            window.history.back();
            e.handled = true;
        }
    });
}
