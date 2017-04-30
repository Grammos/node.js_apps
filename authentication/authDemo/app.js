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

//express-session - other way to require besides the upper way of doing!
app.use(require("express-session")({
	//this would be used to encode or to decode the info
	//in the session
	secret: "Kosova Kosovo",
	resave: false,
	saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


//reading the session, taking the data from the session that's encoded
//and uncoded and encoded again and putting them in the session again!
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
})


app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});