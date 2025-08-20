const bcrypt = require("bcrypt")
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userServices = require("../../services/userServices")
const hashedPassServices = require("../../services/hashedPassDbServices")
const errors = require("../../utils/errors");
const userDbServices = require("../../services/userDbServices");

const verifyCallback = async (username, password, done) => {
    try {
        const user = await userServices.findUserByEmail(username)
        if (!user) {

            return done(null, false, { message: 'inside verifyCallback, User not found.' });
            // throw new errors.badRequestError("User not found")
        }
        const user_id = user.user_id
        const hashedPassRow = await hashedPassServices.findItemByID(user_id)
        const hashedPass = hashedPassRow.hashed_pass
        const match = await bcrypt.compare(password, hashedPass);
        if (!match) {
            return done(null, false, { message: 'inside verifyCallback, Incorrect password.' });
            // throw new errors.badRequestError('Incorrect password.')
        }
        console.log('inside verifyCallback, success.')
        done(null, user);
    } catch (error) {
        console.log('inside verifyCallback, internal server error.')
        done(error, null);
    }
}


const strategy = new LocalStrategy(
    {
        usernameField: 'user_email', // Tell passport to use 'user_email' instead of 'username'
        passwordField: 'password',
    }, verifyCallback
)

passport.serializeUser((user, done) => {
    console.log('inside serializeUser')
    done(null, user.user_id)
})
passport.deserializeUser(async (user_id, done) => {
    console.log('inside deserializeUser')
    try {
        const user = await userDbServices.findItemByID(user_id)
        if (!user) throw new errors.badRequestError("User not found")
        done(null, user);
    } catch (error) {
        done(error, null);
    }
})

passport.use(strategy);

module.exports = passport

