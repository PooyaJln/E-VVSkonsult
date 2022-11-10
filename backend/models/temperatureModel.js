const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// const temperatureModel = mongoose.model('temperature', temperatureSchema)
// module.exports = { temperatureModel, temperatureSchema };
module.exports = { temperatureSchema };
