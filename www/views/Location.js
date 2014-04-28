"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var AppointmentListView = require('../views/AppointmentList');
var models = require('../models/memory/appointment');
var template = require("../templates/Location.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'locationSuccess', 'locationError');
        console.log("location initialize");
        this.appointmentList = new models.FilteredAppointmentCollection();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
        }
        this.render();
    },

    render: function () {
        this.$el.html(template());
        this.listView = new AppointmentListView({collection: this.appointmentList, el: $(".scroller", this.el)});
        return this;
    },

    locationSuccess: function(position) {
        this.appointmentList.fetch({reset: true, data: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
    },

    locationError: function(error) {
        console.log(error.messaga);
    }

});