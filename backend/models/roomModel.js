const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const connection = require('../connections/dbConnection');
// const connection = require('../connections/dbConnections');

const roomSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    apartment: {
        type: Schema.Types.ObjectId,
        ref: 'apartment',
        required: true,
    },
    roofArea: {
        type: Number,
        required: true
    },
    floorArea: {
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
    }

    // walls: [wallSchema]
    // walls: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     uValue: {
    //         type: "Decimal128",
    //         required: true
    //     },
    //     Area: {
    //         type: "Decimal128",
    //         required: true
    //     },
    //     Height: {
    //         type: "Decimal128",
    //         required: false
    //     },
    //     Width: {
    //         type: "Decimal128",
    //         required: false
    //     },
    //     hasWindow: {
    //         type: Boolean,
    //         required: false
    //     },
    //     hasDoor: {
    //         type: Boolean,
    //         required: false
    //     }
    // }]


}, { timestamps: true });

const roomModel = mongoose.model('Room', roomSchema)
// const roomModel = connection.model('Room', roomSchema)
// // const roomModel = connection.appDbConnection.model('Room', roomSchema)
module.exports = roomModel
// module.exports = roomSchema