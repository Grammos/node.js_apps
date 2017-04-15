var express  = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
});


app.get("/results", function(req, res){
	//taking data from the input and saving to a variable
   var query = req.query.search;
   //url request, plus the query -- dynamic search
   var url = "http://www.omdbapi.com/?s=" + query;


   request(url,  function(error, response, body){
   		if(!error && response.statusCode == 200){
   			//the request is now an object json.
   			var data = JSON.parse(body);
   			//passed the json to the page,
   			res.render("results", {data:data});
   		}

   });
});


//tell the express to listen for the requests
app.listen(3000, function() {
  console.log('Server is running on localhost:3000');
});

