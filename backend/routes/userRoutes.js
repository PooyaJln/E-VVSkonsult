const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userController");

const {
  verifyJWT,
  verifyJWT2
} = require("../middlewares/verifyJWT");

router.get("/", (req, res) => {
  res.json("users' data page");
});

//////////////////////////////////////////////////////

// create new user
router.post("/signup", userControllers.createItem);

// user login (authentication)
// router.post('/login', handleLogin)

// get all user
// router.get("/allusersVerified", verifyJWT, userControllers.getAllUsers);
router.get("/all", userControllers.getAllUsers);

// get a single user
// router.get('/get/:id', verifyJWT, getSingleUser)
// router.get("/with_verification/:id", verifyJWT, userControllers.getUser);
router.get("/:id", userControllers.getUser);

//update an user
// router.patch("/with_verification/:id", verifyJWT, userControllers.updateUser);
router.patch("/:id", userControllers.updateUser);


//delete an user
// router.delete('/delete/:id', verifyJWT, deleteUser)
// router.delete("/with_verification/:id", verifyJWT, userControllers.deleteUser);
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
