var equip_better_items_btn;
var collect_items_btn;
var sell_items_btn;

//todo most likely convert toggles to sessionstorage
var loaded = false;

var sibling_class_unclicked;
var sibling_class_clicked;

var table_idx = 0;
var table_length = 0;
var invt_mgmt;

var weapon_types = [
    "Weapon",
    "Helmet",
    "Amulet",
    "Armour",
    "Greaves",
    "Gauntlet",
    "Boots",
    "Pet",
    "Shields",
    "Special"
]



$(window).on("load", function () {

    // console.log(performance.getEntriesByType("navigation")[0].type);

    if (!loaded) {

        create_buttons(["collect_items", "equip_better_items", "sell_items"])

        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            sessionStorage.removeItem("invt_mgmt");
        } else {

            if (sessionStorage.getItem("invt_mgmt") !== null) {
                //Update the button - front end only
                check_buttons();
                //anaylze_screen
                //When screen is reloaded wait to simulate user reading.
                setTimeout(function () {
                    analyze_inventory_screen();
                }, 1000 + randomInterval)
                
            }
        }
    }
})

function create_buttons(buttons) {

    //Get initial elements for formatting
    let anchor_element = $(":contains('Equipped')").closest("a");

    sibling_class_clicked = anchor_element.prev().attr("class").replace(/ +(?= )/g,'');
    sibling_class_unclicked = anchor_element.attr("class").replace(/ +(?= )/g,'');

    //Create buttons by string in array

    // create_collect_items_button(anchor_element);
    // create_equip_better_items_btn(anchor_element);
    $.each(buttons, function (key, value) {
        window[value + "_btn"] = document.createElement("button");
        window[value + "_btn"].id = value + "_btn";
        window[value + "_btn"].innerText = value.replaceAll('_', ' ').replace(
            /\w\S*/g, 
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        window[value + "_btn"].className = sibling_class_unclicked;
        anchor_element.parent().append(window[value + "_btn"]);



        //Control how the buttons work.
        //unsure why jquery can't find the buttons outside of this function
        //Functions will have to be called dynamically from this jquery call.
        $("#" + value + "_btn").on("click", function () {

            if (sessionStorage.getItem("invt_mgmt") === null) {

                window[value + "_btn"].className = sibling_class_clicked;
                sessionStorage.setItem("invt_mgmt", value)
                table_idx = 0;
                analyze_inventory_screen();
            } else {
                window[value + "_btn"].className = sibling_class_unclicked;
                if (sessionStorage.getItem("invt_mgmt") === value) {
                    sessionStorage.removeItem("invt_mgmt")
                }
            }
        })
    })
    loaded = true;
}

function check_buttons() {
    let set_button = sessionStorage.getItem("invt_mgmt");
    window[set_button + "_btn"].className = sibling_class_clicked;
}


//Set table_length
//Only increment table_idx when moving to new cell.
//If collected, equipped or sold do not increment.
//If unable to collect add item ID to json file.
function analyze_inventory_screen() {

    //set table_idx into a sessionVariable since the page is reloaded each time.
    console.log(table_idx);

    if (sessionStorage.getItem("invt_mgmt") === null) return;
    invt_mgmt = sessionStorage.getItem("invt_mgmt");

    let table = $("tbody tr");

    //Uncheck button
    if (table.length <= 0) {
        sessionStorage.removeItem("invt_mgmt");
    }

    table_length = table.length
    let clickable_button;
    let timeout = 500 + randomInterval();
    //Buttons will be returned so that the timeout can be managed.
    //This way the timeout won't hang when there is no criteria met
    if (invt_mgmt === "equip_better_items") {
        clickable_button = equip_item(table[table_idx]);
        if (clickable_button) {
            clickable_button.click()
        } else {
            timeout = 0;
        }


    }
    else if(invt_mgmt === "collect_items") return;
    else if(invt_mgmt === "sell_items") return;
    else return;

    // while (table_length > table_idx) {
    //     setTimeout(function () {
    //         table_idx++;
    //         analyze_inventory_screen()
    //     }, 1500);
    // }

    if (table_length - 1 > table_idx) {
        //timeout most likely unneeded;
        setTimeout(function () {
            table_idx++;
            analyze_inventory_screen()
        }, timeout);
    } else {
        console.log("At end of page");
    }


}


function equip_item(element) {
    // let is_better = false;
    // is_better = check_better_stats(element);

    // if (!(is_better)) return;

    //check if acceptable weapon type
    let item_type = get_item_type(element);
    if (!(check_item_type(item_type, weapon_types))) return;

    if (!(check_better_stats(element))) return;

    let equip_btn = $(element).find('a:contains("Equip")')

    if (equip_btn.length <= 0) return;
    equip_btn = equip_btn.find("button:contains('Equip')");
    return equip_btn;
}

function check_better_stats(element) {

    //Item is better but nothing to compare it to
    // if ($(element).find("i").length === 0) return true;
    //If it contains the caret up return true


    //Only check if the item has an arrow up, if it does not skip over.
    if($(element).find(".fa-caret-up").length > 0) return true;
    else return false;

}


function get_item_type(element) {
    let item_type;
    //They all contain the same type
    item_type = $(element).find('a[href*="type"]')[0].text;
    return item_type;
}

//Will take in an array. If blank array return true.
//Blank array will consider every single item type.
function check_item_type(item_type, item_list_type) {

    if (typeof item_list_type === "object" & item_list_type.length === 0) return true;
    if (item_type === null) return false;

    return (item_list_type.includes(item_type));
}


//Create json file that is compared to current table
//Session needs to know of the table previously that was being iterated.
//Current table will be constructed and compared to the previous table to make sure the values are the same.
//Iterate through the table to create the initial table
//The session will be populated with the table

