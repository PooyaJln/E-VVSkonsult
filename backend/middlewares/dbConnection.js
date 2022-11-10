require("dotenv").config();
const mongoose = require('mongoose');

const MONGO_URI = `${process.env.MONGO_URI}`;

const connToDatabase = (dbname) => {
    const URI_DB = `${MONGO_URI}${dbname}`;
    const connection = mongoose.createConnection(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    connection.once('connected', () => {
        console.log(`connected to ${dbname} database`)
    })
    connection.on('error', error => {
        console.log(error)
    })
    return connection
}
// const URI_DB = `${MONGO_URI}${projectName}`;

// const connection = mongoose.createConnection(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
// connection.once('connected', () => {
//     console.log(`connected to database ${projectName}`)
// })
// connection.on('error', error => {
//     console.log(error)
// })

// module.exports = { connection, connToDatabase };
module.exports = connToDatabase 