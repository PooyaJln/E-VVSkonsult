var express = require('express');
var passport = require('passport');
const router = express.Router();



router.post("/", passport.authenticate('local'), (req, res) => {
    try {
        console.log("🚀 ~ authRoutes.js:8 ~ router.post(/auth)", req.body)

        res.status(200).json({ user: req.user })
    } catch (error) {
        console.log("🚀 ~ authRoutes.js:13 ~ router.post ~ error=", error)
        console.error(error)
    }
});
router.get("/status", (req, res) => {
    console.log("inside /auth/status")
    console.log(req.user)
    console.log(req.session)
    return req.user ? res.send(req.user) : res.sendStatus(401)
});

module.exports = router;

