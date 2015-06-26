var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
	user: String,
	turns: Number,
	status: String,
	StartTime: Date,
	EndTime: Date,
	number: Number
});

gameSchema.virtual('playTime').get(function() {
	if (this.EndTime) {
		return ((this.EndTime.getTime() - this.StartTime.getTime()) / 1000)
	} else {
		return 0
	}
})

module.exports = mongoose.model('Game', gameSchema);
