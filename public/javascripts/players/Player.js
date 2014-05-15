var Player = function (viewDomNode) {
  if (typeof viewDomNode !== "undefined") {
  	 this.viewDomNode = viewDomNode;
  	 this._handleGuessHitch = this._handleGuess.bind(this);
    viewDomNode.addEventListener("guess", this._handleGuessHitch, false);
  }
}

Player.prototype._listener = function (guessEvent) { }

Player.prototype.addGuessEventListener = function (listener) {
  this._listener = listener;
}


Player.prototype._handleGuess = function (event) {
  event.guessCallback = this._guessCallback.bind(this);
  (this._listener)(event);
}

Player.prototype._guessCallback = function (guessResponse) {
  
}

Player.prototype.uninit = function () {
  if (typeof this._handleGuessHitch !== "undefined") {
    this.viewDomNode.removeEventListener("guess", this._handleGuessHitch, false);
  }
}