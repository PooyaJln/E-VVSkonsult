const express = require('express');

const router = express.Router();

const { getAllEnvelopeTypes, createEnvelopeType } = require('../controllers/inputDataController')

router.get('/', (req, res) => {
    res.json({ mssg: "Heat loss calculation page" })
})

// get all envelope types
router.get('/input-data/envelopes', getAllEnvelopeTypes)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new envelope type
router.post('/input-data/envelopes', createEnvelopeType)

// get all temperatures
router.get('/input-data/temperatures', getAllEnvelopeTypes)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new temperature
router.post('/input-data/temperatures', createEnvelopeType)

router.patch('/input-data/envelopes', (req, res) => {
    res.json({ mssg: "update envelopes input data page" })
})


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