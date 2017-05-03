var express  = require("express");
var router   = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comments New
//first it check if the user is logged in, as a way to check  
//to comment. if not logged in that would redirect to /login
router.get("/new", inLoggedIn, function(req, res){
	// find campground by id
    console.log(req.params.id);
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});


// Comments Create
// inLoggedIn - to prevent anyone to comment without login first!
router.post("/", inLoggedIn, function(req, res){
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

//middleware
function inLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


module.exports = router;