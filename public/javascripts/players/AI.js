var AI = function (viewDomNode) {
  Player.apply(this, arguments);
  var i;  
  for (i = 1023; i < 10000; i++) {
    if (GameController.isNumberValid(i)) {
      this._possibleGuesses.push(i);
    }  
  }
}

AI.prototype = new Player();

AI.prototype._possibleGuesses = [];

AI.prototype._guessesMade = 0;

AI.prototype._getCowsAndBulls = function(number1, number2) {
  var i, j, cows = 0, bulls = 0;
  number1 += '';
  number2 += '';
    
  for(i = 0; i < number1.length; i++) {
    for(j = 0; j < number2.length; j++) {
      if (number1.charAt(i) == number2.charAt(j)) {
        if (i == j) {
          bulls++;
        } else {
          cows++;
        }
      }
    }
  }

  return {bulls: bulls, cows: cows};
}

AI.prototype.makeGuess = function () {
  var guess = 0;
  if (this._guessesMade == 0) {
    guess = 1234;
  } else {
    var rand = Math.floor((Math.random() * this._possibleGuesses.length));
    guess = this._possibleGuesses[rand];
  }
  
  this._guessesMade++;
  this._dispatchGuessEvent(guess);
}

AI.prototype._dispatchGuessEvent = function (guess) {
  var event = new CustomEvent(
	 "guess", 
	 {
	 	detail: {number: guess},
      bubbles: true,
      cancelable: true
    }
  );
  
  this.viewDomNode.dispatchEvent(event);
}

AI.prototype._trimPossibleGuessesList = function (guessResponse) {
  var i, currentGuessInfo;
  this._possibleGuesses = this._possibleGuesses.filter(function(number){
    currentGuessInfo = this._getCowsAndBulls(guessResponse.guess, number);
    return currentGuessInfo.cows == guessResponse.cows &&
           currentGuessInfo.bulls == guessResponse.bulls
  }, this);
}

AI.prototype._guessCallback = function (guessResponse) {
  if (!this.uninited)
  {
    this._trimPossibleGuessesList(guessResponse);
    setTimeout(this.makeGuess.bind(this), 1000);
  }
}