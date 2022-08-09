const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const { windowModel, windowSchema } = require('./windowModel')
// const { doorModel, doorSchema } = require('./doorModel');


const wallSchema = new Schema({
    name: {
        type: String,
        required: true
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
    windows: [{
        id: {
            type: String,
            required: true
        },
        Uvalue: {
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
        }
    }],
    doors: [{
        id: {
            type: String,
            required: true
        },
        Uvalue: {
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
        }
    }]

})

const wallModel = mongoose.model('wall', wallSchema)

module.exports = { wallModel, wallSchema };