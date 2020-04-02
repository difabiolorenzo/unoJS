function initVariables() {
    init_card_tag = ["0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "ask", "ask", "ask", "ask", "plus_four", "plus_four", "plus_four", "plus_four"];
    init_card_color = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "black", "black", "black", "black", "black", "black", "black", "black"];
    middle_deck_card_tag = [];
    middle_deck_card_color = [];
    revert_deck_card_tag = [];
    revert_deck_card_color = [];
    player_card_tag = [];
    player_card_color = [];
    bot_card_tag = [];
    bot_card_color = [];
    player_can_pick = true;
    bot_can_pick = false;

    reverse_display_bot_card = true;

    bot_card_number = 7;
    player_card_number = 7;

    turn = "player";

    delay = 1000; //ms
    
    player_deck = document.getElementById("player_deck");
    bot_deck = document.getElementById("bot_deck");
    revert_deck_html = document.getElementById("deck");

    mixAllCards();
    distribution();
}

function mixAllCards() {
    for (i=0 ; i<108 ; i++) {
        //pick a random number between 0 and [init_card_tag.length]
        var random = Math.floor(Math.random() * init_card_tag.length);

        // add into deck
        middle_deck_card_tag.push(init_card_tag[random]);
        middle_deck_card_color.push(init_card_color[random]);

        // deleting from list
        init_card_tag.splice(random, 1);
        init_card_color.splice(random, 1);
    }
    // like it was before
    init_card_color = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "black", "black", "black", "black", "black", "black", "black", "black"];
    init_card_tag = ["0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "ask", "ask", "ask", "ask", "plus_four", "plus_four", "plus_four", "plus_four"];
}

function distribution() {
    for (i = 0 ; i < bot_card_number ; i++) {

        var picked_card_info = pickDeck(false);
        var picked_tag = picked_card_info[0];
        var picked_color = picked_card_info[1];
        BotDeckAddCard(picked_tag, picked_color);
    }
    
    for (i = 0 ; i < player_card_number ; i++) {

        var picked_card_info = pickDeck(false);
        var picked_tag = picked_card_info[0];
        var picked_color = picked_card_info[1];
        PlayerDeckAddCard(picked_tag, picked_color);
    }

    var picked_card_info = pickDeck(true);
    var picked_tag = picked_card_info[0];
    var picked_color = picked_card_info[1];
    addOnReverseDeck(picked_tag , picked_color, false);
}

function changeTurn() {
    if ( turn == "player") {
        turn = "bot";
        bot_can_pick = true;

        reinitBlockedCard();
        player_deck.style = "transform: scale(0.85);opacity: 0.5;}";
        bot_deck.style = "";

        document.getElementById("pass_button").disabled = true;
        document.getElementById("uno_button").disabled = true;
        document.getElementById("pick_button").disabled = true;

        setTimeout(() => { changeTurn(); }, delay*2);
    } else {
        turn = "player";
        player_can_pick = true;

        player_deck.style = "";
        bot_deck.style = "transform: scale(0.85);opacity: 0.5;}";

        document.getElementById("pass_button").disabled = false;
        document.getElementById("uno_button").disabled = false;
        document.getElementById("pick_button").disabled = false;
    }
}

function reinitBlockedCard() {
    for (var i = 0 ; i < player_deck.rows[0].cells.length ; i++) {
        player_deck.rows[0].cells[i].style = "";
    }
}

function plusCardAdverse(amount) {
    if ( turn == "player") {
        for (var i = 0 ; i < amount ; i++) {

            var picked_card_info = pickDeck(false);
            var picked_tag = picked_card_info[0];
            var picked_color = picked_card_info[1];
            BotDeckAddCard(picked_tag, picked_color);
        }
    } else {
        for (var i = 0 ; i < amount ; i++) {

            var picked_card_info = pickDeck(false);
            var picked_tag = picked_card_info[0];
            var picked_color = picked_card_info[1];
            PlayerDeckAddCard(picked_tag, picked_color);
        }
    } 
}

function pickFromMiddleDeck(entity) {
    if (entity == "player") {

        var picked_card_info = pickDeck(false);
        var picked_tag = picked_card_info[0];
        var picked_color = picked_card_info[1];
        PlayerDeckAddCard(picked_tag, picked_color);
    } else {

        var picked_card_info = pickDeck(false);
        var picked_tag = picked_card_info[0];
        var picked_color = picked_card_info[1];
        BotDeckAddCard(picked_tag, picked_color);
    }
}

function pickDeck(only_number) {
    if (only_number == false) {
        //pick a random number between 0 and [middle_deck_card_color.length]
        random = Math.floor(Math.random() * middle_deck_card_color.length);

        //tag and color form #random card in deck
        var picked_tag = middle_deck_card_tag[random];
        var picked_color = middle_deck_card_color[random];

        // deleting from deck
        middle_deck_card_tag.splice(random, 1);
        middle_deck_card_color.splice(random, 1);
        
        return [picked_tag, picked_color];
    } else {
        //pick a random number between 0 and [middle_deck_card_color.length]
        random = Math.floor(Math.random() * middle_deck_card_color.length);
        
        while (middle_deck_card_color[random] == "black" || middle_deck_card_tag[random] == "plus_two" || middle_deck_card_tag[random] == "plus_four" || middle_deck_card_tag[random] == "switch" || middle_deck_card_tag[random] == "ask" ||  middle_deck_card_tag[random] == "skip" ) {
            var random = Math.floor(Math.random() * middle_deck_card_color.length);
        }
        //tag and color form #random card in deck
        var picked_tag = middle_deck_card_tag[random];
        var picked_color = middle_deck_card_color[random];

        // deleting from deck
        middle_deck_card_tag.splice(random, 1);
        middle_deck_card_color.splice(random, 1);

        return [picked_tag, picked_color];
    }
}

function displayCard(picked_tag, picked_color, placement, reverse_face) {
    if (reverse_face == false) {
        if (placement == "reverse_deck") {
            var random_angle = Math.floor(Math.random() * (15 - (-15)) ) + (-15);
            var card_head = "<div data-color=\"" + picked_color + "\" data-tag=\"" + picked_tag + "\" style=\"transform: rotateZ(" + random_angle + "deg);\" class=\"big_card " + picked_color + "_card\">";
            if (picked_tag >= 0 && picked_tag <= 9) {
                var card_top = "<div id=\"card_label_top\" class=\"big_card_little_label\"><a>" + picked_tag + "</a></div>";
                var card_middle = "<div id=\"big_card_label_middle\"><a>" + picked_tag + "</a></div>";
                var card_bottom = "<div id=\"card_label_bottom\" class=\"big_card_little_label\"><a>" + picked_tag + "</a></div>";
            } else if (picked_tag == "plus_two") {
                var card_top = "<div id=\"card_label_top\" class=\"big_card_little_label\"><a>+2</a></div>";
                var card_middle = "<div id=\"big_card_label_middle\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>";
                var card_bottom = "<div id=\"card_label_bottom\" class=\"big_card_little_label\"><a>+2</a></div>";
            } else if (picked_tag == "plus_four") {
                var card_top = "<div id=\"card_label_top\" class=\"big_card_little_label\"><a>+4</a></div>";
                var card_middle = "<div id=\"big_card_label_middle\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>";
                var card_bottom = "<div id=\"card_label_bottom\" class=\"big_card_little_label\"><a>+4</a></div>";
            } else {
                var card_top = "<div id=\"card_label_top\" class=\"big_card_little_label\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>";
                var card_middle = "<div id=\"big_card_label_middle\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>"
                var card_bottom = "<div id=\"card_label_bottom\" class=\"big_card_little_label\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div></div>";
            }
        } else {
            //HTML parts of card
            var card_head = "<td><div data-color=\"" + picked_color + "\" data-tag=\"" + picked_tag + "\" class=\"playable_card " + picked_color + "_card\" onclick=\"PlayerDeckPickCard(this)\">";
            if (picked_tag >= 0 && picked_tag <= 9) {
                var card_top = "<div id=\"card_label_top\" class=\"little_label\"><a>" + picked_tag + "</a></div>";
                var card_middle = "<div id=\"card_label_middle\"><a>" + picked_tag + "</a></div>";
                var card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"><a>" + picked_tag + "</a></div>";
            } else if (picked_tag == "plus_two") {
                var card_top = "<div id=\"card_label_top\" class=\"little_label\"><a>+2</a></div>";
                var card_middle = "<div id=\"card_label_middle\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>";
                var card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"><a>+2</a></div>";
            } else if (picked_tag == "plus_four") {
                var card_top = "<div id=\"card_label_top\" class=\"little_label\"><a>+4</a></div>";
                var card_middle = "<div id=\"card_label_middle\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>";
                var card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"><a>+4</a></div>";
            } else {
                var card_top = "<div id=\"card_label_top\" class=\"little_label\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>";
                var card_middle = "<div id=\"card_label_middle\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div>"
                var card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"> <img src=\"src/img/sign/" + picked_tag + ".png\"> </div></div></td>";
            }
        }

        //write down into document
        if (placement == "player") {
            player_deck.rows[0].insertCell().innerHTML +=  card_head + card_top + card_middle + card_bottom;
        } 
        if (placement == "bot" ) {
            bot_deck.rows[0].insertCell().innerHTML +=  card_head + card_top + card_middle + card_bottom;
        }
        if (placement == "reverse_deck" ){
            revert_deck_html.innerHTML += card_head + card_top + card_middle + card_bottom;
        }
    } else {
        //HTML parts of card
        var card_head = "<td><div data-color=\"black\"" + "data-tag=\"" + picked_tag + "\"class=\"playable_card black_card\">";
        var card_middle = "<div id=\"card_label_middle\"> <img class=\"backcard_logo\" src=\"src/img/uno_logo.png\"> </div><td>";            

        //write down into document
        if (placement == "player") {
            player_deck.rows[0].insertCell().innerHTML +=  card_head + card_middle;
        } else {
            bot_deck.rows[0].insertCell().innerHTML +=  card_head + card_middle;
        }
    }
}


function addOnReverseDeck(picked_tag , picked_color, analyze) {
    revert_deck_card_tag.push(picked_tag);
    revert_deck_card_color.push(picked_color);

    displayCard(picked_tag, picked_color, "reverse_deck", false);

    if (analyze == true) {
        if (picked_tag == "plus_two") {
        plusCardAdverse(2);
        changeTurn();
        } else if (picked_tag == "plus_four") {
            plusCardAdverse(4);
            changeTurn();
        } else if (picked_tag == "ask") {
            console.log("display ask div");
            changeTurn();
        } else if (picked_tag == "switch" || picked_tag == "skip") {
            if (turn == "player") {
                player_can_pick = true;
                reinitBlockedCard();
            }
        } else {
            changeTurn();
        }
    }  
}

function BotDeckAddCard(picked_tag, picked_color) {
    // add into bot's deck
    bot_card_tag.push(picked_tag);
    bot_card_color.push(picked_color);
    displayCard(picked_tag, picked_color, "bot", reverse_display_bot_card);
}

function PlayerDeckAddCard(picked_tag, picked_color) {
    // add into players's deck
    player_card_tag.push(picked_tag);
    player_card_color.push(picked_color);
    displayCard(picked_tag, picked_color, "player", reverse_display_player_card);        
}

function PlayerDeckPickCard(obj) {
    if (player_can_pick == true) {
        var picked_card_index = obj.parentNode.cellIndex;
        var picked_color = player_card_color[picked_card_index];
        var picked_tag = player_card_tag[picked_card_index];

        var last_reverse_deck_tag = revert_deck_card_tag[revert_deck_card_tag.length-1]
        var last_reverse_deck_color = revert_deck_card_color[revert_deck_card_color.length-1]

        if ( picked_tag == last_reverse_deck_tag || picked_color == last_reverse_deck_color || picked_color == "black") {
            PlayerDeckRemoveCardAnimation(picked_card_index, picked_color, picked_tag)
        } else {
            player_deck.rows[0].cells[picked_card_index].style = "transform: scale(0.85);opacity: 0.5;}"
        }
    }
}

function PlayerDeckRemoveCardAnimation(picked_card_index, picked_color, picked_tag) {
    player_can_pick = false;
    player_deck.rows[0].cells[picked_card_index].style = "transform: scale(0);opacity: 0;}"
    setTimeout(() => { PlayerDeckRemoveCard(picked_card_index, picked_color, picked_tag); }, 500);
}

function PlayerDeckRemoveCard(picked_card_index, picked_color, picked_tag) {
        player_card_tag.splice(picked_card_index, 1);
        player_card_color.splice(picked_card_index, 1);
        player_deck.rows[0].deleteCell(picked_card_index);
        addOnReverseDeck(picked_tag , picked_color, true);
}

function botAnalyzeCard() {
    for (var i = 0 ; i < bot_card_tag.length ; i++) {
    }
}