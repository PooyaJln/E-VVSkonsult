const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const wallSchema = require('./wallModel')


const roomSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    floor: {
        type: String,
        required: true,
    },
    apartment: {
        type: String,
        required: true,
    },
    temperatureIn: {
        type: Number,//JSON output is in MongoDB extended JSON format (the $numberDecimal property
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
    },
    walls: [wallSchema]


}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema)
module.exports = Room;