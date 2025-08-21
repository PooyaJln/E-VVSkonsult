const express = require("express");
const router = express.Router();
const roomBoundaryControllers = require("../controllers/roomBoundaryController");
const roomControllers = require("../controllers/roomController");

// create new roomBoundary
router.post("/:room1_id/create", roomBoundaryControllers.createItem);

// router.get("/:room_id/all", roomControllers.getItemInfo);
router.get("/:room_id/all", roomBoundaryControllers.getAllItems);

// get a single roomBoundary with all its walls, roof, floor
router.get("/:id(\\d+$)", roomBoundaryControllers.getItemInfo);

// update a roomBoundary
router.patch("/:id", roomBoundaryControllers.updateItem);

// delete a roomBoundary
router.delete("/:id(\\d+$)", roomBoundaryControllers.deleteItem);

module.exports = router;
