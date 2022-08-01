const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    temperatureName: {
        type: String,
        required: true,
    },
    temperatureValue: {
        type: "Decimal128",//JSON output is in MongoDB extended JSON format (the $numberDecimal property
        // to convert it back use parseFloat()
        required: true
    }
}, { timestamps: true });

const Temperature = mongoose.model('Temperature', temperatureSchema)
module.exports = Temperature;