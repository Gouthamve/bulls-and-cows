var express = require('express');
var gameController = require('../api/controllers/GameController');
var router = express.Router();

var mongoose = require('mongoose');
var Game = require('../models/game');

const MAX_NUMBER_OF_GUESSES = 10;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Bulls and Cows',
    user: req.user
  });
});

router.get('/newGame', function(req, res) {
  if (req.user) {
    var rand = 0;
    while (!gameController.isNumberValid(rand)) {
      rand = Math.floor((Math.random() * 10000));
    }
    req.session.secretNumber = rand;
    req.session.numberOfTries = 0;
    newGame = new Game({
      user: req.user.id,
      turns: 0,
      status: 'pending',
      StartTime: new Date(),
      number: rand
    })
    newGame.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        req.session.game = newGame.id;
        res.json(0)
      }
    })
  } else {
    res.json(1)
  }
});

router.get('/guess/:number', function(req, res) {
  var result = {};
  if (req.user) {
    if (typeof req.session.secretNumber !== "undefined" &&
      gameController.isNumberValid(req.params.number)) {
      if (req.session.numberOfTries < MAX_NUMBER_OF_GUESSES) {
        result = gameController.getCowsAndBulls(req.session.secretNumber,
          req.params.number);
        console.log(req.session.secretNumber)
        req.session.numberOfTries++;
        if (result.bulls == 4) {
          Game.findOneAndUpdate({
            _id: req.session.game
          }, {
            turns: req.session.numberOfTries,
            status: 'won',
            EndTime: new Date()
          }, function(err) {
            if (err)
              console.log(err)
          })
        }
      }

      if (req.session.numberOfTries >= MAX_NUMBER_OF_GUESSES) {
        result.gameOver = true;
        result.secretNumber = req.session.secretNumber;
        Game.findOneAndUpdate({
          _id: req.session.game
        }, {
          turns: req.session.numberOfTries,
          status: 'lost',
          EndTime: new Date()
        }, function(err) {
          if (err) {
            console.log(err)
          }
        })
      }
      result.guess = req.params.number;
      res.json(result);

    }
  }
});

router.get('/api/user', function(req, res) {
  res.send({
    user: req.user && req.user.id
  })
})

module.exports = router;
