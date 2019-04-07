var mongoose = require("mongoose");

//DataBase Schema SetUp
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

//Database Collection Model for Campground
module.exports = mongoose.model("Campground", campgroundSchema);