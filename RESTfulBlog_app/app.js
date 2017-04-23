var bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	express    = require("express"),
	app        = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body:  String,
	created: {type: Date, default: Date.now}
});

// A single connection
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
//retrieving all the data from the DB
	Blog.find({}, function(err, blogs){
		//check if there's any error
		if(err){
			console.log("ERROR!");
		} else {
			// if not, render the page and retrieve all DB's data
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//CREATE ROUTE 
app.post("/blogs", function(req, res){
	//create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});

});

// MONGOOSE/MODEL CONFIG
app.listen(3000, "localhost",  function(){
	console.log("Server is running!");
});

	
