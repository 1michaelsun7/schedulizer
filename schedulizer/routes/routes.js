

module.exports = function(app) {

	app.get('/', function(req, res, next) {
	  res.render('index', { title: 'Schedulizer' });
	});

	app.get('/leaderboard', function(req, res, next) {
	  res.render('leaderboard', { title: 'Leaderboard' });
	});

	app.get('/main', function(req, res, next) {
	  res.render('main', { title: 'Main Page' });
	});

	app.get('/myEvents', function(req, res, next) {
	  res.render('myEvents', { title: 'My Events' });
	});

	app.get('/settings', function(req, res, next) {
	  res.render('settings', { title: 'Settings' });
	});

	app.get('/upcoming', function(req, res, next) {
	  res.render('upcoming', { title: 'Upcoming Events' });
	});

	app.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});
};