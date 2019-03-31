//Create the express framework
var express       = require("express"),
    app           = express();

const port        = 3000;

var bodyParser 	  = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing for html files. no need for extension (file type)
app.set("view engine", "ejs");



var campgrounds = [
		{name: "Alseny Sylla", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
		{name: "Nana Sylla",   image: "https://cdn.pixabay.com/photo/2016/03/30/02/57/camping-1289930__340.jpg"},
		{name: "Hamidou Sylla",image: "https://cdn.pixabay.com/photo/2013/07/13/11/36/volkswagen-158463_1280.png"}
]
//deault landing page
app.get("/", function(req, res){
	res.render("landing");
});


//  "/campgrounds" will show us all the campground that we have
app.get("/campgrounds", function(req, res){
	//Adding temporary campground mode (hardcoding for testing)
	
										  //right side the data we are passing in
										  //left side is the page we are opening. 
	res.render("campgrounds", {campgrounds:campgrounds});
});

// "/newCampground" will allow us to add a new campground
app.get("/campgrounds/newCampground", function(req, res){
	res.render("newCampground.ejs");
});

app.post("/campgrounds", function(req, res){
	var name_  = req.body.name;
	var image_ = req.body.image;
	var newCamGround = {name:name_, image:image_}
	campgrounds.push(newCamGround);
	res.redirect("/campgrounds");
});
//Listen on port 3000
app.listen(port, function(){
	console.log("YelCamp Server has Started!");
});



