"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Vent = require('../utils/Vent');
var Knob = require('../modules/jquery.knob');
var template = require("../templates/ProgressTimer.hbs");
Backbone.$ = $;

var knob = new Knob($);

module.exports = Backbone.View.extend({

    initialize: function(options) {
        _.bindAll(this, 'update');
        this.duration = options.duration;
        this.startTime = options.startTime;
        this.actual = options.actual;
        this.interval = options.interval;
        this.count = this.startTime;
        this.render();
        this.$timer = this.$(".timer");
        this.$timer.knob({
            'max': this.duration,
            'width': 240,
            'height': 240,
            'readOnly': true,
            'fgColor': '#5bc0de',
            'inputColor': '#555'
        });
    },

    render: function() {
        this.$el.html(template({initialTime: this.startTime}));
        return this;
    },

    start: function() {
        this.startId = setTimeout(this.update, this.interval);
    },

    update: function() {
        this.count++;
        console.log(this.count);
        this.$timer.val(this.count).trigger("change");
        Vent.trigger("Timer:Tick", this.count);
        if (this.count >= this.duration) {
            this.completeId = setTimeout(this.onComplete, this.interval);
        } else {          
            this.counterId = setTimeout(this.update, this.interval);
        }
    },

    onComplete: function() {
        Vent.trigger("Timer:Complete");
    },

    cancel: function() {
        clearTimeout(this.startId);
        clearTimeout(this.counterId);
        clearTimeout(this.completeId);
    }

});