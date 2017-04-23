var bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose   = require("mongoose"),
	express    = require("express"),
	app        = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
// letting the app to know what to use
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// CREATE ROUTE 
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

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.render("/blogs");
		} else{
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render("edit", {blog: foundBlog});
		}
	});
});


// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	//find that existing blog body's data and update
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});


app.listen(3000, "localhost",  function(){
	console.log("Server is running!");
});

	
