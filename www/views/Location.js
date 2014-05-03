"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var AppointmentListView = require('../views/AppointmentList');
var template = require("../templates/Location.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    events: {
        "click #refresh": "onRefresh"
    },

    initialize: function() {
        console.log("location initialize");
        _.bindAll(this, 'locationSuccess', 'locationError');
        this.collection.on("reset", this.filterAppointments, this);
        this.deviation = 0.02;
        this.render();
        this.getLocation();
    },

    render: function() {
        this.$el.html(template());
        return this;
    },

    getLocation: function() {
        if (navigator.geolocation) {
            console.log("geolocation active");
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
        }
    },

    locationSuccess: function(position) {
        this.searchLatitude = position.coords.latitude;
        this.searchLongitude = position.coords.longitude;
        this.collection.fetch({reset: true});
    },

    locationError: function(error) {
        console.log(error.messaga);
    },

    filterAppointments: function(collection) {
        var filtereredCollection = collection.byPosition(this.searchLatitude, this.searchLongitude, this.deviation);
        this.listView = new AppointmentListView({collection: filtereredCollection, el: $(".scroller", this.el)});
        filtereredCollection.trigger("filtered");
    },

    onRefresh: function() {
        event.preventDefault();
        this.getLocation();
    }

});