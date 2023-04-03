const express = require("express");
const router = express.Router();
const storeyControllers = require("../controllers/storeyController");

//-----------------------------------------------------------------------

router.get("/:building_id/all", storeyControllers.getAllItems);
// create new storey
router.post("/:building_id/create", storeyControllers.createItem);

// get a single storey with all its apartments
router.get("/:storey_id(\\d+$)", storeyControllers.getItemInfo);

// update a storey
router.patch("/:storey_id", storeyControllers.updateItem);

// delete a storey
router.delete("/:storey_id(\\d+$)", storeyControllers.deleteItem);

module.exports = router;
