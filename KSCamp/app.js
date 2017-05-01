var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");


//connect moongose to the mongodb's db
mongoose.connect("mongodb://localhost/ks_camp");  
//tell app.js what to use  
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT configuration
app.use(require("express-session")({
	secret: "Kosova Kosovo Kosova",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// APP Routes
app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
	//to get the data from the form 
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	//creating the objects in order to push to the array
	var newCampground = {name:name, image:image, description:desc}
	// create a new campground and save to the DB
	Campground.create(newCampground, function(err, newlyCreate){
		if(err){
			console.log(err);
		}else{
			//redirect to the "get" request route
			res.redirect("/campgrounds");
		}
	});

});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
		   //render show template with that campground
	       res.render("campgrounds/show", {campground: foundCampground});

		}
	});
	
});

// ==============================
// Comments Routes
// ==============================

//first it check if the user is logged in, as a way to check  
//to comment. if not logged in that would redirect to /login
app.get("/campgrounds/:id/comments/new", inLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});


// inLoggedIn - to prevent anyone to comment without login first!
app.post("/campgrounds/:id/comments", inLoggedIn, function(req, res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
			
		}
	});
});

// ===============
// AUTH ROUTES
// ===============

// show register form
app.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	//it doesn't store the password, but the hash!
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// show login form
app.get("/login", function(req, res){
	res.render("login");
});

//handling login logic with middleware
//app.post("/login, middleware, callback")
//if a user has already created an account
app.post("/login", passport.authenticate("local", 

	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}) ,function(req, res){
});
	
// logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function inLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});