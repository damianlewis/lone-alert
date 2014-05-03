"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var Vent = require('../utils/Vent');
var TimerDialView = require('../views/TimerDial');
var template = require("../templates/Reset.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    events: {
        "click #start": "onStart",
        "click #back-button": "onBack"
    },

    initialize: function(options) {
        Vent.on("Dial:Release", this.updateAdditional, this);
        this.additional = 0;
        this.render();
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        this.dialView = new TimerDialView({el: $("#additional", this.el), startTime: 0, maxTime: 15});
        return this;
    },

    updateAdditional: function(value) {
        console.log("Update additional time: " + value);
        this.additional = value;
    },

    stopListeneing: function() {
        Vent.off("Dial:Release", this.updateAdditional, this);
    },

    onStart: function() {
        this.model.set({additional: this.additional});
        this.stopListeneing();
    },

    onBack: function() {
        this.stopListeneing();
    }

});
