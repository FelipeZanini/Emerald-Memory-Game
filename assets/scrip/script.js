$(document).ready(function () {
    // function main() {
    let cardSelector = $(".card");
    let cardBackSelector = $(".card-back");
    let IndexSelecteds = [];
    let cardGuesses = [];
    let matches = 6;
    let turns = 0;
    
    randomizeBoard();

    
    $("#start-button").on("click", function () {
        setTimeout(() => {
            $(".card-front").on("click", pickBoard);
            $("#start-button").addClass("hide");
            $(".card-container").css("transform", "rotateY(180deg)");
            setTimeout(() => $(".card-container").css("transform", "rotateY(0deg)"), 1000);
        },
            200);
    });

    function randomizeBoard() {

        while (IndexSelecteds.length < 12) {
            let randomNumber = Math.floor(Math.random() * 12);
            if (!IndexSelecteds.includes(randomNumber)) {
                IndexSelecteds.push(randomNumber);
            };
        };

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


    function pickBoard() {
        // there is a bug if you double click too fast this if is just ignored
        console.log(this);
        if (!cardGuesses.includes($(this).siblings(".card-back").get()[0])) {
            cardGuesses.push(($(this).siblings(".card-back").get()[0]));
        }

        $(cardGuesses).parent().css("transform", "rotateY(180deg)");

        if ($(cardGuesses[0]).attr("class") == $(cardGuesses[1]).attr("class")) {

            var sucessAudio = new Audio("assets/songs/sucessAudio.wav");
            sucessAudio.play();
            matches++;
            $("#matches").text(`Matches: ${matches}`);
            cardGuesses.length = 0;
        }

        else if (cardGuesses.length == 2) {

            setTimeout(() => {
                $(cardGuesses).parent().css("transform", "rotateY(0deg)");
                cardGuesses.length = 0;
            },
                800);

            var failAudio = new Audio("assets/songs/failAudio.wav");
            failAudio.play();
            turns++
            $("#turns").text(`Turns: ${turns}`);

        };

        if (matches == 6) {
            $("#matches").text("Congrats!");
            $("#turns").text("You win");
            $("#restart-button").removeClass("hide");
        };
    };

    $("#restart-button").on("click", function () {
        $(".card-front").off();
        matches = 0;
        turns = 0;
        IndexSelecteds.length = 0;
        cardGuesses.length = 0;
        $("#turns").text(`Turns:`);
        $("#matches").text(`Matches:`);
        $("#restart-button").addClass("hide");
        $(cardBackSelector).removeClass();
        $(cardBackSelector).addClass("card-back");
        randomizeBoard();

        setTimeout(() => {
            $(".card-front").on("click", pickBoard);
            $("#restart-button").addClass("hide");
            $(".card-container").css("transform", "rotateY(180deg)");
            setTimeout(() => $(".card-container").css("transform", "rotateY(0deg)"), 1000);
        },
            200);
    });
    });


