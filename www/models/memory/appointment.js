"use strict";

var Backbone = require('backbone');
var $ = require('jquery');

var appointments = [
    {"id": 1, "firstName": "Damian", "lastName": "Lewis", "address": "123 Market St", "city": "Hemel Hempstead", "Region": "Herts", "postCode": "HP12 4GH", "latitude": 51.7140143, "longitude": -0.3340304, "date": "2014-04-28", "time": "10:00", "duration": "45"},
    {"id": 2, "firstName": "Freya", "lastName": "Lewis", "address": "54 High St", "city": "St Albans", "Region": "Herts", "postCode": "AL1 4DF", "latitude": 37.785868, "longitude": -122.4064973, "date": "2014-04-28", "time": "11:00", "duration": "45"},
    {"id": 3, "firstName": "Thoms", "lastName": "Lewis", "address": "78 Station Rd", "city": "Hatfield", "Region": "Herts", "postCode": "AL10 6GH", "latitude": 53.7140143, "longitude": -0.5340304, "date": "2014-04-28", "time": "12:00", "duration": "45"},
];

var findById = function (id) {
    var deferred = $.Deferred();
    var appointment = null;
    var l = appointments.length;
    var i;

    for (i = 0; i < l; i = i + 1) {
        if (appointments[i].id === id) {
            appointment = appointments[i];
            break;
        }
    }

    deferred.resolve(appointment);
    return deferred.promise();
};

var findByPosition = function (searchLatitude, searchLongitude) {
    var threshold = 0.02;
    var deferred = $.Deferred();
    var results = appointments.filter(function (element) {
        var latitude = element.latitude;
        var longitude = element.longitude;
        if (searchLatitude >= latitude-threshold && searchLatitude <= latitude+threshold) {
            if (searchLongitude >= longitude-threshold && searchLongitude <= longitude+threshold) {
                return true;
            }
        }
    });

    console.log(JSON.stringify(results));
    deferred.resolve(results);
    return deferred.promise();
};

var getAll = function () {
    var deferred = $.Deferred();
    var results = appointments;

    console.log(JSON.stringify(results));
    deferred.resolve(results);
    return deferred.promise();
};

var Appointment = Backbone.Model.extend({

    sync: function (method, model, options) {
        if (method === "read") {
            findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }

});

var AppointmentCollection = Backbone.Collection.extend({

    model: Appointment,

    sync: function (method, model, options) {
        if (method === "read") {
            getAll().done(function(data) {
                options.success(data);
            });
        }
    }

});

var FilteredAppointmentCollection = Backbone.Collection.extend({

    model: Appointment,

    sync: function (method, model, options) {
        if (method === "read") {
            findByPosition(parseFloat(options.data.latitude), parseFloat(options.data.longitude)).done(function(data) {
                options.success(data);
            });
        }
    }

});

Backbone.$ = $;

module.exports = {
    Appointment: Appointment,
    AppointmentCollection: AppointmentCollection,
    FilteredAppointmentCollection: FilteredAppointmentCollection
};