$(document).ready(function() {
  LayoutManager.showInitialPanel();
});

var player = null;

function moveToNextField(i) {
  var value = document.getElementById("humanGuessInput" + i).value
  if (value != "" && value != " ") {
    document.getElementById("humanGuessInput" + (i + 1).toString()).focus();
  }
}

function onHumanGameButtonClick() {
  $.getJSON('/api/user', function(data) {
    if (data.user) {
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
  })
}

function onHumanGuessButtonClick() {
  var event = new CustomEvent(
    "guess", {
      detail: {
        number: $(".humanGuessInput1").val() + $(".humanGuessInput2").val() +
          $(".humanGuessInput3").val() + $(".humanGuessInput4").val()
      },
      bubbles: true,
      cancelable: true
    }
  );

  this.dispatchEvent(event);
  LayoutManager.clearHumanGuessInput();
}
