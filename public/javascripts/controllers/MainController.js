var MainController = { };

MainController.newGame = function () {
  $.getJSON( '/newGame', function() { });
}

MainController.guess = function(guessEvent) {
  var _guessCallback = guessEvent.guessCallback;
  $.getJSON( '/guess/' + guessEvent.detail.number, function( data ) {
  	 LayoutManager.addGuess(data);
  	 var gameOver = MainController.processGuessResult(data);
    if (!gameOver) {
      _guessCallback(data);
    }
  });
}

MainController.processGuessResult = function (guessResponse) {
  if (guessResponse.bulls == 4) {
    alert("Well done!");
    return true;
  } else {
    if (guessResponse.gameOver) {
      alert("Game over! The secret number was " + guessResponse.secretNumber);
      return true;
    }
  }
  
  return false;
}