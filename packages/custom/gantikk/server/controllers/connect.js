'use strict';

/**
 * Module dependencies.
 */
var mongoose	=	require('mongoose'),
    UserInfo	=	mongoose.model('gk_users'),
    config		=	require('meanio').loadConfig(),
    _			=	require('lodash'),
	jwt			=	require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken
	
	
module.exports	=	function(Connect) {
	
	return {
		
		/**
         * Show login form
         */
        signin: function(req, res) {
			if (req.isAuthenticated()) {
				return res.redirect('/gantikk/planning');
			}
			res.redirect('/gantikk');
        },
		
		authCallback: function(req, res) {
			var payload = req.user;
			var escaped = JSON.stringify(payload);      
			escaped		= encodeURI(escaped);
			
			// We are sending the payload inside the token
			var token = jwt.sign(escaped, config.secret, { expiresInMinutes: 60*5 });
			res.cookie('token', token);
			
			var destination = config.strategies.landingPage;
			
			if(!req.cookies.redirect)
			  res.cookie('redirect', destination);
		  
			res.redirect(destination);
        },
		
		/**
         * User Info
         */
        me: function(req, res) {
            if (!req.user || !req.user.hasOwnProperty('_id')) return res.send(null);

            UserInfo.findOne({
                _id: req.user._id
            }).exec(function(err, user) {

                if (err || !user) return res.send(null);
				
                var dbUser = user.toJSON();
                var id = req.user._id;

                delete dbUser._id;
                delete req.user._id;

                var eq = _.isEqual(dbUser, req.user);
                if (eq) {
                    req.user._id = id;
                    return res.json(req.user);
                }

                var payload = user;
                var escaped = JSON.stringify(payload);
                escaped = encodeURI(escaped);
                var token = jwt.sign(escaped, config.secret, { expiresInMinutes: 60*5 });
                res.json({ token: token });       
            });
        },
	};
}