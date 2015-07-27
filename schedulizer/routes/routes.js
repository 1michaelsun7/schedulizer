var events = require("../models/event.js");
var contents = require("../models/content.js");

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(app, passport, qs) {

	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'After Three', message: req.flash('message') });
	});

	app.get('/admincenter', isAuthenticated, function(req, res, next) {
	  res.render('admincenter', { title: 'After Three Admin Center' });
	});

	app.get('/event', isAuthenticated, function(req, res, next) {
	  res.render('event', { title: 'Event Title', user: req.user });
	});

	app.get('/leaderboard', isAuthenticated, function(req, res, next) {
	  res.render('leaderboard', { title: 'Leaderboard', user: req.user });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/main', isAuthenticated, function(req, res, next) {
	  res.render('main', { title: 'Main Page', user: req.user });
	});

	app.get('/myEvents', isAuthenticated, function(req, res, next) {
	  res.render('myEvents', { title: 'My Extracurriculars', user: req.user });
	});

	app.get('/suggest', isAuthenticated, function(req, res, next) {
	  res.render('suggest', { title: 'Suggest an Extracurricular!', user: req.user });
	});

	app.get('/upcoming', isAuthenticated, function(req, res, next) {
	  res.render('upcoming', { title: 'Upcoming Extracurriculars', user: req.user });
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
   		// var ev = new Event();
			// ev.name = eventName;
			// ev.description = eventDesc;
			// ev.owner = req.user._id; //userid of creator
			// ev.category = eventCat;
			// ev.hidden = false;
			// ev.upvotes = 0;
			// ev.sponsor = "";
			// ev.sponsored = false;
			// ev.attendees: [];
			// ev.save(function(err, newEv){
			//  if (err){
				// console.log('Error in Saving event: '+err);  
				// throw err;
				// res.redirect('/main');
				// } else {
				// va r evID = newEv._id;
				// res.redirect('/event?id=' + evID);
			// }
		// });
		res.redirect('/event');
		
	});

	app.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});
};