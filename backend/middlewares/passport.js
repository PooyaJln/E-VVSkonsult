var passport = require('passport');
var LocalStrategy = require('passport-local');

var db = require("../models")

passport.use(new LocalStrategy(
    function verify(username, password, done) {

    }));
