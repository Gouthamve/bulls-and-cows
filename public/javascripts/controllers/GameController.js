var GameController = { };

GameController.isNumberValid = function (number) {
  return !this.hasRepeatingDigits(number) && number > 999 && number < 10000;
}

GameController.hasRepeatingDigits = function(number) {
  var i, j;    
  number += '';
  for (i = 0; i < number.length - 1; i++) {
    for (j = i + 1; j < number.length; j++) {
      if (number.charAt(i) == number.charAt(j)) {
        return true;
      }
    }
  }
}