const express = require("express");
const router = express.Router();
const apartmentControllers = require("../controllers/apartmentController");

//-----------------------------------------------------------------------

// create new apartment
router.post("/create", apartmentControllers.createItem);

// get a single apartment with all its rooms
router.get("/:apartment_id(\\d+$)", apartmentControllers.getItemInfo);

// update a apartment
router.patch("/:apartment_id", apartmentControllers.updateItem);

// delete a apartment
router.delete("/:apartment_id(\\d+$)", apartmentControllers.deleteItem);

module.exports = router;
