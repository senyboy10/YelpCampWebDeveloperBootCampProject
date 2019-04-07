# YelpCampWebDeveloperBootCampProject

Yelcamp Project from Web developer bootcamp (Udemy)

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


##Comment
|----|----|---------|-------|
|Name|Path|HTTP verb|Purpose|
|----|----|---------|-------|
| new | campgrounds/:id/comments/new | GET| show comment form|
|Create| campgrounds/:id/comments|POST| show |campground with comments |

# DBMS
* MongoDB
	* mongoose for schema and Model

* Each Campground has:
   * Name
   * Image
   * Description
   * Comment 

# Front End
* Bootstrap 4.3.1 (navbar, forms, button)
* HTML, CSS, JavaScript

# Backend
  * NodeJs
	* mongoose
	* express
	* express Sanitizer
	* body-parser
	* ejs

#Sever: run "node app.js"
	
