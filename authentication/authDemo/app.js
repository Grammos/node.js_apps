var express               = require("express"),
	mongoose              = require("mongoose"),
	passport              = require("passport"),
	bodyParser            = require("body-parser"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User                  = require("./models/user"),
    app                   = express();

//connect moongose to the mongodb's db
mongoose.connect("mongodb://localhost/auth_demo_app"); 
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("home");
});


app.get("/secret", function(req, res){
	res.render("secret");
})


app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});