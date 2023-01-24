const express = require('express');

const router = express.Router();

const { getAllTemperatures,
    createTemperature,
    temperatureUpdate,
    getSingleTemperature,
    deleteATemperature } = require('../controllers/temperatureDatacontroller')


router.get('/', (req, res) => {
    res.status(200).json("temperature CRUD page")
})

//////////////////////////////////////////////////////////////////////////
// get all temperatures
router.get('/temperatures', getAllTemperatures)

// create new temperature
router.post('/create-temperature', createTemperature)

// get a single temperature
router.get('/temperatures/:id', getSingleTemperature)

//update a temperature
router.patch('/temperatures/:id', temperatureUpdate)
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete a temperature
router.delete('/temperatures/:id', deleteATemperature)

/////////////////////////////////////////////////////////////////////////


module.exports = router;