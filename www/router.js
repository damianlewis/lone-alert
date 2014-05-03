"use strict";

var Backbone = require('backbone');
var $ = require('jquery');
var PageSlider = require('./modules/pageslider');
var HomeView = require('./views/Home');
var ScheduleView = require('./views/Schedule');
var LocationView = require('./views/Location');
var AppointmentView = require('./views/Appointment');
var ProgressView = require('./views/Progress');
var CompleteView = require('./views/Complete');
var ConfirmView = require('./views/Confirm');
var ResetView = require('./views/Reset');
var AlertView = require('./views/Alert');
var models = require('./models/memory/appointment');
Backbone.$ = $;

var slider = new PageSlider($('body'));
var appointmentList = new models.AppointmentCollection();

module.exports = Backbone.Router.extend({
    
    routes: {
        "": "home",
        "schedule": "schedule",
        "location": "location",
        "appointment/:id": "appointment",
        "appointment/:id/progress": "progress",
        "appointment/:id/complete": "complete",
        "appointment/:id/confirm": "confirm",
        "appointment/:id/reset": "reset",
        "appointment/:id/alert": "alert"
    },

    home: function() {
        console.log("home");
        slider.slidePage(new HomeView().$el);
    },

    schedule: function() {
        console.log("schedule");
        slider.slidePage(new ScheduleView({collection: appointmentList}).$el);
    },

    location: function() {
        console.log("location");
        slider.slidePage(new LocationView({collection: appointmentList}).$el);
    },

    appointment: function(id) {
        console.log("appointment");
        var appointment = appointmentList.get(id);
        slider.slidePage(new AppointmentView({model: appointment}).$el);
    },

    progress: function(id) {
        console.log("progress");
        var appointment = appointmentList.get(id);
        slider.slidePage(new ProgressView({model: appointment}).$el);
    },

    complete: function(id) {
        console.log("complete");
        var appointment = appointmentList.get(id);
        if (appointment.get("status") != "inprogress") {
            slider.slidePage(new CompleteView({model: appointment}).$el);
        } else {
            this.page = null;
            slider.addPage(new CompleteView({model: appointment}).$el);
        }
    },

    confirm: function(id) {
        console.log("confirm");
        var appointment = appointmentList.get(id);
        slider.slidePage(new ConfirmView({model: appointment}).$el);
    },

    reset: function(id) {
        console.log("reset");
        var appointment = appointmentList.get(id);
        slider.slidePage(new ResetView({model: appointment}).$el);
    },

    alert: function(id) {
        console.log("alert");
        var appointment = appointmentList.get(id);
        slider.slidePage(new AlertView({model: appointment}).$el);
    }

});