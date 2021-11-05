function reset_storage(reload = true) {
    localStorage.clear();
    if (reload) {
        document.location.reload();
    }
};


function show_stored_page_data(game, data, amount, counter_id, mode_percent, mode_essence, entire) {
    var count = 0;

    var percent_count = parseInt(document.getElementById("percent_counter").innerHTML);
    var item_count = parseInt(document.getElementById("item_counter").innerHTML);
    var essence_count = parseInt(document.getElementById("essence_counter").innerHTML);

    for (var i = 1; i <= amount; i++) {
        var id = game + "_" + data + "-" + i;

        var item = localStorage.getItem(id);

        if (item) {
            if (counter_id != "") {
                count++;
            }
            item_count++;
            if (mode_percent) {
                percent_count++;
                if (item == 2) {
                    percent_count++;
                }
            }
            if (mode_essence) {
                essence_count += item;
            }

            document.getElementById(id).className = "completed";
        }
    }
    if (counter_id != "") {
        document.getElementById(counter_id).textContent = count;
        if (entire) {
            entire_percent = Math.floor(count / entire);
            percent_count += entire_percent;
            document.getElementById(counter_id + ".c").textContent = entire_percent;
        }
    }
    document.getElementById("percent_counter").textContent = percent_count;
    document.getElementById("item_counter").textContent = item_count;
    document.getElementById("essence_counter").textContent = essence_count;
};


function mark_item(element, percent, essence, entire) {
    element_id = element.parentNode.parentNode.id;
    table_id = element.parentNode.parentNode.parentNode.parentNode.id;

    table = table_id.split('-');
    count_id = "counter-" + table[1];
    count_entire_id = count_id + ".c";
    var count = parseInt(document.getElementById(count_id).innerHTML);
    var count_entire = 0;
    if (entire) {
        count_entire = parseInt(document.getElementById(count_entire_id).innerHTML);
    }

    var percent_count = parseInt(document.getElementById("percent_counter").innerHTML);
    var item_count = parseInt(document.getElementById("item_counter").innerHTML);
    var essence_count = parseInt(document.getElementById("essence_counter").innerHTML);

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed";
        if (essence) {
            localStorage.setItem(element_id, essence);
        } else {
            localStorage.setItem(element_id, 1);
            if (percent == 2) {
                localStorage.setItem(element_id, percent);
            }
        }
        
        count++;
        item_count++;
        if (percent) {
            percent_count += percent;
        }
        if (essence) {
            essence_count += essence;
        }
    } else {
        document.getElementById(element_id).className = "uncompleted";
        localStorage.removeItem(element_id);
        count--;
        item_count--;
        if (percent) {
            percent_count -= percent;
        }
        if (essence) {
            essence_count -= essence;
        }
    }

    document.getElementById(count_id).textContent = count;
    if (entire) {
        entire_percent = Math.floor(count / entire) - count_entire;
        percent_count += entire_percent;
        document.getElementById(count_entire_id).textContent = Math.floor(count / entire);
    }
    document.getElementById("percent_counter").textContent = percent_count;
    document.getElementById("item_counter").textContent = item_count;
    document.getElementById("essence_counter").textContent = essence_count;
};