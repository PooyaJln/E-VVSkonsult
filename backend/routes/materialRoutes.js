const express = require("express");

const router = express.Router();

const { materialControllers } = require("../controllers/materialController");

//////////////////////////////////////////////////////
// get all envelope types
router.get("/", materialControllers.getAllMaterials);
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new envelope type
router.post("/create-material", materialControllers.createMaterial);

// get a single envelope
router.get("/:id", materialControllers.getMaterial);

//update an envelope
router.patch("/:id", materialControllers.updateMaterial);
// (req, res) => {res.json({ mssg: "update envelopes input data page" })})

//delete an envelope
router.delete("/:id", materialControllers.deleteMaterial);

module.exports = router;
