const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const doorSchema = new Schema({
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

const doorModel = mongoose.model('door', doorSchema)
module.exports = { doorModel, doorSchema };