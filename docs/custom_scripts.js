function reset_storage(reload = true) {
    localStorage.clear();
    if (reload) {
        document.location.reload();
    }
};


function show_stored_page_data(game, data, amount, counter_id, mode_percent, mode_essence) {
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
            }
            if (mode_essence) {
                essence_count += item;
            }

            document.getElementById(id).className = "completed";
        }
    }
    if (counter_id != "") {
        document.getElementById(counter_id).textContent = count;
    }
    document.getElementById("percent_counter").textContent = percent_count;
    document.getElementById("item_counter").textContent = item_count;
    document.getElementById("essence_counter").textContent = essence_count;
};


function mark_item(element, percent, essence) {
    element_id = element.parentNode.parentNode.id;

    table_id = element.parentNode.parentNode.parentNode.parentNode.id;
    table = table_id.split('-');
    count_id = "counter-" + table[1];
    var count = parseInt(document.getElementById(count_id).innerHTML);

    var percent_count = parseInt(document.getElementById("percent_counter").innerHTML);
    var item_count = parseInt(document.getElementById("item_counter").innerHTML);
    var essence_count = parseInt(document.getElementById("essence_counter").innerHTML);

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed";
        if (essence) {
            localStorage.setItem(element_id, essence);
        } else {
            localStorage.setItem(element_id, 1);
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
    document.getElementById("percent_counter").textContent = percent_count;
    document.getElementById("item_counter").textContent = item_count;
    document.getElementById("essence_counter").textContent = essence_count;
};