"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var CompleteTimerView = require('../views/CompleteTimer');
var template = require("../templates/Complete.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    events: {
        "click #confirm": "cancelWait",
        "click #reset": "cancelWait"
    },

    initialize: function(options) {
        _.bindAll(this, 'onWaitComplete');
        this.render();
        if (this.model.get("status") == "inprogress") {
            this.model.set({status: "waiting"});
            this.wait();            
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
        this.timerView = new CompleteTimerView({el: $("#progress", this.el), duration: duration});
        return this;
    },

    wait: function() {
        this.waitId = setTimeout(this.onWaitComplete, 5000); // Wait 10 seconds before goint to alert mode
    },

    onWaitComplete: function() {
        this.cancelWait();
        var router = new Backbone.Router();
        router.navigate("appointment/"+this.model.get("id")+"/alert", {trigger: true});
    },

    cancelWait: function() {
        clearTimeout(this.waitId);
    }

});
