"use strict";

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Vent = require('../utils/Vent');
var Shake = require('../modules/Shake');
var ProgressTimerView = require('../views/ProgressTimer');
var template = require("../templates/Progress.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    events: {
        "click #home": "cancelProgress",
        "click #finish": "cancelProgress",
        "click #alert": "cancelProgress"
    },

    initialize: function(options) {
        _.bindAll(this, 'onShake');
        Vent.on("Timer:Tick", this.timerTick, this);
        Vent.on("Timer:Complete", this.timerComplete, this);
        this.shake = new Shake();
        this.shake.startWatch(this.onShake);
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
        this.timerView = new ProgressTimerView({el: $("#progress", this.el), duration: duration, startTime: this.model.get("startTime"), interval: 1000});
        this.timerView.start();
        return this;
    },

    timerTick: function(tick) {
        var actual = this.model.get("actual");
        this.model.set({actual: actual+1});
        this.model.set({startTime: tick});
    },

    timerComplete: function() {
        this.cancelProgress();
        this.model.set({startTime: 0});
        if (navigator.notification.vibrate) {
            console.log("vibrate");
            navigator.notification.vibrate(2000);
        }
        if (navigator.notification.beep) {
            console.log("beep");
            navigator.notification.beep(2);
        }
        var router = new Backbone.Router();
        router.navigate("appointment/"+this.model.get("id")+"/complete", {trigger: true});
    },

    cancelProgress: function() {
        this.shake.stopWatch();
        this.timerView.cancel();
        Vent.off("Timer:Tick", this.timerTick, this);
        Vent.off("Timer:Complete", this.timerComplete, this);
    },

    onShake: function() {
        this.cancelProgress();
        var router = new Backbone.Router();
        router.navigate("appointment/"+this.model.get("id")+"/alert", {trigger: true});
    }

});
