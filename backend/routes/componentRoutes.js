const express = require("express");

const router = express.Router();

const componentControllers = require("../controllers/componentController");

//////////////////////////////////////////////////////
// get all envelope types
router.get("/:project_id/all", componentControllers.getAllItems);

// create new envelope type
router.post("/:project_id/create", componentControllers.createItem);

// get a single envelope
router.get("/:component_id(\\d+$)", componentControllers.getItemInfo);

//update an envelope
router.patch("/:component_id(\\d+$)", componentControllers.updateItem);

//delete an envelope
router.delete("/:component_id(\\d+$)", componentControllers.deleteItem);

module.exports = router;
