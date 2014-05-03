"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var template = require("../templates/Alert.hbs");
Backbone.$ = $;

module.exports = Backbone.View.extend({

    initialize: function(options) {
        this.render();
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        return this;
    },

});
