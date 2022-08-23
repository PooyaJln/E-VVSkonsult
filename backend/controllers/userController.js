require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../models/userModel')
// const userDbConnections = require('../connections/userDbConnection');
// const { dbConnectModel } = require('../connections/dbConnection');


//import databses info
const { usersDbName } = require('../config/databasesInfo')

const MONGO_URI = `${process.env.MONGO_URI}`;
const URI_DB = `${MONGO_URI}${usersDbName}`;
const conn = mongoose.createConnection(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
const usersDbCollection = conn.model('user', userSchema)
// const usersDbCollection = userDbConnections()
// const usersDbCollection = dbConnectModel(usersDbName, 'user', userSchema)

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}


// get all users
const getAllUsers = async (req, res) => {
    const allUsers = await usersDbCollection.find({}).sort('email asc')
    res.status(200).json(allUsers)
}

// create new user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersDbCollection.signup(email, password)
        // create token
        const token = createToken(user._id)
        res.status(200).json({ email })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
// const createUser = async (req, res) => {
//     const { Name, email, password } = req.body;
//     if (!Name || !password || !email) {
//         return res.status(400).json({ 'message': 'username, password or email is required' })
//     }
//     const duplicate = await usersDbCollection.findOne({ email: email }) //(person => person.username === name)
//     if (duplicate) return res.status(409).json({ message: 'this email already exists' }); // conflict
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const newUser = await usersDbCollection.create({ Name, email, password: hashedPassword })
//         res.status(200).json(newUser)
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
//     //res.json({ mssg: "add new input data page" })
// }
// update an user
const userUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This user doesn't exist" })
    }
    const user = await usersDbCollection.findByIdAndUpdate(id, req.body, { new: true }) // check for error
    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

//get a single user
const getSingleUser = async (req, res) => {
    // const id = req.param.id;
    const { id } = req.params;
    // we need to validate type of the id
    if (!mongoose.isValidObjectId(id)) {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    const user = await usersDbCollection.findById(id)
    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

//delete a single user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "User was not found" })
    }
    const user = await usersDbCollection.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

//user Login
const handleLogin1 = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersDbCollection.login(email, password)
        // create token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }

}
const handleLogin = async (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json({ 'message': 'username, password or email is required' })
    }
    let foundUser = await usersDbCollection.findOne({ 'email': email });
    if (!foundUser) return res.status(401).json({ message: 'email was not found' }) // 401 Unauthorized
    //evaluate password
    const pswdMatches = await bcrypt.compare(password, foundUser.password);
    if (pswdMatches) {
        //create JWT
        const accessToken = jwt.sign({ 'username': foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({ 'username': foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
        // updating the foundUser with the refresh token
        if (!usersDbCollection.find({ refreshToken: { $exists: true } })) {
            userSchema.add({
                refreshToken: {
                    type: String,
                    required: false
                }
            })
            await foundUser.updateOne({ 'refreshToken': refreshToken })
        } else {
            await foundUser.updateOne({ 'refreshToken': refreshToken })
        }
        // res.status(200).json({ 'success': `user ${foundUser.Name} is logged in` })
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken })
    } else {
        res.status(401).json({ message: 'Unauthorized password' })
    }
}

module.exports = {
    getAllUsers,
    signupUser,
    userUpdate,
    getSingleUser,
    deleteUser,
    handleLogin
}