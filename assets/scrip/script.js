let cardSelector = $(".card");
let cardBackSelector = $(".card-back");
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
        $(".card-container").css("transform","rotateY(0deg)");
    },
        200);
};

function pickBoard() {
    cardGuesses.push(($(this).siblings(".card-back").get()[0]))   
    
    if ($(cardGuesses[0]).attr("class") == $(cardGuesses[1]).attr("class")) {
        // $(`.${cardGuesses[0]}`).css("transform","rotateY(180deg)");
        var sucessAudio = new Audio("assets/songs/sucessAudio.wav");
        sucessAudio.play();
        matches++;
        $("#matches").text(`Your Matches: ${matches}`);
        cardGuesses.length = 0;
    } 
    
    else if (cardGuesses.length == 2) {
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
