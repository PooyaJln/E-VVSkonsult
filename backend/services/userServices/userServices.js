require("dotenv").config();
const Errors = require("../../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userServices.signUpValidate = async (name, email, password) => {
  //validation
  if (!name || !email || !password) {
    throw Error("name, email and password must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minSymbols: 0,
    })
  ) {
    throw Error("Password is not strong enough");
  }
};

module.exports = userServices;
