const express = require('express');

const router = express.Router();

const { getAllUsers,
    signupUser,
    userUpdate,
    getSingleUser,
    deleteUser,
    handleLogin } = require('../controllers/userController')

const verifyJWT = require('../middlewares/verifyJWT')

router.get('/', (req, res) => {
    res.json({ mssg: "users' data page" })
})

//////////////////////////////////////////////////////
// get all user
router.get('/users', getAllUsers)
// (req, res) => {res.json({ mssg: "show input data page" })})

// create new user
router.post('/users/signup', signupUser)

// get a single user
router.get('/users/:id', getSingleUser)

//update an user 
router.patch('/users/:id', verifyJWT, userUpdate)
// (req, res) => {res.json({ mssg: "update users input data page" })})

//delete an user
router.delete('/users/:id', deleteUser)

// user login
router.post('/users/login', handleLogin)
//////////////////////////////////////////////////////////////////////////


module.exports = router;