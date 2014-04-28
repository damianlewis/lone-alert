var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Router = require('./router');
var router = new Router();

$("body").on("click", ".back-button", function (event) {
    event.preventDefault();
    window.history.back();
});

Backbone.history.start();