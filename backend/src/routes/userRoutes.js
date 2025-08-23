const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userController");
const userAuthorization = require("../middlewares/userAuthorization")

// get all user
router.get("/all", userAuthorization.adminAuth, userControllers.getAllUsers);

// get a single user
router.get("/profile", userControllers.getUser);

//update an user
router.patch("/:id", userControllers.updateUser);

//delete an user
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
