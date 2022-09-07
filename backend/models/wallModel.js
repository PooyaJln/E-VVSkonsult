const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Room } = require('./roomModel')
const { EnvelopeType } = require('./envelopeTypeModel');
const { temperatureModel } = require('./temperatureModel');

const openingSchema = new Schema(
    {
        index: {
            type: String,
            required: true
        },
        envelopeType: {
            type: Schema.Types.ObjectId,
            ref: 'envelopeType',
            required: false
        },
        Height: {
            type: Number,
            required: false
        },
        Width: {
            type: Number,
            required: false
        },
        Area: {
            type: Number,
            required: false
        },
        uValue: {
            type: Number,
            required: false
        },
        temperatureIn: {
            type: Number,
            required: false
        },
        temperatureOut: {
            type: Number,
            required: true
        },
        heatLoss: {
            type: "Decimal128",
            required: false
        },
        Room: {
            type: Schema.Types.ObjectId,
            ref: 'room',
            required: false
        },
    }
)
openingSchema.pre('save', function (next) {
    if (!this.Area) {
        this.Area = this.Height * this.Width
    }
    this.heatLoss = this.Area * this.uValue
    next();
})


// const Opening = mongoose.model('opening', openingSchema)

const wallSchema = new Schema(
    {
        index: {
            type: String,
            required: true
        },
        envelopeType: {
            type: Schema.Types.ObjectId,
            ref: 'envelopeType',
            required: false
        },
        uValue: {
            type: Number,
            required: false
        },
        Height: {
            type: Number,
            required: false
        },
        Width: {
            type: Number,
            required: false
        },
        Area: {
            type: Number,
            required: false
        },
        openings: {
            type: [openingSchema],
            required: false
        },
        netArea: {
            type: Number,
            required: false
        },
        temperatureIn: {
            type: Number,
            required: false
        },
        temperatureOut: {
            type: Number,
            required: false
        },
        heatLoss: {
            type: "Decimal128",
            required: false
        }

    },
);

wallSchema.pre('save', async function (next) {
    let openingsArea = 0;
    const fetchedRoom = await Room.findById({ _id: this.Room })
    const temperatureInId = fetchedRoom.temperatureIn
    const temperatureInDoc = await temperatureModel.findById({ _id: temperatureInId })
    this.temperatureIn = temperatureInDoc.Value
    this.openings.forEach(element => {
        openingsArea += element.Area
    });
    if (!this.Area) {
        this.netArea = this.Height * this.Width - openingsArea
    } else {
        this.netArea = this.Area - openingsArea
    }
    this.heatLoss = this.netArea * this.uValue * (this.temperatureIn - this.temperatureOut)
    next();
})





const WallModel = mongoose.model('wall', wallSchema)
module.exports = { WallModel, wallSchema };