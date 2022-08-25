const express = require('express');

const router = express.Router();

const { getAllUsers,
    signupUser,
    userUpdate,
    getSingleUser,
    deleteUser,
    handleLogin,
    handleRefreshToken,
    handleLogOut } = require('../controllers/userController')

const verifyJWT = require('../middlewares/verifyJWT')

router.get('/', (req, res) => {
    res.json({ mssg: "users' data page" })
})

//////////////////////////////////////////////////////


// create new user
router.post('/signup', signupUser)

// user login (authentication)
router.post('/login', handleLogin)

// refreshToken renewal
router.get('/refresh', handleRefreshToken)

// logout
router.get('/logout', handleLogOut)

// get a single user
router.get('/get/:id', verifyJWT, getSingleUser)

//update an user 
router.patch('/update/:id', verifyJWT, userUpdate)
// (req, res) => {res.json({ mssg: "update users input data page" })})

//delete an user
router.delete('/delete/:id', verifyJWT, deleteUser)

// get all user
router.get('/allusers', verifyJWT, getAllUsers)
// (req, res) => {res.json({ mssg: "show input data page" })})
//////////////////////////////////////////////////////////////////////////


module.exports = router;