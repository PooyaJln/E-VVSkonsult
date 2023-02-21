// @ts-check
const express = require("express");

const router = express.Router();

const temperatureControllers = require("../controllers/temperatureController");

//////////////////////////////////////////////////////////////////////////
// get all temperatures
router.get("/all", temperatureControllers.getAllItems);

// create new temperature
router.post("/create", temperatureControllers.createItem);

// get a single temperature
router.get("/:temperature_id(\\d+$)", temperatureControllers.getItemInfo);

//update a temperature
router.patch("/:temperature_id(\\d+$)", temperatureControllers.updateItem);
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete a temperature
router.delete("/:temperature_id(\\d+$)", temperatureControllers.deleteItem);

/////////////////////////////////////////////////////////////////////////

module.exports = router;
