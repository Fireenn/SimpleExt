var auto_travel_btn;

$(window).on("load", function () {

    // if (sessionStorage.getItem("user_id") === null & !(window.location.pathname.includes("character"))) {
    //     window.location = "/character";
    //     // console.log(window.location.pathname);
    // } else {
    //     load_auto_travel_button();
    // }
    // check_coordinates();
    // check_party();
    load_auto_travel_button();
})


//Load Travel Button
function load_auto_travel_button() {

    let party_element = $("button:contains('Party')");
    
    auto_travel_btn = document.createElement("button");
    auto_travel_btn.id = "travel_btn",
    auto_travel_btn.innerText = "Travel"
    auto_travel_btn.className = party_element.attr('class')
    party_element.parent().parent().append(auto_travel_btn);

    if (sessionStorage.getItem("stepping") !== null) {
        toggle_auto_travel_button();
    }

    $("#travel_btn").on("click", function () {
        toggle_auto_travel_button();
    })

}


//check if in party
function check_party() {
    let user_id = sessionStorage.getItem("user_id");

    if (user_id === null) return;

    profile_path = '/user/view/' + user_id

    // console.log($('a[href="' + profile_path + '"]'));

}


//Set functions for the travel button
function toggle_auto_travel_button() {

    let button = $('#travel_btn');

    if (!(stepping)) {
        button.removeClass("bg-white").css('background-color', 'red');
        stepping = true
        sessionStorage.setItem("stepping", "true")

        //Get input from user of how many steps they want to do
        //pass input into the function increment after each press of the button
        setTimeout(function () {
            auto_travel();
        }, 500 + randomInterval())
        
    } else {
        button.css('background-color', "");
        button.addClass("bg-white");
        stepping = false
        sessionStorage.removeItem("stepping")
    }
}

//Perform Auto travel
function auto_travel() {

    let timeout;
    if (stepping) {
        $('button[id*=step').each(function () {
            if ($(this).text().trim() !== "Take a step") return;
            if ($(this).is(":disabled")) {
                timeout = 4500 + randomInterval();
                analyze_screen();
            } else {
                let step_button = document.getElementById("step_button")
                mouseClickEvent(step_button);
                //set timeout to be 1s
                timeout = 500 + randomInterval();
            }

        });

        setTimeout(function () {
            auto_travel();
        }, timeout);

    }
}

function check_coordinates() {
    let step_button = document.getElementById("step_button")

    let box = step_button.getBoundingClientRect();
    console.log(box);

    let x, y;

    x = Math.floor(Math.random() * (box.right - box.left + 1) + box.left);
    y = Math.floor(Math.random() * (box.bottom - box.top + 1) + box.top);

    console.log(x)
    console.log(y);

}


function wave_to_party() {

}

document.addEventListener("click", check_click);

function check_click(event) {
    console.log(event);
}