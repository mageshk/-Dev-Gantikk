'use strict';

/**
 * Module dependencies.
 */
var mongoose	=	require('mongoose'),
	Resources	=	mongoose.model('gk_resources'),
    config		=	require('meanio').loadConfig(),
    _			=	require('lodash');
	

module.exports	=	function() {
	
	return {
		
		/**
         * List of Groups
         */
        getUsers	:	function(req, res) {
						
			Resources.find({}, function(err, resources) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the resources'
                    });
                }
				
				// returns json format
				res.json(resources);
            });

        }
		
	};
};