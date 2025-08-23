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
      attributes: ["user_email", "role_id"],
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

userDbServices.itemExists = async (id) => {
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
    const { user_email, password, user_role, role_id, user_name } = query;
    const newUser = await db.user.create({ user_email, user_role, user_name, role_id });
    const userId = newUser.user_id;
    await hashedPassDbServices.createItem(userId, password);
    // const user = await userDbServices.itemsPublicInfo(userId);
    return newUser;
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
    else return null;
  } catch (error) {
    throw error;
  }
}
userDbServices.findItemByEmail = async (email) => {
  try {
    const foundUser = await db.user.findOne(
      {
        where:
          { user_email: email }
      }
    );
    if (foundUser) return foundUser;
    else return null;
  } catch (error) {
    throw error;
  }
}


module.exports = userDbServices;
