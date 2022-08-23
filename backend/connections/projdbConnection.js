require("dotenv").config();
const mongoose = require('mongoose');

let projSchemas = {
    'temperature': '../models/temperatureModel',
    'envelopeType': '../models/envelopeTypeModel',
    'room': '../models/roomModel',
    'apartment': '../models/apartmentModel',
    'wall': '../models/wallModel',
}

let projDbName = "project4";
const MONGO_URI = `${process.env.MONGO_URI}`;
const URI = `${MONGO_URI}${projDbName}`;

function projDbConnections() {
    const projConn = mongoose.createConnection(URI);

    Object.entries(projSchemas).forEach(schema => {
        projConn.model(schema[0], require(schema[1]))
    })
    return projConn;
};

module.exports = projDbConnections;