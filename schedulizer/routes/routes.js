var Event = require("../models/event.js");
var Content = require("../models/content.js");

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

function contains(arr, item){
	for(var i = arr.length; i--;) {
		if(arr[i] === item) {
			return true;
		}
	}
	return false;
}

module.exports = function(app, passport, qs) {

	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'After Three', message: req.flash('message') });
	});

	app.get('/admincenter', isAuthenticated, function(req, res, next) {
	  if (req.user.isSuperAdmin){
	  	res.render('admincenter', { title: 'After Three Admin Center', user: req.user });	
	  } else {
	  	res.render('/');
	  }
	  
	});

	app.get('/event', isAuthenticated, function(req, res, next) {
	  var passedEventId = req.query.id;
	  Event.findOne({_id: passedEventId}, function(err, evt){
	  	if (err){
	  		console.log("Event does not exist");
	  		res.redirect("/main");
	  	}
	  	if (evt.hidden){
	  		console.log("Event does not exist");
	  		res.redirect("/main");
	  	} else {
  			var thisEvent = evt;
  			res.render('event', { title: thisEvent.name, user: req.user, evt: thisEvent });
	  	}
	  });
	});

	app.get('/leaderboard', isAuthenticated, function(req, res, next) {
	  var toptwenty = [];
	  Event.sortByUpvotes(function(err, events){
	  	if (err){
	  		console.log(err);
	  		res.redirect("/main");
	  	}
	  	events.forEach(function(e){
	  		toptwenty.push(e);
	  	});
	  	console.log(toptwenty);
	  	res.render('leaderboard', { title: 'Leaderboard', user: req.user, leaderboard: toptwenty });
	  });
	  
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/main', isAuthenticated, function(req, res, next) {
	  res.render('main', { title: 'Main Page', user: req.user });
	});

	app.get('/myEvents', isAuthenticated, function(req, res, next) {
	  var mytwenty = [];
	  Event.getEventsUserAttending(function(err, events){
	  	if (err){
	  		console.log(err);
	  		res.redirect("/main");
	  	}
	  	events.forEach(function(e){
	  		mytwenty.push(e);
	  	});
	  	console.log(mytwenty);
	  	res.render('myEvents', { title: 'My Extracurriculars', user: req.user, mine: mytwenty });
	  });
	});

	app.get('/suggest', isAuthenticated, function(req, res, next) {
	  res.render('suggest', { title: 'Suggest an Extracurricular!', user: req.user });
	});

	app.get('/upcoming', isAuthenticated, function(req, res, next) {
	  var upcomingtwenty = [];
	  Event.sortByUpcoming(function(err, events){
	  	if (err){
	  		console.log(err);
	  		res.redirect("/main");
	  	}
	  	events.forEach(function(e){
	  		upcomingtwenty.push(e);
	  	});
	  	console.log(upcomingtwenty);
	  	res.render('upcoming', { title: 'Upcoming Extracurriculars', user: req.user, upcoming: upcomingtwenty });
	  });
	});

	app.get('/upvote', isAuthenticated, function(req, res, next){
	  var uID = req.query.userID;
	  Event.findById(req.query.eventID, function(err, evt){
	  	if (err){
	  		console.log(err);
	  	}
	  	console.log(evt);
	  	if (!contains(evt.attendees, uID)){
	  		evt.signupUserForEvent(uID, function(){
	  			console.log('sending');
	  			res.send(''+evt.upvotes);
	  		});
	  	}
	  });
	  
	});

	app.get('/downvote', isAuthenticated, function(req, res, next){
	  var uID = req.query.userID;
	  Event.findById(req.query.eventID, function(err, evt){
	  	if (err){
	  		console.log(err);
	  	}
	  	console.log(evt);
	  	evt.unsignupUserForEvent(uID, function(){
	  		console.log('sending');
	  		res.send(''+evt.upvotes);
	  	});
	  });
	  
	});

	//LOGIN AND LOGOUT
	app.post('/login', passport.authenticate('login', {
		successRedirect: '/main',
		failureRedirect: '/',
		failureFlash : true  
	}));

	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/main',
		failureRedirect: '/',
		failureFlash : true  
	}));

	//suggest event
	app.post('/suggest', function(req, res, next){
		console.log(req.body);
		var body = req.body;
		var eventName = body.eventName;
		var eventDesc = body.eventDesc;
		var eventCat = body.eventCatHidden;
   		var ev = new Event();
			ev.name = eventName;
			ev.description = eventDesc;
			ev.owner = req.user._id; //userid of creator
			ev.category = eventCat;
			ev.hidden = false;
			ev.upvotes = 0;
			ev.sponsor = "";
			ev.sponsored = false;
			ev.attendees = [];
			ev.save(function(err, newEv){
			if (err){
				console.log('Error in Saving event: '+err);  
				throw err;
			} else {
				var evID = newEv._id;
				res.redirect('/event?id=' + evID);
			}
		});
		
	});

	app.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});
};