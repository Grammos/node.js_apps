var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

//connect moongose to the mongodb's db
mongoose.connect("mongodb://localhost/ks_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

// schema to the model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{ 
// 		name: "Salmon Creek", 
// 		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("NEWLY CREATED Campground :D!");
// 			console.log(campground);
// 		}
// 	});



// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];

app.get("/", function(req, res){
	res.render("landing.ejs");
});


app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds", {campgrounds:allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	//to get the data from the form 
	var name = req.body.name;
	var image = req.body.image;
	//creating the objects in order to push to the array
	var newCampground = {name:name, image:image}
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

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});