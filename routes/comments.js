var express = require("express");

var router = express.Router({ mergeParams: true }); //merge the params from comment campground routes

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");



//Get form for a comments
router.get("/new", middleware.isLoggedIn, function(req, res) {

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
router.post("/", middleware.isLoggedIn, function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, currObj) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //Open the "show" with the current campground object

            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save comment
                    newComment.save();
                    currObj.comments.push(newComment);
                    currObj.save();
                    console.log(newComment);
                    res.redirect("/campgrounds/" + currObj._id);

                }
            });
        }
    });

});

//user needs to be logged in and be the owner of the comment 
//in order to edit and update 

//get form to edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(foundComment);
                    res.render("comments/edit", { comment: foundComment, campground: foundCampground })
                }
            });
        }
    });

});



//Update comment
router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res) {

    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, currComment) {
        if (err) {
            res.redirect("back");

        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });



});

router.delete("/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, commentDeleted) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;