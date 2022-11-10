const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { temperatureSchema } = require('./temperatureModel')

const apartmentSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    floorNr: {
        type: String,
        required: true
    }
})

// const Apartment = mongoose.model('apartment', apartmentSchema)

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
    temperatureIn: {
        type: Schema.Types.ObjectId,
        ref: 'temperature',
        required: true
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

// const Room = mongoose.model('Room', roomSchema)
// module.exports = { Room, apartmentSchema, roomSchema };
module.exports = { apartmentSchema, roomSchema };