//Create the express framework
var express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");




seedDB();
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//--------PASSPORT AUTHENTICATION CONFIGURATION--------------
app.use(require('express-session')({
    secret: 'keyword for the yelpcamp application',
    resave: false,
    saveUninitialized: false
}));

//use passport in an express based application, configure it
//with the required passport.initialize()
app.use(passport.initialize());

//passport.session(): middleware use for persistent login sessions
app.use(passport.session());


//UserSchema authentication strategies
passport.use(new LocalStrategy(User.authenticate()));


//authenticated user must be serialized to the session for 
//persistent sessions to work and deserialized when subsequent
//request is made
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//----------------------------------------------------------
//function to pass the user in every page
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})


//deault landing page
app.get("/", function(req, res) {
    res.render("landing");
});

//  Purpose: list all the campgrounds 
app.get("/campgrounds", function(req, res) {
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/campgrounds.ejs", { campgrounds: allCampgrounds, currentUser: req.user });
    });
});

// form to enter a new campground
app.get("/campgrounds/newCampground", isLoggedIn, function(req, res) {
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
app.post("/campgrounds", isLoggedIn, function(req, res) {

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


//=========================COMMENT SECTION=======================

//Get form for a comments
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {

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
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {

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





//========================USER and REGISTER===========================================



app.get("/register", function(req, res) {
    res.render("register");
});


app.post("/register", function(req, res) {
    req.body.username
    req.body.password
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function(err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds");
            });
        }
    )
});




app.get("/login", function(req, res) {

    res.render("login");
});

app.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});

app.get("/logout", function(req, res) {
    req.logout(); //this will help us with req.Authenticated
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//Listen on port 3000
app.listen(port, function() {
    console.log("YelCamp Server has Started!");
});