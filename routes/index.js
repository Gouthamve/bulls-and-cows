var express = require('express');
var gameController = require('../api/controllers/GameController');
var router = express.Router();

var mongoose = require('mongoose');
var Game = require('../models/game');

const MAX_NUMBER_OF_GUESSES = 8;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Bulls and Cows',
    user: req.user
  });
});

router.get('/newGame', function(req, res) {
  if (req.user) {
    var rand = 11;
    while (!gameController.isNumberValid(rand)) {
      rand = 1000 + Math.floor(Math.random() * (9000));
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
        req.session.numberOfTries++;
        if (result.bulls == 4) {
          Game.findById(req.session.game, function(err, game) {
            if (err)
              console.log(err)
            else {
              game.turns = req.session.numberOfTries;
              game.status = 'won';
              game.EndTime = new Date()
              game.time = ((game.EndTime.getTime() - game.StartTime.getTime()) /
                1000);
              game.save()
            }
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

router.get('/leaderboard', function(req, res) {
  Game.find({
    status: 'won'
  }).sort({
    time: 1
  }).limit(25).populate('user').exec(function(err, games) {
    res.render('leaderboard', {
      games: games
    })
  })
})

module.exports = router;
