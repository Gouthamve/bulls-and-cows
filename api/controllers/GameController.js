(function ($) {

  $.isNumberValid = function (number) {
    return !this.hasRepeatingDigits(number) && number > 999 && number < 10000;
  }
  
  $.hasRepeatingDigits = function(number) {
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
  
  $.getCowsAndBulls = function(number1, number2) {
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

})(module.exports);