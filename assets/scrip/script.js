$(document).ready(function () {
    // Global variables 
    let cardSelector = $(".card");
    let cardBackSelector = $(".card-back");
    let IndexSelecteds = [];
    let cardGuesses = [];
    let matches = 0;
    let turns = 0;

    // Randomize the positons of the cards on the board
    randomizeBoard();
    function randomizeBoard() {
        // Get a array with number from 0 to 11, in a random sequence
        while (IndexSelecteds.length < 12) {
            let randomNumber = Math.floor(Math.random() * 12);
            if (!IndexSelecteds.includes(randomNumber)) {
                IndexSelecteds.push(randomNumber);
            };
        };

        // Add card classes in a random ordem
        $(cardBackSelector[IndexSelecteds[0]]).addClass("redCard");
        $(cardBackSelector[IndexSelecteds[1]]).addClass("greenCard");
        $(cardBackSelector[IndexSelecteds[2]]).addClass("redCard");
        $(cardBackSelector[IndexSelecteds[3]]).addClass("purpleCard");
        $(cardBackSelector[IndexSelecteds[4]]).addClass("greenCard");
        $(cardBackSelector[IndexSelecteds[5]]).addClass("yellowCard");
        $(cardBackSelector[IndexSelecteds[6]]).addClass("purpleCard");
        $(cardBackSelector[IndexSelecteds[7]]).addClass("pinkCard");
        $(cardBackSelector[IndexSelecteds[8]]).addClass("yellowCard");
        $(cardBackSelector[IndexSelecteds[9]]).addClass("blueCard");
        $(cardBackSelector[IndexSelecteds[10]]).addClass("pinkCard");
        $(cardBackSelector[IndexSelecteds[11]]).addClass("blueCard");

    };

    // Function called when a click event is fired on a card
    function pickBoard() {
        
        // Block of code to assure the user is guessing a new card
        if (!cardGuesses.includes($(this).siblings(".card-back").get()[0])) {
            cardGuesses.push(($(this).siblings(".card-back").get()[0]));
        }

        // Flip the selected card
        $(cardGuesses).parent().css("transform", "rotateY(180deg)");

        // Block of code to check if the user choose the right combinations of cards
        if ($(cardGuesses[0]).attr("class") == $(cardGuesses[1]).attr("class")) {
            var sucessAudio = new Audio("assets/songs/sucessAudio.wav");
            sucessAudio.play();
            matches++;
            $("#matches").text(`Matches: ${matches}`);
            cardGuesses.length = 0;
        }

        // Block of code to check if the user choose the wrong combinations of cards
        else if (cardGuesses.length == 2) {

            var failAudio = new Audio("assets/songs/failAudio.wav");
            failAudio.play();
            setTimeout(() => {
                $(cardGuesses).parent().css("transform", "rotateY(0deg)");
                cardGuesses.length = 0;
            }, 800);

            turns++
            $("#turns").text(`Turns: ${turns}`);

        };

        // Chunk of code to check if the game is over
        if (matches == 6) {
            $(".card-front").off();
            $("#matches").text("Congrats!");
            $("#turns").text("You win");
            $("#restart-button").removeClass("hide");
            $(".card-container").addClass("blur")
        };
    };

    // Restart button, reset all the variables to the innital value and run the game again
    $("#restart-button").on("click", function () {

        $(".card-container").removeClass("blur")
        $("#restart-button").addClass("hide");
        matches = 0;
        turns = 0;
        IndexSelecteds.length = 0;
        cardGuesses.length = 0;
        $("#turns").text(`Turns:`);
        $("#matches").text(`Matches:`);
        $(cardBackSelector).removeClass();
        $(cardBackSelector).addClass("card-back");
        randomizeBoard();
        $(".card-container").css("transform", "rotateY(180deg)");
        setTimeout(() => $(".card-container").css("transform", "rotateY(0deg)"), 1500);
        $(".card-front").on("click", pickBoard);

    });

    // Start button
    $("#start-button").on("click", function () {

        $("#start-button").addClass("hide");
        $(".card-container").css("transform", "rotateY(180deg)");
        setTimeout(() => $(".card-container").css("transform", "rotateY(0deg)"), 1500);
        $(".card-front").on("click", pickBoard);
    });

});
