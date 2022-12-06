const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const connection = require('../connections/dbConnection');
// const connection = require('../connections/dbConnections');


const envelopeSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        enum: ['wall', 'window', 'door', 'ceilling', 'floor'],
        required: false
    },
    uValue: {
        type: Number,
        required: true
    },
    tempIn: {
        type: Schema.Types.ObjectId,
        ref: 'temperature',
        required: false
    },
    tempOut: {
        type: Schema.Types.ObjectId,
        ref: 'temperature',
        // type: "Decimal128",   // type: "Decimal128",//JSON output is in MongoDB extended JSON format (the $numberDecimal property
        // to convert it back use parseFloat()
        required: false
    }
}, { timestamps: true });


const EnvelopeTypeModel = mongoose.model('envelopeType', envelopeSchema)
// const EnvelopeTypeModel = connection.cmodel('envelopeType', envelopeSchema)
// let EnvelopeTypeModel = connection.appDbConnection.model('envelopeType', envelopeSchema)
module.exports = EnvelopeTypeModel
// module.exports = envelopeSchema