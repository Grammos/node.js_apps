var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds");

seedDB();
//connect moongose to the mongodb's db
mongoose.connect("mongodb://localhost/ks_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


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
			res.render("index", {campgrounds:allCampgrounds});
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
	res.render("new");
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
	       res.render("show", {campground: foundCampground});

		}
	});
	
});

app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});