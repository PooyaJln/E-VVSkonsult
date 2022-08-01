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
    res.json({ mssg: "Heat loss calculation page" })
})

//////////////////////////////////////////////////////
// get all envelope types
router.get('/input-data/envelopes', getAllEnvelopeTypes)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new envelope type
router.post('/input-data/envelopes', createEnvelopeType)

// get a single envelope
router.get('/input-data/envelopes/:id', getSingleEnvelope)

//update an envelope 
router.patch('/input-data/envelopes/:id', envelopeUpdate)
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete an envelope
router.delete('/input-data/envelopes/:id', deleteAnEnveleope)
//////////////////////////////////////////////////////////////////////////
// get all temperatures
router.get('/input-data/temperatures', getAllTemperatures)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new temperature
router.post('/input-data/temperatures', createTemperature)

// get a single temperature
router.get('/input-data/envelopes/:id', getSingleTemperature)

//update a temperature
router.patch('/input-data/envelopes/:id', temperatureUpdate)
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//update a temperature
router.delete('/input-data/envelopes/:id', deleteATemperature)

/////////////////////////////////////////////////////////////////////////

router.get('/building-data/:id', (req, res) => {
    res.json({ mssg: "show building :id data " })
})

router.post('/building-data', (req, res) => {
    res.json({ mssg: "create new building " })
})

router.patch('/building-data/:id', (req, res) => {
    res.json({ mssg: "show building :id data " })
})


// router.get("/heat-loss(.html)?", (req, res) => {
//     // res.sendFile('./views/heat-loss(.html)?', { root: __dirname });
//     // res.render("heat-loss");
//     res.render("heat-loss", { title: "transmissionsberäkning" });
// });

module.exports = router;