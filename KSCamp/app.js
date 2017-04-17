var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("landing.ejs");
});

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];


app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	//to get the data from the form 
	var name = req.body.name;
	var image = req.body.image;
	//creating the objects in order to push to the array
	var newCampground = {name:name, image:image}
	//pushing the new data to the array
	campgrounds.push(newCampground);
	//redirect to the "get" request route
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});