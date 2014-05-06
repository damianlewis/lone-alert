"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var template = require("../templates/Alert.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    events: {
        "click #back-button": "cancel"
    },

    initialize: function(options) {
        console.log("alert initialize");
        _.bindAll(this, 'locationSuccess', 'locationError', 'update');
        this.render();
        this.startTracking();
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        return this;
    },

    startTracking: function() {
        this.update();
    },

    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
        }
    },

    update: function() {
        this.getLocation();
        this.trackingId = setTimeout(this.update, 10000); // Track every 10 seconds
    },

    broadcastLocation: function(position) {
        console.log("Device tracked to latitude " + position.coords.latitude + " longitude " + position.coords.longitude + " on " + position.timestamp);
    },

    locationSuccess: function(position) {
        this.broadcastLocation(position);
    },

    locationError: function(error) {
        console.log(error.messaga);
    },

    cancel: function() {
        clearTimeout(this.trackingId);
    }

});
