'use strict';

/**
 * Module dependencies.
 */
var mongoose	=	require('mongoose'),
    Groups		=	mongoose.model('gk_groups'),
	Subgroups	=	mongoose.model('gk_subgroups'),
	Resources	=	mongoose.model('gk_resources'),
	Tasks		=	mongoose.model('gk_tasks'),
    config		=	require('meanio').loadConfig(),
    _			=	require('lodash');
	
module.exports	=	function(Planning) {

    return {
       		
		/**
         * List of Groups
         */
        getGroups	:	function(req, res) {
						
			Groups.find({}, function(err, groups) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the groups'
                    });
                }
				
				// returns json format
				res.json(groups);
            });

        },
		
		/**
         * List of Sub Groups
         */
        getSubGroups	:	function(req, res) { 
						
			Subgroups.find({id_group : req.params.groupId}, function(err, subgroups) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the subgroups'
                    });
                }
				
				// returns json format
				res.json(subgroups);
            });

        },
		
		/**
         * List of Resources
         */
        getResources	:	function(req, res) {
						
			Resources.find({id_subgroup : req.params.subgroupId}, function(err, resources) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the resources'
                    });
                }
				
				// returns json format
				res.json(resources);
            });

        },
		
		/**
         * List of Tasks for a resource
         */
        getTasks	:	function(req, res) {
			
			Tasks.find({id_resource : req.params.resourceId}, function(err, task) { 
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the tasks'
                    });
                }
				
				// returns json format
				res.json(task);
            });

        },
		
		getTask	:	function(req, res) 
		{
			Tasks.find({_id : req.params.taskId}, function(err, task) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot get the task'
                    });
                }
				
				// returns json format
				res.json(task);
            });

        },
		
		/**
         * Update Task
         */
        updateTask	:	function(req, res) 
		{	
			Tasks.update({_id: req.params.taskId}, req.body, function(err, task) 
			{
				if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the tag'
                    });
                }
				
				res.json(task);
			});

        },
		
		/**
         * Save Task
         */
        saveTask	:	function(req, res) 
		{	
			var task = new Tasks(req.body);
			
			task.save(function(err, lastInsertId) 
			{
				task._id	=	lastInsertId._id;
				
				if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the tag'
                    });
                }
				
				res.json(task);
			});

        }
    };
}