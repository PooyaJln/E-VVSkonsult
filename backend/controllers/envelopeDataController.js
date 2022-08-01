const EnvelopeType = require('../models/envelopeTypeModel');

const mongoose = require('mongoose')

// get all envelope types
const getAllEnvelopeTypes = async (req, res) => {
    const allEnvelopeTypes = await EnvelopeType.find({}).sort('envelopeName asc')
    res.status(200).json(allEnvelopeTypes)
    // .sort('envelopeName asc')
}

// create new envelope type
const createEnvelopeType = async (req, res) => {
    const { envelopeName, envelopeUvalue, envelope_T_in, envelope_T_out } = req.body;
    try {
        const envelopeType = await EnvelopeType.create({ envelopeName, envelopeUvalue, envelope_T_in, envelope_T_out })
        res.status(200).json(envelopeType)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    //res.json({ mssg: "add new input data page" })
}
// update an envelope
const envelopeUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This envelope doesn't exist" })
    }
    const envelope = await EnvelopeType.findByIdAndUpdate(id, req.body)
    if (!envelope) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(envelope)
}

//get a single envelope
const getSingleEnvelope = async (req, res) => {
    // const id = req.param.id;
    const { id } = req.params;
    // we need to validate type of the id
    if (!mongoose.isValidObjectId(id)) {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    const envelope = await EnvelopeType.findById(id)
    if (!envelope) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(envelope)
}

//delete a single envelope
const deleteAnEnveleope = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "Envelope was not found" })
    }
    const envelope = await EnvelopeType.findByIdAndDelete(id)
    if (!envelope) {
        return res.status(404).json({ error: 'No such envelope' })
    }
    res.status(200).json(envelope)

}


module.exports = {
    getAllEnvelopeTypes,
    createEnvelopeType,
    envelopeUpdate,
    getSingleEnvelope,
    deleteAnEnveleope,
}