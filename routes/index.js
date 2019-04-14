//let's add express routes
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route(deault landing page)
router.get("/", function(req, res) {
    res.render("landing");
});

//show register form route
router.get("/register", function(req, res) {
    res.render("register",{page:"register"});
});

//sign up logic route
router.post("/register", function(req, res) {
    req.body.username
    req.body.password
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function(err, user) {
            if (err) {
                console.log(err);
                
                return res.render("register",{error:err.message});
            }
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
                res.redirect("/campgrounds");
            });
        }
    )
});



//show login form route
router.get("/login", function(req, res) {

    res.render("login", {page:"login"});
});

//login form logic route
router.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});

//logout Route
router.get("/logout", function(req, res) {
    req.logout(); //this will help us with req.Authenticated
    req.flash("error", "Logged you out!")
    res.redirect('/campgrounds');
});



module.exports = router;