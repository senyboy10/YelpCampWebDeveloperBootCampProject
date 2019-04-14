# YelpCampWebDeveloperBootCampProject

Yelcamp is a nodeJs web application that focus on CRUD using express. It allows users sign up and add pictures of campgrouds to a timeline so people can view and comment on them.
Anyone can and view all the campgrounds, but you must sign up/login to add a new campground, and add comments. 

#Link to Application: https://alsenyyelpcamp.herokuapp.com/

#YelpCamp

##Initial Setup: 7 RESTful routes

|Name|Path|HTTP verb|Purpose|
|----|----|---------|-------|
|campgrounds|/campgrounds|GET|list all campgrounds|
|newCampground|/campgrounds/newCampground|GET|show new campground form|
|Create|/campgrounds|POST|Create a new campground, then redirect somewhere|
|Show|/campgrounds/:id|GET|Show info about one specific Campground|
|Edit|/campgrounds/:id/edit|GET|Show edit form for one campground|
|Update|/campgrounds/:id|PUT|Update a particular campground, then redirect somewhere|
|Destroy|/campgrounds/:id|DELETE|Delete a particular dog, then redirect somewhere|


* Comment restful 


|Name|Path|HTTP verb|Purpose|
|----|----|---------|-------|
| new| campgrounds/:id/comments/new | GET| show comment form|
|Create| campgrounds/:id/comments|POST| show campground with comments |
|edit|campgrounds/:id/comments/:comment_id/edit|GET|EDIT your own comment|

# DBMS
* MongoDB
	* mongoose for schema and Model
	* mongoAtlas

* Each Campground has:
   * Name
   * Image
   * Description
   * author: {id: { }, username: String},
   * comments: [{ type:  ref:  }],

* Each User has:
	* username
	* password
* Each Comment has:
	*  text: , author: { id: { type:, ref:  }, username: String  }

# Front End
* Bootstrap 4.3.1 (navbar, forms, button, alert)
* HTML, CSS, JavaScript
* 

# Backend
  * NodeJs
	* mongoose
	* express
	* express Sanitizer
	* express-Session
	* body-parser
	* ejs
	* connect-flash
	* moment.js
	* node-geocoder
	* dotenv
	
# APIs
 * Google Map API (Geolocation)

# Authentication/Authorization
* passport
* * passport
* * passport Local
* * passport local Mongoose
* * middlewares

#Sever: run "node app.js"
	
