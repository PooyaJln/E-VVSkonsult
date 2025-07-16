require("dotenv").config();
var express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');



router.post("/", passport.authenticate('local'), (req, res) => {

});

module.exports = router;

