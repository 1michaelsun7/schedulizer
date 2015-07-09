module.exports = function(app, passport) {

	app.get('/', function(req, res, next) {
	  res.render('index', { title: '[insert some dumb shit here]' });
	});

	app.get('/event', function(req, res, next) {
	  res.render('event', { title: 'Event Title' });
	});

	app.get('/leaderboard', function(req, res, next) {
	  res.render('leaderboard', { title: 'Leaderboard' });
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
	app.post('/login', function(req, res) {
        // req.login();
        res.redirect('/main');
    });

	app.get('/logout', function(req, res) {
        // req.logout();
        res.redirect('/');
    });

    app.post('/signup', function(req, res) {
        passport.authenticate('local-signup', {
        	successRedirect : '/main',
        	failureRedirect : '/',
        	failureFlash: true
        });
    });

	app.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});
};