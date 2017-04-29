var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
	{
		name: "Gogo's Place 1",
		image: "http://www.cantechletter.com/wp-content/uploads/2016/06/mars-400x300.jpg",
		description: "Mars blah!"
	},
	{
		name: "Gogo's Place 2",
		image: "http://www.cantechletter.com/wp-content/uploads/2016/06/mars-400x300.jpg",
		description: "Mars blah!"
	},
	{
		name: "Gogo's Place 3",
		image: "http://www.cantechletter.com/wp-content/uploads/2016/06/mars-400x300.jpg",
		description: "Mars blah!"
	}
]
function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("add a campground!");
					//create a comment
					Comment.create(
						{
							text: "This is my dreams' place!",
							author: "Helly"

						}, function(err, comment){
							if(err){
								console.log(err);
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment!");
							}
							
						});
				}
			})
		});
	});

	//add a few comments

}

module.exports = seedDB;