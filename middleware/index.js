var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                //.equals compares the string to the onject
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you need to be the owner of the comment");
                    res.redirect("back");
                }
            }
        });
    } else {
        //take the user back to where they come from
        req.flash("error", "you need to be logged in to add a comment");
        res.redirect("back");
    }

}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }

}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                console.log(err);
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                //.equals compares the string to the onject
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        //take the user back to where they come from
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }

}


module.exports = middlewareObj;