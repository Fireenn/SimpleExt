//File is for common functions for the extension to pick up
var stepping = false;
var min_int = 500
var max_int = 2000
var opponent_dead = false;

//Analyze screen for pop up events. Window.load will handle calling functions that set up the screen
function analyze_screen() {

    let found_keys = {
        "gather":   $("a[href*='/gather']"),
        "catch":    $(":contains('Catch')").closest("button"),
        "mine":     $(":contains('Mine')").closest("button"),
        "salvage":  $(":contains('Salvage')").closest("button"),
        "chop":     $(":contains('Chop')").closest("button"),
        "attack":   $("a[href*='/attack']"),
        "verify":   $("a[href*='bot']"),
        // "heal": DoHeal()
    }

    console.log(found_keys);

    $.each(found_keys, function (key, value) {
        if (value.length) {
            if (value.attr('href')) {

                if (key === "verify") {
                    toggle_auto_travel_button()
                } else {
                    window.location = value.attr('href');
                }
                
            } else {
                value.click();
            }
        }
    })

}


var simulatePointerEvent = function(element, eventName, coordX, coordY) {
    element.dispatchEvent(new PointerEvent(eventName, {
        width: 1,
        height: 1,
        pressure: 1,
        cancelable: true,
        bubbles: true,
        clientX: coordX,
        clientY: coordY
    })
    )
}

var simulateMouseEvent = function(element, eventName, coordX, coordY) {
    element.dispatchEvent(new MouseEvent(eventName, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordX,
        clientY: coordY,
        button: 0
    }));
};

//Simulate mouse clicks by sending in a mouse event.
//Must find mouseclick based on the document not query.
function mouseClickEvent(element) {
    let box = element.getBoundingClientRect();

    let coordX = Math.floor(Math.random() * (box.right - box.left + 1) + box.left);
    let coordY = Math.floor(Math.random() * (box.bottom - box.top + 1) + box.top);

    // simulateMouseEvent(element, "click", coordX, coordY);
    simulatePointerEvent(element, "click", coordX, coordY)
    // simulatePointerEvent(element, "pointerup", coordX, coordY)
}


function return_to_travel() {
    window.location = "/travel"
}

function randomInterval() {
    return Math.floor(Math.random() * (max_int - min_int + min_int) + min_int);
}

function stop_everything() {

}

$(window).on("load", function () {
    
    if (!(window.location.pathname.includes("inventory"))) sessionStorage.removeItem("invt_mgmt");


})