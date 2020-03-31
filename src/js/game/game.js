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

        bot_card_number = 7;
        player_card_number = 7;
    
        turn = "player";
        
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

    function changeTurn() {
        if ( turn == "player") {
            turn = "bot";
        } else {
            turn = "player";
        }
    }

    function distribution() {
        for (i = 0 ; i < bot_card_number ; i++) {
            cardFromMiddleDeckRandomiser();
            BotDeckAddCard(picked_tag, picked_color);
        }
        
        for (i = 0 ; i < player_card_number ; i++) {
            cardFromMiddleDeckRandomiser();
            PlayerDeckAddCard(picked_tag, picked_color);
        }

        pickFirstCardMiddleDeck();
    }

    function pickFirstCardMiddleDeck() {
        var random = Math.floor(Math.random() * middle_deck_card_color.length);

        while (middle_deck_card_color[random] == "black" || middle_deck_card_tag[random] == "plus_two" || middle_deck_card_tag[random] == "plus_four" || middle_deck_card_tag[random] == "switch" || middle_deck_card_tag[random] == "ask" ||  middle_deck_card_tag[random] == "skip" ) {
            var random = Math.floor(Math.random() * middle_deck_card_color.length);
        }
        revert_deck_card_tag.push(middle_deck_card_tag[random]);
        revert_deck_card_color.push(middle_deck_card_color[random]);

        var picked_tag = middle_deck_card_tag[random];
        var picked_color = middle_deck_card_color[random];

        addOnReverseDeck(picked_tag , picked_color);

        middle_deck_card_tag.splice(random, 1);
        middle_deck_card_color.splice(random, 1);

        console.log(middle_deck_card_color.length + " carte(s) restante(s)");
    }

    function addOnReverseDeck(picked_tag , picked_color) {
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

        var card_complete_content_html = card_head + card_top + card_middle + card_bottom;
        revert_deck_html.innerHTML += card_complete_content_html;
    }

    function pickFromMiddleDeck() {
        cardFromMiddleDeckRandomiser();
        PlayerDeckAddCard(picked_tag, picked_color);
    }

    function cardFromMiddleDeckRandomiser() {
        //pick a random number between 0 and [middle_deck_card_color.length]
        random = Math.floor(Math.random() * middle_deck_card_color.length);

        //tag and color form #random card in deck
        picked_tag = middle_deck_card_tag[random];
        picked_color = middle_deck_card_color[random];

        // deleting from deck
        middle_deck_card_tag.splice(random, 1);
        middle_deck_card_color.splice(random, 1);
    }

    function BotDeckAddCard(picked_tag, picked_color) {

        // add into bot's deck
        bot_card_tag.push(picked_tag);
        bot_card_color.push(picked_color);

        //HTML parts of card
        var card_head = "<td><div data-color=\"" + picked_color + "\" data-tag=\"" + picked_tag + "\" class=\"playable_card " + picked_color + "_card\">";
        var card_middle = "<div id=\"card_label_middle\"> <img class=\"backcard_logo\" src=\"src/img/uno_logo.png\"> </div><td>";            

        //write down into document
        bot_deck.rows[0].insertCell().innerHTML +=  card_head + card_middle;
    }

    function PlayerDeckAddCard(picked_tag, picked_color) {

        // add into players's deck
        player_card_tag.push(picked_tag);
        player_card_color.push(picked_color);

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

        //write down into document
        player_deck.rows[0].insertCell().innerHTML +=  card_head + card_top + card_middle + card_bottom;
    }

    function PlayerDeckPickCard(obj) {
        var picked_card_index = obj.parentNode.cellIndex;
        var picked_color = player_card_color[picked_card_index];
        var picked_tag = player_card_tag[picked_card_index];

        addOnReverseDeck(picked_tag , picked_color);

        player_deck.rows[0].deleteCell(picked_card_index);

        // deleting from list deck

        player_card_tag.splice(picked_card_index, 1);
        player_card_color.splice(picked_card_index, 1);
    }