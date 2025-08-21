const validator = require("validator");
const userServices = require("../services/userServices");
const userDbServices = require("../services/userDbServices")
const Errors = require("../utils/errors");

const validationsMiddleware = {};

validationsMiddleware.login = async (req, res, next) => {
    try {
        const { user_email, password } = req.body

        if (!user_email || !password) {
            throw new Errors.badRequestError("Email and password must be filled");
        }
        if (!validator.isEmail(user_email)) {
            throw new Errors.badRequestError("email is not valid");
        }

        next()
    } catch (error) {
        next(error);
    }
};

validationsMiddleware.signUp = async (req, res, next) => {
    try {
        const { user_email, password, user_role } = req.body
        if (!user_email || !password || !user_role) {
            throw new Errors.badRequestError("All fields must be filled");
        }
        if (!validator.isEmail(user_email)) {
            throw new Errors.badRequestError("email is not valid");
        }
        if (
            !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 0,
                minSymbols: 0,
            })
        ) {
            throw new Errors.badRequestError("Password is not strong enough");
        }
        const foundUser = await userDbServices.findItemByEmail(user_email);
        if (foundUser) throw new Errors.badRequestError("Email already in use");
        next()
    } catch (error) {
        next(error)
    }
};

module.exports = validationsMiddleware