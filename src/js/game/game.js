    init_card_color = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "black", "black", "black", "black", "black", "black", "black", "black"];
    init_card_tag = ["0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "ask", "ask", "ask", "ask", "plus_four", "plus_four", "plus_four", "plus_four"];
    deck_card_tag = []
    deck_card_color = []

    player_card_tag = []
    player_card_color = []

    bot_card_tag = []
    bot_card_color = []

    bot_card_number = 7;
    player_card_number = 7;

    turn = "player";



    function initVariables() {
        for (i=0 ; i<108 ; i++) {
            //pick a random number between 0 and [card_color.length]
            randomInt = Math.floor(Math.random() * init_card_color.length);

            // add into deck
            deck_card_tag.push(init_card_tag[randomInt]);
            deck_card_color.push(init_card_color[randomInt]);

            // deleting from list
            init_card_tag.splice(randomInt, 1);
            init_card_color.splice(randomInt, 1);
        } 
        
        // like it was before
        card_color = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "black", "black", "black", "black", "black", "black", "black", "black"];
        card_tag = ["0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "plus_two", "plus_two", "switch", "switch", "skip", "skip", "ask", "ask", "ask", "ask", "plus_four", "plus_four", "plus_four", "plus_four"];
        
        distribution();
    }

    function changeTurn() {
        if ( turn == "player") {
            turn = "bot";
        } else {
            turn = "player";
        }
    }

    function chooseCardFromPlayerDeck(obj) {
        console.log(obj.getAttributeNode("tag").value + " " + obj.getAttributeNode("color").value);
        console.log(obj);
        obj.getNode("div").value;
    }

    function distribution() {
        for (i = 0 ; i < bot_card_number ; i++) {
            cardFromDeckRandomiser();
            // add into bot's deck
            bot_card_tag.push(card_tag_var);
            bot_card_color.push(card_color_var);

            BotDeckAddCard(card_tag_var, card_color_var);
        }
        
        for (i = 0 ; i < player_card_number ; i++) {
            cardFromDeckRandomiser();
            // add into players's deck
            player_card_tag.push(card_tag_var);
            player_card_color.push(card_color_var);

            PlayerDeckAddCard(card_tag_var, card_color_var);
        }
    }

    function pickFromDeck() {
        cardFromDeckRandomiser();
        // add into players's deck
        player_card_tag.push(card_tag_var);
        player_card_color.push(card_color_var);

        PlayerDeckAddCard(card_tag_var, card_color_var);
    }


    function cardFromDeckRandomiser() {
        //pick a random number between 0 and [deck_card_color.length]
        r = Math.floor(Math.random() * deck_card_color.length);

        //tag and color form #r card in deck
        card_tag_var = deck_card_tag[r];
        card_color_var = deck_card_color[r];

        // deleting from deck
        deck_card_tag.splice(r, 1);
        deck_card_color.splice(r, 1);
    }

    function BotDeckAddCard(card_tag, card_color) {

        var word_list_table = document.getElementById("bot_deck");
     
        var word_list_rowCount = word_list_table.rows.length;
        var word_list_row = word_list_table.insertRow(word_list_rowCount);
     

        card_head = "";
        card_top = "";
        card_middle = "";
        card_bottom = "";

        //HTML parts of card
        card_head = "<div color=\"" + card_color + "\" tag=\"" + card_tag + "\" class=\"playable_card " + card_color + "_card\">";
        
        card_middle = "<div id=\"card_label_middle\"> <img class=\"backcard_logo\" src=\"src/img/uno_logo.png\"> </div>";            

            //write down into document
            word_list_row.insertCell(0).innerHTML =  card_head + card_middle;
    }

    function PlayerDeckAddCard(card_tag, card_color) {

        var word_list_table = document.getElementById("player_deck");
        var word_list_row = word_list_table.insertRow(word_list_table.rows.length);

        //HTML parts of card
        card_head = "<div color=\"" + card_color + "\" tag=\"" + card_tag + "\" class=\"playable_card " + card_color + "_card\" onclick=\"PlayerDeckPickCard(this)\">";
        
        if (card_tag >= 0 && card_tag <= 9) {
            card_top = "<div id=\"card_label_top\" class=\"little_label\"><a>" + card_tag + "</a></div>";
            card_middle = "<div id=\"card_label_middle\"><a>" + card_tag + "</a></div>";
            card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"><a>" + card_tag + "</a></div>";
        } else if (card_tag == "plus_two") {
            card_top = "<div id=\"card_label_top\" class=\"little_label\"><a>+2</a></div>";
            card_middle = "<div id=\"card_label_middle\"> <img src=\"src/img/sign/" + card_tag + ".png\"> </div>";
            card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"><a>+2</a></div>";
        } else if (card_tag == "plus_four") {
            card_top = "<div id=\"card_label_top\" class=\"little_label\"><a>+4</a></div>";
            card_middle = "<div id=\"card_label_middle\"> <img src=\"src/img/sign/" + card_tag + ".png\"> </div>";
            card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"><a>+4</a></div>";
        } else {
            card_top = "<div id=\"card_label_top\" class=\"little_label\"> <img src=\"src/img/sign/" + card_tag + ".png\"> </div>";
            card_middle = "<div id=\"card_label_middle\"> <img src=\"src/img/sign/" + card_tag + ".png\"> </div>"
            card_bottom = "<div id=\"card_label_bottom\" class=\"little_label\"> <img src=\"src/img/sign/" + card_tag + ".png\"> </div></div>";
        }            

        //write down into document
        word_list_row.insertCell(0).innerHTML =  card_head + card_top + card_middle + card_bottom;

        card_head = "";
        card_top = "";
        card_middle = "";
        card_bottom = "";
    }

    function PlayerDeckPickCard(obj) {
        var word_list_index = obj.parentNode.parentNode.rowIndex;
        var word_list_table = document.getElementById("player_deck");
        word_list_table.deleteRow(word_list_index);


        // deleting from list deck
        player_card_tag.splice(word_list_index, 1);
        player_card_color.splice(word_list_index, 1);
    }