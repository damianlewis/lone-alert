"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var AppointmentListView = require('../views/AppointmentList');
var template = require("../templates/Schedule.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function () {
        console.log("schedule initialize");
        this.render();
        this.collection.fetch({reset: true});
    },

    render: function () {
        this.$el.html(template());
        this.listView = new AppointmentListView({collection: this.collection, el: $(".scroller", this.el)});
        return this;
    }

});