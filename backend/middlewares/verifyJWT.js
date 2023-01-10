require("dotenv").config();

const jwt = require('jsonwebtoken');
var maxAgeToken = 2 * 60 * 1000

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
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
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { maxAge: maxAgeToken }, (error, decodedToken) => {
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

const verifyJWT3 = async (req, res, next) => {
    const token = req.cookies.jwt;
    const [foundToken] = await poolPromise.query(`
                                            SELECT accessToken 
                                            FROM accessTokens 
                                            WHERE user_id = ?;
                                            `, [id]);
    if (foundToken.length) {
        const existingToken = foundToken[0].accessToken
        jwt.verify(existingToken, process.env.ACCESS_TOKEN_SECRET, { maxAge: maxAgeToken }, (error, decodedToken) => {
            if (error) return error
        })
    } else {
        return res.status(403).json({ 'message': 'no token' }) // invalid token, forbidden
    }
}

const verifyJWT4 = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        console.log("doesn't start With('Bearer')")
    }
    if (authHeader) {
        console.log(authHeader);
        const tokenAuth = authHeader.split(' ')[1];
        console.log('authHeader: ', tokenAuth);
    }

    const token = req.cookies.jwt;
    console.log('req.cookies.jwt: ', token);
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { maxAge: maxAgeToken }, (error, decodedToken) => {
            if (error) {
                console.log(error.message)
                // preferrably redirect to the login page.
                // res.redirect('/login')
                res.status(403).json({ error: error.message }) //'message': 'not a valid token',
            } // invalid token, forbidden
            else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        // preferrably redirect to the login page.
        // res.redirect('/login')
        res.status(403).json({ 'message': 'no token' }) // invalid token, forbidden
    }

}


module.exports = { verifyJWT, verifyJWT2, verifyJWT3, verifyJWT4 }