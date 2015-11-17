'use strict';

angular.module('mean.gantikk').factory('connectFactory', [ '$rootScope', '$http', '$location', '$stateParams', '$cookies', '$q', '$timeout',
  function($rootScope, $http, $location, $stateParams, $cookies, $q, $timeout) {
	  
	var auth	=	{
			loggedin		:	false,
			
			isAdmin			:	false,
			
			user			:	{},
			
			b64_to_utf8 : function(str)
			{
				return decodeURIComponent(escape(window.atob( str )));
			},
			
			checkLoggedin	:	function() 
			{
				var deferred = $q.defer(); 
				// Make an AJAX call to check if the user is logged in
				$http.get('/api/gantikk/loggedin').success(function(user) {
					// Authenticated
					if (user !== '0') $timeout(deferred.resolve);
					
					// Not Authenticated
					else {
						$cookies.put('redirect', $location.path());
						$timeout(deferred.reject);
						$location.url('/gantikk');
					}
				});

				return deferred.promise;
			},
			
			onIdentity : function(response) 
			{
				if (!response) return;
				var encodedUser, user, destination;
				if (angular.isDefined(response.token)) {
					localStorage.setItem('JWT', response.token);
					encodedUser = decodeURI(auth.b64_to_utf8(response.token.split('.')[1]));
					user = JSON.parse(encodedUser); 
				}
				destination = angular.isDefined(response.redirect) ? response.redirect : destination;
				auth.user = user || response;
				auth.loggedin = true;
				auth.isAdmin = !! (auth.user.roles.indexOf('admin') + 1);
				if (destination) $location.path(destination);
				$rootScope.$emit('loggedin');
			}
	};
	
	$http.get('/api/users/connect/me').success(function(response) {
        if(!response && $cookies.get('token') && $cookies.get('redirect')) {
			auth.onIdentity.bind(auth)({
				token: $cookies.get('token'), 
				redirect: $cookies.get('redirect').replace(/^"|"$/g, '')
			});
			$cookies.remove('token');
			$cookies.remove('redirect');
        } else { 
			auth.onIdentity.bind(auth)(response);
        }
    });
		
	return auth;
	  
  }]);

	