var MainController = {};

MainController.newGame = function() {
  $.getJSON('/newGame', function() {
    if ($('#timer').data('seconds')) {
      $('#timer').timer('reset')
      $('#timer').timer();
    } else {
      $('#timer').timer();
    }
  });
}

MainController.guess = function(guessEvent) {
  var _guessCallback = guessEvent.guessCallback;
  $.getJSON('/guess/' + guessEvent.detail.number, function(data) {
    LayoutManager.addGuess(data);
    var gameOver = MainController.processGuessResult(data);
    if (!gameOver) {
      _guessCallback(data);
    }
  });
}

MainController.processGuessResult = function(guessResponse) {
  if (guessResponse.bulls == 4) {
    $('#timer').timer('pause')
    alert("Well done!");
    return true;
  } else {
    if (guessResponse.gameOver) {
      $('#timer').timer('pause')
      alert("Game over! The secret number was " + guessResponse.secretNumber);
      return true;
    }
  }

  return false;
}
