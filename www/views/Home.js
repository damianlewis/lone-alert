"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var template = require("../templates/Home.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function () {
        console.log("home initialize");
        this.render();
    },

    render: function () {
        this.$el.append(template({name:"Damian"}));
        return this;
    }

});