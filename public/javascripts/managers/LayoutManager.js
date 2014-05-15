var LayoutManager = {};

LayoutManager.showNoGameView = function() {
  
}

LayoutManager.showHumanPlayerGameView = function() {
  
}

LayoutManager.showAIGameView = function() {
  
}

LayoutManager.addGuess = function(guessInfo) {
  if (typeof guessInfo.cows !== "undefined" &&
      typeof guessInfo.bulls !== "undefined") {
    $(".guessesPanel")[0].innerHTML += 
      "<p>" + guessInfo.guess +  " - Cows: " + guessInfo.cows + 
      " Bulls: " + guessInfo.bulls + "</p>";
  }
}

LayoutManager.clearGuessList = function() {
  $(".guessesPanel")[0].innerHTML = "";
}

LayoutManager.clearHumanGuessInput = function() {
  $(".humanGuessInput").val("");
}

LayoutManager.showInitialPanel = function() {
  $(".initialPanel").show();
  $(".humanGamePanel").hide();
  $(".aiGamePanel").hide();
  $(".guessesPanel").hide();
}

LayoutManager.showAIGamePanel = function() {
  $(".initialPanel").hide();
  $(".humanGamePanel").hide();
  $(".aiGamePanel").show();
  $(".guessesPanel").show();
}

LayoutManager.showHumanGamePanel = function() {
  $(".initialPanel").hide();
  $(".humanGamePanel").show();
  $(".aiGamePanel").hide();
  $(".guessesPanel").show();
}