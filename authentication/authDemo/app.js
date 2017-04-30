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
app.use(bodyParser.urlencoded({extended: true}));
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

passport.use(new LocalStrategy(User.authenticate()));
//reading the session, taking the data from the session that's encoded
//and uncoded and encoded again and putting them in the session again!
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============
// ROUTES
// ===============

app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
})

// Auth Routes

// show sign up form 
app.get("/register", function(req, res){
	res.render("register");
});

// handling user sign up
app.post("/register", function(req, res){
	
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		} 
		//tries to login and take the pass to compare to the 
		//hash saved password 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});

// Login Routes
// render login form
app.get("/login", function(req, res){
	res.render("login");
});
//login logic
//middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req, res){

});

app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});
















