const express = require('express');

const router = express.Router();

const { getAllUsers,
    getAllUsersSql,
    signupUser,
    signupUserSql,
    userUpdate,
    // userUpdateSql,
    getSingleUser,
    getSingleUserSql,
    deleteUser,
    deleteUserSql,
    handleLogin,
    handleLoginSql,
    // handleRefreshToken,
    handleLogOut,
    handleLogOutSql,
} = require('../controllers/userController')

const { verifyJWT, verifyJWT2, verifyJWT3, verifyJWT4 } = require('../middlewares/verifyJWT')

router.get('/', (req, res) => {
    res.json("users' data page")
})

//////////////////////////////////////////////////////


// create new user
router.post('/signup', signupUserSql)

// user login (authentication)
// router.post('/login', handleLogin)
router.post('/login', handleLoginSql)

// refreshToken renewal
// router.get('/refresh', handleRefreshToken)

// logout
// router.get('/logout', handleLogOut)
router.get('/logout', handleLogOutSql)

// get a single user
// router.get('/get/:id', verifyJWT, getSingleUser)
router.get('/user/:id', verifyJWT4, getSingleUserSql)

//update an user 
router.patch('/user/:id', verifyJWT4, userUpdate)
// (req, res) => {res.json({ mssg: "update users input data page" })})

//delete an user
// router.delete('/delete/:id', verifyJWT, deleteUser)
router.delete('/delete/:id', deleteUserSql)

// get all user
router.get('/allusersVerified', verifyJWT4, getAllUsers)
router.get('/allusers', getAllUsersSql)
// (req, res) => {res.json({ mssg: "show input data page" })})
//////////////////////////////////////////////////////////////////////////


module.exports = router;