const TripsController = require('./controllers/trips.controller');

exports.routesConfig = function (app) {
    app.post('/login', [
        TripsController.findUnfinishedTripByAttendantName
    ]);

    app.get('/trips/:id', [
        TripsController.findById
    ]);

    app.put('/trips/', [
        TripsController.createTrip
    ]);

    app.patch('/trips/:id/participators/', [
        TripsController.patchCost
    ]);

    app.patch('/trips/:id', [
        TripsController.patchTrip
    ]);


};
