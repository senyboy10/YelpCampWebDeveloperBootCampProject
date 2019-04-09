var express = require("express");
var router = express.Router();


var Campground = require("../models/campground");
var Comment = require("../models/comment");


//  Purpose: list all the campgrounds 
router.get("/", function(req, res) {
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/campgrounds.ejs", { campgrounds: allCampgrounds, currentUser: req.user });
    });
});

// form to enter a new campground
router.get("/newCampground", isLoggedIn, function(req, res) {
    res.render("campgrounds/newCampground");
});

//Add a new a campground and redirect to /campgrounds
router.post("/", isLoggedIn, function(req, res) {

    var name_ = req.body.name;
    var image_ = req.body.image;
    var description = req.body.description;
    var newCamGround = { name: name_, image: image_, description }
    Campground.create(newCamGround, function(err, newCampG) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });

});

//Display a specific campground
router.get("/:id", function(req, res) {

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


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;