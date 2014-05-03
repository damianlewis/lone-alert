"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var Knob = require('../modules/jquery.knob');
var template = require("../templates/ProgressTimer.hbs");
Backbone.$ = $;

var knob = new Knob($);

module.exports = Backbone.View.extend({

    initialize: function(options) {
        this.duration = options.duration;
        this.render();
        this.$(".timer").knob({
            'max': this.duration,
            'width': 240,
            'height': 240,
            'readOnly': true,
            'fgColor': '#d9534f'
        });
    },

    render: function() {
        this.$el.html(template({initialTime: this.duration}));
        return this;
    }

});