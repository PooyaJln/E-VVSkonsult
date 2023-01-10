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

// const MYSQL_HOST = `${process.env.MYSQL_HOST}`
// const MYSQL_USER = `${process.env.MYSQL_USER}`
// const MYSQL_PASSWORD = `${process.env.MYSQL_PASSWORD}`
const MYSQL_DATABASE = appDbName
const mysql = require('mysql2');

// console.log('process.env.MYSQL_HOST:', process.env.MYSQL_HOST)
// console.log('process.env.MYSQL_USER:', process.env.MYSQL_USER)
// console.log('process.env.MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD)
// console.log('process.env.MYSQL_DATABASE', process.env.MYSQL_DATABASE)
// console.log('process.env.MYSQL_PORT:', process.env.MYSQL_PORT)

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
