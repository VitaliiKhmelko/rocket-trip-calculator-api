const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    name: String,
    isFinished: Boolean,
    description: String,
    participators: Object
});

tripSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
tripSchema.set('toJSON', {
    virtuals: true
});

const Trip = mongoose.model('trips', tripSchema);

exports.findUnfinishedTripByAttendantName = (name) => {
    return Trip.findOne({ [`participators.${name}`]: { $exists: true }, isFinished: false })
}

exports.findById = (id) => {
    return Trip.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createTrip = (tripData) => {
    const trip = new Trip({
        ...tripData,
        isFinished: false
    });
    return trip.save();
};

exports.patchTrip = (id, tripData) => {
    return Trip.updateOne({ _id: id }, tripData);
}

exports.patchCost = (id, participatorObj) => {
    const [name, participator] = Object.entries(participatorObj)[0];

    return Trip.updateOne({ _id: id }, {
        '$push': {
            [`participators.${name}.expenses`]: { '$each': participator.expenses }
        }
    });
}