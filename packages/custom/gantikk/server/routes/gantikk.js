'use strict';

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.article.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        };
    };

    next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Gantikk, app, auth, database, passport) 
{	
	
	//API Routes for Connect Page
	var connect = require('../controllers/connect')(Gantikk);
	
	// Setting the google oauth routes
	app.route('/api/auth/connect/google')
	  .get(passport.authenticate('google', {
		scope: [
		  'https://www.googleapis.com/auth/userinfo.profile',
		  'https://www.googleapis.com/auth/userinfo.email'
		]
	}), connect.signin);

	app.route('/api/auth/connect/google/callback')
		.get(passport.authenticate('google', {
	}), connect.authCallback);
	
	// AngularJS route to check for authentication
	app.route('/api/gantikk/loggedin').get(function(req, res) { console.log(req.user._id);
		if ( ! req.isAuthenticated()) 
			return res.send('0');
		
		auth.findUser(req.user._id, function(user) {
			res.send(user ? user : '0');
		});
	});
	
	app.route('/api/users/connect/me').get(connect.me);
	
	//API Routes for Planning Page
	var planning =  require('../controllers/planning')(Gantikk);

	app.route('/api/gantikk/planning/groups')
		.get(planning.getGroups);

	app.route('/api/gantikk/planning/subgroups/:groupId')
		.get(planning.getSubGroups);

	app.route('/api/gantikk/planning/resources/:subgroupId')
		.get(planning.getResources);
		
	app.route('/api/gantikk/planning/tasks/:resourceId')
		.get(planning.getTasks);

	app.route('/api/gantikk/planning/task')
		.post(planning.saveTask);

	app.route('/api/gantikk/planning/task/:taskId')
		.get(planning.getTask)
		.put(planning.updateTask);

	//API Routes for Manage Users Page
	var manageusers =  require('../controllers/manageusers')(Gantikk);
	
	app.route('/api/gantikk/manageusers/users')
		.get(manageusers.getUsers);
	
	//API Routes for Settings Page
	var settings = require('../controllers/setting')(Gantikk);
	
	app.post('/api/upload/logo', function(req, res) 
	{
		console.log(req.files);
	});
	
	app.route('/api/gantikk/settings')
		.get(settings.settingsDetails)
		.post(settings.saveSettings);

	app.route('/api/gantikk/settings/:settingId')
		.put(settings.updateSettings);
	
	app.route('/api/gantikk/settings/timezones')
		.get(settings.getTimeZones);

	app.route('/api/gantikk/settings/timezones/:timezoneId')
		.put(settings.updateTimeZone);

	app.route('/api/gantikk/settings/tags')
		.get(settings.getTags)
		.post(settings.saveTag);

	app.route('/api/gantikk/settings/tags/:tagId')
		.put(settings.updateTag)
		.delete(settings.destroyTag);
};