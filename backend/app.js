require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");

// import routes
const roomBoundaryRoutes = require("./routes/roomBoundaryRoutes");
const roomRoutes = require("./routes/roomRoutes");
const apartmentRoutes = require("./routes/apartmentRoutes");
const componentRoutes = require("./routes/componentRoutes");
const temperatureRoutes = require("./routes/temperatureRoutes");
const projectRoutes = require("./routes/projectRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const storeyRoutes = require("./routes/storeyRoutes");
const userRoutes = require("./routes/userRoutes");
const thermalParameterRoutes = require("./routes/thermalParameterRoutes");

// //express app
// const app = express();

// // const morgan = require('morgan');

// //custom middleware
// app.use(cors(corsOptions));

// // using the custom-written request logging middleware by Dave Gray
// // app.use(logger);

// //built-in middleware
// app.use(express.json());
// app.use(cookieParser());

// // register view engine
// app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, "public")));

// //To be able to parse the form data we can add an optional middleware from express as below.
// app.use(express.urlencoded({ extended: true }));

// //routes
// app.get("^/$|/index(.html)?", (req, res) => {
//   res.render("index", { title: "Homepage" });
// });

// app.get("/about(.html)?", (req, res) => {
//   res.render("about", { title: "About me" });
// });

// app.use("/heat-loss/components(.html)?", componentRoutes);

// app.use("/heat-loss/temperatures(.html)?", temperatureRoutes);

// app.use("/heat-loss/spaces(.html)?", spaceDataRoutes);

// app.use("/heat-loss/apartments(.html)?", apartmentRoutes);

// app.use("/heat-loss/stories(.html)?", storeyRoutes);

// app.use("/heat-loss/buildings(.html)?", buildingRoutes);

// app.use("/heat-loss/projects(.html)?", projectRoutes);

// app.use("/usersData(.html)?", userRoutes);

// app.use(errorHandler);

// app.use((req, res) => {
//   res.status(404).render("404", { title: "404" });
// });

const appFnDb = (database) => {
  //express app
  const app = express();

  // const morgan = require('morgan');

  //custom middleware
  app.use(cors(corsOptions));

  // using the custom-written request logging middleware by Dave Gray
  app.use(logger);

  //built-in middleware
  app.use(express.json());
  app.use(cookieParser());

  // register view engine
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "public")));

  //To be able to parse the form data we can add an optional middleware from express as below.
  app.use(express.urlencoded({ extended: true }));

  //routes
  app.get("^/$|/index(.html)?", (req, res) => {
    res.render("index", { title: "Homepage" });
  });

  app.get("/about(.html)?", (req, res) => {
    res.render("about", { title: "About me" });
  });
  app.use("/heat-loss/thermal-parameters(.html)?", thermalParameterRoutes);
  app.use("/heat-loss/roomBoundaries(.html)?", roomBoundaryRoutes);

  app.use("/heat-loss/components(.html)?", componentRoutes);

  app.use("/heat-loss/temperatures(.html)?", temperatureRoutes);

  app.use("/heat-loss/rooms(.html)?", roomRoutes);

  app.use("/heat-loss/apartments(.html)?", apartmentRoutes);

  app.use("/heat-loss/stories(.html)?", storeyRoutes);

  app.use("/heat-loss/buildings(.html)?", buildingRoutes);

  app.use("/heat-loss/projects(.html)?", projectRoutes);

  app.use("/user(.html)?", userRoutes);

  app.use(errorHandler);

  // app.use((req, res) => {
  //   res.status(404).render("404", { title: "404" });
  // });

  return app;
};

module.exports = { appFnDb };
