var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Router = require('../router');
var router = new Router();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        $("body").on("click", "#back-button", function (event) {
            event.preventDefault();
            window.history.back();
        });

        $("body").on("click", "#home", function (event) {
            event.preventDefault();
            router.navigate("/", {trigger: true});
        });
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Backbone.history.start();
    },
};

app.initialize();
