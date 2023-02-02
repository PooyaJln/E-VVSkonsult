require("dotenv").config();

//////////////////////// MySQL connection
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

let poolPromise = pool.promise();

pool.on("connection", function (connection, err) {
  if (err) {
    console.log(err);
  }
  console.log("Connection %d acquired", connection.threadId);
});

module.exports = { pool, poolPromise };

///////////////////////MongoDB connection
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
