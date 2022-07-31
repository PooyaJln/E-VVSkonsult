const { EnvelopeType } = require('../models/envelopeTypeModel');
const { Temperature } = require('../models/temperatureModel');
const mongoose = require('mongoose')

// get all envelope types
const getAllEnvelopeTypes = async (req, res) => {
    const allEnvelopeTypes = await EnvelopeType.find({}).sort('envelopeName asc')
}

// create new envelope type
const createEnvelopeType = async (req, res) => {
    const { envelopeName, envelopeUvalue, envelope_T_in, envelope_T_out } = req.body;
    try {
        const envelopeType = await EnvelopeType.create({ envelopeName, envelopeUvalue, envelope_T_in, envelope_T_out })
        res.status(200).json(envelopeType)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    //res.json({ mssg: "add new input data page" })
}


////////////////////////////////////////////////////////////
// get all temperatures
const getAllTemperatures = async (req, res) => {
    const allTemperatures = await Temperature.find({}).sort('temperatureName asc')
}
// create new envelope type
const createTemperature = async (req, res) => {
    const { temperatureName, temperature } = req.body;
    try {
        const temperature = await Temperature.create({ temperatureName, temperature })
        res.status(200).json(temperature)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    //res.json({ mssg: "add new input data page" })
}
module.exports = { getAllEnvelopeTypes, createEnvelopeType, getAllTemperatures, createTemperature }