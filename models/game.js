var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	turns: Number,
	status: String,
	StartTime: Date,
	EndTime: Date,
	number: Number,
	time: Number
});

module.exports = mongoose.model('Game', gameSchema);
