'use strict';

//Settings service used for articles REST endpoint
angular.module('mean.gantikk').factory('settingsFactory', ['$resource', 
  function($resource) { 
    return $resource('/api/gantikk/settings/:settingId', {
      settingId: '@_id'
    }, {
		get : {
			isArray : true
		},
		update: {
			method: 'PUT'
		}
    });
  }
]);

angular.module('mean.gantikk').factory('timeZonesFactory', function ($resource) {
	return $resource('/api/gantikk/settings/timezones/:timezoneId', {
      timezoneId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
});

angular.module('mean.gantikk').factory('tagsFactory', function ($resource) {
	return $resource('/api/gantikk/settings/tags/:tagId', {
      tagId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
});