const db = require("../models");
const Errors = require("../utils/errors");
const hashedPassDbServices = require("./hashedPassDbServices");

const userDbServices = {};

userDbServices.findItemByID = async (id) => {
  try {
    const item = await db.user.findOne({
      where: {
        user_id: id,
      },
    });
    if (item) {
      return item;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

userDbServices.itemsPublicInfo = async (id) => {
  try {
    const item = await db.user.findOne({
      where: {
        user_id: id,
      },
      attributes: ["user_email", "user_role"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

userDbServices.userExists = async (id) => {
  try {
    const user = await db.user.findOne(
      {
        where: {
          user_id: id,
        },
        raw: true,
      }
    );

    if (user) return user;
    return false;
  } catch (error) {
    throw error;
  }
};

userDbServices.createItem = async (query) => {
  try {
    const { user_email, user_role, password } = query;
    const newUser = await db.user.create({ user_email, user_role });
    const userId = newUser.user_id;
    await hashedPassDbServices.createItem({
      userId,
      password,
    });
    const user = await userDbServices.itemsPublicInfo(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

userDbServices.emailExists = async (email) => {
  try {
    const foundUser = await db.user.findOne(
      {
        where:
          { user_email: email }
      }
    );
    if (foundUser) return foundUser;
    else return false;
  } catch (error) {
    throw error;
  }
}
userDbServices.findUserByEmail = async (email) => {
  try {
    const foundUser = await db.user.findOne(
      {
        where:
          { user_email: email }
      }
    );
    if (foundUser) return foundUser;
    else return false;
  } catch (error) {
    throw error;
  }
}


module.exports = userDbServices;
