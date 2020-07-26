var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    level += 1;
    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").html("Level "+level);
};

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length-1));
});

function playSound(colour) {
    var sound = new Audio("sounds/"+colour+".mp3");
    sound.play();
};

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100);
};

$(document).one("keydown",function() {
    setTimeout(nextSequence, 500);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if ((currentLevel+1) == level) {
            setTimeout(nextSequence, 500);
        } else {
        };
    } else {
        playSound("wrong");
        $("h1").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
        startOver();
    }
};
    
function startOver() {
    gamePattern = [];
    level = 0;
    $(document).one("keydown",function() {
        setTimeout(nextSequence, 500);
    });

}

