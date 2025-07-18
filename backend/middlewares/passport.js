var bcrypt = require("bcrypt")
var passport = require('passport');
var LocalStrategy = require('passport-local');
var userServices = require("../services/userServices")
var hashedPassServices = require("../services/hashedPassDbServices")

passport.use(new LocalStrategy(
    {
        usernameField: 'user_email', // Tell passport to use 'user_email' instead of 'username'
        passwordField: 'password',
    },
    async function verify(username, password, done) {
        try {
            const user = await userServices.findUserByEmail(username)
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const user_id = user.user_id
            const hashedPassRow = await hashedPassServices.findItemByID(user_id)
            const hashedPass = hashedPassRow.hashed_pass
            const match = await bcrypt.compare(password, hashedPass);
            if (match) { return done(null, user); }
            else { return done(null, false, { message: 'Incorrect password.' }); }


        } catch (error) {
            return done(error);
        }



    }));
