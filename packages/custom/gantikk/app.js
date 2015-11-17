'use strict';

/*
 * Defining the Package
 */
var mean = require('meanio'),
  Module = mean.Module;

var Gantikk = new Module('gantikk');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Gantikk.register(function(system, app, database, passport) {
	
	Gantikk.auth = require('./authorization');
	require('./passport')(passport);
	
	mean.register('auth', Gantikk.auth);
	
	app.set('views', __dirname + '/server/views');
	
	//We enable routing. By default the Package Object is passed to the routes
	Gantikk.routes(app, Gantikk.auth, database, passport);

	//We are adding a link to the main menu for all authenticated users
	Gantikk.menus.add({
	  title: 'Gantikk',
	  link: 'gantikk planning',
	  roles: ['authenticated'],
	  menu: 'main'
	});

	Gantikk.menus.add({
	  title: 'Organisation',
	  link: 'gantikk organisation',
	  roles: ['authenticated'],
	  menu: 'main'
	});

	Gantikk.menus.add({
	  title: 'Users',
	  link: 'gantikk manageusers',
	  roles: ['authenticated'],
	  menu: 'main'
	});

	Gantikk.menus.add({
	  title: 'Settings',
	  link: 'gantikk setting',
	  roles: ['authenticated'],
	  menu: 'main'
	});
	
	//ngDialog.min
	Gantikk.aggregateAsset('js', 'ngDialog.min.js');
	Gantikk.aggregateAsset('css', 'ngDialog-theme-default.css');
	Gantikk.aggregateAsset('css', 'ngDialog-theme-plain.css');
	Gantikk.aggregateAsset('css', 'ngDialog-theme.css');
	
	Gantikk.aggregateAsset('js', 'jquery/jquery-ui.js');
	
	//jQuery Range
	Gantikk.aggregateAsset('js', 'jquery.range-min.js');
	Gantikk.aggregateAsset('css', 'jquery-range.css');
	
	//Color Picker Range
	Gantikk.aggregateAsset('js', 'jquery.colorpicker.js');
	Gantikk.aggregateAsset('css', 'jquery-colorpicker.css');

	return Gantikk;
});
