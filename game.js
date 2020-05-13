var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

//Runs first level after first keydown
//Starts the game
$(document).one("keydown", function() {
  nextSequence();
});

//Simon's sequence
function nextSequence() {
  //Increase level after correct sequence
  level++;

  //Reset for the next level
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  //Sets h1 to current level
  $("#level-title").text("Level " + level);

  //Animation and sound for buttons
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Adds clicked button to user clicked pattern, plays sound, and animates button
$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      console.log("Success");
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).one("keydown", function() {
      startOver();
      $("body").removeClass("game-over");
      $("#level-title").text("Level" + level);
      nextSequence();
    });
    console.log("Wrong");
  }
}

//Resets the game variables
function startOver() {
  level = 0;
  gamePattern = [];
}

//Play sound for buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animate button when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
