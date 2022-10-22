
const TripsModel = require('../models/trips.model');

exports.createTrip = (request, response) => {
    TripsModel.createTrip(request.body).then((result) => {
        response.status(201).send(result._id)
    })
}

exports.findById = (request, response) => {
    TripsModel.findById(request.params.id).then((result) => {
        response.status(200).send(result)
    })
};

exports.findUnfinishedTripByAttendantName = (request, response) => {
    const name = request.body.name;

    TripsModel.findUnfinishedTripByAttendantName(name).then((result) => {
        if (result) {
            response.status(200).send({ name, tripId: result._id })
        } else {
            response.status(200).send({ name })
        }
    })
}

exports.patchTrip = (request, response) => {
    TripsModel.patchTrip(request.params.id, request.body).then(() => {
        response.status(202).send({ id: request.id })
    });
}

exports.patchCost = (request, response) => {
    TripsModel.patchCost(request.params.id, request.body).then(() => {
        response.status(202).send({ id: request.id })
    })
}
