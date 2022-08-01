require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT;

const heatCalcRoutes = require("./routes/heatCalcRoutes");
const beskrivningPlusRoute = require("./routes/beskrivningPlusRoutes");

// const morgan = require('morgan');

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//listen for requests
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// connect to the database
let dbname = "project4";
const MONGO_URI = `${process.env.MONGO_URI}${dbname}`;
console.log(MONGO_URI);
// const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(PORT, () => {
      console.log(`connected to db ${dbname} & listening on port ${PORT}`);
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

app.use(express.static(path.join(__dirname, "/public")));

//To be able to parse the form data we can add an optional middleware from express as below.
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

//routes
app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile('./views/index(.html)?', { root: __dirname });
  // res.sendFile(path.join({ root: __dirname }, 'views', 'index(.html)?'));
  res.render("index", { title: "Homepage" });
  // res.redirect('/index');
});

app.get("/about(.html)?", (req, res) => {
  // res.sendFile('./views/about(.html)?', { root: __dirname });
  // res.render("about");
  res.render("about", { title: "About me" });
});

app.use("/heat-loss(.html)?", heatCalcRoutes);

app.use("/beskrivningplus(.html)?", beskrivningPlusRoute);

app.use((req, res) => {
  // res.sendFile('./views/404(.html)?', {root: __dirname});
  // res.status(404).sendFile('./views/404(.html)?', {root: __dirname});
  res.status(404).render("404", { title: "404" });
});
