const express = require("express");

const router = express.Router();

const buildingControllers = require("../controllers/buildingController");

// const { getProjectsBuildingsSql } = require('../controllers/projectController')

//////////////////////////////////////////////////////

// create new bulding
router.post("/create", buildingControllers.createItem);

// get a single building
router.get("/:building_id(\\d+$)", buildingControllers.getItemInfo);

// update a building
router.patch("/:building_id(\\d+$)", buildingControllers.updateItem);

// delete a building
router.delete("/:building_id(\\d+$)", buildingControllers.deleteItem);

module.exports = router;
