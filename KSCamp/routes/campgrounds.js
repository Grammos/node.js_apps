var express  = require("express");
var router   = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
	//to get the data from the form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	//creating the objects in order to push to the array
	var newCampground = {name:name, price: price, image:image, description:desc, author:author}
	// create a new campground and save to the DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect to the "get" request route
			console.log(newlyCreated)
			res.redirect("/campgrounds");
		}
	});

});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});		
});

// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//var data = {name: req.body.name, image: req.body.image, description: req.body.description}
	//or instead of var data, we can "interfere to the edit.js, input by doing campground[name]"
	//find and upadate the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY/DELETE campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
		//destroy blog
		Campground.findByIdAndRemove(req.params.id, function(err){
			if(err){
				res.redirect("/campgrounds");
			} else {
				res.redirect("/campgrounds");
			}
		});
});


module.exports = router;