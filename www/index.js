var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Router = require('./router');
var router = new Router();

Backbone.history.start();