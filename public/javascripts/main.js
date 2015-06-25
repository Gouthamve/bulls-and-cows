$(document).ready(function() {
  LayoutManager.showInitialPanel();
});

var player = null;

function onHumanGameButtonClick() {
  if (player != null) {
    player.uninit();
  }
  player = new HumanPlayer($(".humanGamePanel")[0]);
  MainController.newGame();
  LayoutManager.clearGuessList();
  LayoutManager.clearHumanGuessInput();
  LayoutManager.showHumanGamePanel();
  player.addGuessEventListener(MainController.guess);
}

function onHumanGuessButtonClick() {
  var event = new CustomEvent(
    "guess", {
      detail: {
        number: $(".humanGuessInput").val()
      },
      bubbles: true,
      cancelable: true
    }
  );

  this.dispatchEvent(event);
}
