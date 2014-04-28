"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var AppointmentListView = require('../views/AppointmentList');
var models = require('../models/memory/appointment');
var template = require("../templates/Schedule.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function () {
        console.log("schedule initialize");
        this.appointmentList = new models.AppointmentCollection();
        console.log(this.appointmentList);
        this.appointmentList.fetch({reset: true});
        this.render();
    },

    render: function () {
        this.$el.html(template());
        this.listView = new AppointmentListView({collection: this.appointmentList, el: $(".scroller", this.el)});
        return this;
    }

});