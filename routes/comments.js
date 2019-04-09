var express = require("express");

var router = express.Router({ mergeParams: true }); //merge the params from comment campground routes

var Campground = require("../models/campground");
var Comment = require("../models/comment");



//Get form for a comments
router.get("/new", isLoggedIn, function(req, res) {

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
router.post("/", isLoggedIn, function(req, res) {

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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;