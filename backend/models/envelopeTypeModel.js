const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const { temperatureModel, temperatureSchema } = require('./temperatureModel');

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

// const EnvelopeType = mongoose.model('envelopeType', envelopeSchema)
// module.exports = { EnvelopeType, envelopeSchema };
module.exports = { envelopeSchema };