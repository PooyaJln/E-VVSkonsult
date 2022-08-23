require("dotenv").config();
const mongoose = require('mongoose');

let userSchemas = {
    'user': '../models/userModel'
}

let userDbName = "UserData";
const MONGO_URI = `${process.env.MONGO_URI}`;
const URI = `${MONGO_URI}${userDbName}`;

const userDbConnections = function () {
    const userConn = mongoose.createConnection(URI);

    Object.entries(userSchemas).forEach(schema => {
        userConn.model(schema[0], require(schema[1]))
    })
    return userConn;
};

module.exports = userDbConnections;