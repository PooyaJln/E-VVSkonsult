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

router.route('/envelopes')
    .get(getAllEnvelopeTypes)
    .post(createEnvelopeType);

router.route('/envelopes/:id')
    .get(getSingleEnvelope)
    .patch(envelopeUpdate)
    .delete(deleteAnEnveleope)

