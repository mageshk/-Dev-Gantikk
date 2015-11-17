'use strict';

/**
 * Module dependencies.
 */
var mongoose	=	require('mongoose'),
    Tag			=	mongoose.model('gk_tags'),
    Zones		=	mongoose.model('gk_timezones'),
    Settings	=	mongoose.model('gk_settings'),
    config		=	require('meanio').loadConfig(),
    _			=	require('lodash');
	
module.exports = function() {

    return {
        
		/**
         * List of Timezones
         */
		getTimeZones : function(req, res) 
		{	
			Zones.find({}, function(err, zones) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the time zones'
                    });
                }
				// returns json format
				res.json(zones)
            });
		},
		
		/**
         * Update Timezone
         */
		updateTimeZone : function(req, res) 
		{	
			Zones.update({_id: req.body._id}, req.body, function(err, zone) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the time zones'
                    });
                }
				// returns json format
				res.json(zone)
            });
		},
		
		/**
         * List of Tags
         */
        getTags	:	function(req, res) 
		{ 
			Tag.find({}, function(err, tags) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the tags'
                    });
                }
				// returns json format
				res.json(tags)
            });

        },
		
		/**
         * Save Tag
         */
        saveTag : function(req, res) 
		{
            var tag = new Tag(req.body);
			tag.user = req.user;

			tag.save(function(err) {
				if (err) {
					return res.status(500).json({
						error: 'Cannot save the tag'
					});
				}
				
				res.json(tag);
            });
        },
				
		/**
         * Update Tag
         */
        updateTag	:	function(req, res) 
		{ 			
			Tag.update({_id: req.body._id}, req.body, function(err, tag) {
				
				if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the tag'
                    });
                }
				
				res.json(tag);
			});
        },
		
		/**
         * Delete Tag
         */
        destroyTag	:	function(req, res) 
		{				
			Tag.remove({_id: req.body._id}, function(err, tag) {
				
				if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the tag'
                    });
                }
				
				res.json(tag);
			});
        },
		
		/**
         * Settings Details
         */
        settingsDetails	:	function(req, res) 
		{ 
			Settings.find({}, function(err, tags) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot get the settings details'
                    });
                }
				// returns json format
				res.json(tags)
            });

        },
		
		saveSettings : function(req, res)
		{
			var settings	=	new Settings(req.body);

			settings.save(function(err) {
				if (err) {
					return res.status(500).json({
						error: 'Cannot save the settings'
					});
				}
				
				res.json(settings);
            });
		},
		
		/**
         * Update Settings
         */
        updateSettings	:	function(req, res) 
		{ 			
			Settings.update({_id: req.body._id}, req.body, function(err, settings) {
				
				if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the settings'
                    });
                }
				
				res.json(settings);
			});
        }
    };
}