const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Room } = require('./roomModel')
const { EnvelopeType } = require('./envelopeTypeModel')

const openingSchema = new Schema(
    {
        index: {
            type: String,
            required: true
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
            required: true,
            // required: [true, function () {
            //     if (this.Height != 0 && this.Width != 0) {
            //         return this.Height * this.Width
            //     }
            // }]
        }
    }
)


// const Opening = mongoose.model('opening', openingSchema)

const wallSchema = new Schema(
    {
        index: {
            type: String,
            required: true
        },
        Room: {
            type: Schema.Types.ObjectId,
            ref: 'room',
            required: true
        },
        envelopeType: {
            type: Schema.Types.ObjectId,
            ref: 'envelopeType',
            required: true
        },
        // uValue: {
        //     type: Number,
        //     required: false
        // },
        Area: {
            type: Number,
            required: true,
            // required: [true, function () {
            //     if (this.Height != 0 && this.Width != 0) {
            //         let openingArea = 0;
            //         for (let opening of this.openings) {
            //             openingArea += opening.Area
            //         }
            //         return this.Height * this.Width - openingArea
            //     }
            // }]
        },
        Height: {
            type: Number,
            required: false
        },
        Width: {
            type: Number,
            required: false
        },
        openings: {
            type: [openingSchema],
            required: false
        },
        heatLoss: {
            type: "Decimal128",
            required: false
        }

    },
)

const WallModel = mongoose.model('wall', wallSchema)
module.exports = { WallModel, wallSchema };