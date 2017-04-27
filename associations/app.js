var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

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
	posts: [postSchema]
});

var USER = mongoose.model("User", userSchema);



// var newUser = new USER({
// 	email: "xhera@gmail.com",
// 	name: "Xhera Grekoj"
// });

// newUser.posts.push({
// 	title: "How to blah..",
// 	content: "Iha, i'm kidding!"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Hello from heaven",
// 	content: "They can sing!"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

USER.findOne({name: "Xhera Grekoj"}, function(err, user){
	if(err){
		// console.log(err);
	} else {
		user.posts.push({
			title: "3 things I really like!",
			content: "Eat. Eat. Eat"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});






