"use strict";

var Backbone = require('backbone');
var $ = require('jquery');

var appointments = [
    {"id": 1, "firstName": "Damian", "lastName": "Lewis", "address": "59 Radlett Rd", "city": "St Albans", "county": "Herts", "postCode": "AL2 2JX", "latitude": 51.714014, "longitude": -0.334030, "date": "2014-04-28", "time": "10:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 2, "firstName": "Louise", "lastName": "Khan", "address": "96 St Andrews Lane", "city": "Daglingworth", "county": "Herts", "postCode": "GL7 4NW", "latitude": 51.478395, "longitude": -1.686164, "date": "2014-04-28", "time": "11:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 3, "firstName": "Rosie", "lastName": "Little", "address": "763 Warren St", "city": "West Glen", "county": "Herts", "postCode": "PA21 4GA", "latitude": 55.964751, "longitude": -5.223464, "date": "2014-04-28", "time": "12:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 4, "firstName": "Amy", "lastName": "McDonald", "address": "48 Bullwood Rd", "city": "St George's", "county": "Herts", "postCode": "CF5 6DZ", "latitude": 51.519193, "longitude": -3.303795, "date": "2014-04-28", "time": "13:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 5, "firstName": "Jude", "lastName": "Lambert", "address": "78 Monks Way", "city": "Tong Norton", "county": "Herts", "postCode": "TF11 9XY", "latitude": 52.382165, "longitude": -2.514461, "date": "2014-04-28", "time": "14:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
    {"id": 6, "firstName": "Lucas", "lastName": "Rowe", "address": "83 Peachfield Road", "city": "Cefneithin", "county": "Herts", "postCode": "SA14 7XL", "latitude": 51.647175, "longitude": -3.783235, "date": "2014-04-28", "time": "15:00", "duration": 45, "startTime": 0, "actual": 0, "additional": 0, "status": "booked"},
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