const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    floorPlan: {
        type: String,
        required: true,
    },
    roomName: {
        type: String,
        required: true,
    },
    temperatureIn: {
        type: "Decimal128",//JSON output is in MongoDB extended JSON format (the $numberDecimal property
        // to convert it back use parseFloat()
        required: true
    },
    roofArea: {
        type: Number,
        required: true
    },
    floor_0_1_Area: {
        type: Number,
        required: false
    },
    floor_1_5_Area: {
        type: Number,
        required: false
    },
    floorArea: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema)
module.exports = Room;