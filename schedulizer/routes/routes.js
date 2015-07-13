var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(app, passport) {

	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'After Three' });
	});

	app.get('/event', function(req, res, next) {
	  res.render('event', { title: 'Event Title' });
	});

	app.get('/leaderboard', function(req, res, next) {
	  res.render('leaderboard', { title: 'Leaderboard' });
	});

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

	app.get('/main', function(req, res, next) {
	  res.render('main', { title: 'Main Page' });
	});

	app.get('/myEvents', function(req, res, next) {
	  res.render('myEvents', { title: 'My Extracurriculars' });
	});

	app.get('/suggest', function(req, res, next) {
	  res.render('suggest', { title: 'Suggest an Extracurricular!' });
	});

	app.get('/upcoming', function(req, res, next) {
	  res.render('upcoming', { title: 'Upcoming Extracurriculars' });
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

	app.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});
};