let cardSelector = $(".card");
let cardBackSelector = $(".card-back");
let IndexSelecteds = [];
let matches = 6;
let turns = 0;
let cardGuesses = [];

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
    $(cardBackSelector[IndexSelecteds[7]]).addClass("whiteCard");
    $(cardBackSelector[IndexSelecteds[8]]).addClass("yellowCard");
    $(cardBackSelector[IndexSelecteds[9]]).addClass("blackCard");
    $(cardBackSelector[IndexSelecteds[10]]).addClass("whiteCard");
    $(cardBackSelector[IndexSelecteds[11]]).addClass("blackCard");

    setTimeout(() => {
        $(".card-front").on("click", pickBoard);
        $(".card-container").css("transform", "rotateY(0deg)");
    },
        200);
};

function pickBoard() {
    // there is a bug if you double click too fast this if is just ignored
    if (!cardGuesses.includes(this)) {
        cardGuesses.push(($(this).siblings(".card-back").get()[0]));
    }
    console.log(cardGuesses);
    $(cardGuesses).parent().removeAttr("style");

    if ($(cardGuesses[0]).attr("class") == $(cardGuesses[1]).attr("class")) {

        var sucessAudio = new Audio("assets/songs/sucessAudio.wav");
        sucessAudio.play();
        matches++;
        $("#matches").text(`Your Matches: ${matches}`);
        cardGuesses.length = 0;
    }

    else if (cardGuesses.length == 2) {

        setTimeout(() => {
            $(cardGuesses).parent().css("transform", "rotateY(0deg)");
            cardGuesses.length = 0;
        },
            700);

        var failAudio = new Audio("assets/songs/failAudio.wav");
        failAudio.play();
        turns++
        $("#turns").text(`Your Turns: ${turns}`);

    };

    if (matches == 6) {
        $("#matches").text("Congratulations!");
        $("#turns").text("You won");
        $("#restart-button").removeClass("hide");
    };
};

$("#restart-button").on("click", function(){
    matches = 0;
    IndexSelecteds.length = 0;
    cardGuesses.length = 0;
    $("#turns").text(`Your Turns: ${turns}`);
    $("#matches").text(`matches: ${matches}`);
    $("#restart-button").addClass("hide");
    $(cardBackSelector).removeClass();
    $(cardBackSelector).addClass("card-back");
    randomizeBoard();
});


randomizeBoard();
