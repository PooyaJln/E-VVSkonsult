require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const db = require("../models");
const Errors = require("../utils/errors");

var maxAgeToken = 2 * 60 * 1000;
var maxAgeCookie = 2 * 60 * 1000;

const userServices = {};

userServices.createToken = (id) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAgeToken,
  });
};

userServices.generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
userServices.generatecookieHash = async (id) => {
  const salt = await bcrypt.genSalt(10);
  const hashedId = await bcrypt.hash(id, salt);
  return hashedId;
};

userServices.signUpValidate = async (query) => {
  //validation
  const user_email = query.user_email;
  const password = query.password;
  if (!user_email || !password) {
    throw new Errors.badRequestError("Email and password must be filled");
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

  return true;
};

userServices.loginValidate = async (query) => {
  //validation
  const user_email = query.user_email;
  const password = query.password;
  if (!user_email || !password) {
    throw new Errors.badRequestError("Email and password must be filled");
  }
  if (!validator.isEmail(user_email)) {
    throw new Errors.badRequestError("email is not valid");
  }
  const foundUser = await db.user.findOne({ where: { user_email: email } });
  if (!foundUser) {
    throw new Errors.validationError("Incorrect email");
  }
  const user_id = foundUser.user_id;
  // retrieve hashedpass from the database
  //   const pswdMatches = await bcrypt.compare(password, hashedpass);
  //   if (!pswdMatches) {
  //     throw new Errors.validationError("Incorrect email");
  //   }
  if (foundUser) return foundUser;
  return false;
};

/* function checks if user Email already exists
return true if it's already taken, false otherwise*/
userServices.emailExists = async (email) => {
  try {
    const foundUser = await db.user.findOne({ where: { user_email: email } });
    if (foundUser) throw new Errors.badRequestError("Email already in use");
    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = userServices;
