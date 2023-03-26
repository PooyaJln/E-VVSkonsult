const express = require("express");

const router = express.Router();

const thermalParameterControllers = require("../controllers/thermalParameterController");

//////////////////////////////////////////////////////

// show all
router.get("/:project_id/all", thermalParameterControllers.getAllItems);

// update
router.patch("/:id", thermalParameterControllers.updateItem);

module.exports = router;
