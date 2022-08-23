const mongoose = require('mongoose')
const temperatureModel = require('../models/temperatureModel');
const projDbConnections = require('../connections/projdbConnection')
// get all temperatures
const getAllTemperatures = async (req, res) => {
    const allTemperatures = await temperatureModel.find({}).sort('Name asc')
    res.status(200).json(allTemperatures)
}
// create new temperatures
const createTemperature = async (req, res) => {
    const { Name, Value } = req.body;
    try {
        const newTemperature = await temperatureModel.create({ Name, Value })
        res.status(200).json(newTemperature)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    //res.json({ mssg: "add new input data page" })
}
// update an envelope
const temperatureUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This envelope doesn't exist" })
    }
    const temperature = await temperatureModel.findByIdAndUpdate(id, req.body, { new: true }) // check for error
    if (!temperature) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(temperature)
}

//get a single envelope
const getSingleTemperature = async (req, res) => {
    // const id = req.param.id;
    const { id } = req.params;
    // we need to validate type of the id
    if (!mongoose.isValidObjectId(id)) {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    const temperature = await temperatureModel.findById(id)
    if (!temperature) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(temperature)
}

//delete a single envelope
const deleteATemperature = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "Envelope was not found" })
    }
    const temperature = await temperatureModel.findByIdAndDelete(id)
    if (!temperature) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(temperature)

}
module.exports = {
    getAllTemperatures,
    createTemperature,
    temperatureUpdate,
    getSingleTemperature,
    deleteATemperature
}