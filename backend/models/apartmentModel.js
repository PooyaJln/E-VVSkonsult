const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const connection = require('../connections/dbConnection');
// const connection = require('../connections/dbConnections');

const apartmentSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    floorNr: {
        type: String,
        required: true
    },
    temperatureIn: {
        type: Schema.Types.ObjectId,
        ref: 'temperature',
        required: true
    }
})

const apartmentModel = mongoose.model('Apartment', apartmentSchema)
// const apartmentModel = connection.model('Apartment', apartmentSchema)
module.exports = apartmentModel