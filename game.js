var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count = 0;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  //console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(buttonSound) {
  new Audio("sounds/" + buttonSound + ".mp3").play();
}

function animatePress(buttonColour) {
  $("." + buttonColour).addClass("pressed");
  setTimeout(function() {
    $("." + buttonColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  count = 0;
}

$(".btn").click(function() {
  if (level > 0) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);
  }
})

document.addEventListener("keydown", function(event) {
  if (level === 0) {
    nextSequence();
  }
});


function checkAnswer(userChosen) {
  if (userChosen === gamePattern[count]) {
    console.log("correct");
    count++;
  } else {
    console.log("wrong");
    playSound("wrong");
    $("h1").text("Game Over,Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    return;
  }
  if (count === level) {
    count = 0;
    setTimeout(function() {
        nextSequence();
    }, 500);
  }
}
