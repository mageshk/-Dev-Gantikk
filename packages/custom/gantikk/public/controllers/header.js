'use strict';

angular.module('mean.system').controller('GantikkHeaderController', ['$scope', '$rootScope', 'Menus', 'connectFactory', '$state',
  function($scope, $rootScope, Menus, connectFactory, $state) {
    
    var vm		=	this;
    vm.menus	=	{};
	
    vm.hdrvars = {
		authenticated: connectFactory.loggedin,
		user: connectFactory.user, 
		isAdmin: connectFactory.isAdmin
    };
	
	// Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) 
	{
		Menus.query({
			name: name,
			defaultMenu: defaultMenu
		}, function(menu) {
			vm.menus[name] = menu;
		});
    }
	
    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);


    $scope.isCollapsed = false;
	
    $rootScope.$on('loggedin', function() 
	{
		queryMenu('main', defaultMainMenu);

		vm.hdrvars = {
			authenticated: connectFactory.loggedin,
			user: connectFactory.user,
			isAdmin: connectFactory.isAdmin
		}; 
    });

    vm.logout = function(){
		connectFactory.logout();
    };

    $rootScope.$on('logout', function() 
	{
		vm.hdrvars = {
			authenticated: false,
			user: {},
			isAdmin: false
		};

		queryMenu('main', defaultMainMenu);
		$state.go('home');
    });

  }
]);
