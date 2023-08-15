let cardSelector = $(".card");
let IndexSelecteds = [];
let matches = 0;
let turns = 0;
let cardGuesses = [];

function randomizeBoard() {

    while (IndexSelecteds.length < 12) {
        let randomNumber = Math.floor(Math.random() * 12);
        if (!IndexSelecteds.includes(randomNumber)) {
            IndexSelecteds.push(randomNumber);
        };
    };
    $(cardSelector[IndexSelecteds[0]]).addClass("redCard");
    $(cardSelector[IndexSelecteds[1]]).addClass("greenCard");
    $(cardSelector[IndexSelecteds[2]]).addClass("redCard");
    $(cardSelector[IndexSelecteds[3]]).addClass("purpleCard");
    $(cardSelector[IndexSelecteds[4]]).addClass("greenCard");
    $(cardSelector[IndexSelecteds[5]]).addClass("yellowCard");
    $(cardSelector[IndexSelecteds[6]]).addClass("purpleCard");
    $(cardSelector[IndexSelecteds[7]]).addClass("whiteCard");
    $(cardSelector[IndexSelecteds[8]]).addClass("yellowCard");
    $(cardSelector[IndexSelecteds[9]]).addClass("blackCard");
    $(cardSelector[IndexSelecteds[10]]).addClass("whiteCard");
    $(cardSelector[IndexSelecteds[11]]).addClass("blackCard");

    setTimeout(() => {
        $(cardSelector).css("background-color", "blue");
        cardSelector.on("click", pickBoard);
    },
        3500);
};

function pickBoard() {
    cardGuesses.push(this.className.split(' ')[2]);
    if (cardGuesses[0] == cardGuesses[1]) {
        $(`.${cardGuesses[0]}`).removeAttr("style");
        $(`.${cardGuesses[0]}`).off();
        var sucessAudio = new Audio("assets/songs/sucessAudio.wav");
        sucessAudio.play();
        matches++;
        $("#matches").text(`Your Matches: ${matches}`);
        cardGuesses.length = 0;
    } else if (cardGuesses.length == 2) {
        var failAudio = new Audio("assets/songs/failAudio.wav");
        failAudio.play();
        turns++
        $("#turns").text(`Your Turns: ${turns}`);
        cardGuesses.length = 0;
    };
    if (matches == 6) {
        $("#matches").text("Congratulations!");
        $("#turns").text("You won, reload the page to keep playing Im lazy as fuck.");
    };
};


randomizeBoard();
