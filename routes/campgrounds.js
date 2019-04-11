var express = require("express");
var router = express.Router();


var Campground = require("../models/campground");
var Comment = require("../models/comment");

//index.js will be required
var middleware = require("../middleware");


//  Purpose: list all the campgrounds 
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/campgrounds.ejs", { campgrounds: allCampgrounds, currentUser: req.user });
    });
});


// form to enter a new campground
router.get("/newCampground", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/newCampground");
});


//Add a new a campground and redirect to /campgrounds
router.post("/", middleware.isLoggedIn, function(req, res) {

    var name_ = req.body.name;
    var image_ = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamGround = { name: name_, image: image_, description, author: author }
    Campground.create(newCamGround, function(err, newCampG) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", newCampG.name + " successfully added!")
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
            res.render("campgrounds/show", { currCampground: currObj });
        }
    });

});


//EDIT CAMPGROUND ROUTE FORM
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {

    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "campground not found!");
        }

        res.render("campgrounds/edit", { campground: foundCampground });

    });

});


//UPDATE CAMPGROND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {

    Campground.findByIdAndUpdate(req.params.id, req.body.campground,
        function(err, updatedCampground) {
            if (err) {
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        })
});


//DESTROY CAMGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        Comment.deleteMany({ _id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/campgrounds");
        });


    });
});



module.exports = router;