//Create the express framework
var express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
//routing for html files. no need for extension (file type)
app.set("view engine", "ejs");


//DataBase Schema SetUp
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});

//Database Collection Model for Campground
var Campground = mongoose.model("Campground", campgroundSchema);

/*

Campgrounds.create({
    name: "lastAdded",
    image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, function(err, newCampG) {
    if (err) {
        console.log(err);
    } else {
        console.log("image saved!");
        console.log(newCampG);
    }
});

*/
/*
Campground.find(function(err, campground) {
    if (err) {
        console.log("\nOh no ERROR!!\n");
        console.log(err);
    } else {
        console.log("\nLIST OF ALL CAMPGROUNDS: \n");
        console.log(campground);
    }
});
*/

//deault landing page
app.get("/", function(req, res) {
    res.render("landing");
});


//  "/campgrounds" will show us all the campground that we have
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {

            console.log(err);
        } else {

            //right side the data we are passing in
            //left side is the name of object that will be passed in html file. 
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    });



});

// "/newCampground" will allow us to add a new campground
app.get("/campgrounds/newCampground", function(req, res) {
    res.render("newCampground.ejs");
});

app.post("/campgrounds", function(req, res) {

    var name_ = req.body.name;
    var image_ = req.body.image;
    var newCamGround = { name: name_, image: image_ }
    Campground.create(newCamGround, function(err, newCampG) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });

});
//Listen on port 3000
app.listen(port, function() {
    console.log("YelCamp Server has Started!");
});