require("dotenv").config();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = require('../models/userModel')

const { usersDbName } = require('../config/databasesInfo')

const MONGO_URI = `${process.env.MONGO_URI}`;
const URI_DB = `${MONGO_URI}${usersDbName}`;
const conn = mongoose.createConnection(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
const usersDbCollection = conn.model('user', userSchema)

const handleRefreshToken = (req, res) => {
    const cookie = req.cookie;
    if (!cookie?.jwt) return res.sendStatus(401) // optional checking. it first checks if we have any cookie and if there is it checks if it has jwt property
    console.log(cookie.jwt)
    const refreshToken = cookie.jwt
    let foundUser = await usersDbCollection.findOne({ 'refreshtoken': refreshToken });
    if (!foundUser) return res.status(403).json({ message: 'refreshToken was not found' }) // 401 Unauthorized

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "email": decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }