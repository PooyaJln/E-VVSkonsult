require("dotenv").config();

const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'unauthorized' })
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403) // invalid token, forbidden
        req.email = decoded.email; // decoded.email
        next();
    })
}

const verifyJWT2 = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
            if (error) {
                console.log(error.message)
                res.status(403).json({ error: error.message }) //'message': 'not a valid token',
            } // invalid token, forbidden
            else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        return res.status(403).json({ 'message': 'no token' }) // invalid token, forbidden
    }

}

module.exports = { verifyJWT, verifyJWT2 }