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
    description: String
});

//Database Collection Model for Campground
var Campground = mongoose.model("Campground", campgroundSchema);


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


app.get("/campgrounds/:id", function(req, res) {

    //use mongodB findById to search specific in the db
    Campground.findById(req.params.id, function(err, currObj) {
        if (err) {
            console.log(err);
        } else {
            //Open the "show" with the current campground object
            console.log(currObj);
            res.render("show", { currCampground: currObj });
        }
    })


});
app.post("/campgrounds", function(req, res) {

    var name_ = req.body.name;
    var image_ = req.body.image;
    var description = "this is our first description comment";
    var newCamGround = { name: name_, image: image_, description }
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