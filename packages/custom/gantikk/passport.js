'use strict';

var mongoose		=	require('mongoose'),
  GoogleStrategy	=	require('passport-google-oauth').OAuth2Strategy,
  UserConnect		=	mongoose.model('gk_users'),
  config			=	require('meanio').loadConfig();

module.exports = function(passport) {
  // Use google strategy
  passport.use(new GoogleStrategy({
      clientID: config.strategies.google.clientID,
      clientSecret: config.strategies.google.clientSecret,
      callbackURL: config.strategies.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      UserConnect.findOne({
		googleId : profile.id
      }, function(err, user) {
        if (user) {
			return done(err, user);
        }
		
        user	=	new UserConnect({
			googleId	:	profile.id,
			fname		:	profile.name.givenName,
			lname		:	profile.name.familyName,
			displayname	:	profile.displayName,
			email		:	profile.emails[0].value,
			gender		:	profile.gender,
			profileImg	:	profile.photos[0].value,
			roles		:	['authenticated']
        });
		
        user.save(function(err) {
			if (err) {
				return done(null, false, {message: 'Google login failed, email already used by other login strategy'});
			} else {
				return done(err, user);
			}
        });
		
		return done(err, user);
      });
    }
  ));

  return passport;
};
