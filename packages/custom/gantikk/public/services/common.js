'use strict';

angular.module('mean.gantikk').factory('commonFactory', ['ngDialog',
  function(ngDialog) {
	  
	  var Common	=	{
		loadjQueryRanger : function()
		{
			$('#range-slider').jRange({
				from			:	1,
				to				:	24,
				step			:	1,
				scale			:	[4,8,12,16,20, 24],
				format			:	'%s',
				width			:	300,
				showLabels		:	true,
				isRange			:	true,
				onstatechange	:	function(res)
				{
					console.log(res);
				}
			});
		},
		
		openDialog : function(templateId, $scope)
		{
			ngDialog.open({
				template			:	templateId,
				className			:	'ngdialog-theme-default',
				closeByDocument		:	false,
				disableAnimation	:	true,
				scope				:	$scope
			});
		},
		
		closeDialog : function()
		{
			ngDialog.close();
		}
	};

	return Common;
	  
  }]);



