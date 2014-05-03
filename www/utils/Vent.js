"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;

module.exports = _.extend({}, Backbone.Events);