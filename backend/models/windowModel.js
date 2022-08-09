const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const windowSchema = new Schema({
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

})

const windowModel = mongoose.model('Window', windowSchema)
module.exports = { windowModel, windowSchema };