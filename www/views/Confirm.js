"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var template = require("../templates/Confirm.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    events: {
        "click #home": "onConfirm"
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(template(this.model.attributes));
        return this;
    },

    onConfirm: function() {
        this.model.set({status: "complete"});
        this.model.save();
    }

});
