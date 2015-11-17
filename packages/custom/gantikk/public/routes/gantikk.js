'use strict';

//Setting up route
angular.module('mean.gantikk').config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {
		
	// For unmatched routes:
    $urlRouterProvider.otherwise('/gantikk');
		  
	// states for my app
    $stateProvider
		.state('gantikk connect', {
			url: '/gantikk',
			templateUrl: '/gantikk/views/connect.html'
		})
		.state('gantikk planning', {
			url: '/gantikk/planning',
			templateUrl: '/gantikk/views/planning.html',
			resolve: {
				loggedin: function(connectFactory) { 
					return connectFactory.checkLoggedin();
				}
			}
		})
		.state('gantikk organisation', {
			url: '/gantikk/organisation',
			templateUrl: '/gantikk/views/organisation.html',
			resolve: {
				loggedin: function(connectFactory) { 
					return connectFactory.checkLoggedin();
				}
			}
		})
		.state('gantikk user', {
			url: '/gantikk/manageusers',
			templateUrl: '/gantikk/views/manageusers.html',
			resolve: {
				loggedin: function(connectFactory) { 
					return connectFactory.checkLoggedin();
				}
			}
		})
		.state('gantikk setting', {
			url: '/gantikk/setting',
			templateUrl: '/gantikk/views/setting.html',
			resolve: {
				loggedin: function(connectFactory) { 
					return connectFactory.checkLoggedin();
				}
			}
		});
  }
]);
