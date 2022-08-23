require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({ message: 'unauthorized' })
    console.log(authHeader);
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403) // invalid token, forbidden
        req.user = decoded.usernam;
        next();
    })
}

module.exports = verifyJWT