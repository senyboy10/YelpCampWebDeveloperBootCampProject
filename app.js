//Create the express framework
var express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")


seedDB();
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");




//deault landing page
app.get("/", function(req, res) {
    res.render("landing");
});

//  Purpose: list all the campgrounds 
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/campgrounds.ejs", { campgrounds: allCampgrounds });
    });
});

// form to enter a new campground
app.get("/campgrounds/newCampground", function(req, res) {
    res.render("campgrounds/newCampground");
});

//Display a specific campground
app.get("/campgrounds/:id", function(req, res) {

    //use mongodB findById to search specific in the db
    Campground.findById(req.params.id).populate("comments").exec(function(err, currObj) {
        if (err) {
            console.log(err);
        } else {
            //Open the "show" with the current campground object
            console.log(currObj);
            res.render("campgrounds/show", { currCampground: currObj });
        }
    });


});

//Add a new a campground and redirect to /campgrounds
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


//=========================COMMENT SECTION=======================

//Get form for a comments
app.get("/campgrounds/:id/comments/new", function(req, res) {

    //find that campgound and populate it with the comments
    Campground.findById(req.params.id, function(err, currObj) {
        if (err) {
            console.log(err);
        } else {
            //Open the "show" with the current campground object
            console.log(currObj);
            res.render("comments/new", { currCampground: currObj });
        }
    });

});

//Post a comment
app.post("/campgrounds/:id/comments", function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, currObj) {
        if (err) {
            console.log(err);
        } else {
            //Open the "show" with the current campground object
            console.log(currObj);

            Comment.create({
                author: req.body.author,
                text: req.body.comment
            }, function(err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    currObj.comments.push(newComment);
                    currObj.save();

                    console.log(currObj);
                    res.redirect("/campgrounds/" + currObj._id);

                }
            });
        }
    });

});
//===================END OF COMMENT SECTION=================================================


//Listen on port 3000
app.listen(port, function() {
    console.log("YelCamp Server has Started!");
});