//Create the express framework
var express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//routing for html files. no need for extension (file type)
app.set("view engine", "ejs");



var campgrounds = [
        { name: "Alseny Sylla", image: "https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
        { name: "Nana Sylla", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
        { name: "Hamidou Sylla", image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" }
    ]
    //deault landing page
app.get("/", function(req, res) {
    res.render("landing");
});


//  "/campgrounds" will show us all the campground that we have
app.get("/campgrounds", function(req, res) {
    //Adding temporary campground mode (hardcoding for testing)

    //right side the data we are passing in
    //left side is the page we are opening. 
    res.render("campgrounds", { campgrounds: campgrounds });
});

// "/newCampground" will allow us to add a new campground
app.get("/campgrounds/newCampground", function(req, res) {
    res.render("newCampground.ejs");
});

app.post("/campgrounds", function(req, res) {
    var name_ = req.body.name;
    var image_ = req.body.image;
    var newCamGround = { name: name_, image: image_ }
    campgrounds.push(newCamGround);
    res.redirect("/campgrounds");
});
//Listen on port 3000
app.listen(port, function() {
    console.log("YelCamp Server has Started!");
});