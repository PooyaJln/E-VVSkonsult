require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const userSchema = require('../models/userModel')
// const connection = require('../connections/dbConnections')
// const users = connection.usersDbConnection.model('User', userSchema)
const users = require('../models/userModel')

// const accessTokenSchema = require('../models/tokenModel')
// const accessTokenCollection = connection.usersDbConnection.model('accessToken', accessTokenSchema)
const accessTokenCollection = require('../models/tokenModel')

var maxAge = 2 * 60 * 1000


const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge })
}


// get all users
const getAllUsers = async (req, res) => {
    const allUsers = await users.find({}).sort('email asc')
    res.status(200).json(allUsers)
}

// create new user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.signup(email, password)
        // create token
        const accessToken = createToken(user._id)
        await accessTokenCollection.create({ userId: user._id, accessToken })
        res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', maxAge }) // // dont forget to change it to sameSite: 'None', secure: true, under production
        res.status(200).json({ 'user id': user._id, accessToken })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//user Login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.login(email, password)
        // create token
        const accessToken = createToken(user._id)
        const tokenDoc = await accessTokenCollection.create({ userId: user._id, accessToken: accessToken })
        console.log(accessToken);
        res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', maxAge: maxAge }) // // dont forget to change it to sameSite: 'None', secure: true, under production
        res.status(200).json({ 'user id': user._id, tokenDoc })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const handleLogOut = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // the access token already doesn't exist in the cookie.

    const accessToken = cookies.jwt;
    const tokenDoc = await accessTokenCollection.findOne({ 'accessToken': accessToken });
    if (tokenDoc) {
        // delete access token from databse
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', maxAge: maxAge }) // we clear the cookie with the same condition we created it 
        await accessTokenCollection.findOneAndDelete({ accessToken })
        res.cookie('jwt', '', { maxAge: 1 }) // // dont forget to change it to sameSite: 'None', secure: true, under production
        res.status(200).json({ "message": "You logged out successfully" })
    }
}

// update an user
const userUpdate = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "This user doesn't exist" })
    }
    const user = await users.findByIdAndUpdate(id, req.body, { new: true }) // check for error
    if (!user) {
        return res.status(404).json({ error: 'No such user to update' })
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
        return res.status(404).json({ error: 'No such single user' })
    }
    const user = await users.findById(id)
    if (!user) {
        return res.status(404).json({ error: 'No such single user to fetch' })
    }
    res.status(200).json(user)
}

//delete a single user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ error: "User was not found" })
    }
    const user = await users.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({ error: 'No such user to delete' })
    }
    res.status(200).json(user)
}






module.exports = {
    getAllUsers,
    signupUser,
    userUpdate,
    getSingleUser,
    deleteUser,
    handleLogin,
    handleRefreshToken,
    handleLogOut
}