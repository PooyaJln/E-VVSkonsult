// require("dotenv").config();
// const mongoose = require('mongoose');

// const MONGO_URI = `${process.env.MONGO_URI}`;
// const { usersDbName, appDbName } = require('../config/databasesInfo')

// const appDbURI = `${MONGO_URI}${appDbName}`;
// const usersDbURI = `${MONGO_URI}${usersDbName}`;

// mongoose.appDbConnection = mongoose.createConnection(appDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .once('connected', () => {
//         console.log(`connected to app database ${appDbName}`)
//     })
//     .on('error', error => {
//         console.log(error)
//     })
// mongoose.usersDbConnection = mongoose.createConnection(usersDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .once('connected', () => {
//         console.log(`connected to database ${usersDbName}`)
//     })
//     .on('error', error => {
//         console.log(error)
//     })


// module.exports = mongoose 