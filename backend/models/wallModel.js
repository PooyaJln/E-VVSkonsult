const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { windowModel, windowSchema } = require('./windowModel')
const { doorModel, doorSchema } = require('./doorModel');
const { envelopeTypeModel, envelopeSchema } = require('./envelopeTypeModel')


const wallSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    envelopeType_id: {
        type: Schema.Types.ObjectID,
        ref: 'envelopeTypeModel',
        required: true,
    },
    uValue: {
        type: "Decimal128",
        required: true
    },
    Area: {
        type: "Decimal128",
        required: true
    },
    Height: {
        type: "Decimal128",
        required: false
    },
    Width: {
        type: "Decimal128",
        required: false
    },
    hasWindow: {
        type: Boolean,
        required: false
    },
    hasDoor: {
        type: Boolean,
        required: false
    },
    windows: {
        type: [windowSchema],
        required: false
    },
    doors: {
        type: [doorSchema],
        required: false
    }

})

const wallModel = mongoose.model('wall', wallSchema)

module.exports = { wallModel, wallSchema };