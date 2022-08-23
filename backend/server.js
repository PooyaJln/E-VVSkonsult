require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middlewares/logEvents')
const errorHandler = require('./middlewares/errorHandler')
const projPort = process.env.PROJPORT;

//import databses info
const { usersDbName, projDbName } = require('./config/databasesInfo')

// import routes
const inputDataRoutes = require("./routes/inputDataRoutes");
const spaceDataRoutes = require('./routes/spaceDataRoutes');
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
app.use(cookieParser());


// connect to the project database
// let projDbName = "project4";
const MONGO_URI = `${process.env.MONGO_URI}${projDbName}`;
console.log(MONGO_URI);
// const MONGO_URI = process.env.MONGO_URI;
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
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err))

// register view engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

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
// app.use("/beskrivningplus(.html)?", beskrivningPlusRoute);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

app.use(errorHandler)