var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// Embedded Data 
// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name:  String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

var USER = mongoose.model("User", userSchema);

// Post.create({
// 	title: "Hello from Kosovo pt. 3",
// 	content: "bhsjhjahjfhdshfjsusjsjhsjdhfs"
// }, function(err, post){
// 	USER.findOne({email: "bobi@gmail.com"}, function(err, foundUser){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save(function(err, data){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					console.log(data);
// 				}

// 			});
// 		}
// 	});
// });

// find users
// find all posts for that user 
USER.findOne({email: "bobi@gmail.com"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	} else {
		console.log(user);
	}
});

// USER.create({
// 	email: "bobi@gmail.com",
// 	name: "Hello Kosovo"
// });
