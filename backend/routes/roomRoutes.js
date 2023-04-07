const express = require("express");
const router = express.Router();
const roomControllers = require("../controllers/roomController");

// create new room
router.post("/create", roomControllers.createItem);

router.get("/:apartment_id/all", roomControllers.getAllItems);

// get a single room with all its walls, roof, floor
router.get("/:room_id(\\d+$)", roomControllers.getItemInfo);

// update a room
router.patch("/:room_id", roomControllers.updateItem);

// delete a room
router.delete("/:room_id(\\d+$)", roomControllers.deleteItem);

module.exports = router;
