const express = require("express");

const router = express.Router();

const { materialControllers } = require("../controllers/materialController");

//////////////////////////////////////////////////////
// get all envelope types
router.get("/", materialControllers.getAllItems);
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new envelope type
router.post("/create-material", materialControllers.createItem);

// get a single envelope
router.get("/:id", materialControllers.getSingleItem);

//update an envelope
router.patch("/:id", materialControllers.updateItem);
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete an envelope
router.delete("/:id", materialControllers.deleteItem);

module.exports = router;
