'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var TagSchema = new Schema({
	name: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	color : {
		type	:	String,
		required:	true,
		trim	:	true
	},
	jsonLink : {
		type	:	String,
		trim	:	true
	},
	status : {
		type	:	Number,
		default	:	1
	},
	created : {
		type	:	Date,
		default	:	Date.now
	}
});

/**
 * Timezone Schema
 */
var TimezoneSchema = new Schema({
	name: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	customname: {
		type	:	String,
		trim	:	true
	},
	code: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	offset: {
		type	:	String,
		required:	true,
		trim	:	true
	}
});

/**
 * Settings Schema
 */
var SettingsSchema = new Schema({
	domains: {
		type	:	String,
		trim	:	true
	},
	defaulttimezone: {
		type	:	Schema.Types.ObjectId, 
		ref		:	'gk_timezones'
	},
	workingHours: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	updated : {
		type	:	Date,
		default	:	Date.now
	}
});

mongoose.model('gk_timezones', TimezoneSchema);
mongoose.model('gk_settings', SettingsSchema);
mongoose.model('gk_tags', TagSchema);
