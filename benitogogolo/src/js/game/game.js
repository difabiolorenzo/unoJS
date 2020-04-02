function initVariables() {
    init_cards = [["0", "red"],["1", "red"],["1", "red"],["2", "red"],["2", "red"],["3", "red"],["3", "red"],["4", "red"],["4", "red"],["5", "red"],["5", "red"],["6", "red"],["6", "red"],["7", "red"],["7", "red"],["8", "red"],["8", "red"],["9", "red"],["9", "red"],["plus_two", "red"],["plus_two", "red"],["switch", "red"],["switch", "red"],["skip", "red"],["skip", "red"],["0", "blue"],["1", "blue"],["1", "blue"],["2", "blue"],["2", "blue"],["3", "blue"],["3", "blue"],["4", "blue"],["4", "blue"],["5", "blue"],["5", "blue"],["6", "blue"],["6", "blue"],["7", "blue"],["7", "blue"],["8", "blue"],["8", "blue"],["9", "blue"],["9", "blue"],["plus_two", "blue"],["plus_two", "blue"],["switch", "blue"],["switch", "blue"],["skip", "blue"],["skip", "blue"],["0", "yellow"],["1", "yellow"],["1", "yellow"],["2", "yellow"],["2", "yellow"],["3", "yellow"],["3", "yellow"],["4", "yellow"],["4", "yellow"],["5", "yellow"],["5", "yellow"],["6", "yellow"],["6", "yellow"],["7", "yellow"],["7", "yellow"],["8", "yellow"],["8", "yellow"],["9", "yellow"],["9", "yellow"],["plus_two", "yellow"],["plus_two", "yellow"],["switch", "yellow"],["switch", "yellow"],["skip", "yellow"],["skip", "yellow"],["0", "green"],["1", "green"],["1", "green"],["2", "green"],["2", "green"],["3", "green"],["3", "green"],["4", "green"],["4", "green"],["5", "green"],["5", "green"],["6", "green"],["6", "green"],["7", "green"],["7", "green"],["8", "green"],["8", "green"],["9", "green"],["9", "green"],["plus_two", "green"],["plus_two", "green"],["switch", "green"],["switch", "green"],["skip", "green"],["skip", "green"],["ask", "black"],["ask", "black"],["ask", "black"],["ask", "black"],["plus_four", "black"],["plus_four", "black"],["plus_four", "black"],["plus_four", "black"]]
    middle_deck_cards = [];
    reverse_deck_cards = [];
    player_cards = [];
    bot_cards = [];

    player_can_pick = true;
    bot_can_pick = false;

    reverse_display_bot_card = false;
    reverse_display_player_card = false;

    bot_card_number = 3;
    player_card_number = 3;

    turn = "player";

    delay = 500; //ms
    
    player_deck_html = document.getElementById("player_deck");
    bot_deck_html = document.getElementById("bot_deck");
    reverse_deck_html = document.getElementById("reverse_deck");
    ask_panel_html = document.getElementById("ask");

    mixAllCards();
    distribution();
}

function mixAllCards() {
    var temp_cards_deck = [];
    for (i=0 ; i<108 ; i++) {
        temp_cards_deck.push(init_cards[i]);
    }
    for (i=0 ; i<108 ; i++) {
        var random = Math.floor(Math.random() * temp_cards_deck.length);
        middle_deck_cards.push(temp_cards_deck[random]);
        temp_cards_deck.splice(random, 1);
    }
}

function distribution() {
    for (i = 0 ; i < bot_card_number ; i++) {
        BotDeckAddCard(["plus_two","green"]);
    }
    for (i = 0 ; i < player_card_number ; i++) {
        PlayerDeckAddCard(["plus_two","green"]);
    }
    addOnReverseDeck(["0","green"], false);
}

function pickDeck(only_number) {
    if (only_number == false) {
        var random = Math.floor(Math.random() * middle_deck_cards.length);
    } else {
        //pick a random number between 0 and [middle_deck_card_color.length]
        var random = Math.floor(Math.random() * middle_deck_cards.length);
        while (middle_deck_cards[random][1] == "black" || middle_deck_cards[random][0] == "plus_two" || middle_deck_cards[random][0] == "plus_four" || middle_deck_cards[random][0] == "switch" || middle_deck_cards[random][0] == "ask" ||  middle_deck_cards[random][0] == "skip" ) {
            var random = Math.floor(Math.random() * middle_deck_cards.length);
        }
    }
    var picked_card = middle_deck_cards[random];
    middle_deck_cards.splice(random, 1);

    return picked_card;
}

function changeTurn() {
    if ( turn == "player") {
        turn = "bot";
        bot_can_pick = true;

        reinitBlockedCard();
        player_deck_html.style = "transform: scale(0.85);opacity: 0.5;}";
        bot_deck_html.style = "";

        
        setTimeout(() => { botAnalyzeCard();}, delay*2);  
        
        document.getElementById("pass_button").disabled = true;
        document.getElementById("uno_button").disabled = true;
        document.getElementById("pick_button").disabled = true;
    } else {
        turn = "player";
        player_can_pick = true;

        player_deck_html.style = "";
        bot_deck_html.style = "transform: scale(0.85);opacity: 0.5;}";

        document.getElementById("pass_button").disabled = false;
        document.getElementById("uno_button").disabled = false;
        document.getElementById("pick_button").disabled = false;
    }
}

function displayAskPanel() {
    if (ask_panel_html.style.display == "none") {
        ask_panel_html.style.display = "block"
    } else {
        ask_panel_html.style.display = "none"
    }
}

function reinitBlockedCard() {
    for (var i = 0 ; i < player_deck_html.rows[0].cells.length ; i++) {
        player_deck_html.rows[0].cells[i].style = "";
    }
}

function plusCardAdverse(amount) {
    if ( turn == "player") {
        for (var i = 0 ; i < amount ; i++) {
            BotDeckAddCard(pickDeck(false));
        }
        if (amount == 4) {
            displayAskPanel();
            reinitBlockedCard()
        } else {
            changeTurn();
        }
    } else {
        for (var i = 0 ; i < amount ; i++) {
            PlayerDeckAddCard(pickDeck(false));
        }
        if (amount == 4) {
            var last_reverse_deck_card = reverse_deck_cards[reverse_deck_cards.length-1];
            reverse_deck_html.children[reverse_deck_html.children.length-1].remove();
            displayCard([last_reverse_deck_card[0], "green"], "reverse_deck", false); //todo
        }
        changeTurn();
    } 
}

function chooseColor(color) {
    var last_reverse_deck_card = reverse_deck_cards[reverse_deck_cards.length-1];
    reverse_deck_html.children[reverse_deck_html.children.length-1].remove();
    displayCard([last_reverse_deck_card[0], color], "reverse_deck", false);

    displayAskPanel();
    changeTurn();
}

function pickOnceFromMiddleDeck() {
    pickFromMiddleDeck("player");
    changeTurn();
}

function pickFromMiddleDeck(entity) {
    if (entity == "player") {
        PlayerDeckAddCard(pickDeck(false));
    } else {
        BotDeckAddCard(pickDeck(false));
    }
}

function displayCard(picked_card, placement, reverse_face) {
    var picked_tag = picked_card[0];
    var picked_color = picked_card[1];

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
            player_deck_html.rows[0].insertCell().innerHTML +=  card_head + card_top + card_middle + card_bottom;
        } 
        if (placement == "bot" ) {
            bot_deck_html.rows[0].insertCell().innerHTML +=  card_head + card_top + card_middle + card_bottom;
        }
        if (placement == "reverse_deck" ){
            reverse_deck_html.innerHTML += card_head + card_top + card_middle + card_bottom;
        }
    } else {
        //HTML parts of card
        var card_head = "<td><div data-color=\"black\"" + "data-tag=\"" + picked_tag + "\"class=\"playable_card black_card\">";
        var card_middle = "<div id=\"card_label_middle\"> <img class=\"backcard_logo\" src=\"src/img/uno_logo.png\"> </div><td>";            

        //write down into document
        if (placement == "player") {
            player_deck_html.rows[0].insertCell().innerHTML +=  card_head + card_middle;
        } else {
            bot_deck_html.rows[0].insertCell().innerHTML +=  card_head + card_middle;
        }
    }
}


function addOnReverseDeck(picked_card, analyze) {
    var picked_card_tag = picked_card[0];
    reverse_deck_cards.push(picked_card);
    displayCard(picked_card, "reverse_deck", false);

    if (analyze == true) {
        if (picked_card_tag == "plus_two") {
            plusCardAdverse(2);
        } else if (picked_card_tag == "plus_four") {
            plusCardAdverse(4);
        }
        if (turn == "player") {
            if (picked_card_tag == "switch" || picked_card_tag == "skip") {
                player_can_pick = true;
                reinitBlockedCard();
            }
            if (picked_card_tag == "ask") {
                reinitBlockedCard()
                displayAskPanel();
            }
            if (player_cards.length == 0 ) {
                player_deck_html.innerHTML += "<h1>🎉 Gagné! 🎉</h1>";
            } else if (picked_card_tag >= 0 && picked_card_tag <= 9) {
                changeTurn();
            }
        } else {
            if (picked_card_tag == "switch" || picked_card_tag == "skip") {
                bot_can_pick = true;
                setTimeout(() => { botAnalyzeCard();}, delay*2);  
            }
            if (picked_card_tag == "ask") {
                var last_reverse_deck_card = reverse_deck_cards[reverse_deck_cards.length-1];
                reverse_deck_html.children[reverse_deck_html.children.length-1].remove();
                displayCard([last_reverse_deck_card[0], "green"], "reverse_deck", false); //todo
                changeTurn();
            }
            if ( bot_cards.length == 0) {
                bot_deck_html.innerHTML += "<h1>😒 Perdu! 😒</h1>";
            } else if (picked_card_tag >= 0 && picked_card_tag <= 9) {
                changeTurn();
            }
        }
        
        
    }  
}

function BotDeckAddCard(picked_card) {
    // add into bot's deck
    bot_cards.push(picked_card);
    displayCard(picked_card, "bot", reverse_display_bot_card);
}

function PlayerDeckAddCard(picked_card) {
    // add into players's deck
    player_cards.push(picked_card);
    displayCard(picked_card, "player", reverse_display_player_card);        
}

function PlayerDeckPickCard(obj) {
    if (player_can_pick == true) {
        var picked_card_index = obj.parentNode.cellIndex;
        var picked_card = player_cards[picked_card_index];

        var last_reverse_deck_card = reverse_deck_cards[reverse_deck_cards.length-1];
        var last_reverse_deck_tag = last_reverse_deck_card[0];
        var last_reverse_deck_color = reverse_deck_html.children[reverse_deck_html.children.length-1].dataset.color; //last card color from reverse deck
        
        if ( picked_card[0] == last_reverse_deck_tag || picked_card[1] == last_reverse_deck_color || picked_card[1] == "black") {
            PlayerDeckRemoveCardAnimation(picked_card_index, picked_card)
        } else {
            player_deck_html.rows[0].cells[picked_card_index].style = "transform: scale(0.85);opacity: 0.5;}"
        }
    }
}

function PlayerDeckRemoveCardAnimation(picked_card_index, picked_card) {
    player_can_pick = false;
    player_deck_html.rows[0].cells[picked_card_index].style = "transform: scale(0);opacity: 0;}"
    setTimeout(() => { PlayerDeckRemoveCard(picked_card_index, picked_card); }, 500);
}

function PlayerDeckRemoveCard(picked_card_index, picked_card) {
        player_cards.splice(picked_card_index, 1);
        player_deck_html.rows[0].deleteCell(picked_card_index);
        addOnReverseDeck(picked_card, true);
}

function botAnalyzeCard() {
    // analyze card
    var possible_usable_card = []
    for (var i = 0 ; i < bot_cards.length ; i++) {
        var bot_card_tag = bot_cards[i][0];
        var bot_card_color = bot_cards[i][1];
        
        var reverse_deck_card_tag = reverse_deck_cards[reverse_deck_cards.length-1][0];
        var reverse_deck_card_color = reverse_deck_html.children[reverse_deck_html.children.length-1].dataset.color; //last card color from reverse deck

        if (bot_card_tag == reverse_deck_card_tag || bot_card_color == reverse_deck_card_color || bot_card_color == "black") {
            possible_usable_card.push(bot_cards[i])
        }
    }
    for (var i = 0; i < possible_usable_card.length ; i++) {
        console.log(possible_usable_card[i][0]+ " " + possible_usable_card[i][1]);
    }

    // action
    if (possible_usable_card.length == 0) {
        
        setTimeout(() => { BotDeckAddCard(pickDeck(false));}, delay);
        setTimeout(() => { changeTurn();}, delay*2);       
    } else {
        BotDeckPickCard(possible_usable_card[0])
    }
}

function BotDeckPickCard(picked_card) {
    for (var i = 0 ; i < bot_cards.length ; i++) {
        if (picked_card[0] == bot_cards[i][0] && picked_card[1] == bot_cards[i][1]) {
            BotDeckRemoveCardAnimation(i, picked_card);
            break;
        }
    }
}

function BotDeckRemoveCardAnimation(picked_card_index, picked_card) {
    bot_can_pick = false;
    bot_deck_html.rows[0].cells[picked_card_index].style = "transform: scale(0);opacity: 0;}"
    setTimeout(() => { BotDeckRemoveCard(picked_card_index, picked_card); }, 500);
}

function BotDeckRemoveCard(picked_card_index, picked_card) {
        bot_cards.splice(picked_card_index, 1);
        bot_deck_html.rows[0].deleteCell(picked_card_index);
        addOnReverseDeck(picked_card, true);
}

function pseudoAI() {

}