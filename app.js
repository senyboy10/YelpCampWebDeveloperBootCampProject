//Create the express framework
var express       = require("express"),
    app           = express();
const port        = 3000;

//routing for html files. no need for extension (file type)
app.set("view engine", "ejs");

//deault landing page
app.get("/", function(req, res){
	res.render("landing");
});


//  "/campgrounds" will show us all the campground that we have
app.get("/campgrounds", function(req, res){
	//Adding temporary campground mode (hardcoding for testing)
	var campgrounds = [
		{name: "Alseny Sylla", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f3c77fa3efb3b1_340.jpg"},
		{name: "Nana Sylla",   image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144496f6c77da5ebbc_340.jpg"},
		{name: "Hamidou Sylla",image: "https://pixabay.com/get/e83db7072ef6053ed1584d05fb1d4e97e07ee3d21cac104490f3c77fa3efb3b1_340.jpg"}
	]
										  //right side the data we are passing in
										  //left side is the page we are opening. 
	res.render("campgrounds", {campgrounds:campgrounds});
});

//Listen on port 3000
app.listen(port, function(){
	console.log("YelCamp Server has Started!");
});



