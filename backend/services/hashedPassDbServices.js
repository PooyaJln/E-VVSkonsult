const db = require("../models");
const Errors = require("../utils/errors");

const hashedPassDbServices = {};

hashedPassDbServices.findItemByID = async (id) => {
  try {
    const item = await db.hashedpass.findOne({
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

hashedPassDbServices.userExists = async (id) => {
  try {
    const user = await db.hashedPass.findOne({
      where: {
        user_id: id,
      },
      raw: true,
    });

    if (user) return user;
    return false;
  } catch (error) {
    throw error;
  }
};

hashedPassDbServices.createItem = async (id, password) => {
  try {
    // maybe this part should check if the user id
    // already exists in the hashedPasses table
    await db.hashedPass.create({
      user_id: id,
      hashed_pass: password,
    });
    return;
  } catch (error) {
    throw error;
  }
};
hashedPassDbServices.deleteItem = async (id) => {
  try {
    // maybe this part should check if the user id
    // already exists in the hashedPasses table
    await db.hashedPass.delete({
      where: {
        user_id: id,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
module.exports = hashedPassDbServices;
