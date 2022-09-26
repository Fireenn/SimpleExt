$(window).on('load', function () {

    setTimeout(function () {
        auto_attack();
    }, 500 + randomInterval());

})

function auto_attack() {

    if (!(opponent_dead)) {
        
        if ($("#opponent-hp").text() !== "0") {
            if (!($("#attackButton").is(":disabled"))) {
                let attack_button = document.getElementById("attackButton");
                mouseClickEvent(attack_button);
            }
        } 
        else opponent_dead = true;

        setTimeout(function () {
            auto_attack();
        }, 1000 + randomInterval());
    } else {

        setTimeout(function () {
            window.location = "/travel";
        }, 1000 + randomInterval());
    }

    
}