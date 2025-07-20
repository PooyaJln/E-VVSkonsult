var express = require('express');
var passport = require('passport');
const router = express.Router();



router.post("/login", passport.authenticate("local"),
    (request, response, next) => {
        try {
            if (error) throw error
            response.sendStatus(200);
        } catch (error) {
            throw error
        }
        next()
    }
);

router.post("/logout", (req, res, next) => {
    if (!req.user) return res.sendStatus(401)
    if (req.isAuthenticated()) {
        req.logOut((err) => {
            if (err) return res.sendStatus(400)
            req.session.destroy()
            res.clearCookie('connect.sid')
            res.status(200).json({ message: " logged out successfully" })
        })
    }
});



router.get("/status", (req, res) => {
    return req.user ? res.status(200).json("logged in") : res.sendStatus(401)
});

module.exports = router;

