'use strict';

angular.module('mean.gantikk').controller('SettingController', 
	['$scope', '$log', 'settingsFactory', 'tagsFactory', 'timeZonesFactory', 'commonFactory', 
		function($scope, $log, settingsFactory, tagsFactory, timeZonesFactory, commonFactory) {
   	
	$scope.tag			=	{name : '', color : '', jsonLink : ''};
	$scope.settings		=	{domains : '', defaulttimezone : '', workingHours : ''};
	
	$('#colorPicker').hexColorPicker();
		
	settingsFactory.get(function(settings) 
	{
		if(settings[0])
			$scope.settings = settings[0];
		
		jqueryRange();
	});
	
	
	function jqueryRange()
	{
		$('#range-slider').jRange({
			from			:	1,
			to				:	24,
			step			:	1,
			scale			:	[1, 4, 8, 12, 16, 20, 24],
			format			:	'%s',
			width			:	300,
			showLabels		:	true,
			isRange			:	true,
			onstatechange	: function(value)
			{
				$scope.settings.workingHours = value;
			}
		});
	}
				
	//List of timezones
	$scope.timezones	=	function()
	{
		timeZonesFactory.query(function(zones) {
			$scope.zones = zones;  
		});
	};	
	
	//get timezone by ID
	$scope.getTimezone	=	function(key)
	{
		$scope.timezone	=	$scope.zones[key];
		
		commonFactory.closeDialog();
		commonFactory.openDialog('updateZone', $scope);
	};
	
	//Update Timezone
	$scope.updateTimezone	=	function()
	{
		var zones	=	new timeZonesFactory($scope.timezone);
		
		zones.$update(function(response) {
			commonFactory.closeDialog();
			$scope.timezones();
        });
	};
	
	//List of tags
	$scope.getTags = function() 
	{ 
		tagsFactory.query(function(tags) { 
			$scope.tags = tags;
		});
    };
	
	//get tag by ID
	$scope.getTag = function(index, key) 
	{ 		
		$scope.tag	=	$scope.tags[index];	
		
		commonFactory.closeDialog();
		commonFactory.openDialog('tagDialog', $scope);
    };
	
	$scope.createTag = function() 
	{ 
		commonFactory.openDialog('tagDialog', $scope);
    };
	
	$scope.manageTag	=	function(key)
	{
		var tags	=	new tagsFactory($scope.tag);
		
		if(typeof key === 'undefined')
		{
			tags.$save(function() {
				$scope.getTags();
			});
		}
		else
		{
			tags.$update(function() {
				$scope.getTags();
			});
		}
		
		commonFactory.closeDialog();
	};
	
	$scope.removeTag	=	function(tag, key)
	{
		tag.$remove(function(response) {
			$('#tag_'+key).remove();
        });
	};
	
	$scope.manageSettings	=	function(id)
	{
		var settings	=	new settingsFactory($scope.settings);
		
		if(typeof id === 'undefined')
		{
			settings.$save(function() {
				$log.info('Successfully Saved');
			});
		}
		else
		{
			settings.$update(function() {
				$log.info('Successfully Updated');
			});
		}
	};
	
	$scope.logoUpload = function(element)
	{
		console.log(element);
		
		//$('#logoUploadForm').submit();
	};
  }
]);
