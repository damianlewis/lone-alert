"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var PageSlider = require('./modules/pageslider');
var HomeView = require('./views/Home');
Backbone.$ = $;

var slider = new PageSlider($('body'));
var homeView = new HomeView();

module.exports = Backbone.Router.extend({
    
    routes: {
        "": "home",
    },

    home: function () {
        slider.slidePage(homeView.$el);
    }

});