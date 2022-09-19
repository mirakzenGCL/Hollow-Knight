function reset_localstorage(reload = true) {
    localStorage.clear();
    if (reload) {
        document.location.reload();
    }
};


function parseFraction(str) {
    nums = str.split('/');
    if (nums.length == 1) {
        return parseInt(nums[0]);
    } else {
        return parseInt(nums[1]);
    }
};


percent_counter = document.getElementById("percent_counter");
action_counter = document.getElementById("item_counter");
essence_counter = document.getElementById("essence_counter");


function toggle(button, percent, essence, second_counter) {
    var action = 1;
    var percent_count = parseFraction(percent);

    element_id = button.parentNode.parentNode.id;
    element = document.getElementById(element_id);

    table_id = button.parentNode.parentNode.parentNode.parentNode.id;
    table = table_id.split('-');
    
    counter_id = "counter-" + table[1];
    counter = document.getElementById(counter_id);

    if ( element.classList.contains('uncompleted') ) {
        element.className = "completed";
        localStorage.setItem(element_id, JSON.stringify({"percent" : percent, "essence" : essence}));
    } else {
        element.className = "uncompleted";
        localStorage.removeItem(element_id);
        action = -1;
    }

    counter.textContent = parseInt(counter.innerHTML) + action;
    if (second_counter) {
        var second_count = 0;
        switch (second_counter) {
            case "percent":
                second_count = action * percent_count;
                break;
            case "essence":
                second_count = action * essence;
                break;
            case "entire":
                count = parseInt(counter.innerHTML);
                percent_count = Math.floor(count / percent_count) - Math.floor((count - action) / percent_count);
                second_count = percent_count;
                percent_count *= action;
                break;
        }
        document.getElementById(counter_id + ".c").textContent = parseInt(document.getElementById(counter_id + ".c").innerHTML) + second_count;
    }
    
    percent_counter.textContent = parseInt(percent_counter.innerHTML) + action * percent_count;
    action_counter.textContent = parseInt(action_counter.innerHTML) + action;
    essence_counter.textContent = parseInt(essence_counter.innerHTML) + action * essence;
};


function show_page_localstorage(game, data, amount, counter_id, second_counter) {
    counter = document.getElementById(counter_id);

    var percent_count = 0;
    var action_count = 0;
    var essence_count = 0;

    var part = 1;

    for (var i = 1; i <= amount; i++) {
        var id = game + "_" + data + "-" + i;
        var item = JSON.parse(localStorage.getItem(id));

        if (item) {
            part = parseFraction(item["percent"]);
            percent_count += parseFraction(item["percent"]);
            action_count++;
            essence_count += item["essence"];

            document.getElementById(id).className = "completed";
        }
    }

    if (counter_id) {
        counter.textContent = action_count;
    }
    if (second_counter) {
        var second_count = 0;
        switch (second_counter) {
            case "percent":
                second_count = percent_count;
                break;
            case "essence":
                second_count = essence_count;
                break;
            case "entire":
                percent_count = Math.floor(action_count / part);
                second_count = percent_count;
                break;
        }
        document.getElementById(counter_id + ".c").textContent = second_count;
    }

    percent_counter.textContent = parseInt(percent_counter.innerHTML) + percent_count;
    action_counter.textContent = parseInt(action_counter.innerHTML) + action_count;
    essence_counter.textContent = parseInt(essence_counter.innerHTML) + essence_count;
};
