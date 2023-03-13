const express = require("express");

const router = express.Router();

const thermalParameterControllers = require("../controllers/thermalParameterController");

//////////////////////////////////////////////////////

// show all
router.get("/", thermalParameterControllers.getAllItems);

// update
router.patch("/:_name", thermalParameterControllers.updateItem);

module.exports = router;
