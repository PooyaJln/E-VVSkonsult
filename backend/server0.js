require("dotenv").config();
const mongoose = require("mongoose");

const projPort = process.env.PROJPORT;

//import databses info
const { projDbName } = require('./config/databasesInfo')
const app = require('./app')


// connect to the project database
const MONGO_URI = `${process.env.MONGO_URI}${projDbName}`;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //listen for requests
        app.listen(projPort, () => {
            console.log(`connected to db ${projDbName} & listening on port ${projPort}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

