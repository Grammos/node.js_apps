var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// takes care of hashing, salting, etc!
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);