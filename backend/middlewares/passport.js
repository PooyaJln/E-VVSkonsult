const bcrypt = require("bcrypt")
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userServices = require("../services/userServices")
const hashedPassServices = require("../services/hashedPassDbServices")
const errors = require("../utils/errors");
const userDbServices = require("../services/userDbServices");

passport.serializeUser((user, done) => {
    console.log("🚀 ~ passport.js:10 ~ passport.serializeUser")
    console.log("🚀 ~ passport.js:11 ~ passport.serializeUser ~ user=", user)
    done(null, user.user_id)
})
passport.deserializeUser(async (user_id, done) => {
    console.log("🚀 ~ passport.js:15 ~ passport.deserializeUser ")
    console.log("🚀 ~ passport.js:16 ~ passport.deserializeUser ~ user_id=", user_id)
    try {
        const user = await userDbServices.findItemByID(user_id)
        if (!user) throw new errors.badRequestError("User not found")
        done(null, user);
    } catch (error) {
        done(error, null);

    }
})

module.exports = passport.use(
    new LocalStrategy(
        {
            usernameField: 'user_email', // Tell passport to use 'user_email' instead of 'username'
            passwordField: 'password',
        },
        async function verify(username, password, done) {
            console.log("🚀 ~ passport.js:34 ~ verify ~ username=", username)
            console.log("🚀 ~ passport.js:34 ~ verify ~ password=", password)
            try {
                const user = await userServices.findUserByEmail(username)
                if (!user) {
                    // return done(null, false, { message: 'Incorrect email.' });
                    throw new errors.badRequestError("User not found")
                }
                const user_id = user.user_id
                const hashedPassRow = await hashedPassServices.findItemByID(user_id)
                const hashedPass = hashedPassRow.hashed_pass
                const match = await bcrypt.compare(password, hashedPass);
                if (!match) { throw new errors.badRequestError('Incorrect password.') }
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);


