var mongoose = require("mongoose");
//SCHEMA SETUP
var commentSchema = mongoose.Schema({
	text: String,
	author: String
});

// schema to the model
module.exports = mongoose.model("Comment", commentSchema);