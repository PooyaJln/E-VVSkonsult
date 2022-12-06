const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const connection = require('../connections/dbConnection');
// const connection = require('../connections/dbConnections');

const temperatureSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const temperatureModel = mongoose.model('temperature', temperatureSchema)
// const temperatureModel = connection.model('temperature', temperatureSchema)
// const temperatureModel = connection.appDbConnection.model('temperature', temperatureSchema)
module.exports = temperatureModel
// module.exports = temperatureSchema
