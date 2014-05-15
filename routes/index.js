var express = require('express');
var gameController = require('../api/controllers/GameController');
var router = express.Router();

const MAX_NUMBER_OF_GUESSES = 10;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bulls and Cows' });
});

router.get('/newGame', function(req, res) {
  var rand = 0;
  while (!gameController.isNumberValid(rand)) {
    rand = Math.floor((Math.random() * 10000));
  }
  req.session.secretNumber = rand;
  req.session.numberOfTries = 0;
  
  res.json(0);
});

router.get('/guess/:number', function(req, res) {
  var result = {};
  if (typeof req.session.secretNumber !== "undefined" && 
      gameController.isNumberValid(req.params.number)) {
  	 if (req.session.numberOfTries < MAX_NUMBER_OF_GUESSES) {
  	   result = gameController.getCowsAndBulls(req.session.secretNumber, req.params.number);
  	   req.session.numberOfTries++;
  	 } 
  	 
  	 if (req.session.numberOfTries >= MAX_NUMBER_OF_GUESSES) {
  	   result.gameOver = true;
  	   result.secretNumber = req.session.secretNumber;
  	 }
    
    result.guess = req.params.number;
  }
  res.json(result);
});

module.exports = router;
