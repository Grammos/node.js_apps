var express    = require("express"),
 	app        = express(),
 	bodyParser = require("body-parser");
 	mongoose    = require("mongoose");

//connect moongose to the mongodb's db
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//schema design for this app- Mongoose/Model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body:  String,
	created: {type: Date, default: Date.now}
});

// "compile" to the model
var Blog = mongoose.model("Blog", blogSchema);



// RESTFUL routes



app.listen(3000, function() {
	console.log("Server is running on localhost:3000");
});