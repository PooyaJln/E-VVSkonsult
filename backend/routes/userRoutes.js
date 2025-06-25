const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userController");

const {
  verifyJWT,
  verifyJWT2,
  verifyJWT3,
  verifyJWT4,
} = require("../middlewares/verifyJWT");

router.get("/", (req, res) => {
  res.json("users' data page");
});

//////////////////////////////////////////////////////

// create new user
router.post("/signup", userControllers.createItem);

// user login (authentication)
// router.post('/login', handleLogin)
router.post("/login", userControllers.login);

// refreshToken renewal
// router.get('/refresh', handleRefreshToken)

// logout
// router.get('/logout', handleLogOut)
router.get("/logout", userControllers.logout);

// get a single user
// router.get('/get/:id', verifyJWT, getSingleUser)
router.get("/with_verification/:id", verifyJWT4, userControllers.getUser);
router.get("/:id", userControllers.getUser);

//update an user
router.patch("/with_verification/:id", verifyJWT4, userControllers.updateUser);
router.patch("/:id", userControllers.updateUser);
// (req, res) => {res.json({ mssg: "update users input data page" })})

//delete an user
// router.delete('/delete/:id', verifyJWT, deleteUser)
router.delete("/with_verification/:id", verifyJWT4, userControllers.deleteUser);
router.delete("/:id", userControllers.deleteUser);

// get all user
router.get("/allusersVerified", verifyJWT4, userControllers.getAllUsers);
router.get("/all", userControllers.getAllUsers);
// (req, res) => {res.json({ mssg: "show input data page" })})
//////////////////////////////////////////////////////////////////////////

module.exports = router;
