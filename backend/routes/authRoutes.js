var express = require('express');
var passport = require('passport');
const router = express.Router();



router.post("/", passport.authenticate('local', { session: false }), (req, res) => {

    console.log(req.body)
    res.status(200).json({ user: req.user })
});

module.exports = router;

