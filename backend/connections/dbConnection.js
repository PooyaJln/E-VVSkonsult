// @ts-check
"use strict";
require("dotenv").config();
const host = process.env.MYSQL_HOST
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const database = process.env.MYSQL_DATABASE
const port = Number(process.env.MYSQL_PORT)

// switching to sequelize
const { Sequelize } = require('sequelize');
const connectionString = `mysql://${user}:${password}@${host}:${port}/${database}`
const sequelize = new Sequelize(connectionString, {
  logging: (...msg) => console.log(msg),
})



//---------------------- MySQL connection
const mysql = require("mysql2");

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  port
});

let poolPromise = pool.promise();

pool.on("connection", function (connection, err) {
  if (err) {
    console.log(err);
  }
  console.log("Connection %d acquired", connection.threadId);
});

module.exports = { sequelize, pool, poolPromise };

//----------------------MongoDB connection
// const mongoose = require("mongoose");
// const MONGO_URI = `${process.env.MONGO_URI}`;
// const appDbURI = `${MONGO_URI}${appDbName}`;

// mongoose.connect(appDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log(`connected to app mongoDB database ${appDbName}`)
//     })
//     .catch(error => {
//         console.log(error)
//     })
