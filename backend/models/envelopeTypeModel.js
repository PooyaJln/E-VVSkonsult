const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const envelopeSchema = new Schema({
    envelopeName: {
        type: String,
        required: true,
    },
    envelopeUvalue: {
        type: Number,
        required: true
    },
    envelope_T_in: {
        type: "Decimal128",//JSON output is in MongoDB extended JSON format (the $numberDecimal property
        // to convert it back use parseFloat()
        required: false
    },
    envelope_T_out: {
        type: "Decimal128",
        required: false
    }
}, { timestamps: true });

const EnvelopeType = mongoose.model('EnvelopeType', envelopeSchema)
module.exports = { EnvelopeType };