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
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        var duration = 0;
        if (this.model.get("additional") > 0) {
            duration = this.model.get("additional");
        } else {
            duration = this.model.get("duration");
        }
        this.timerView = new CompleteTimerView({el: $("#progress", this.el), duration: duration});
        return this;
    }

});
