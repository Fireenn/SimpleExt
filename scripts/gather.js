$(window).on("load", function () {

    // setTimeout(function () {

    //     if ($("#crafting_button").is(":disabled")) {
    //         return_to_travel();
    //     } else {
    //         $("#crafting_button").click()
    //     }
    // }, 1500 + randomInterval());

    //If the button is disabled on the load of the screen then you do not have a high enough level to 
    if ($("#crafting_button").is(":disabled")) {
        setTimeout(function () {
            return_to_travel();
        }, 500 + randomInterval());
        
        return_to_travel();
    }

    setTimeout(function () {
        auto_gather();
    }, 1500 + randomInterval());

})

function auto_gather() {


    if (!($("#crafting_button").is("disabled"))){
        $("#crafting_button").click()
        let crafting_button = document.getElementById("crafting_button");
        mouseClickEvent(crafting_button);
    }

    setTimeout(function () {
        auto_gather();

    }, 1500 + randomInterval());
}