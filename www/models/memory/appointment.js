"use strict";

var Backbone = require('backbone');
var $ = require('jquery');

var appointments = [
    {"id": 1, "firstName": "Damian", "lastName": "Lewis", "address": "123 Market St", "city": "Hemel Hempstead", "county": "Herts", "postCode": "HP12 4GH", "latitude": 51.7140143, "longitude": -0.3340304, "date": "2014-04-28", "time": "10:00", "duration": 3, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 2, "firstName": "Freya", "lastName": "Lewis", "address": "54 High St", "city": "St Albans", "county": "Herts", "postCode": "AL1 4DF", "latitude": 37.785868, "longitude": -122.4064973, "date": "2014-04-28", "time": "11:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 3, "firstName": "Thoms", "lastName": "Lewis", "address": "78 Station Rd", "city": "Hatfield", "county": "Herts", "postCode": "AL10 6GH", "latitude": 53.7140143, "longitude": -0.5340304, "date": "2014-04-28", "time": "12:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
];

var getAll = function() {
    var deferred = $.Deferred();
    var results = appointments;

    deferred.resolve(results);
    return deferred.promise();
};

var Appointment = Backbone.Model.extend({

});

var AppointmentCollection = Backbone.Collection.extend({

    model: Appointment,

    sync: function(method, model, options) {
        if (method === "read") {
            getAll().done(function (data) {
                options.success(data);
            });
        }
    },

    byPosition: function(searchLatitude, searchLongitude, deviation) {
        var filtered = this.filter(function (appointment) {
            var latitude = appointment.get("latitude");
            var longitude = appointment.get("longitude");
            return (searchLatitude >= latitude-deviation && searchLatitude <= latitude+deviation && searchLongitude >= longitude-deviation && searchLongitude <= longitude+deviation);
        });

        return new AppointmentCollection(filtered);
    }

});

Backbone.$ = $;

module.exports = {
    Appointment: Appointment,
    AppointmentCollection: AppointmentCollection
};