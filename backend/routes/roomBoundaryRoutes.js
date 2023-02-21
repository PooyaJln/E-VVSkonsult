const express = require("express");
const router = express.Router();
const roomBoundaryControllers = require("../controllers/roomBoundaryController");

// create new roomBoundary
router.post("/create", roomBoundaryControllers.createItem);

// get a single roomBoundary with all its walls, roof, floor
router.get("/:id(\\d+$)", roomBoundaryControllers.getItemInfo);

// update a roomBoundary
router.patch("/:id", roomBoundaryControllers.updateItem);

// delete a roomBoundary
router.delete("/:id(\\d+$)", roomBoundaryControllers.deleteItem);

module.exports = router;
