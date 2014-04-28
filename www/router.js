"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var PageSlider = require('./modules/pageslider');
var HomeView = require('./views/Home');
var ScheduleView = require('./views/Schedule');
var LocationView = require('./views/Location');
Backbone.$ = $;

var slider = new PageSlider($('body'));
var homeView = new HomeView();

module.exports = Backbone.Router.extend({
    
    routes: {
        "": "home",
        "schedule": "schedule",
        "location": "location"        
    },

    home: function() {
        slider.slidePage(homeView.$el);
    },

    schedule: function() {
        slider.slidePage(new ScheduleView().$el);
    },

    location: function() {
        slider.slidePage(new LocationView().$el);
    }

});