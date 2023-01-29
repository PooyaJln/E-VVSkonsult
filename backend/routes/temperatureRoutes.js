const express = require("express");

const router = express.Router();

const {
  temperatureControllers,
} = require("../controllers/temperatureDatacontroller");

// router.get('/', (req, res) => {
//     res.status(200).json("temperature CRUD page")
// })

//////////////////////////////////////////////////////////////////////////
// get all temperatures
router.get("/", temperatureControllers.getAllTemperatures);

// create new temperature
router.post("/create-temperature", temperatureControllers.createTemperature);

// get a single temperature
router.get("/:id", temperatureControllers.getSingleTemperature);

//update a temperature
router.patch("/:id", temperatureControllers.temperatureUpdate);
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete a temperature
router.delete("/:id", temperatureControllers.deleteTemperature);

/////////////////////////////////////////////////////////////////////////

module.exports = router;
