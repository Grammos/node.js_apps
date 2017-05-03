var express  = require("express");
var router   = express.Router();
var Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res){
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
router.post("/", function(req, res){
	//to get the data from the form and add to campgrounds array
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
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
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

module.exports = router;