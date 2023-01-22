require("dotenv").config();
// const mongoose = require("mongoose");
const { appDbName, mysqlConfig } = require('../config/db.config')
// const MONGO_URI = `${process.env.MONGO_URI}`;
// const appDbURI = `${MONGO_URI}${appDbName}`;

// mongoose.connect(appDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log(`connected to app mongoDB database ${appDbName}`)
//     })
//     .catch(error => {
//         console.log(error)
//     })


const MYSQL_DATABASE = appDbName
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
})
// const pool = mysql.createPool(mysqlConfig)
let poolPromise = pool.promise();

pool.on('connection', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});



module.exports = { pool, poolPromise }
