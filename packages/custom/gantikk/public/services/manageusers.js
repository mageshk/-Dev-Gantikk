'use strict';

angular.module('mean.gantikk').factory('usersFactory', function ($resource) {
	return $resource('api/gantikk/manageusers/users', { }, {
		update: {method: 'PUT'},
		query: {method: 'GET', isArray: true},
		get: {method: 'GET'},
		delete: {method: 'DELETE'}
	});
});


