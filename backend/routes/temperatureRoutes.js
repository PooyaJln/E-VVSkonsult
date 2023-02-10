// @ts-check
const express = require("express");

const router = express.Router();

const temperatureControllers = require("../controllers/temperatureController");

//////////////////////////////////////////////////////////////////////////
// get all temperatures
router.get("/", temperatureControllers.getAllItems);

// create new temperature
router.post("/create-temperature", temperatureControllers.createItem);

// get a single temperature
router.get("/:id", temperatureControllers.getSingleItem);

//update a temperature
router.patch("/:id", temperatureControllers.updateItem);
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete a temperature
router.delete("/:id", temperatureControllers.getSingleItem);

/////////////////////////////////////////////////////////////////////////

module.exports = router;
