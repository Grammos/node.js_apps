var mongoose              = require("mongoose");
	// Use native promises
	mongoose.Promise      = global.Promise;
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);