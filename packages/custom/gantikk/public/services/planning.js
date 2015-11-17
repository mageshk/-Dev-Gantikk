'use strict';

//Planning service used for articles REST endpoint  
angular.module('mean.gantikk').factory('groupFactory', function ($resource) {
	return $resource('api/gantikk/planning/groups', { }, {
		update: {method: 'PUT'},
		query: {method: 'GET', isArray: true},
		get: {method: 'GET'},
		delete: {method: 'DELETE'}
	});
});

angular.module('mean.gantikk').factory('subgroupFactory', function ($resource) {
	return $resource('api/gantikk/planning/subgroups/:groupId', { }, {
		update: {method: 'PUT'},
		query: {method: 'GET', isArray: true},
		get: {method: 'GET'},
		delete: {method: 'DELETE'}
	});
});

angular.module('mean.gantikk').factory('resourceFactory', function ($resource) {
	return $resource('api/gantikk/planning/resources/:subgroupId', { }, {
		update: {method: 'PUT'},
		query: {method: 'GET', isArray: true},
		get: {method: 'GET'},
		delete: {method: 'DELETE'}
	});
});

angular.module('mean.gantikk').factory('taskFactory', function ($resource) {
	return $resource('api/gantikk/planning/tasks/:resourceId', { }, {
		query: {method: 'GET', isArray: true}
	});  
});

angular.module('mean.gantikk').factory('manageTask', function ($resource) {
	return $resource('api/gantikk/planning/task/:taskId', { taskId : '@_id'}, {
		update: {method: 'PUT'},
		get: {method: 'GET', isArray: true}
	});
});
	
