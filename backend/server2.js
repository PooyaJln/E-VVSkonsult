require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const path = require("path");
const corsOptions = require('./config/corsOptions')
const { logger, logEvents } = require('./middlewares/logEvents')
const errorHandler = require('./middlewares/errorHandler')

const projPort = process.env.PROJPORT;
const MONGO_URI = `${process.env.MONGO_URI}`;

//import databses info
const { usersDbName, projDbName } = require('./config/databasesInfo')
// import required schemas
const userSchema = require('./models/userModel')

const projDbConnections = require('./connections/projdbConnection');
const userDbConnections = require('./connections/userDbConnection');
const { dbConnectColl } = require('./connections/dbConnection');

const inputDataRoutes = require("./routes/inputDataRoutes");
const spaceDataRoutes = require('./routes/spaceDataRoutes');
const userRoutes = require('./routes/userRoutes');

// const beskrivningPlusRoute = require("./routes/beskrivningPlusRoutes");

// const morgan = require('morgan');

//express app
const app = express();

//custom middleware

app.use(cors(corsOptions));

// using the custom-written request logging middleware by Dave Gray
app.use(logger);


//built-in middleware
app.use(express.json());

// middleware for cookies
app.use(cookieParser()) // is added for the refreshToken processing
// connect to the users database
// let usersDbName = "UserData";
console.log(usersDbName)
const URI_DB = `${MONGO_URI}${usersDbName}`;
mongoose.createConnection(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(projPort, () => console.log(`connected to db ${usersDbName} & listening on port ${projPort}`))

// connect to the proj database
// let projDbName = "project4";
// const URI_PROJ = `${MONGO_URI}${projDbName}`;
// mongoose.createConnection(URI_PROJ, { useNewUrlParser: true, useUnifiedTopology: true })
// app.listen(projPort, () => {
//   console.log(`connected to db ${projDbName} & listening on port ${projPort}`);
// });


// register view engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

//To be able to parse the form data we can add an optional middleware from express as below.
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

//routes
app.get("^/$|/index(.html)?", (req, res) => {
  res.render("index", { title: "Homepage" });
});

app.get("/about(.html)?", (req, res) => {
  res.render("about", { title: "About me" });
});

app.use("/heat-loss/input-data(.html)?", inputDataRoutes);
app.use("/heat-loss/spaces(.html)?", spaceDataRoutes);
app.use("/usersData(.html)?", userRoutes);
// app.use("/beskrivningplus(.html)?", beskrivningPlusRoute);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

app.use(errorHandler)

// mongoose.connection.once('open', () => {
//   app.listen(projPort, () => console.log(`connected to db ${usersDbName} & listening on port ${projPort}`))
// }
// );
// mongoose.connection.on('error', err => {
//   console.log(err)
//   logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
// })
