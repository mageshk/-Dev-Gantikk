'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Users Schema
 */
var usersSchema = new Schema({
	
	googleId: {
		type		:	String,
		required	:	true,
		trim		:	true
	},
	fname: {
		type		:	String,
		required	:	true,
		trim		:	true
	},
	lname: {
		type		:	String,
		required	:	true,
		trim		:	true
	},
	displayname: {
		type		:	String,
		required	:	true,
		trim		:	true
	},
	email : {
		type		:	String,
		trim		:	true
	},
	gender: {
		type		:	String,
		trim		:	true
	},
	profileImg : {
		type		:	String,
		trim		:	true
	},
	roles: {
		type		:	Array,
		default		:	['authenticated']
	},
	created : {
		type		:	Date,
		default		:	Date.now
	},
	visited : {
		type		:	Date,
		default		:	Date.now
	}
});

mongoose.model('gk_users', usersSchema);
