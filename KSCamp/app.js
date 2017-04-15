var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing.ejs");
});

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Brezovica", image: "http://www.snow-forecast.com/system/images/6583/large/Brezovica.jpg?1295559617"},
		{name: "Rugova", image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Pamje_pranverore_n%C3%AB_Rugov%C3%AB_Pej%C3%AB.JPG"},
		{name: "Kacanik", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Panorama_of_Kacanik%2C_Kosovo.jpg/1200px-Panorama_of_Kacanik%2C_Kosovo.jpg"}
	]


	res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, function(){
	console.log("Server is running on localhost:3000");
});