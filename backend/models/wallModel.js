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
// openingSchema.pre('init', function (next) {
//     if (this.Height != 0 && this.Width != 0) {
//         this.Area = this.Height * this.Width
//     }
//     next();
// })


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
        uValue: {
            type: Number,
            required: false
        },
        Area: {
            type: Number,

            required: function () {
                if (!this.Height && !this.Width) {
                    return true
                }
            }
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
);

wallSchema.pre('save', function (next) {
    if (this.Area != 0) {
        this.Area
    }
    if (this.Height != 0 && this.Width != 0) {
        this.Area = this.Height * this.Width
    }
    next();
})


const WallModel = mongoose.model('wall', wallSchema)
module.exports = { WallModel, wallSchema };