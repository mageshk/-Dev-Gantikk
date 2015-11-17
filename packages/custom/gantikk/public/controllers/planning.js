'use strict';

angular.module('mean.gantikk', [
	'gantt'
	,'gantt.table'
	,'gantt.tree'
	,'gantt.sortable'
	,'gantt.movable'
	,'gantt.tooltips'
	,'gantt.drawtask'
	,'mgcrea.ngStrap'
	,'ngDialog'
]).controller('PlanningController', [
	'$scope', '$log', 'groupFactory', 'subgroupFactory', 'resourceFactory', 'taskFactory', 'manageTask', 'tagsFactory', 'ngDialog', 'timeZonesFactory',
  function($scope, $log, groupFactory, subgroupFactory, resourceFactory, taskFactory, manageTask, tagsFactory, ngDialog, timeZonesFactory) {
	  
	var jsondata			=	[];
	$scope.createTaskPanel	=	false;
	$scope.fromDate			=	moment();
	$scope.toDate			=	moment().add(6, 'days');
	
	//List of languages
	$scope.languages	=	[
		{ language: 'English', i18n: 'en'},
		{ language: 'French', i18n : 'fr'}
	];
	
	//List of timezones
	timeZonesFactory.query(function(zones) {
		$scope.zones = zones;  
	});   
		
	//Gantt Options
	$scope.options = {
		mode				:	'custom',
		scale				:	'day',
		sortMode			:	undefined,
		sideMode			:	'TreeTable',
		daily				:	false,
		maxHeight			:	false,
		width				:	false,
		zoom				:	1,
		autoExpand			:	'none',
		taskOutOfRange		:	'truncate',
		fromDate			:	$scope.fromDate,
        toDate				:	$scope.toDate,
		currentDate			:	'line',
		draw				:	 false,
		readOnly			:	false,
		allowSideResizing	:	true,
        labelsEnabled		:	false,
		currentDateValue	:	moment(),
		treeTableColumns	:	['model.name'],
		timeFrames			:	{
									'day': {
										start: moment('8:00', 'HH:mm'),
										end: moment('17:00', 'HH:mm'),
										working: true,
										default: true
									},
									'noon': {
										start: moment('13:00', 'HH:mm'),
										end: moment('14:00', 'HH:mm'),
										working: false,
										default: true
									},
									'weekend': {
										working: false
									},
									'holiday': {
										working: false,
										color: 'red',
										classes: ['gantt-timeframe-holiday']
									}
		},
		dateFrames			:	{
									'weekend': {
										evaluator: function(date) {
											return date.isoWeekday() === 6 || date.isoWeekday() === 7;
										},
										targets: ['weekend']
									}
		},
		api					:	function(api) 
		{
			//trigger on row change
			api.tasks.on.rowChange($scope, addEventName('tasks.on.rowChange', taskAssignToResource));
			
			//trigger on change
			api.tasks.on.change($scope, addEventName('tasks.on.change', taskReAssignToResource));
			
			//trigger on move
			if(api.tasks.on.moveBegin)
				api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', taskReAssignToResource));
		}
	};
	
	//Generate JSON format for gantt
	groupFactory.query(function(groups) 
	{		
		angular.forEach(groups, function(group) 
		{
			jsondata.push(group);
			
			subgroupFactory.query({groupId : group._id }, function(subgroups) 
			{		
				angular.forEach(subgroups, function(subgroup) 
				{
					var gJSON	=	{name : subgroup.name, parent : group.name, id : subgroup._id, children : []};					
					
					resourceFactory.query({subgroupId : subgroup._id }, function(resources) 
					{
						angular.forEach(resources, function(resource) 
						{
							var tJSON	=	{name : resource.name, id : resource._id, tasks : []};
							
							gJSON.children.push(resource.name);
							
							taskFactory.query({resourceId : resource._id }, function(tasks) 
							{			
								angular.forEach(tasks, function(task) { 
									tJSON.tasks.push(task);
								});

								jsondata.push(tJSON);
							});
						});
					});	
					
					jsondata.push(gJSON);
				});
			});	
		});
	});
	
	$scope.data = jsondata;
	
	// Event utility function
	var addEventName = function(eventName, func) {
		return function(data) {
			return func(eventName, data);
		};
	};
	
	//Assign task to resource
	var taskAssignToResource	=	function(eventName, data) 
	{
		$log.info('[Event] ' + eventName + ': ' + data.model.name);
		
		manageTask.get({taskId : data.model._id }, function(task) 
		{		
			task.id_resource	=	data.row.model.id;
			
			task.from			=	data.model.from;
			task.to				=	data.model.to;
			
			var updateTask		=	new manageTask(task);
			
			updateTask.$update({taskId : data.model._id }, function() { $log.info('Successfully Updated'); });
		});
	};
	
	//Task schedule to resource
	var taskReAssignToResource	=	function(eventName, data) 
	{
		$log.info('[Event] ' + eventName + ': ' + data.model.name);
		
		if(typeof data.model._id === 'undefined')
		{	
			$scope.task.id_resource	=	data.row.model.id;
			
			ngDialog.open({
				template			:	'tagsList',
				className			:	'ngdialog-theme-default',
				closeByDocument		:	false,
				disableAnimation	:	true,
				controller			:	'PlanningController',
				scope				:	$scope
			});
		}
		else
		{
			manageTask.get({taskId : data.model._id }, function(task) 
			{ 
				task.from		=	data.model.from;
				task.to			=	data.model.to;
				
				var updateTask	=	new manageTask(task);
				
				updateTask.$update({taskId : data.model._id }, function() { $log.info('Successfully Updated'); });
			});
		}
	};
	
	//List of Tags
	tagsFactory.query(function(tags) {
		$scope.tags = tags;
	});
	
	//Choose Tag
	$scope.chooseTag = function(tagKey)
	{		
		$scope.task.color		=	$scope.tags[tagKey].color;
		$scope.createTaskPanel	=	true;
	};
	
	//Save task
	$scope.saveTask = function()
	{
		$scope.task.name	=	$scope.taskName; 
		var saveTask		=	new manageTask($scope.task);
		
		saveTask.$save(function(response) 
		{ 
			$log.info('Successfully Added');
			$scope.task = response; 
			
			ngDialog.close();
		});
	};
	
	//Create/Draw the new task
	$scope.drawTaskFactory = function()
	{
		$scope.task				=	{};
		$scope.task.name		=	'New Task';
		
		$scope.createTaskPanel	=	false;
							
		return $scope.task;
	};
  }
]);
