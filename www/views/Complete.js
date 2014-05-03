"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var CompleteTimerView = require('../views/CompleteTimer');
var template = require("../templates/Complete.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function(options) {
        this.router = options.router;
        this.render();
        if (navigator.vibrate) {
            console.log("vibrate");
            navigator.vibrate(2000);
        }
        if (navigator.beep) {
            console.log("beep");
            navigator.beep(2);
        }
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        var duration = 0;
        if (this.model.get("additional") > 0) {
            duration = this.model.get("additional");
        } else {
            duration = this.model.get("duration");
        }
        this.timerView = new CompleteTimerView({el: $("#progress", this.el), model: this.model, duration: duration});
        return this;
    }

});
