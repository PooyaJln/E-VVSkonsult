require("dotenv").config();
const mongoose = require("mongoose");
const mysql = require('mysql2');

const MONGO_URI = `${process.env.MONGO_URI}`;
const { appDbName } = require('../config/databasesInfo')
const appDbURI = `${MONGO_URI}${appDbName}`;

const MYSQL_HOST = `${process.env.MYSQL_HOST}`
const MYSQL_USER = `${process.env.MYSQL_USER}`
const MYSQL_PASSWORD = `${process.env.MYSQL_PASSWORD}`
const MYSQL_DATABASE = appDbName

mongoose.connect(appDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`connected to app database ${appDbName}`)
    })
    .catch(error => {
        console.log(error)
    })

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
})
let poolPromise = pool.promise();

pool.on('connection', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

module.exports = { pool, poolPromise }
