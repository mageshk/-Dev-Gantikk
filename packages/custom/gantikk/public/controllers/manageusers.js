'use strict';

angular.module('mean.gantikk').controller('ManageuserController', ['$scope', 'usersFactory', 
  function($scope, usersFactory) {
   
   //List of Tags
	usersFactory.query(function(users) {
		$scope.users = users;
	});
	
  }
]);
