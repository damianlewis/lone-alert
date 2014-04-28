"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var template = require("../templates/AppointmentList.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.collection.on("reset", this.render, this);
    },

    render: function () {
        console.log(this.collection.toJSON());
        this.$el.html(template(this.collection.toJSON()));
        console.log("AppointmentList end render");
        return this;
    }

});