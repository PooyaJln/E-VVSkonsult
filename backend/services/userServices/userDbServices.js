const db = require("../../models");
const Errors = require("../../utils/errors");

const userDbServices = {};

/* function checks if user Email already exists
return true if it's already taken, false otherwise*/
userDbServices.emailExists = async (email) => {
  if (email === null || email === undefined) {
    throw new Errors.badRequestError("email can not be left empty");
  }
  const user = await db.user.findOne({ where: { user_email: email } });
  if (user) return user;
  return false;
};
userDbServices.userExists = async (id) => {
  const user = await db.User.findOne({ where: { id } });

  if (user) return user;
  return false;
};

userDbServices.createUser = async (query) => {
  const { user_name, user_email, user_role } = query;
  const foundUser = userDbServices.emailExists(email);
  if (foundUser) throw new Errors.badRequestError("Email already in use");
  const newUser = await db.user.create({ user_name, user_email, user_role });
  return newUser;
};
module.exports = userDbServices;
