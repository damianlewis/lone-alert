"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Vent = require('../utils/Vent');
var Knob = require('../modules/jquery.knob');
var template = require("../templates/TimerDial.hbs");
Backbone.$ = $;

var knob = new Knob($);

module.exports = Backbone.View.extend({

    initialize: function(options) {
        _.bindAll(this, 'onRelease');        
        this.startTime = options.startTime;
        this.maxTime = options.maxTime;
        this.render();
        this.$(".dial").knob({
            'max': this.maxTime,
            'width': 240,
            'height': 240,
            'displayPrevious': true,
            'fgColor': '#428bca',
            'inputColor': '#555',
            'release': this.onRelease
        });
    },

    render: function() {
        this.$el.html(template({initialTime: this.startTime}));
        return this;
    },

    onRelease: function(value) {
        Vent.trigger("Dial:Release", value);
    }

});