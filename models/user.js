var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
	facebook: {
		id: String,
		displayName: String,
		name: {
			familyName: String,
			givenName: String
		},
		gender: String,
		profileUrl: String,
		email: String,
		token: String
	}
});

module.exports = mongoose.model('User', userSchema);
