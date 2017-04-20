var express    = require("express"),
 	app        = express(),
 	bodyParser = require("body-parser");
 	mongoose    = require("mongoose");

//connect moongose to the mongodb's db
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//schema design for this app- Mongoose/Model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body:  String,
	created: {type: Date, default: Date.now}
});

// "compile" to the model
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL routes
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// INDEX route
app.get("/blogs", function(req, res){
	// retrieving all the data from DB
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else{
		 //rendering the page with the data retrieved from DB
		 res.render("index", {blogs: blogs});
		}
	});
});

// New route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

// Create route
app.post("/blogs", function(req, res){
	// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}else{
			//then, redirect to the index
			res.redirect("/blogs");
		}
	});

});

app.listen(3000, function() {
	console.log("Server is running on localhost:3000");
});