'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Group Schema
 */
var groupsSchema = new Schema({
	name: {
		type	:	String,
		required:	true,
		trim	:	true
	}
});

/**
 * Sub Group Schema
 */
var subgroupsSchema = new Schema({
	name: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	id_group : {
		type	:	Schema.Types.ObjectId, 
		ref		:	'gk_groups' 
	}
});

/**
 * Resource Schema
 */
var resourcesSchema = new Schema({
	name: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	email: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	type: {
		type	:	Number,
		required:	true
	},
	id_group : {
		type	:	Schema.Types.ObjectId, 
		ref		:	'gk_groups' 
	},
	id_subgroup : {
		type	:	Schema.Types.ObjectId,
		ref		:	'gk_subgroups'
	}
});

/**
 * Tasks Schema
 */
var tasksSchema = new Schema({
	name: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	from: {
		type	:	Date,
		required:	true,
		trim	:	true
	},
	to: {
		type	:	Date,
		required:	true,
		trim	:	true
	},
	color: {
		type	:	String,
		required:	true,
		trim	:	true
	},
	id_resource : {
		type	:	Schema.Types.ObjectId, 
		required:	true,
		ref		:	'gk_resources' 
	},
	creator : {
		type	:	Schema.Types.ObjectId,
		ref		:	'gk_subgroups'
	}
});

mongoose.model('gk_groups', groupsSchema);
mongoose.model('gk_subgroups', subgroupsSchema);
mongoose.model('gk_resources', resourcesSchema);
mongoose.model('gk_tasks', tasksSchema);
