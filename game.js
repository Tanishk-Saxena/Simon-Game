var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

function playSound(name){
  var aud = new Audio("sounds/"+name+".mp3");
  aud.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  $("#"+randomChosenColour).animate({opacity: 0}, 100).animate({opacity: 1}, 100);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  level++;
  $("h1").text("Level "+level);
}

$(".btn").click(function (){
  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function (event){
  if(level === 0){
    nextSequence();
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
