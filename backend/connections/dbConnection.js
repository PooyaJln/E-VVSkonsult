require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = `${process.env.MONGO_URI}`;
// let schemaList = [
//     ['user', '../models/userModel']
// ]


const dbConnectModel = function (db, collname, schema) {
    const URI = `${MONGO_URI}${db}`;
    const conn = mongoose.createConnection(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    const model = conn.model(collname, schema)
    return model
}

const dbConnect = function (db, schemaList) {
    const URI = `${MONGO_URI}${db}`;
    const conn = mongoose.createConnection(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    schemaList.forEach(schema => {
        conn.model(schema[0], require(schema[1]))
    })

    // console.log(`db ${db} is connected`)
    return conn
}


module.exports = { dbConnectModel, dbConnect };