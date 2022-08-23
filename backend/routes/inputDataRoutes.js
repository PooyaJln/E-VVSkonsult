const express = require('express');

const router = express.Router();

const { getAllEnvelopeTypes,
    createEnvelopeType,
    envelopeUpdate,
    getSingleEnvelope,
    deleteAnEnveleope } = require('../controllers/envelopeDataController')

const { getAllTemperatures,
    createTemperature,
    temperatureUpdate,
    getSingleTemperature,
    deleteATemperature } = require('../controllers/temperatureDatacontroller')


router.get('/', (req, res) => {
    res.json({ mssg: "input data page" })
})

//////////////////////////////////////////////////////
// get all envelope types
router.get('/envelopes', getAllEnvelopeTypes)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new envelope type
router.post('/envelopes', createEnvelopeType)

// get a single envelope
router.get('/envelopes/:id', getSingleEnvelope)

//update an envelope 
router.patch('/envelopes/:id', envelopeUpdate)
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete an envelope
router.delete('/envelopes/:id', deleteAnEnveleope)
//////////////////////////////////////////////////////////////////////////
// get all temperatures
router.get('/temperatures', getAllTemperatures)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new temperature
router.post('/temperatures', createTemperature)

// get a single temperature
router.get('/temperatures/:id', getSingleTemperature)

//update a temperature
router.patch('/temperatures/:id', temperatureUpdate)
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete a temperature
router.delete('/temperatures/:id', deleteATemperature)

/////////////////////////////////////////////////////////////////////////


module.exports = router;